import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: "#d83131",
      input2: "#fff56b",
      tooltext: "Copy to clipboard",
    };
  }
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  copyToClipboard = this.copyToClipboard.bind(this);

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  copyToClipboard(e) {
    if (e.target.lastChild.innerText === undefined) {
      console.log("this will happen when its undefined");
      this.setState({ tooltext: "Copied" });
      e = navigator.clipboard.writeText(e.target.innerText).then(
        () => {
          // on success
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
          this.setState({ tooltext: "Copied" });
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

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(90deg, ${this.state.input1} 0%, ${this.state.input2} 100%)`,
        }}
      >
        <header className="App-header">
          <h1>This is a CSS gradient generator</h1>
          <p>Pick two colors</p>
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
