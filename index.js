import { h, render, Component } from 'preact';

class App extends Component {
  constructor() {
    super();
    // set initial time:
    this.state.date = new Date();
  }

  setDate(e) {
    const date = new Date(e.target.value);
    if (date instanceof Date && !isNaN(date)) {
      this.setState({ date });
    }
  }

  render(props, state) {
    const { date } = state;

    return (
      <div>
        <div className="utc">
          <label>UTC:</label>
          <input type="text" onInput={this.setDate.bind(this)} value={date.toUTCString()} />
        </div>
        <div className="me">
          <label>Me:</label>
          <input type="text" onInput={this.setDate.bind(this)} value={date.toLocaleString()} />
        </div>
      </div>
    );
  }
}

// render an instance of App into <body>:
render(<App />, document.querySelector('#app'));
