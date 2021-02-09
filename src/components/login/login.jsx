import React,{useState} from "react";
import { baseUrl } from "../shared/baseUrl";
import Cookies from "js-cookie";

function Login(props)
{

var  [message, setMessage] = useState({color: "#9da6e0", message: ""})

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

return <form className="form-signin" action="" name="form">
          <label className = "login-label" for="email">Email</label>
          <input className="form-styling" type="email" id="loginemail" type="text" name="email" placeholder=""/>
          <label className = "login-label" for="password">Password</label>
          <input className="form-styling" type="password" id="loginpass" name="password" placeholder=""/>
          <input type="checkbox" id="login-checkbox"/>
          <label className = "login-label" for="login-checkbox" ><span className="ui"></span>Keep me signed in</label>
          <div className="btn-animate">
            <a className="btn-signin" onClick = {onClick}>Sign in</a>
          </div>
          <div style={{marginTop: "85px"}}>
          <div style={{fontSize: "1rem",color: message.color, fontWeight: "bolder", fontFamily: "Montserrat"}}> {message.message} </div>
          <div className="forgot">
        <a href="#">Forgot your password?</a>
      </div>
      </div>
      </form>

}

export default Login;
