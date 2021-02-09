import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Profile from "./ProfileButton";

function Navigator(props) {

  useEffect(()=>{
       var y_prev = 100;
	window.addEventListener('scroll', function() {
	var y=window.pageYOffset;

	if(y>300 && (y-y_prev)>0)
	{

	  document.querySelector("nav").style.opacity= 0;

	}
	else
	{
	  document.querySelector("nav").style.opacity = 1;
	}
	y_prev = y;
  })
  })

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-light nav-main" style ={{padding: "0 0.6rem", backgroundColor: props.background}}>
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
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/contents" className="navbar-text nav-navbar-item">
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contribute" className="navbar-text nav-navbar-item">
              Contribute
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contributors" className="navbar-text nav-navbar-item">
              Contributors
            </Link>
          </li>
          <li className = "nav-item">
          <Profile />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigator;
