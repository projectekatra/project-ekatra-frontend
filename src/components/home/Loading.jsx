import React from "react";

function Loading() {
  return (
    <div className="d-flex justify-content-center" style={{marginTop:"10px", marginBottom: "10px"}}>
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
