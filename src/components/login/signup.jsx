import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl"
import Cookies from "js-cookie";


function SignUp(props)
{

var [validity, setValidity] = useState({name: true,email: true, pass: true, cpass: true})
var [values, setValues] = useState({name: "",email: "",pass: "",cpass: ""})
var [message, setMessage] = useState({color: "#9da6e0",message: ""})

function validateName(e)
{
const letter = /^[A-Za-z ]+$/;
var name = e.target.value
var check = false;
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


function getMessage()
{
return <span style={{display: "block", marginTop: "60px", color: message.color, fontSize: "1rem", fontWeight: "bolder", fontFamily: "Montserrat"}}> {message.message} </span>
}
function handleSignUP(){
if(validity.email===true && (validity.pass===1 || validity.pass===2) && validity.name=== true && validity.cpass===true)
{
/*Insert the code for sign up here
If the email already exists then change the message to red and "Email already exists, consider logging in."
Else change the message to green and "Successful Registerd."
After login create a cookie with login detail and then redirect to given url or homepage/profile page when created.
*/
setMessage({color: "#9da6e0", message: "Signing Up..."})
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      fetch(baseUrl+"api/registration", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setMessage({color: "white",message: "Successfully registered."})
            return response.json();
            }
   else if(response.status===700)
{
setMessage({color: "#f7814a",message: "Email already exists!!"})
setTimeout(()=>{setMessage("")},4000)
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
       Cookies.set('sessions', data, { expires: 7 });
       fetch(baseUrl+"api/userData/"+Cookies.getJSON("sessions").id)
.then((responses) => responses.json())
.then((datas) => {
        document.querySelector(".success-signup").classList.add("success-signup-up");
	Cookies.set("data",{name: datas.name,email: datas.email, upvotes: datas.upvoted, visited: datas.visited})
	setTimeout(()=>{window.open(props.link,"_self")}, 2000);
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
setMessage({color: "#f7814a", message: "All fields should be filled correctly."})
setTimeout(()=>{setMessage("")},4000)
}
}

return <form className="form-signup" action="" name="form">
          <label className = "login-label" for="signupname">Name</label>
          <input className="form-styling" style={validity.name ? {color: "white", background: "rgba(255,255,255,0.3)"}: {color: "red", background: "rgba(255,0,0,0.1)"}} type="text" value={values.name} id="signupname" onChange = {validateName} placeholder=""/>
          <label className = "login-label" for="signupemail">Email</label>
          <input className="form-styling" style={validity.email ? {color: "white", background: "rgba(255,255,255,0.3)"}: {color: "red", background: "rgba(255,0,0,0.1)"}} type="email" value = {values.email} id = "signupemail"  placeholder="" onChange = {validateEmail} />
          <label className = "login-label" for="signuppass">Password</label>
          <input className="form-styling" style= {!validity.pass?{color: "red", background: "rgba(255,0,0,0.1)"}: validity.pass===2?{color: "blue"}:{color: "green"}} type="password" value = {values.pass} id="signuppass" placeholder="" onChange = {validatePassWord} />
          <label className = "login-label"  for="signupcpass">Confirm password</label>
          <input className="form-styling" style= {validity.cpass?{color: "green"}:{color: "red", background: "rgba(255,0,0,0.1)"}} type="password" value = {values.cpass} id = "signupcpass" placeholder="" onChange = {validateCPassWord}/>
          <a className="btn-signup" onClick = {handleSignUP} >Sign Up</a>
          {getMessage()}
          <div className = "success-signup">
          <span style={{color: "green", fontSize: "6rem"}}>&#10004;</span><br />
          <span>Signed Up Successfully</span><br />
          <span>Check Your Email for Verification Link.</span><br />
          <span>Redirecting ....</span>
          </div>
</form>
}

export default SignUp;
