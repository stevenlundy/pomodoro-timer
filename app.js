var NumberInput = React.createClass({
  handleIncrement: function() {
    if(this.props.value + 1 <= this.props.max) {
      this.props.onUpdate(this.props.value + 1);
    }
  },
  handleDecrement: function() {
    if(this.props.value - 1 >= this.props.min) {
      this.props.onUpdate(this.props.value - 1);
    }
  },
  render: function() {
    return (
      <div className="counter">
        {this.props.children}
        <button className="up" onClick={this.handleDecrement} disabled={this.props.disabled}>-</button>
        <span className="value">{this.props.value}</span>
        <button className="down" onClick={this.handleIncrement} disabled={this.props.disabled}>+</button>
      </div>
    );
  }
});

var PomodoroClock = React.createClass({
  getInitialState: function() {
    return {
      sessionLength: +this.props.initialSession || 25,
      breakLength: +this.props.initialBreak || 5,
      running: false,
      mode: 'session',
      timeRemaining: 0
    };
  },

  advanceTimer: function() {
    if(this.state.running){
      if(this.state.timeRemaining > 0){
        this.setState({
          timeRemaining: this.state.timeRemaining - 1
        });
      } else {
        this.switchMode();
      }
    }
  },

  setTimer: function(numMinutes) {
    this.setState({
      timeRemaining: 60 * numMinutes
    });
  },

  setBreakLength: function(value) {
    this.setState({
      breakLength: value
    });
  },

  setSessionLength: function(value) {
    this.setState({
      sessionLength: value,
      mode: 'session'
    });
    this.setTimer(value);
  },

  toggleTimer: function() {
    this.setState({
      running: !this.state.running
    });
  },

  switchMode: function() {
    if(this.state.mode === 'session') {
      this.setState({
        mode: 'break'
      });
      this.setTimer(this.state.breakLength);
    } else {
      this.setState({
        mode: 'session'
      });
      this.setTimer(this.state.sessionLength);
    }
  },

  formatTime: function(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = Math.floor(seconds % 60);
    if(hours > 0){
      return hours + ':' + this.zeroPad(minutes, 2) + ':' + this.zeroPad(seconds, 2);
    } else {
      return minutes + ':' + this.zeroPad(seconds, 2);
    }
  },

  zeroPad: function(num, digits) {
    num = String(num);
    while(num.length < digits){
      num = '0' + num;
    }
    return num;
  },

  componentDidMount: function() {
    this.setTimer(this.state.sessionLength);
    setInterval(this.advanceTimer, 1000);
  },

  render: function() {
    return (
      <div class="pomodoro">
        <NumberInput max={60} min={1} onUpdate={this.setBreakLength} value={this.state.breakLength} disabled={this.state.running}>
          <h3>Break Length</h3>
        </NumberInput>
        <NumberInput max={60} min={1} onUpdate={this.setSessionLength} value={this.state.sessionLength} disabled={this.state.running}>
          <h3>Session Length</h3>
        </NumberInput>
        <div className="countdown">
          <h2>{this.state.mode}</h2>
          <div className="time-remaining">{this.formatTime(this.state.timeRemaining)}</div>
          <button onClick={this.toggleTimer}>Start/Stop</button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <PomodoroClock initialSession="25" initialBreak="5" />,
  document.getElementById('content')
);
