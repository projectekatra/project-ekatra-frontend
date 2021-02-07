import React, { useState } from "react";
import Container from "./Container";
import Error from "./ErrorMessage";
import Success from "./uploading";
function Contribute() {
 document.title="Contribute | Project Ekatra"
 
  const [message, setMessage] = useState({set: false,message: "",background: "#ff8b8b",color: "red"});
  const [showupload, setShowupload] = useState(false);
  return (
    <div className="contribute_main_container">   
{message.set && (
        <Error
          message={message}
          onClicked={() => {
            setMessage((prevValue) => {return {...prevValue,set: false}})
          }}
        />
      )}
      <Container
        onSubmission={(value) => {
          setMessage({message: value.message,set: value.set, background: value.background, color: value.color})
          setTimeout(() => setMessage((prevValue) => {return {...prevValue,set: false}}), 10000);
        
        }}
        onSuccess={(value) => {
          setShowupload(value);
        }}
      />
      {showupload && <Success />}
    </div>
  );
}

export default Contribute;

