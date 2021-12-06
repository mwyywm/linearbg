import React from "react";
import "./App.css";

function random_hex_color() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: random_hex_color(),
      input2: random_hex_color(),
      tooltext: "Copy to clipboard!",
      Lock1: "Unlocked",
      Lock2: "Unlocked",
    };
  }
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  copyToClipboard = this.copyToClipboard.bind(this);
  generateColors = this.generateColors.bind(this);

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // if Lock1 is locked and the user changes the input1, then unlock it.
    if (this.state.Lock1 === "Locked" && e.target.name === "input1") {
      this.setState({ Lock1: "Unlocked", input1: e.target.value });
    }
    // if Lock2 is locked and the user changes the input2, then unlock it.
    else if (this.state.Lock2 === "Locked" && e.target.name === "input2") {
      this.setState({ Lock2: "Unlocked", input2: e.target.value });
    }
  }

  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  copyToClipboard(e) {
    console.log("Lock1", this.state.Lock1);
    console.log("Lock2", this.state.Lock2);
    if (e.target.lastChild.innerText === undefined) {
      // this will happen when its undefined
      e = navigator.clipboard.writeText(e.target.innerText).then(
        () => {
          // on success
          this.setState({ tooltext: "Copied!" });
          // After 3 seconds I want the tooltext to go back to "Copy to clipboard!".
          setTimeout(
            () => this.setState({ tooltext: "Copy to clipboard!" }),
            3000
          );
          console.log(`successfully copied to clipboard`);
        },
        () => {
          // on fail. Should never happen.
          console.log("failed to write to clipboard");
        }
      );
    } else {
      e = navigator.clipboard.writeText(e.target.lastChild.innerText).then(
        () => {
          // on success
          this.setState({ tooltext: "Copied!" });
          // After 3 seconds I want the tooltext to go back to "Copy to clipboard!".
          setTimeout(
            () => this.setState({ tooltext: "Copy to clipboard!" }),
            3000
          );
          console.log(`successfully copied to clipboard`);
        },
        () => {
          // on fail
          console.log("failed to write to clipboard");
        }
      );
    }
    // console.log("innert", e.target.innerText.startsWith("linear"));
    // console.log("lastchild", e.target.lastChild.innerText.startsWith("linear"));
  }

  generateColors() {
    // if Lock1 is locked and the user changes generates random color. Only input2 should change.
    if (this.state.Lock1 === "Locked" && this.state.Lock2 === "Locked") {
      this.setState({
        input1: this.state.input1,
        input2: this.state.input2,
        tooltext: "Copy to clipboard!",
      });
    } else if (this.state.Lock1 === "Locked") {
      // only changes input2
      this.setState({
        input2: random_hex_color(),
        tooltext: "Copy to clipboard!",
      });
    } else if (this.state.Lock2 === "Locked") {
      // only changes input1
      this.setState({
        input1: random_hex_color(),
        tooltext: "Copy to clipboard!",
      });
    }
    // if Lock1 and Lock2 are unlocked, then generate random colors for both.
    else {
      this.setState({
        input1: random_hex_color(),
        input2: random_hex_color(),
        tooltext: "Copy to clipboard!",
      });
    }
  }

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(90deg, ${this.state.input1} 0%, ${this.state.input2} 100%)`,
        }}
      >
        <header className="App-header">
          <h1>CSS gradient generator</h1>
          <p>Pick 2 colors and then copy to clipboard</p>
          <button onClick={this.generateColors} className="btn">
            Click here to generate random colors!
          </button>
          <div className="colorpickers">
            <div
              className="colorpickerlock1"
              onClick={() =>
                this.setState({
                  Lock1:
                    this.state.Lock1 === "Unlocked" ? "Locked" : "Unlocked",
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                style={{ height: "35px" }}
                alt="locked icon"
                src={
                  this.state.Lock1 === "Unlocked"
                    ? "https://img.icons8.com/ios-filled/452/unlock--v1.png"
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB/UlEQVRoge2Zy0rEMBSGP3UQwXkC8baQeQj1AbwsBlzoQ4iKD+FtobMWQXThBReK4MMIbkRHx7UKio6Oi5xScS5t02QamXwQWkLzn/OTpGlS8His0GVBcxgoArPAKDAo9WXgFrgCLoF7C7GNMAjsAlWgFlG+gDOUUaeYA15RSb4BR8A8UAD6pRSABeAYeJdnX1C95wSrwDcqsSPU0IpiBDgh7J0Va9nFZE4S+QQWNdovSdsvMuyZIcLhpGMiYFk0noEBA3klZp9wOKXlVLT2DGglYhj1dnoj3pyIYhT1AqgSvq4T0a0ZuAj0AOfAnabGb26BC9HUmiu6RmbkeqnZvhGB1qxBzUhuUGN6zKBmQTSvDWpG8iJB8wY184SLZNsIPjWc0dWdI87hjbhGRxjpBbaAR+r3EwFR+46kpZnuA7AhOSVm00Kiacu6jpEHaTyu09gwE4Q9kxhba4UuLfPpiMn+r/BGXMMbcQ2bRvqAElBBfR3sSF3bSbuOlKhfmbezyCetkQr1Rp5S6GW2IFYb1H3YCmbTyEGDukOL8ZqSdmjlqB9aOVv5tPrRU4vxTJzgcePF1Wqo4deRmJR/3Wf2q83EfmQadTZ8B0xllY/fWGWBN+Ia3ohrdISRR7lOtCORCCblqnVAt0H2R6R/y5qOkV4xExydZlnKYqLpIfYPvdQKy46f0RUAAAAASUVORK5CYII="
                }
              />
            </div>
            <input
              value={this.state.input1}
              type="color"
              name="input1"
              id="colorpicker"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              style={{ backgroundColor: this.state.input1 }}
            />
            <input
              value={this.state.input2}
              type="color"
              name="input2"
              id="colorpicker"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              style={{ backgroundColor: this.state.input2 }}
            />
            <div
              className="colorpickerlock2"
              onClick={() =>
                this.setState({
                  Lock2:
                    this.state.Lock2 === "Unlocked" ? "Locked" : "Unlocked",
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                style={{ height: "35px" }}
                alt="locked icon"
                src={
                  this.state.Lock2 === "Unlocked"
                    ? "https://img.icons8.com/ios-filled/452/unlock--v1.png"
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB/UlEQVRoge2Zy0rEMBSGP3UQwXkC8baQeQj1AbwsBlzoQ4iKD+FtobMWQXThBReK4MMIbkRHx7UKio6Oi5xScS5t02QamXwQWkLzn/OTpGlS8His0GVBcxgoArPAKDAo9WXgFrgCLoF7C7GNMAjsAlWgFlG+gDOUUaeYA15RSb4BR8A8UAD6pRSABeAYeJdnX1C95wSrwDcqsSPU0IpiBDgh7J0Va9nFZE4S+QQWNdovSdsvMuyZIcLhpGMiYFk0noEBA3klZp9wOKXlVLT2DGglYhj1dnoj3pyIYhT1AqgSvq4T0a0ZuAj0AOfAnabGb26BC9HUmiu6RmbkeqnZvhGB1qxBzUhuUGN6zKBmQTSvDWpG8iJB8wY184SLZNsIPjWc0dWdI87hjbhGRxjpBbaAR+r3EwFR+46kpZnuA7AhOSVm00Kiacu6jpEHaTyu09gwE4Q9kxhba4UuLfPpiMn+r/BGXMMbcQ2bRvqAElBBfR3sSF3bSbuOlKhfmbezyCetkQr1Rp5S6GW2IFYb1H3YCmbTyEGDukOL8ZqSdmjlqB9aOVv5tPrRU4vxTJzgcePF1Wqo4deRmJR/3Wf2q83EfmQadTZ8B0xllY/fWGWBN+Ia3ohrdISRR7lOtCORCCblqnVAt0H2R6R/y5qOkV4xExydZlnKYqLpIfYPvdQKy46f0RUAAAAASUVORK5CYII="
                }
              />
            </div>
          </div>
          <div className="copyP tooltip" onClick={this.copyToClipboard}>
            <span className="tooltiptext">{this.state.tooltext}</span>
            <p
              id="linearcopy"
              className="tooltip"
            >{`linear-gradient(90deg, ${this.state.input1} 0%, ${this.state.input2} 100%)`}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
