import { withStyles } from "@material-ui/core/styles";
import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";

import Page from '../../utils/layout/index';

const styles = (theme) => ({
  tableWrapper: {
    overflowX: 'auto',
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '50px auto 0 auto'
  },
});

class TestBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: "Compteur: 0",
    };

    this.unityContent = new UnityContent(
      "src/game/TestBase/BuildInfo/Build/BuildInfo.json",
      "src/game/TestBase/BuildInfo/Build/UnityLoader.js"
    );

    this.unityContent.on("Counter", score => {

      // Now we can use the score to for example display it on our React app.

      this.setState({
        score: score
      });
    });
  }

  render() {
    const classes = this.props.classes;

    return (
      <Page currentPage="TestBase">
        <h1> Exemple Basique </h1>
        <div>
          {this.state.score}
        </div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </Page>
    )
  }
}

export default withStyles(styles)(TestBase);
