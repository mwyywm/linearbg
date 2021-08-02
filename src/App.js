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
    };
  }
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  copyToClipboard = this.copyToClipboard.bind(this);
  generateColors = this.generateColors.bind(this);

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  copyToClipboard(e) {
    if (e.target.lastChild.innerText === undefined) {
      console.log("this will happen when its undefined");
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
          // on fail
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
    this.setState({
      input1: random_hex_color(),
      input2: random_hex_color(),
      tooltext: "Copy to clipboard!",
    });
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
          <p>Pick two colors and then copy to clipboard</p>
          <button onClick={this.generateColors} className="btn">
            Click here to generate random colors!
          </button>
          <div className="colorpickers">
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
