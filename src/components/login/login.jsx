import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl";
import Cookies from "js-cookie";

function Login(props)
{

var  [message, setMessage] = useState({color: "blue", message: ""})

function onClick()
{
var email = document.querySelector("#loginemail").value;
var pass = document.querySelector("#loginpass").value;
setMessage({color: "blue",message: "Logging In..."})
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
            setMessage({color: "green",message: "Logged In Successfully."})
            /*Do all other great stuffs.*/
            return response.json();
            }
   else if(response.status===600)
{
setMessage({color: "red",message: "Wrong Password!!"})
return;
}
   else if(response.status===610)
{
setMessage({color: "brown",message: "Email Doesn't Exist!!"})
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
       Cookies.set('sessions', data,{ expires: 7 });
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
setMessage({color: "red",message: "Wrong username or Password!!"})
setTimeout(()=>{setMessage("")},4000)
}
}

return <div class="login">
		<div class="center">
			<h2 class="form-title" id="login"><span>or</span>Log in</h2>
			<div class="form-holder">
				<input type="email" id="loginemail" class="input" placeholder="Email" />
				<input type="password" id="loginpass" class="input" placeholder="Password" />
			</div>
			<button class="submit-btn" onClick = {onClick}>Log in</button>
			<span style={{display: "block", color: message.color, fontSize: "0.8rem", fontWeight: "bolder", fontFamily: "Montserrat"}}> {message.message} </span>
		</div>
	</div>

}

export default Login;
