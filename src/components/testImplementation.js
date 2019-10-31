import Unity, { UnityContent } from "react-unity-webgl";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

import Tab from './utils/tab';

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto',
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '50px auto 0 auto'
  },
});

class TestImplementation extends React.Component {
  constructor(props) {
    super(props);
    this.speed = 30;
    this.state = { rotation: 0, unityShouldBeMounted: true };

    this.unityContent = new UnityContent(
      "src/game/TestImplementation/BuildInfo/Build/BuildInfo.json",
      "src/game/TestImplementation/BuildInfo/Build/UnityLoader.js"
    );

    this.unityContent.on("Say", message => {
      console.log("Wow Unity said:" + message);
    });

    this.unityContent.on("SendRotation", rotation => {
      this.setState({ rotation: Math.round(rotation) });
    });

    this.unityContent.on("progress", progression => {
      console.log("Unity progress", progression);
    });

    this.unityContent.on("loaded", () => {
      console.log("Yay! Unity is loaded!");
    });
  }

  onClickStart() {
    this.unityContent.send("mesh-crate", "StartRotation");
  }

  onClickStop() {
    this.unityContent.send("mesh-crate", "StopRotation");
  }

  onClickUpdateSpeed(speed) {
    this.speed += speed;
    this.unityContent.send("mesh-crate", "SetRotationSpeed", this.speed);
  }

  onClickUnount() {
    this.setState({ unityShouldBeMounted: false });
  }

  render() {
    const classes = this.props.classes;

    return (
      <Tab currentPage="TestImplementation">
        <h1>Exemple Avancé</h1>
        <p>{"Rotation: " + this.state.rotation}deg</p>
        <button onClick={this.onClickStart.bind(this)}>{"Start"}</button>
        <button onClick={this.onClickStop.bind(this)}>{"Stop"}</button>
        <button onClick={this.onClickUpdateSpeed.bind(this, 10)}>
          {"Faster"}
        </button>
        <button onClick={this.onClickUpdateSpeed.bind(this, -10)}>
          {"Slower"}
        </button>
        <button onClick={this.onClickUnount.bind(this)}>
          {"Unmount (2019.1=>)"}
        </button>
        {this.state.unityShouldBeMounted === true && (
          <Unity unityContent={this.unityContent} />
        )}
      </Tab>
    );
  }
}

export default withStyles(styles)(TestImplementation);
