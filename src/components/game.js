import { withStyles } from "@material-ui/core/styles";
import React, { Fragment } from 'react';
import Unity, { UnityContent } from "react-unity-webgl";

import Tab from './utils/tab';

const styles = (theme) => ({
  tableWrapper: {
    overflowX: 'auto',
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '50px auto 0 auto'
  },
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };

    this.unityContent = new UnityContent(
      "src/game/Unity/BuildInfo/Build/BuildInfo.json",
      "src/game/Unity/BuildInfo/Build/UnityLoader.js"
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
      <Tab currentPage="Jeux">
        <h1>Eirbmon</h1>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </Tab>
    )
  }
}
export default withStyles(styles)(Game);
