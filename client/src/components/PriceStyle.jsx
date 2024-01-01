import React from "react";

const PriceStyle = ({ price, hidedecimals }) => {
  return (
    <>
      {hidedecimals
        ? price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })
        : price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR"
          })}
    </>
  );
};
export default PriceStyle;
