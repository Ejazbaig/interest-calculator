import React from "react";
import { Input } from "rsuite";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function DisplayComponent({
  onSliderChange,
  value,
  loanAmount,
  onDurationChange,
  onAmountChange,
  interestRate,
  monthlyPayment,
  display,
  duration,
}) {
  return (
    <div>
      <Input
        className="inputBox"
        placeholder="Enter the loan amount"
        value={loanAmount}
        onChange={onAmountChange}
      />
      <Input
        className="inputBox"
        placeholder="Enter duration"
        value={duration}
        onChange={onDurationChange}
      />
      <div className="mySlider">
        <Slider
          value={value}
          min={500}
          max={5000}
          step={100}
          onChange={onSliderChange}
        />
      </div>
      <p className={display ? "displayP" : "hiddenP"}>
        interest rate : ${interestRate} , monthly payment : ${monthlyPayment}
      </p>
    </div>
  );
}

export default DisplayComponent;
