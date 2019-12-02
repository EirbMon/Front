import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/withApi/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import generateGetOwnerEirbmonUrl from '../../../middleWare/generateGetOwnerEirbmonUrl';
import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';

var owner_id = "0xa320ef816d9df19fcf88ad6b9b50e0ebac712c7f";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
            owner_id: '0xa320ef816d9df19fcf88ad6b9b50e0ebac712c7f',
            contract: null,
            eirbmon_id: null,
            orphean_id: '0x0000000000000000000000000000000000000000',
        };
        this.onOwnerEirbmons = this.onOwnerEirbmons.bind(this);
        this.onOrphanEirbmon = this.onOrphanEirbmon.bind(this);
        this.onUpdateEirbmon = this.onUpdateEirbmon.bind(this);

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
                this.onUpdateEirbmon();
            }
            else{
                console.log("Receiving: " + message);
            }

            this.setState({ messageUnity: message });
        });
    }

    componentDidMount = async () => {
        instanciateContract.then(res => {
            //this.setState({ owner_id: res.accounts[0] });
            //this.setState({ contract: res.contract });
            console.log("REGARDE ICI");
            console.log(this.state.owner_id);
        });
    }

    onOwnerEirbmons() {
        const { dispatch } = this.props ;

        dispatch(mongoAccess.GetEirbmon(generateGetEirbmonUrl(owner_id))).then(
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
        dispatch(mongoAccess.GetEirbmon(generateGetEirbmonUrl(owner_id))).then(
            (initEirb) => {
                    this.setState({eirbmon_id: initEirb[0].idInBlockchain});
                    console.log("L'ID du Eirbmon capturé est: " + this.state.eirbmon_id);
                    this.unityContent.send('CombatManager', 'GenerateWildPokemon', JSON.stringify(initEirb));
                },
            (err) => {
                console.error(err);
            }
        );
    }

    onUpdateEirbmon() {

        const { dispatch } = this.props;
        console.log("L'ID du Eirbmon capturé est: " + this.state.eirbmon_id);
        console.log(`${generateGetEirbmonUrl()}`);
        dispatch(mongoAccess.UpdateEirbmon(`${generateGetEirbmonUrl()}`,{idInBlockchain: this.state.eirbmon_id, owner_id: this.state.owner_id})).then(
            (initEirb) => {
                console.log(this.state)
                console.log("Eirbmon updated: ");
                //this.state.contract.methods.catchEirbmon(2).send({ from: this.state.owner_id });
                },
            (err) => {
                console.error(err);
            }
        );
    }

    render() {
        const { messageUnity } = this.state;

        return (
            <Page currentPage="Jeux">
                <div>
                    <Unity unityContent={this.unityContent} />
                </div>
                Message from unity :
                {messageUnity}
            </Page>
        );
    }
}
function select(state){
    return {
        accountInfo: state.accountInfo,
    };
}

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect(select)(Game);
