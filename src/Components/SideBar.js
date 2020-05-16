import React from "react";

function SideBar({ onItemClick }) {
  let myLocalStorageArray = Object.values(localStorage);
  myLocalStorageArray = myLocalStorageArray.map((item) => JSON.parse(item));
  return (
    <div>
      <h5>Recent Calculations</h5>
      <br></br>
      {myLocalStorageArray.map((item, index) => (
        <div
          className="itemWrapper"
          key={index}
          onClick={() => onItemClick(item)}
        >{`Loan Amount : ${item.loanAmount}, Duration : ${item.duration}`}</div>
      ))}
    </div>
  );
}

export default SideBar;
