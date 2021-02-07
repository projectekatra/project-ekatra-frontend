import React,{useState} from "react"
import Cookies from "js-cookie"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {baseUrl} from "./baseUrl"
import {Link} from "react-router-dom";

function Upvote(props){

let [upvotes,setUpvotes] = useState(props.upvote);
let [ishovered, setIshovered] = useState(false);
let [showBox, setshowBox] = useState(false);
let [iconstatus,setIconStatus] = useState((Cookies.get("sessions")===undefined || Cookies.get("data")===undefined || Cookies.getJSON("data").upvotes===undefined)? false: Cookies.getJSON("data").upvotes.includes(props.id))


function DialogueBox(){
return <span className="upvote-login-box"><span style={{fontSize: "2rem", position: "absolute", top: "10px", right: "10px", color: "#184d47"}} onClick={()=> {setshowBox(false)}}>&#10006;</span><Link to ={"/login/"+encodeURIComponent(window.location.href)} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "1.2rem", color: "#7c9473"}}>Login/SignUp</Link></span>
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
Cookies.set("data", userData_cookie);
const to_pass = {id: props.id, value: what_to_do, userId: Cookies.getJSON("sessions").id}
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(to_pass)
      };
fetch(baseUrl+"api/upvote",requestOptions)
.then((response)=> {setUpvotes((prevValue)=>prevValue+what_to_do)})
.catch(error=>{console.log(error)})
setIconStatus(Cookies.getJSON("data").upvotes.includes(props.id))
}
}
}
return <span><span onMouseEnter={() => setIshovered(true)}
        onMouseLeave={() => setIshovered(false)}
className="upvote-hover" style={{color: ishovered? "green": iconstatus ? "green" : "lightgrey", cursor: "pointer"}} onClick={handleClick}>Helpful <ThumbUpAltIcon />{" "}{upvotes}</span>{showBox? <DialogueBox /> : null}</span>
}


export default Upvote
