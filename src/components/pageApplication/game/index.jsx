import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';
import mongoAccess from '../../../actions/withApi/index';
import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';
import { withStyles } from '@material-ui/core/styles';

import ChatPortal from '../../utils/chat/chatPortal';

const styles = (theme) => ({
    tableWrapper: {
        overflowX: 'visible',
        overflowY: 'visible',
        //padding: -theme.spacing(3),
        //margin: '-50px -50px -50px -50px',
        width: '100%',
        //height: '94vh'
        height: 'calc(100vh - 48px)'
    },
});

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUnity: '',
            owner_id: null,
            key: null,
            contract: null,
            eirbmon_id: null,
            orphean_id: '0x0000000000000000000000000000000000000000'
        };
        withStyles(styles);
        this.onRefreshMyInventory = this.onRefreshMyInventory.bind(this);
        this.onEnterInCombat = this.onEnterInCombat.bind(this);
        this.onCatchEirbmon = this.onCatchEirbmon.bind(this);
        this.onSendEirmobSkill = this.onSendEirmobSkill.bind(this);
        this.onEndCombatOrphelin = this.onEndCombatOrphelin.bind(this);
        this.onEndCombat = this.onEndCombat.bind(this);
        this.onEvolve = this.onEvolve.bind(this);

        this.unityContent = new UnityContent(
            'BuildInfo/Build/BuildInfo.json',
            'BuildInfo/Build/UnityLoader.js',
        );

        this.unityContent.on('DoInteraction', (req) => {

            console.log(req);

            var object = JSON.parse(req);
            var message = object.message;

            if (message === "user_pokemon") {
                console.log("OnEvolve");
                this.onEvolve();

                console.log("Refresh my Eirbmons Inventory");
                this.onRefreshMyInventory();
            }
            else if (message === "combat_pokemon") {
                console.log("Enter in Combat");
                this.onEnterInCombat();
            }
            else if (message === "starter_pokemon") {
                console.log("Get Starter SERVER Eirbmon");
                this.onStarterEirbmon();
            }
            else if (message === "catch_pokemon") {
                console.log("Catch Eirbmon in Combat");
                this.onCatchEirbmon();
            }
            else if (message === "eirbmon_skills") {
                console.log("Send Eirbmon Skills list to the game");
                this.onSendEirmobSkill();
            }
            else if (message === "end_combat_orphelin") {
                console.log("Set Orphelin to available");
                this.onEndCombatOrphelin();
            }
            else if (message === "end_combat") {
                console.log("End fight: Update Eirbmons HP & LVL");
                this.onEndCombat(object);
            }
            else {
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
        const { dispatch } = this.props;

        dispatch(mongoAccess.GetOwnerEirbmon(this.state.owner_id, 6)).then(
            (initEirb) => {
                console.log(initEirb);
                this.unityContent.send('Dresser(Local)', 'RetrievePokemonList', JSON.stringify(initEirb));
            },
            (err) => {
                console.error(err);
            }
        );
    }

    onEvolve() {
        const { dispatch } = this.props;
        var id_eirbmon = 5; // C'est un de mes eirbmon, a modifier à souhait pour les tests avec un PUT http://localhost:4000/api/eirbmon/.
        console.log("L'ID du Eirbmon a évolué est : ");
        dispatch(mongoAccess.GetEvolution(id_eirbmon)).then(
            (eirbdex) => {
                console.log(eirbdex);
                if (eirbdex.evolution == "0") {
                    console.log('The eirbmon is already at its max evolution, there is no evolution above, it cannnot evolve.');
                    return;
                }
                if (eirbdex.lvl < 100) {
                    console.log('The eirbmon is not lv100, you cannnot evolve it');
                    return;
                }
                else {
                    console.log('New eirbmon type : ' + eirbdex.evolution);
                    this.state.contract.methods.evolveEirbmon(id_eirbmon, eirbdex.evolution).send({ from: this.state.owner_id })
                        .then(response => {
                            //dispatch(mongoAccess.UpdateEirbmon({idInBlockchain: id_eirbmon, type:eirbdex.evolution, evolve: eirbdex.evolve + 1, lvl: 0})).then(
                            dispatch(mongoAccess.UpdateMongoEirbmonFromBlockchain(id_eirbmon)).then(
                                (initEirb) => { console.log("Eirbmon evolution :"); console.log(initEirb); },
                                (err) => { console.error(err); }
                            );
                        });
                }
            },
            (err) => { console.error(err); }
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
        dispatch(mongoAccess.GetOwnerEirbmon(this.state.orphean_id, 1)).then(
            (initEirb) => {
                this.setState({ eirbmon_id: initEirb[0].idInBlockchain });
                this.unityContent.send('CombatManager', 'GenerateOrphelin', JSON.stringify(initEirb));

            },
            (err) => {
                console.error(err);
            }
        );
    }

    onEndCombatOrphelin() {

        const { dispatch } = this.props;

        dispatch(mongoAccess.UpdateEirbmon({ idInBlockchain: this.state.eirbmon_id, available: true })).then(
            (initEirb) => {
            },
            (err) => {
                console.error(err);
            }
        );
    }

    onEndCombat(object) {

        const { dispatch } = this.props;
        var N = object.length;

        console.log("Number of eirbmons updated: " + N);

        for (let i = 0; i < N; i++) {
            dispatch(mongoAccess.UpdateEirbmon(object.pokemons[i])).then(
                (initEirb) => {
                    console.log(initEirb);
                },
                (err) => {
                    console.error(err);
                }
            );
        }
    }


    onCatchEirbmon() {
        const { dispatch } = this.props;
        console.log("L'ID du Eirbmon capturé est : " + this.state.eirbmon_id, "pour compte ", this.state.owner_id);

        this.state.contract.methods.catchEirbmon(this.state.eirbmon_id).send({ from: this.state.owner_id })
            .then(response => {
                dispatch(mongoAccess.UpdateCatchEirbmon({ id_eirbmon_blockchain: this.state.eirbmon_id, owner_id: this.state.owner_id })).then(
                    (initEirb) => {
                        console.log("Eirbmon Catched: ");
                        console.log(initEirb);
                        this.unityContent.send('Dresser(Local)', 'CatchPokemon', JSON.stringify(initEirb));
                    },
                    (err) => {
                        console.error(err);
                    }
                );
                this.setState({ eirbmon_id: null });
            });
    }

    render() {
        const { messageUnity } = this.state;
        const classes = this.props.classes;

        return (
            <Page currentPage="Jeux">
                <ChatPortal salon="salonGlobal" />
                <div className={classes.tableWrapper} >
                    <Unity unityContent={this.unityContent} />
                </div>
            </Page>
        );
    }
}

Game.propTypes = {
    dispatch: PropTypes.func,
};

export default connect(null, null)(withStyles(styles)(Game));
