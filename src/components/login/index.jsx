import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import SignUp from "./signup"
import Login from "./login"

function ContentMain()
{


document.title = "Login/SignUp | Project Ekatra"
const { Linked } = useParams();

function changeTabs(e)
{
document.querySelector(".form-signin").classList.toggle("form-signin-left");
document.querySelector(".form-signup").classList.toggle("form-signup-left");
document.querySelector(".login-frame").classList.toggle("frame-long");
document.querySelector(".signup-inactive").classList.toggle("signup-active");
document.querySelector(".signin-active").classList.toggle("signin-inactive");
document.querySelector(".forgot").classList.toggle("forgot-left");
e.target.classList.remove("idle");
e.target.classList.add("active");
}

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
<div className="login-box">
<div className="login-container">
  <div className="login-frame">
    <div className="login-nav">
      <ul className="login-links">
        <li className="signin-active"><a className="btn" onClick={changeTabs}>Sign in</a></li>
        <li className="signup-inactive"><a className="btn" onClick={changeTabs}>Sign up </a></li>
      </ul>
    </div>
    <div>
    <Login link={Linked===undefined ? '/' : decodeURIComponent(Linked)} />
    <SignUp link={Linked===undefined ? '/' : decodeURIComponent(Linked)} />			        
  </div>
</div>
 <a id="refresh" value="Refresh">
    <svg className="refreshicon"   version="1.1" id="Capa_1"  x="0px" y="0px"
         width="25px" height="25px" viewBox="0 0 322.447 322.447" style={{enableBackground: "new 0 0 322.447 322.447"}}>
         <path  d="M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224
                c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5
                c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5
                c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025
                c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614
                l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z"/>
    </svg>
  </a>
</div>
</div>
</div>
}

export default ContentMain;
