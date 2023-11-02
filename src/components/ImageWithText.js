import React from "react";

const ImageWithText = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={props.src} alt="imageWithText" style={{ width: "50%" }} />
      <p className="mt-5 text-responsive text-center font-desire display-1">{props.text}</p>
    </div>
  );
};

export default ImageWithText;
