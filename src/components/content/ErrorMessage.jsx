import React from "react";

function Error(props) {
  return (
    <div className="error_message" style={{background: "white", border: "1px solid red",
  color: "red", position: "absolute", top: "5px", left: "50%",transform: "translateX(-50%)", width: "250px", height: "45px"}}>
      <span style={{ margin: "10px auto 10px 20px" }}>{"There is an Error"}</span>
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
