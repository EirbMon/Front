import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import generateGetOwnerEirbmonUrl from '../../../middleWare/generateGetOwnerEirbmonUrl';
import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';


var owner_id = null;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
            owner_id: '',
            contract:null,
        };
        this.onOwnerEirbmons = this.onOwnerEirbmons.bind(this);
        this.onOrphanEirbmon = this.onOrphanEirbmon.bind(this);
        this.onUpdateEirbmonOwner = this.onUpdateEirbmonOwner.bind(this);
        this.onStarterEirbmon = this.onStarterEirbmon.bind(this);

        this.unityContent = new UnityContent(
            'BuildInfo/Build/BuildInfo.json',
            'BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            if (message === "user_pokemon"){
                console.log("Get My Eirbmons");
                this.onOwnerEirbmons();
            }
            else if (message === "combat_pokemon"){
                console.log("Get Orphelin Eirbmon for Combat");
                this.onOrphanEirbmon();
            }
            else if (message === "starter_pokemon"){
                console.log("Get Starter SERVER Eirbmon");
                this.onStarterEirbmon();
            }
            else if (message === "catch_pokemon"){
                console.log("Post Update Catch Eirbmon");
                this.onUpdateEirbmonOwner();
            }
            else{
                console.log("Receiving: " + message);
            }

            this.setState({ messageUnity: message });
        });
    }



    componentDidMount = async () => {
        instanciateContract.then(res => {
            this.setState({ owner_id: res.accounts });
            this.setState({ contract: res.contract });
            console.log(this.state.owner_id);
        });
    }

    onOwnerEirbmons() {
        const { dispatch } = this.props ;

        dispatch(mongoAccess.GetEirbmon(`${generateGetOwnerEirbmonUrl()}${owner_id}`)).then(
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
        // orphean normalement c'est soit un owner vide, soit un owner admin.
        var orphean_id = owner_id; 
        dispatch(mongoAccess.GetEirbmon(`${generateGetOwnerEirbmonUrl()}${orphean_id}`)).then(
            (initEirb) => {
                this.unityContent.send('CombatManager', 'GenerateWildPokemon', JSON.stringify(initEirb));
            },
            (err) => {
                console.error(err);
            }
        );
    }

    onUpdateEirbmonOwner() {
        const eirbmon_id = 2;
        const { dispatch } = this.props;
        dispatch(mongoAccess.updateEirbmonOwner(`${generateGetEirbmonUrl()}`,owner_id)).then(
            (initEirb) => {
                    this.state.contract.methods.catchEirbmon(eirbmon_id).send({ from: this.state.accounts[0] });
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
                {<div>
                    <Unity unityContent={this.unityContent} />
                </div>}
                Message from unity :
                {messageUnity}
            </Page>
        );
    }
}

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(Game);
