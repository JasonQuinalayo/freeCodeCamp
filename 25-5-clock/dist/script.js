class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      inSession: true,
      start: false,
      timeLeft: 1500 };

    this.break = this.break.bind(this);
    this.session = this.session.bind(this);
    this.timer = this.timer.bind(this);
    this.icons = this.icons.bind(this);
    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.countDown = null;
    this.sessionToBreak = this.sessionToBreak.bind(this);
    this.breakToSession = this.breakToSession.bind(this);
    this.checkTime = this.checkTime.bind(this);
  }

  break() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "break" }, /*#__PURE__*/
      React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { id: "break-incdec" }, /*#__PURE__*/
      React.createElement("i", { onClick: this.incrementBreak, class: "glyphicon glyphicon-arrow-up", id: "break-increment" }), /*#__PURE__*/
      React.createElement("h2", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("i", { onClick: this.decrementBreak, class: "glyphicon glyphicon-arrow-down", id: "break-decrement" }))));



  }

  session() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "session" }, /*#__PURE__*/
      React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { id: "session-incdec" }, /*#__PURE__*/
      React.createElement("i", { onClick: this.incrementSession, class: "glyphicon glyphicon-arrow-up", id: "session-increment" }), /*#__PURE__*/
      React.createElement("h2", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("i", { onClick: this.decrementSession, class: "glyphicon glyphicon-arrow-down", id: "session-decrement" }))));



  }

  timer() {
    const sessionLabel = /*#__PURE__*/React.createElement("h2", { id: "timer-label" }, "Session");
    const breakLabel = /*#__PURE__*/React.createElement("h2", { id: "timer-label" }, "Break");
    let timeLeft = Math.floor(this.state.timeLeft / 60).toString().padStart(2, '0') + ':' + (this.state.timeLeft % 60).toString().padStart(2, '0');
    return /*#__PURE__*/(
      React.createElement("div", { id: "timer" },
      this.state.inSession ?
      sessionLabel :
      breakLabel, /*#__PURE__*/
      React.createElement("h1", { id: "time-left" }, timeLeft)));


  }

  icons() {
    const start = /*#__PURE__*/React.createElement("i", { onClick: this.start, id: "start_stop", class: "glyphicon glyphicon-play" });
    const stop = /*#__PURE__*/React.createElement("i", { onClick: this.stop, id: "start_stop", class: "glyphicon glyphicon-pause" });
    return /*#__PURE__*/(
      React.createElement("div", { id: "icons" },
      this.state.start ? stop : start, /*#__PURE__*/
      React.createElement("i", { id: "reset", class: "glyphicon glyphicon-step-backward", onClick: this.reset })));


  }

  reset() {
    clearInterval(this.countDown);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      inSession: true,
      start: false,
      timeLeft: 1500 });

  }

  incrementBreak() {
    if (!this.state.start && this.state.breakLength > 1 && this.state.breakLength < 60) {
      this.setState(state => ({
        breakLength: state.breakLength + 1 }));

    }
  }

  incrementSession() {
    if (!this.state.start && this.state.sessionLength > 1 && this.state.sessionLength < 60) {
      this.setState(state => ({
        sessionLength: state.sessionLength + 1,
        timeLeft: (state.sessionLength + 1) * 60 }));

    }
  }

  decrementBreak() {
    if (!this.state.start && this.state.breakLength > 1 && this.state.breakLength < 60) {
      this.setState(state => ({
        breakLength: state.breakLength - 1 }));

    }
  }

  decrementSession() {
    if (!this.state.start && this.state.sessionLength > 1 && this.state.sessionLength < 60) {
      this.setState(state => ({
        sessionLength: state.sessionLength - 1,
        timeLeft: (state.sessionLength - 1) * 60 }));

    }
  }

  start() {
    this.setState(state => ({
      start: true }));

    this.countDown = setInterval(() => {
      this.setState(state => ({
        timeLeft: state.timeLeft - 1 }));
      this.checkTime();}, 1000);
  }

  stop() {
    clearInterval(this.countDown);
    this.setState(state => ({
      start: false }));

  }

  sessionToBreak() {
    this.stop();
    this.setState(state => ({
      inSession: false,
      timeLeft: state.breakLength * 60 }));

    this.start();
  }

  breakToSession() {
    this.stop();
    this.setState(state => ({
      inSession: true,
      timeLeft: state.sessionLength * 60 }));

    this.start();
  }

  checkTime() {
    if (this.state.timeLeft < 0) {
      this.audioBeep.play();
      if (this.state.inSession) {
        this.sessionToBreak();
      } else {
        this.breakToSession();
      }
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "app" }, /*#__PURE__*/
      React.createElement("div", { id: "title" }, /*#__PURE__*/React.createElement("h1", null, "25 + 5 Clock")), /*#__PURE__*/
      React.createElement("div", { id: "session-break" },
      this.break(),
      this.session()),

      this.timer(),
      this.icons(), /*#__PURE__*/
      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        },
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));


  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));