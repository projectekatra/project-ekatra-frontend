import React from "react"
function  Temp(){

  return <div className= "home-web-browser-theme">
  <div style={{color: "white"}}>
  <div className="home-web-browser-title" style={{background: "#222"}}>
  <span>
  <span className="home-web-title-tab">
  <span style={{fontSize: "0.9rem", fontWeight: "normal", marginRight: "15px", maxWidth: "80%"}}><img className="browser-window-logo" src="/images/forfavicon.png" />Project Ekatra</span>
  <span style={{fontSize: "0.8rem"}}>&#10005;</span>
  </span>
  <span style={{marginLeft: "10px", fontSize:"1.2rem"}}>+</span></span>
  <span style={{marginRight: "13px"}}><span>&#9866;</span><span style={{marginLeft: "10px", fontSize: "0.8rem"}}>&#9744;</span> <span style={{marginLeft: "5px"}}>&#10005;</span></span>
  </div>
  <div className="home-web-browser-title" style={{background: "#444"}}>
  <span style={{marginLeft: "20px", color: "#888"}}><span>&#9665;</span> <span style={{marginLeft: "12px", marginRight: "10px"}}>&#9655;</span> <span>&#8635;</span></span>
<span className = "home-web-address-bar"><span style={{fontSize: "0.75rem"}}>&#128274;</span> <a className = "home-web-address-bar-link" href="https://youtube.com" target="_blank">https://youtube.com</a></span>
<span style={{marginRight: "10px",marginLeft: "20px"}}>&#9776;</span>
</div>
<div style={{background: "#444", display: "flex", alignItems: "center", height: "30px"}}>
<span className="home-web-classname">Mathematics</span>
<span className="home-web-classname">You</span>
<span className="home-web-classname">Home</span>
<span className="home-web-classname">Software Development</span>
</div>
</div>
<div className="home-web-main-body">
Hey THere Wanna Know about me. Well yes but No. Do you know me. Well Yes but no.
<span>Shared By Aditya Prakash</span>
<span>Did you also find it Upvote?</span>
</div>
</div>
}

export default Temp;
