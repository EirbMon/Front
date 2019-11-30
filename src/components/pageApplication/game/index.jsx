import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/withApi/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import Page from '../../utils/layout/index';

var owner_id = "0xa320ef816d9df19fcf88ad6b9b50e0ebac712c7f";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
        };
        this.onClick = this.onClick.bind(this);
        this.onOrphanEirbmon = this.onOrphanEirbmon.bind(this);

        this.unityContent = new UnityContent(
            'BuildInfo/Build/BuildInfo.json',
            'BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            if (message == "user_pokemon"){
                console.log("Get My Eirbmons");
                this.onClick();
            }
            else if (message == "combat_pokemon"){
                console.log("Get Orphelin Eirbmon for Combat");
                this.onOrphanEirbmon();
            }
            else if (message == "starter_pokemon"){
                console.log("Get Starter SERVER Eirbmon");
                this.onStarterEirbmon();
            }
            else{
                console.log("Receiving: " + message);
            }

            this.setState({ messageUnity: message });
        });
    }



    onClick() {
        const { dispatch } = this.props ;

        dispatch(mongoAccess.GetEirbmon(`${generateGetEirbmonUrl()}${owner_id}`)).then(
            (initEirb) => {
                    this.unityContent.send('Dresser(Local)', 'RetrievePokemonList', JSON.stringify(initEirb));
                },
            (err) => {
                console.error(err);
            }
        );
    }

    onOrphanEirbmon() {

        const { dispatch } = this.props;
        dispatch(mongoAccess.GetEirbmon(`${generateGetEirbmonUrl()}${owner_id}`)).then(
            (initEirb) => {
                    this.unityContent.send('CombatManager', 'GenerateWildPokemon', JSON.stringify(initEirb));
                },
            (err) => {
                console.error(err);
            }
        );
    }

    onStarterEirbmon() {

        var JSONString = "[{\"type\":\"Pikachu\",\"name\":\"PikaPika\",\"color\":\"yellow\",\"position_x\":\"-56.5\",\"position_y\":\"3.6\"},{\"type\":\"Carapuce\",\"name\":\"CaraCara\",\"color\":\"blue\",\"position_x\":\"-57.5\",\"position_y\":\"3.6\"},{\"type\":\"Salameche\",\"name\":\"SalaSala\",\"color\":\"red\",\"position_x\":\"-55.5\",\"position_y\":\"3.6\"}]";
        this.unityContent.send('GameManager', 'GenerateFirstPokemon', JSONString);
    }

    render() {
        const { messageUnity } = this.state;

        return (
            <Page currentPage="Jeux">
                {/* <div>
                    <Unity unityContent={this.unityContent} />
                </div>  */}
                Message from unity :
                {messageUnity}
            </Page>
        );
    }
}
// function select(state){
//     return {};
// }

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(Game);
