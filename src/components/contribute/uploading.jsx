import React from "react";

function Uploading() {
  return (
   <div style={{ position: 'fixed',backgroundColor: "rgba(0,0,0, .5)", width: "100%",height: "100%"}}>
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0.3em 0.3em 1em rgba(256, 256, 256, .15)",
        textAlign: "center",
        width: "410px",
        height: "220px",
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-110px",
        marginLeft: "-200px"
      }}
    >
      <img src="images/uploading.gif" alt="Uploading"
        style={{
          height: "200px",
          margin: "20px auto"
        }}
      />
   </div>
</div>
  );
}

export default Uploading;

