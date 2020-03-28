
import React from "react";

class App extends React.Component {
  render() {
    const { projectTitle } = this.props;
    return <h1>{projectTitle}</h1>;
  }
}

export default App;
