import PropTypes from 'prop-types';
import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
import { connect } from 'react-redux';
import mongoAccess from '../../../actions/withApi/index';
import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';
import { withStyles } from '@material-ui/core/styles';

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
            orphean_id: '0x0000000000000000000000000000000000000000',
        };
        withStyles(styles);
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
                this.onEndCombat();
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
                console.log("My Eirbmon List: ");
                console.log(initEirb);
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

    onEndCombat() {

        const { dispatch } = this.props;
        dispatch(mongoAccess.UpdateEirbmon({idInBlockchain: this.state.eirbmon_id, available: true})).then(
            (initEirb) => {
                console.log("End of the FIGHT: ");
                console.log(initEirb);
            },
            (err) => {
                console.error(err);
            }
        );
    }


    onCatchEirbmon() {

            
            const { dispatch } = this.props;
            console.log("L'ID du Eirbmon capturé est : " + this.state.eirbmon_id,"pour compte ",this.state.owner_id);

            this.state.contract.methods.catchEirbmon(this.state.eirbmon_id).send({ from: this.state.owner_id })
            .then(response=>{
                dispatch(mongoAccess.UpdateCatchEirbmon({id_eirbmon_blockchain: this.state.eirbmon_id, owner_id:this.state.owner_id})).then(
                (initEirb) => {
                    console.log("Eirbmon Catched: ");
                    console.log(initEirb);
                    this.unityContent.send('Dresser(Local)', 'CatchPokemon', JSON.stringify(initEirb));
                },
                (err) => {
                    console.error(err);
                }
            );
            this.setState({eirbmon_id: null});
            });

    }

    render() {
        const { messageUnity } = this.state;
        const classes = this.props.classes;


        return (
            <Page currentPage="Jeux">
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
