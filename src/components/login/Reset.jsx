import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Redirect} from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
import SubmitButton from "./button.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';


const TransitionLeft = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TransitionRight = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function Reset() {
  
  document.title = "Reset Your Password"
  const { Hash } = useParams();
  let [check, setCheck] = useState(0);
  let [invalid, setInvalid] = useState(false);
  let [success, setSuccess] = useState(false)
  let [fetchI, setFetch] = useState(true);
  let [sbutton, setsButton] = useState(0)

  if(invalid)
  {
  return <Redirect to = "/" />
  }
  
  if(success)
  {
  return <Redirect to = "/login" />
  }
  
  function resetCheck()
{
  fetch(baseUrl+"api/user/resetCheck/"+Hash)
      .then((response) => {
          if(response.status===204)
          {
          setCheck(1)
          setTimeout(()=>{setInvalid(true)}, 2000)
          }
          else if(response.status===202)
          {
          setCheck(2)//Success
          }
          else
          {
          setCheck(3)
          }
      })
}

  
  if(fetchI)
  {
		setFetch(false);
		resetCheck(Hash);
  }
   function handleClose(event, reason, value = 0){
   if (reason === 'clickaway') {
      return;
    }
    setCheck(value);
   }
   
   
   function Validate(){

return <Dialog
        open={check===0}
        TransitionComponent={TransitionRight}
        keepMounted
        onClose={()=>{handleClose(event, reason, 2)}}
      >
        <DialogTitle color="info">{"Validating Hash Code"}</DialogTitle>
        <DialogContent style={{textAlign: "center"}}>
           <CircularProgress color="warning" />
        </DialogContent>
      </Dialog>
}

function InvalidUrl()
{
return <Dialog
        open={check===1}
        TransitionComponent={TransitionLeft}
        keepMounted
        onClose={()=>{handleClose(event, reason, 1)}}
      >
        <DialogTitle style={{color: "red"}}>{"Invalid Hash"}</DialogTitle>
        <DialogContent>
           <DialogContentText style={{textAlign: "center"}}>
            Redirecting To HomePage...
          </DialogContentText>
        </DialogContent>
      </Dialog>
}

function ServerError()
{
return <Dialog
        open={check===3}
        TransitionComponent={TransitionLeft}
        keepMounted
        onClose={()=>{handleClose(event, reason, 0)}}
      >
        <DialogTitle style={{color: "red"}}>{"Server Error"}</DialogTitle>
        <DialogContent>
           <DialogContentText style={{textAlign: "center"}}>
            <Fab color="secondary">
						 <ReplayIcon onClick = {()=>{setCheck(0);resetCheck();}} />
						</Fab>
          </DialogContentText>
        </DialogContent>
      </Dialog>
}

   function ResetWindow()
	{

		let [message, setMessage] = useState({set: false, message: "Why so forgetful", severity: "warning"});
  
  function handleSClose(){
   setMessage((prevValue)=>{return {...prevValue, set: false}});
   }
  
  function display(message, severity){
  setMessage({set: true, message: message, severity: severity})
  setTimeout(handleSClose, 5000);
  }

		function handleSubmit()
		{
			var password = document.querySelector("#pass").value;
			var cpassword = document.querySelector("#cpass").value;
			if(password.length < 8)
			{
			display("Enter a strong password", "warning");
			}
			else if(password !=cpassword)
			{
			display("Both passwords doesn't match", "warning");
			}
			else
			{
			const requestOptions = {
				    method: "POST",
				    headers: { "Content-Type": "application/json" },
				    body: JSON.stringify({pass: password, hash: Hash}),
				  };
				  setsButton(1)
				  fetch(baseUrl+"api/reset", requestOptions)
				  .then(response => {
				  if(response.status===200)
				  {
				    setsButton(2)
				    display("Redirecting to Login Page", "info");
				    setTimeout(()=>{setSuccess(true)}, 2000)
	
				  }
				  else if(response.status===210)
				  {
				  display("Invalid Hash", "error")
				  setsButton(0)
				  }
				  else
				  {
				  display("Server Error. Please Try Again.","error")
				  setsButton(0)
				  }
				  })
			}
		}
		return <div><Dialog
        open={check===2}
        TransitionComponent={TransitionLeft}
        keepMounted
        onClose={handleClose}
      >
      <DialogContent style={{background: "linear-gradient(rgba(0,70,67,0.75),rgba(0,70,67,0.95))"}}>
		<div className = "reset-box">
		<div className = "reset-title">Reset Your Password</div>
		<label className = "login-label" for="pass">Password</label>
		<input className = "form-styling" id = "pass" type="password"/>
		<label className = "login-label" for = "cpass">Confirm Password</label>
		<input className = "form-styling" id="cpass" type="password"/>
		<SubmitButton submit = {sbutton} onFormSubmit = {handleSubmit} message = "Reset" successmess = "Resetted" progressmess = "Resetting"/>
		</div></DialogContent></Dialog><Snackbar 
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      TransitionComponent= {TransitionRight}
      open={message.set} onClose={handleSClose}>
				<Alert onClose={handleSClose} severity= {message.severity}>
					{message.message}
				</Alert>
			</Snackbar> </div>
	}
  
  return <div> <Validate /><InvalidUrl /><ServerError /><ResetWindow />
  </div>
}

export default Reset;
