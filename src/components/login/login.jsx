import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl";
import Cookies from "js-cookie";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SubmitButton from "./button.jsx";

function TransitionUp(props) {
  return <Slide {...props} direction="down" />;
}
function Login(props)
{
let [open, setOpen] = useState(false)
let [submit, setSubmit] = useState(0)
function onClick()
{
var email = document.querySelector("#loginemail").value;
var pass = document.querySelector("#loginpass").value;

if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && pass.length>=8)
{
setSubmit(1)
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email, pass: pass}),
      };
      fetch(baseUrl+"api/login", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
             props.display("Logged In Successfully", "success")
             setSubmit(2)
            /*Do all other great stuffs.*/
            return response.json();
            }
   else if(response.status===600)
{
setSubmit(0)
props.display("Wrong Password!!", "error")
return;
}
   else if(response.status===610)
{
setSubmit(0)
props.display("Email Doesn't Exist!!", "error")
return;
}
else {
setSubmit(0)
   props.display("Server Error !! Please try again.", "error")
   return;
}
})
.then((data) => {
       if(data!==undefined)
       {
       if(document.querySelector("#login-checkbox").checked)
       Cookies.set('sessions', data,{ expires: 7 });
       else
       Cookies.set('sessions', data);
       
       fetch(baseUrl+"api/userData/"+Cookies.getJSON("sessions").id)
.then((responses) => responses.json())
.then((datas) => {
	Cookies.set("data",{name: datas.name,email: datas.email, upvotes: datas.upvoted, visited: datas.visited})
	window.open(props.link,"_self")
  })
 .catch(err => {
	 console.log(err)
	})
       }
})
        .catch((error) => {
        setSubmit(0)
        props.display("Server Error!! Please try again.." ,"error")        
})


}
else
{
setSubmit(0)
props.display("Wrong username or Password !!", "error")
}
}

function handleForgot(){
setOpen(true);
}

function handleClose(){
setOpen(false);
}

function handleForgotSubmit(e){
e.preventDefault();
var email = document.querySelector("#forgotemail").value;
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
{
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email}),
      };
 props.display("Querying!!", "info")
fetch(baseUrl+"api/forgot", requestOptions)
.then(response => {
if(response.status===200)
{
props.display("Reset Link Sent To Email", "success")
handleClose();
}
else if(response.status===310)
{
props.display("Email Doesn't Exist!!", "error")
}
else
{
props.display("Server Error", "error")
}
})

}
else
{
props.display("Invalid Email!!", "error")
}
}

return <form className="form-signin" action="" name="form">
          <label className = "login-label" for="email">Email</label>
          <input className="form-styling" type="email" id="loginemail" type="text" name="email" placeholder=""/>
          <label className = "login-label" for="password">Password</label>
          <input className="form-styling" type="password" id="loginpass" name="password" placeholder=""/>
          <input type="checkbox" id="login-checkbox" checked/>
          <label className = "login-label" for="login-checkbox" ><span className="ui"></span>Keep me signed in</label>
          <div className="btn-animate">
            <SubmitButton submit = {submit} onFormSubmit = {onClick} message = "Log In" successmess = "Logged In" progressmess = "Logging In"/>
          </div>
          <div>
          <div className="forgot">
        <span onClick = {handleForgot}>Forgot your password?</span>
      </div>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent= {TransitionUp}>
        <DialogTitle >Forgot Password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Email Address Linked with your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="forgotemail"
            label="Email Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </form>

}

export default Login;
