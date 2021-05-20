import React, { useState } from "react";
import Container from "./Container";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';


function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}


function Contribute() {
 document.title="Contribute | Project Ekatra"
 
  const [message, setMessage] = useState({set: false,message: "69 days to 4/20",severity: "info"});
  
  function handleClose(event, reason) {
  if (reason === 'clickaway') {
      return;
    }
  setMessage((prevValue) => {return {...prevValue, set: false}});  
  }
  return (
    <div className="contribute_main_container">
      <Snackbar 
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      TransitionComponent= {TransitionLeft}
      open={message.set} onClose={handleClose}>
				<Alert onClose={handleClose} severity= {message.severity}>
					{message.message}
				</Alert>
			</Snackbar>      
      <Container
        onSubmission={(value) => {
          setMessage({message: value.message, set: value.set, severity: value.severity})
          setTimeout(()=>{setMessage(prevValue => {return {...prevValue, set: false}})}, 5000)
        }}
      />
    </div>
  );
}

export default Contribute;

