var PomodoroClock = React.createClass({
  getInitialState: function() {
    return {
      sessionLength: this.props.initialSession,
      breakLength: this.props.initialBreak,
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
      <div>
        {this.state.mode}
        {this.formatTime(this.state.timeRemaining)}
        <button onClick={this.toggleTimer}>Start/Stop</button>
      </div>
    );
  }
});

ReactDOM.render(
  <PomodoroClock initialSession="25" initialBreak="5" />,
  document.getElementById('content')
);
