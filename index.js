import { h, render, Component } from 'preact';

class App extends Component {
    constructor() {
        super();
        // set initial time:
        const now = new Date();
        this.state = {
            date: now,
            focus: 'utc',
            focusText: now.toISOString()
        };
        this.base;
    }

    setDate(e) {
        const date = new Date(e.target.value);
        console.log(date instanceof Date, !isNaN(date), date.toLocaleString());
        this.setState({
            focus: e.target.getAttribute('data-key'),
            focusText: e.target.value,
            date: date instanceof Date && !isNaN(date) ? date : this.state.date
        });
    }

    padNumber(number) {
        return number < 10 ? `0${number}` : number.toString();
    }

    formatLocal(date) {
        return `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}T${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
    }

    render(props, state) {
        const { date, focus, focusText } = state;

        // Get timezone in hours
        let timezoneOffset = (date.getTimezoneOffset() / 60) * -1;
        let timezoneText = `${timezoneOffset > 0 ? '+' : ''}${timezoneOffset}`;

        return (
            <div className="container">
                <div className="utc">
                    <label>UTC:</label>
                    <input
                        type="text"
                        data-key="utc"
                        onInput={this.setDate.bind(this)}
                        value={focus === 'utc' ? focusText : date.toISOString()}
                        autoFocus
                    />
                </div>
                <div className="me">
                    <label>Me (GMT{timezoneText}):</label>
                    <input
                        type="text"
                        data-key="me"
                        onInput={this.setDate.bind(this)}
                        value={focus === 'me' ? focusText : this.formatLocal(date)}
                    />
                </div>
            </div>
        );
    }
}

// render an instance of App into <body>:
render(<App />, document.querySelector('#app'));
