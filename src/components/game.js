import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Unity, { UnityContent } from "react-unity-webgl";
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';


import bcAccess from "../actions/index";
import generateGetEirbmonUrl from "../middleWare/generateGetEirbmonUrl";

const styles = theme => ({
  tableWrapper: {
    padding: theme.spacing(3),
    width: '60%',
    height: '75%',
    margin: '30px auto 0 auto'
  },
});

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageUnity: "",
    };

    this.unityContent = new UnityContent(
      "src/game/Unity/BuildInfo/Build/BuildInfo.json",
      "src/game/Unity/BuildInfo/Build/UnityLoader.js"
    );

    this.unityContent.on("DoInteraction", message => {
      this.setState({messageUnity: message});
      console.log("Wow Unity said: " + this.state.messageUnity);
    });
  }

  sendMsgToUnity(){
        
    let eirbmonInfo = {
      Pokemons: [{
        type: "Pikachu",
        name: "Gribouille",
        color: "Black",
        position_x: -56.5,
        position_y: 3.6,

      },
      {
        type: "Carapuce",
        name: "Artpick",
        color: "Silver",
        position_x: -57.44,
        position_y: 3.7,

      },
      {
        type: "Salameche",
        name: "Loustick",
        color: "Purple",
        position_x: -55.5,
        position_y: 3.6,

      }
    ]
    }; 
    console.log(eirbmonInfo)

    // this.unityContent.send("GeneratePokemon", "GenerateFirstPokemon", JSON.stringify(eirbmonInfo));
    this.props.dispatch(bcAccess.GetEirbmon(generateGetEirbmonUrl()))
    .then((initEirb) => {

      console.log(initEirb);
      this.unityContent.send("GeneratePokemon", "GenerateFirstPokemon", JSON.stringify(initEirb));
    });
  }
  
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.tableWrapper}>
        <h1> Eirbmon </h1>
        <div>
        <Button variant="outlined" color="primary" onClick={()=>this.sendMsgToUnity()}>
          Send Eirbmon to Unity
        </Button>
        </div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
        Message from unity : {this.state.messageUnity}
      </div>)
  }
} function select(state){
  return{};
}

export default connect(select)(withStyles(styles)(Game));