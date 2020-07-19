import React, { FunctionComponent, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Confirm from "./Confirm";
import { render } from "@testing-library/react";
import classes from "*.module.sass";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends React.Component<{}, IState> {
  private timer: number = 0;
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmMessage: "Please hit the confirm button",
      confirmOpen: false,
      confirmVisible: false,
      countDown: 10,
    };
  }
  public componentDidMount() {
    this.timer = window.setInterval(() => {
      this.handleTimerClick();
    }, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  private handleTimerClick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
        countDown: this.state.countDown - 1,
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!",
            confirmVisible: false,
          });
        }
      }
    );
  }

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, I'm sure you will later",
    });
  };
  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Cool, carry on reading",
    });
  };

  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true });
  };
  public render() {
    return (
      <div className="Ap">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>
            Confirm asdfasdfasfd asdfas asdff
          </button>
        )}

        <Confirm
          open={this.state.confirmOpen}
          title="React and Typescript"
          content="Are you sure you want to learn React and TypeScript?"
          cancelCaption="No Way"
          okCaption="Yes please!"
          onOkClick={this.handleOkConfirmClick}
          onCancelClick={this.handleCancelConfirmClick}
        />
      </div>
    );
  }
}

export default App;
