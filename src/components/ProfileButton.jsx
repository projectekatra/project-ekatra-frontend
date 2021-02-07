import React from "react";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

function Profile(){

function logOut()
{
if(Cookies.get("sessions")!==undefined)
{
Cookies.remove("sessions")
Cookies.remove("data")
window.location.reload(false)
}
}


function LoginButton(){
return <span className="navbar-text nav-navbar-item"><Link to ={"/login/"+encodeURIComponent(window.location.href)}>Login/SignUp</Link></span>
}

function ProfileButton(){
return <span className="navbar-text nav-navbar-item nav-profile-main">
<Link to = "/profile" >
<img class = "nav-profile-image" src="/images/user.png" alt="Profile Pic"/>
</Link>
</span>
}

return <span>{Cookies.get("sessions") === undefined ?  <LoginButton />: <ProfileButton /> }</span>

}

export default Profile;
