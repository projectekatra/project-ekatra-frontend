import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl";
import Cookies from "js-cookie";

function Login(props)
{

var  [message, setMessage] = useState({color: "#9da6e0", message: ""})
var [forgotmessage, setForgotMessage] = useState({color: "blue", message: ""})
function onClick()
{
var email = document.querySelector("#loginemail").value;
var pass = document.querySelector("#loginpass").value;
setMessage({color: "#9da6e0",message: "Logging In..."})
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && pass.length>=8)
{
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email, pass: pass}),
      };
      fetch(baseUrl+"api/login", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setMessage({color: "white",message: "Logged In Successfully."})
            /*Do all other great stuffs.*/
            return response.json();
            }
   else if(response.status===600)
{
setMessage({color: "#f7814a",message: "Wrong Password!!"})
return;
}
   else if(response.status===610)
{
setMessage({color: "#f7814a",message: "Email Doesn't Exist!!"})
return;
}
else {
   setMessage({color: "#f7814a", message: "Server Error!! Please try again."})
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
        setMessage({color: "#f7814a", message: "Server Error!! Please try again."})          
})


}
else
{
setMessage({color: "#f7814a",message: "Wrong username or Password!!"})
setTimeout(()=>{setMessage("")},4000)
}
}

function handleForgot(){
document.querySelector(".forgot-box-top").classList.toggle("forgot-box-bottom")
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
fetch(baseUrl+"api/forgot", requestOptions)
.then(response => {
if(response.status===200)
{
setForgotMessage({message: "Activation Link Sent to Email",color: "blue"})
setTimeout(()=>{document.querySelector(".forgot-box-top").classList.toggle("forgot-box-bottom");
document.querySelector("#forgotemail").value = "";
setForgotMessage({message: "", color: "blue"});
}, 2000)
}
else if(response.status===310)
{
setForgotMessage({message: "Email Doesn't Exist!!", color: "red"})
setTimeout(()=>{setForgotMessage({message: "", color: "blue"})}, 5000)
}
else
{
setForgotMessage({message: "Server Error!!", color: "red"})
setTimeout(()=>{setForgotMessage({message: "", color: "blue"})}, 5000)
}
})

}
else
{
setForgotMessage({message: "Invalid Email!!",color: "red"})
setTimeout(()=>{setForgotMessage({message: "", color: "blue"})}, 5000)
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
            <a className="btn-signin" onClick = {onClick}>Sign in</a>
          </div>
          <div style={{marginTop: "85px"}}>
          <div style={{fontSize: "1rem",color: message.color, fontWeight: "bolder", fontFamily: "Montserrat"}}> {message.message} </div>
          <div className="forgot">
        <span onClick = {handleForgot}>Forgot your password?</span>
      </div>
      </div>
      <div className = "forgot-box-top">
      <h2>Forgot Your Password?</h2>
      <span>Enter Your Registered Email Id:</span>
      <input type="email" id="forgotemail"/>
      <button onClick = {handleForgotSubmit}>Submit</button><span style={{color: forgotmessage.color, display: "inline"}}>{forgotmessage.message}</span>
      </div>
      </form>

}

export default Login;
