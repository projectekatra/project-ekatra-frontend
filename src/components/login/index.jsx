import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import SignUp from "./signup"
import Login from "./login"

function ContentMain()
{


document.title = "Login/SignUp | Project Ekatra"
const { Linked } = useParams();

useEffect(()=>{
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});
})

return <div className= "login-main">
<Link className="navbar-brand" to="/">
        <img
          src="/images/forfavicon.png"
          alt="Project Ekatra"
          height="50"
          loading="lazy"
        />
        <span className="logo-title" id="logoTitle">
          Project Ekatra
        </span>
</Link>
<div class='box'>
  <div class='wave -one'></div>
  <div class='wave -two'></div>
  <div class='wave -three'></div>
</div>
<div className="login-box">
<div className = "sub-login-box">
<img src = "/images/login.png" className="login-temp-img" />
<div class="login-main-box">
	<SignUp link={Linked===undefined ? '/' : decodeURIComponent(Linked)} />
	<Login link={Linked===undefined ? '/' : decodeURIComponent(Linked)} />
</div>
</div>
</div>
</div>

}

export default ContentMain;
