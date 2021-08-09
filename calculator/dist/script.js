import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const OPERATORS = ['+', '-', '/', '*'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      decimal: false,
      expression: '',
      operator: '' };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    switch (event.target.value) {
      case 'number':
        if (OPERATORS.indexOf(this.state.input) !== -1) {
          this.setState(state => ({
            input: event.target.innerText,
            decimal: state.decimal,
            expression: state.expression + state.operator,
            operator: '' }));

        } else {
          if (this.state.input !== '0') {
            this.setState(state => ({
              input: state.input + event.target.innerText,
              decimal: state.decimal,
              expression: state.expression,
              operator: state.operator }));

          } else {
            if (event.target.innerText !== '0') {
              this.setState(state => ({
                input: event.target.innerText,
                decimal: state.decimal,
                expression: state.expression,
                operator: state.operator }));

            }
          }
        }
        break;
      case 'operator':
        if (this.state.expression === '' || OPERATORS.indexOf(this.state.input) === -1) {
          this.setState(state => ({
            input: event.target.innerText,
            decimal: false,
            expression: state.expression + state.input,
            operator: event.target.innerText }));

        } else {
          if (this.state.operator.length >= 2) {
            this.setState(state => ({
              input: event.target.innerText,
              decimal: state.decimal,
              expression: state.expression,
              operator: event.target.innerText }));

          } else if (this.state.operator.length === 1) {
            if (event.target.innerText === '-') {
              this.setState(state => ({
                input: event.target.innerText,
                decimal: state.decimal,
                expression: state.expression,
                operator: state.operator + event.target.innerText }));

            } else {
              this.setState(state => ({
                input: event.target.innerText,
                decimal: state.decimal,
                expression: state.expression,
                operator: event.target.innerText }));

            }
          } else {
            this.setState(state => ({
              input: event.target.innerText,
              decimal: state.decimal,
              expression: state.expression,
              operator: event.target.innerText }));

          }
        }
        break;
      case 'clear':
        this.setState({
          input: '0',
          decimal: false,
          expression: '',
          operator: '' });

        break;
      case 'decimal':
        if (!this.state.decimal) {
          this.setState(state => ({
            input: state.input + '.',
            decimal: true,
            expression: state.expression,
            operator: state.operator }));

        }
        break;
      case 'equals':
        let value = eval(this.state.expression + this.state.input);
        this.setState(state => ({
          input: value,
          decimal: false,
          expression: '' }));

        break;
      default:
        console.log('error');}

  }

  buttons() {
    const numerals = [['seven', '7'], ['eight', '8'], ['nine', '9'], ['four', '4'], ['five', '5'], ['six', '6'], ['one', '1'], ['two', '2'], ['three', '3']];
    const numeralsButtons = numerals.map((a) => /*#__PURE__*/
    React.createElement("button", {
      key: a[1],
      onClick: this.handleClick,
      value: "number",
      id: a[0],
      className: "regularButton" },

    a[1]));


    return /*#__PURE__*/(
      React.createElement("div", { id: "buttons" }, /*#__PURE__*/
      React.createElement("div", { id: "buttonblock1" }, /*#__PURE__*/
      React.createElement("button", {
        id: "clear",
        value: "clear",
        className: "horizontalBig",
        onClick: this.handleClick }, "AC"), /*#__PURE__*/



      React.createElement("button", {
        id: "divide",
        value: "operator",
        className: "regularButton",
        onClick: this.handleClick }, "/"),



      numeralsButtons, /*#__PURE__*/
      React.createElement("button", {
        id: "zero",
        value: "number",
        onClick: this.handleClick,
        className: "horizontalBig" }, "0"), /*#__PURE__*/



      React.createElement("button", {
        id: "decimal",
        value: "decimal",
        className: "regularButton",
        onClick: this.handleClick }, ".")), /*#__PURE__*/




      React.createElement("div", { id: "buttonblock2" }, /*#__PURE__*/
      React.createElement("button", {
        id: "multiply",
        value: "operator",
        className: "regularButton",
        onClick: this.handleClick }, "*"), /*#__PURE__*/



      React.createElement("button", {
        id: "subtract",
        value: "operator",
        className: "regularButton",
        onClick: this.handleClick }, "-"), /*#__PURE__*/



      React.createElement("button", {
        id: "add",
        value: "operator",
        className: "regularButton",
        onClick: this.handleClick }, "+"), /*#__PURE__*/



      React.createElement("button", {
        id: "equals",
        value: "equals",
        onClick: this.handleClick }, "="))));






  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "main" }, /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.state.input),
      this.buttons()));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));