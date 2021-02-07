import React from "react";

function Error(props) {
  return (
    <div className="error_message" style={{background: props.message.background,
  color: props.message.color}}>
      <span style={{ margin: "10px auto 10px 20px" }}>{props.message.message}</span>
      <span
        style={{ margin: "10px 20px 10px auto" }}
        className="close"
        onClick={props.onClicked}
      >
        {" "}
        ✖
      </span>
    </div>
  );
}

export default Error;
