import React, { Component } from "react";
import "./App.css";
import DisplayComponent from "./Components/DisplayComponent";
import SideBar from "./Components/SideBar";
import { Container, Row, Col } from "react-bootstrap";

class App extends Component {
  state = {
    value: 500,
    loanAmount: "",
    duration: "",
    interestRate: null,
    monthlyPayment: null,
    display: false,
    localStorageItemId: 0,
  };

  componentDidMount = () => {
    let myArray = Object.keys(localStorage);
    myArray = myArray.map((item) => +item);
    let maxVal;
    if (myArray.length > 0) {
      maxVal = Math.max(...myArray);
    }
    this.setState({
      localStorageItemId: maxVal !== undefined ? maxVal + 1 : 1,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    let myArray = Object.keys(localStorage);
    if (myArray.length > 5) {
      myArray = myArray.map((item) => +item);
      let minVal = Math.min(...myArray);
      localStorage.removeItem(minVal.toString());
    }

    if (
      this.state.loanAmount >= 500 &&
      this.state.loanAmount <= 5000 &&
      this.state.duration >= 6 &&
      this.state.duration <= 24
    ) {
      if (
        (this.state.duration === prevState.duration &&
          this.state.loanAmount !== prevState.loanAmount) ||
        (this.state.duration !== prevState.duration &&
          this.state.loanAmount === prevState.loanAmount)
      ) {
        fetch(
          `https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanAmount}&numMonths=${this.state.duration}`
        )
          .then((result) => result.json())
          .then((result) => {
            const monthlyPayment =
              result.monthlyPayment.amount + result.monthlyPayment.currency;
            this.setState({
              interestRate: result.interestRate,
              monthlyPayment: monthlyPayment,
              display: true,
              localStorageItemId: this.state.localStorageItemId + 1,
            });
            const item = {
              itemId: this.state.localStorageItemId,
              loanAmount: this.state.loanAmount,
              duration: this.state.duration,
              interestRate: result.interestRate,
              monthlyPayment: monthlyPayment,
            };
            if (
              this.state.duration >= 6 &&
              this.state.duration <= 24 &&
              this.state.loanAmount >= 500 &&
              this.state.loanAmount <= 5000
            ) {
              localStorage.setItem(
                this.state.localStorageItemId,
                JSON.stringify(item)
              );
            }
          });
      }
    } else {
      if (
        this.state.loanAmount < 500 ||
        this.state.loanAmount > 5000 ||
        this.state.duration < 6 ||
        this.state.duration > 24
      ) {
        if (this.state.display === true) {
          this.setState({
            display: false,
          });
        }
      }
    }
  };

  onSliderChange = (value) => {
    this.setState({
      value,
      loanAmount: value,
    });
  };

  onDurationChange = (duration) => {
    this.setState({
      duration,
    });
  };

  onAmountChange = (amount) => {
    this.setState({
      loanAmount: amount,
    });
  };

  onItemClick = (item) => {
    this.setState({
      loanAmount: item.loanAmount,
      duration: item.duration,
      display: true,
      interestRate: item.interestRate,
      monthlyPayment: item.monthlyPayment,
      itemId: item.itemId,
    });
  };

  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col xs="3" md="2" lg="2">
              <SideBar onItemClick={this.onItemClick} />
            </Col>
            <Col xs="9" md="10" lg="10">
              <DisplayComponent
                onSliderChange={this.onSliderChange}
                value={this.state.value}
                loanAmount={this.state.loanAmount}
                duration={this.state.duration}
                onDurationChange={this.onDurationChange}
                onAmountChange={this.onAmountChange}
                interestRate={this.state.interestRate}
                monthlyPayment={this.state.monthlyPayment}
                display={this.state.display}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
