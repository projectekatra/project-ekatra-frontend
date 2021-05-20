import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import SignUp from "./signup"
import Login from "./login"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

function ContentMain()
{
document.title = "Login/SignUp | Project Ekatra"
const { Linked } = useParams();

var  [message, setMessage] = useState({set: false, message: "Join The Army", severity: "info"})

 function handleClose(event, reason) {
  if (reason === 'clickaway') {
      return;
    }
  setMessage((prevValue) => {return {...prevValue, set: false}});  
  }

function display(message, severity){
  setMessage({set: true, message: message, severity: severity})
  setTimeout(handleClose, 5000);
  }
  
 

function changeTabs(e)
{
document.querySelector(".form-signin").classList.toggle("form-signin-left");
document.querySelector(".form-signup").classList.toggle("form-signup-left");
document.querySelector(".login-frame").classList.toggle("frame-long");
document.querySelector(".signup-inactive").classList.toggle("signup-active");
document.querySelector(".signin-active").classList.toggle("signin-inactive");
document.querySelector(".forgot").classList.toggle("forgot-left");
e.target.classList.remove("idle");
e.target.classList.add("active");
}

return <div className= "login-main">
<div className="login-box">
<div className="login-container">
  <div className="login-frame">
    <div className="login-nav">
      <ul className="login-links">
        <li className="signin-active"><a className="btn" onClick={changeTabs}>Sign in</a></li>
        <li className="signup-inactive"><a className="btn" onClick={changeTabs}>Sign up </a></li>
      </ul>
    </div>
    <div>
    <Login link={Linked===undefined ? '/' : decodeURIComponent(Linked)} display = {display} />
    <SignUp link={Linked===undefined ? '/' : decodeURIComponent(Linked)} display= {display}/>			        
  </div>
</div>
</div>
</div>
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
</div>
}

export default ContentMain;
