import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import generateGetOrphanEirbmonUrl from '../../../middleWare/generateGetOrphanEirbmonUrl';
import Page from '../../utils/layout/index';

const apiUrl = process.env.REACT_APP_APIURL;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
        };
        this.onClick = this.onClick.bind(this);

        this.unityContent = new UnityContent(
            'BuildInfo/Build/BuildInfo.json',
            'BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            this.setState({ messageUnity: message });
        });
    }



    onClick() {
        const { dispatch } = this.props;
        //this.unityContent.send('Inventory', 'RetrievePokemonList', JSON.stringify(initEirb));
        console.log("hey 1")
        dispatch(mongoAccess.GetEirbmon(`${apiUrl}/api/eirbmon/owner/xxx_userOwnerId_xxx`))
            .then(
            (initEirb) => {
                    console.log(initEirb);
                    this.unityContent.send('Dresser(Clone)', 'RetrievePokemonList', JSON.stringify(initEirb));
                }),
            (err) => {
                console.log("hey 2")
                console.error(err)
            }
        console.log("hey 3")
    }

    getOrphanEirbmon() {
        const { dispatch } = this.props;
        console.log('button');
        dispatch(mongoAccess.GetOrphanEirbmon(`${apiUrl}/api/owner/admin_id`))
            .then(
                (orphanEirbmon) => {
                    console.log(orphanEirbmon);
                    this.unityContent.send('Dresser(Clone)', 'RetrievePokemonList', JSON.stringify(orphanEirbmon));
                },
                (err) => {
                    console.error(err)
                }
            );
    }

    render() {
        const { messageUnity } = this.state;

        return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <button onClick={this.onClick.bind(this)}>Spawn!</button>
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.onClick().bind(this)}>
                        Send Eirbmon to Unity
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => this.getOrphanEirbmon().bind(this)}>
                        Get Orphan Eirbmon
                    </Button>
                    
                </div>
                { <div>
                    <Unity unityContent={this.unityContent} />
                </div> }
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
