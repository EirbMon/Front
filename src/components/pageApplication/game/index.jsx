import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/withApi/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import generateGetOrphanEirbmonUrl from '../../../middleWare/generateGetOrphanEirbmonUrl';
import Page from '../../utils/layout/index';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
        };

        this.unityContent = new UnityContent(
            'Build/BuildInfo.json',
            'Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            this.setState({ messageUnity: message });
        });
    }

     sendMsgToUnity() {
         const { dispatch } = this.props;

        dispatch(mongoAccess.GetEirbmon(generateGetEirbmonUrl(12)))
            .then(
            (initEirb) => {
                    console.log('Good');
                    this.unityContent.send('Inventory', 'RetrievePokemonList', JSON.stringify(initEirb));
                }),
            (err) => {
                console.error(err)
            }
    }

    getOrphanEirbmon() {
        const { dispatch } = this.props;
        console.log('button');
        dispatch(mongoAccess.GetOrphanEirbmon(generateGetOrphanEirbmonUrl()))
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
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.sendMsgToUnity().bind(this)}>
                        Send Eirbmon to Unity
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => this.getOrphanEirbmon().bind(this)}>
                        Get Orphan Eirbmon
                    </Button>
                </div>
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
