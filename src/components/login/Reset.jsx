import React, {useState} from "react";
import {useParams} from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";


function Reset() {
  
  const { Hash } = useParams();
  let [check, setCheck] = useState(0);
  if(check===0)
  {
  fetch(baseUrl+"api/user/resetCheck/"+Hash)
      .then((response) => {
          if(response.status===204)
          {
          setCheck(1)
          setTimeout(()=>{ window.open("https://projectekatra.github.io/", "_self");}, 1000)
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
   
   
   
   function ResetWindow()
{

let [disable, setDisable] = useState(true)
let [message, setMessage] = useState({message: "", color: "white"});
function handleCpassChange(e){
if(document.querySelector("#pass").value.length>0 && document.querySelector("#pass").value===e.target.value)
setDisable(false)
else
setDisable(true)
}

function handleSubmit()
{
	var password = document.querySelector("#pass").value;
	const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({pass: password, hash: Hash}),
      };
      fetch(baseUrl+"api/reset", requestOptions)
      .then(response => {
      if(response.status===200)
      {
      	setMessage({message: "Password Reset Successful!!", color: "rgba(255,255,255,0.8)"})
      	setTimeout(()=>{setMessage({message: "Redirecting to Login Page", color: "rgba(255,255,255,0.8)"}); window.open("https://projectekatra.github.io/#/login","_self")}, 2000)     
      }
      else if(response.status===210)
         setMessage({message: "Invalid Hash", color: "#5e0d19"})
      else
      {
      setMessage({message: "Server Error! Please Try Again!!", color: "#5e0d19"})
      }
      })
	
}
return <div className = "reset-main-box"><div className = "reset-box">
<label className = "login-label" for="pass">Password</label>
<input className = "form-styling" id = "pass" type="password"/>
<label className = "login-label" for = "cpass">Confirm Password</label>
<input className = "form-styling" id="cpass" type="password" onChange = {handleCpassChange}/>
<div className = "btn-signup reset-submit-button" style={disable?{opacity: "0.5",pointerEvents: "none"}:null} onClick = {handleSubmit}>Submit</div>
<span style={{color: message.color}}>{message.message}</span>
</div></div>
}



  
  return <div>{check===0 ? <div style={{color: "black"}}>Validating</div>:check===1?<div><div style={{color: "red"}}>Invalid Url!!</div>Redirecting to projectekatra.github.io</div>:check===3?<div style={{color: "red"}}>Server Error!! Please Try Again Later</div>:<ResetWindow /> }</div>
}

export default Reset;
