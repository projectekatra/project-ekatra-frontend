import React,{useState} from "react"
import Cookies from "js-cookie"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {baseUrl} from "./baseUrl";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Link, Redirect} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Upvote(props){

let [upvotes,setUpvotes] = useState(props.upvote);
let [ishovered, setIshovered] = useState(false);
let [showBox, setshowBox] = useState(false);
let [redirect, setRedirect] = useState(false);
let [iconstatus,setIconStatus] = useState((Cookies.get("sessions")===undefined || Cookies.get("data")===undefined || Cookies.getJSON("data").upvotes===undefined)? false: Cookies.getJSON("data").upvotes.includes(props.id))

if(redirect)
return <Redirect  to={"/login/"+encodeURIComponent(window.location.href)} />

function DialogueBox(){

function handleDialogClose(){
setshowBox(false);
}

function handleOpenLink(){
     setRedirect(true)
}
return <Dialog 
					open = {showBox}
					TransitionComponent = {Transition}
					keepMounted
					onClose = {handleDialogClose}
					aria-labelledby = "login alert"
					>
					<DialogTitle id="alert-dialog-slide-title">{"You Aren't Logged In !!"}</DialogTitle>
					<DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to Login/SignUp to mark the content helpful?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenLink} color="primary">
            Yes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
}

function handleClick(){
if(Cookies.get("sessions")===undefined)
{
setshowBox(true);
}
else
{
if(Cookies.get("data")!==undefined)
{
var what_to_do = 1;
var userData_cookie = Cookies.getJSON("data");
if(userData_cookie.upvotes===undefined)
{
userData_cookie.upvotes = [props.id]
what_to_do = 1;
}
else
{
if(userData_cookie.upvotes.includes(props.id))
{
userData_cookie.upvotes.splice(userData_cookie.upvotes.indexOf(props.id),1);
what_to_do = -1
}
else
{
userData_cookie.upvotes.push(props.id)
what_to_do = 1;
}
}
setUpvotes((prevValue)=>prevValue+what_to_do)
Cookies.set("data", userData_cookie);
const to_pass = {id: props.id, value: what_to_do, userId: Cookies.getJSON("sessions").id}
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(to_pass)
      };
fetch(baseUrl+"api/upvote",requestOptions)
setIconStatus(Cookies.getJSON("data").upvotes.includes(props.id))
}
}
}
return <span><span onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
className="upvote-hover" style={{color: ishovered? "green": iconstatus ? "green" : "lightgrey", cursor: "pointer"}} onClick={handleClick}>Helpful <ThumbUpAltIcon />{" "}{upvotes}</span>{showBox? <DialogueBox /> : null}</span>
}


export default Upvote
