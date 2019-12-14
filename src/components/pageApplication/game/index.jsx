import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';

import mongoAccess from '../../../actions/withApi/index';

import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
            owner_id: null,
            contract: null,
            eirbmon_id: null,
            orphean_id: '0x0000000000000000000000000000000000000000',
        };
        this.onRefreshMyInventory = this.onRefreshMyInventory.bind(this);
        this.onEnterInCombat = this.onEnterInCombat.bind(this);
        this.onCatchEirbmon = this.onCatchEirbmon.bind(this);

        this.unityContent = new UnityContent(
            'BuildInfo/Build/BuildInfo.json',
            'BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (message) => {
            if (message === "user_pokemon"){
                console.log("Refresh my Eirbmons Inventory");
                this.onRefreshMyInventory();
            }
            else if (message === "combat_pokemon"){
                console.log("Enter in Combat");
                this.onEnterInCombat();
            }
            else if (message === "starter_pokemon"){
                console.log("Get Starter SERVER Eirbmon");
                this.onStarterEirbmon();
            }
            else if (message === "catch_pokemon"){
                console.log("Catch Eirbmon in Combat");
                this.onCatchEirbmon();
            }
            else if (message === "eirbmon_skills"){
                console.log("Send Eirbmon Skills list to the game");
                this.onSendEirmobSkill();
            }
            else if (message === "end_combat"){
                console.log("End of the combat by the user");
                //this.onUpdateEirbmon
            }
            else{
                console.log("Receiving: " + message);
            }

            this.setState({ messageUnity: message });
        });
    }

    componentDidMount = async () => {
        instanciateContract.then(res => {
            this.setState({ owner_id: res.accounts[0] });
            this.setState({ contract: res.contract });
            console.log(this.state.contract.methods);        
            console.log(this.props);
        });
    }

    onRefreshMyInventory() {
        const { dispatch } = this.props ;

        dispatch(mongoAccess.GetOwnerEirbmon(this.state.owner_id, 6)).then(
            (initEirb) => {
                this.unityContent.send('Dresser(Local)', 'RetrievePokemonList', JSON.stringify(initEirb));
            },
            (err) => {
                console.error(err);
            }
        );
    }

    onSendEirmobSkill() {

        const { dispatch } = this.props;
        dispatch(mongoAccess.GetAllSkills()).then(
            (initSkills) => {
                this.unityContent.send('GameManager', 'SetEirbmonSkills', JSON.stringify(initSkills));
            },
            (err) => {
                console.error(err);
            }
        );
    }

    onEnterInCombat() {

        const { dispatch } = this.props;
        dispatch(mongoAccess.GetOwnerEirbmon(this.state.orphean_id,1)).then(
            (initEirb) => {
                this.setState({eirbmon_id: initEirb[0].idInBlockchain});
                this.unityContent.send('CombatManager', 'GenerateOrphelin', JSON.stringify(initEirb));

            },
            (err) => {
                console.error(err);
            }
        );
    }


    onCatchEirbmon() {

            const { dispatch } = this.props;
            console.log("L'ID du Eirbmon capturé est: " + this.state.eirbmon_id,"pour compte ",this.state.owner_id);

            dispatch(mongoAccess.UpdateCatchEirbmon({idInBlockchain: this.state.eirbmon_id,owner_id:this.state.owner_id})).then(
                (initEirb) => {
                    console.log("Bonjour index.js GAME: initEirb:");
                    console.log(initEirb);
                    this.state.contract.methods.catchEirbmon(this.state.eirbmon_id).send({ from: this.state.owner_id })
                    .then(response=>{
                        this.setState({eirbmon_id: null});
                        console.log("Bonjour dans le contract :o !");
                        this.unityContent.send('Dresser(Local)', 'CatchPokemon', JSON.stringify(initEirb));
                    });
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

//function select(state){
//    return {
//        accountInfo: state.accountInfo,
//    };
//}

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect(null, null)(Game);
