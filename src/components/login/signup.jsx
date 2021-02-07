import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl"
import Cookies from "js-cookie";


function SignUp(props)
{

var [validity, setValidity] = useState({name: "",email: "",pass: "",cpass: ""})
var [values, setValues] = useState({name: "",email: "",pass: "",cpass: ""})
var [message, setMessage] = useState({color: "blue",message: ""})

function validateName(e)
{
const letter = /^[A-Za-z ]+$/;
var name = e.target.value
var check = false
if(name.match(letter) && name.length>0)
{
check = true;
}
setValidity(prevValue=>{return {...prevValue, name: check}})
setValues(prevValue=>{return {...prevValue, name: name}})
}

function validateEmail(e)
{
var email = e.target.value
var check = false
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
  check = true;
  }
  setValidity(prevValue=>{return {...prevValue, email: check}})
setValues(prevValue=>{return {...prevValue, email: email}})
}

function validatePassWord(e)
{
var pass = e.target.value;
var check = false;
if(pass.length>=8)
{
if(pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) && pass.match(/[0-9]/) && pass.match(/[A-Z]/) && pass.match(/[a-z]/))
{
check  = 1;
}
else
{
check = 2;
}
if(validity.cpass!=="" && pass!==document.querySelector("#signupcpass"))
{
setValidity(prevValue=>{return {...prevValue, cpass: false}})
}
}
setValidity(prevValue=>{return {...prevValue, pass: check}})
setValues(prevValue=>{return {...prevValue, pass: pass}})
}

function validateCPassWord(e)
{
var cpass = e.target.value;
var check = false;
var pass = document.querySelector("#signuppass").value;

if(cpass===pass)
{
check= true;
}
setValidity(prevValue=>{return {...prevValue, cpass: check}})
setValues(prevValue=>{return {...prevValue, cpass: cpass}})
}

function forValidity(param)
{
   if(validity[param]===false)
   {
      return <span style={{color: "red",marginRight: "10px",marginTop: "5px",fontSize: ".8rem"}}>&#10008;</span>;
   }
   else if(validity[param]===true)
   {
   return <span style={{color: "green",marginRight: "10px",marginTop: "7px",fontSize: ".6rem"}}>&#10004;</span>;
   }
   else
   {
   return;
   }
}

function forPassValidity()
{
if(validity.pass=== 1)
{
return <span style={{color: "green",marginRight: "10px",marginTop: "5px",fontSize: ".6rem"}}>&#10004;</span>;
}
else if(validity.pass===2)
{
return <span style={{color: "yellow",marginRight: "10px",marginTop: "5px",fontSize: ".8rem"}}>&#10020;</span>
}
else if(validity.pass===false)
{
return <span style={{color: "red",marginRight: "10px",marginTop: "5px",fontSize: ".8rem"}}>&#10008;</span>
}
else
{
return;
}
}
function getMessage()
{
return <span style={{display: "block", color: message.color, fontSize: "0.8rem", fontWeight: "bolder", fontFamily: "Montserrat"}}> {message.message} </span>
}
function handleSignUP(){
if(validity.email===true && (validity.pass===1 || validity.pass===2) && validity.name=== true && validity.cpass===true)
{
/*Insert the code for sign up here
If the email already exists then change the message to red and "Email already exists, consider logging in."
Else change the message to green and "Successful Registerd."
After login create a cookie with login detail and then redirect to given url or homepage/profile page when created.
*/
setMessage({color: "blue", message: "Signing Up..."})
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      fetch(baseUrl+"api/registration", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setMessage({color: "green",message: "Successfully registered."})
            return response.json();
            }
   else if(response.status===700)
{
setMessage({color: "red",message: "Email already exists!!"})
return;
}     
else {
   setMessage({color: "red", message: "Server Error!! Please try again."})
   return;
}
})
.then((data) => {
       if(data!==undefined)
       {
       Cookies.set('sessions', data, { expires: 7 });
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
        setMessage({color: "red", message: "Server Error!! Please try again."})          
})
}
else
{
setMessage({color: "red", message: "All fields should be filled correctly."})
}
}

return <div class="signup slide-up">
		<h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
		<div class="form-holder">
		    <span className="block-input">
			<input type="text" value={values.name} id="signupname" class="input" placeholder="Name" onChange = {validateName} /> {forValidity("name")} </span>
			<span className="block-input">
			<input type="email" value = {values.email} id = "signupemail" class="input" placeholder="Email" onChange = {validateEmail} /> {forValidity("email")} </span>
			<span className="block-input">
			<input type="password" value = {values.pass} id="signuppass" class="input" placeholder="Password" onChange = {validatePassWord} />{forPassValidity()}</span>
			<span className="block-input">
			<input type="password" value = {values.cpass} id = "signupcpass" class="input" placeholder="Confirm Password" onChange = {validateCPassWord} />{forValidity("cpass")}</span>
		</div>
		<button class="submit-btn" onClick = {handleSignUP}>Sign up</button>
		{getMessage()}
	</div>
}

export default SignUp;
