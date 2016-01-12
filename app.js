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
  setTimer: function(numMinutes) {
    this.setState({
      timeRemaining: 60 * numMinutes
    });
  },
  componentDidMount: function() {
    this.setTimer(this.state.sessionLength);
  },
  render: function() {
    return (
      <div>
        {this.state.timeRemaining}
      </div>
    );
  }
});

ReactDOM.render(
  <PomodoroClock initialSession="25" initialBreak="5" />,
  document.getElementById('content')
);
