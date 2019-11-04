import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import bcAccess from '../../../actions/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import Page from '../../utils/page';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
        };

        this.unityContent = new UnityContent(
            'src/game/Unity/BuildInfo/Build/BuildInfo.json',
            'src/game/Unity/BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            this.setState({ messageUnity: message });
            // console.log(`Wow Unity said: ${this.state.messageUnity}`);
        });
    }

    sendMsgToUnity() {
        const { dispatch } = this.props;

        dispatch(bcAccess.GetEirbmon(generateGetEirbmonUrl()))
            .then((initEirb) => {
                this.unityContent.send('GeneratePokemon', 'GenerateFirstPokemon', JSON.stringify(initEirb));
            });

        // let eirbmonInfo = {
        //   Pokemons: [{
        //     type: "Pikachu",
        //     name: "Gribouille",
        //     color: "Black",
        //     position_x: -56.5,
        //     position_y: 3.6,

        //   },
        //   {
        //     type: "Carapuce",
        //     name: "Artpick",
        //     color: "Silver",
        //     position_x: -57.44,
        //     position_y: 3.7,

        //   },
        //   {
        //     type: "Salameche",
        //     name: "Loustick",
        //     color: "Purple",
        //     position_x: -55.5,
        //     position_y: 3.6,

        //   }
        // ]
        // };
        // this.unityContent.send("GeneratePokemon", "GenerateFirstPokemon", JSON.stringify(eirbmonInfo));
    }

    render() {
        const { messageUnity } = this.state;

        return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.sendMsgToUnity()}>
                        Send Eirbmon to Unity
                    </Button>
                </div>
                <div>
                    <Unity unityContent={this.unityContent} />
                </div>
                Message from unity :
                {' '}
                {messageUnity}
            </Page>
        );
    }
}

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect(null)(Game);
