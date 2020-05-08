import React, { Component } from "react";
import Clicker from "./Components/Clicker/Clicker";
import "./styles.css";

class App extends Component {
  state = {
    count: 0,
    left: false,
    right: false,
    scale: false
  };

  incrementCountHandler = () => {
    this.setState({ left: true, scale: true });

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
    }, 500);

    setTimeout(() => {
      this.setState({ left: false, scale: false });
    }, 800);
  };

  decrementCountHandler = () => {
    this.setState({ right: true, scale: true });

    setTimeout(() => {
      this.setState({ count: this.state.count - 1 });
    }, 500);

    setTimeout(() => {
      this.setState({ right: false, scale: false });
    }, 800);
  };

  resetCountHandler = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className={"App"}>
        <Clicker
          right={this.state.right}
          left={this.state.left}
          scale={this.state.scale}
          count={this.state.count}
          increment={this.incrementCountHandler}
          decrement={this.decrementCountHandler}
          reset={this.resetCountHandler}
        />
      </div>
    );
  }
}

export default App;
