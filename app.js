var PomodoroClock = React.createClass({
  getInitialState: function() {
    return {
      sessionLength: this.props.initialSession,
      breakLength: this.props.initialBreak
    };
  },
  render: function() {
    return (
      <div>
        TEST
      </div>
    );
  }
});

ReactDOM.render(
  <PomodoroClock initialSession="25" initialBreak="5" />,
  document.getElementById('content')
);
