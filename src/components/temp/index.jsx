import React from "react"
function  Temp(){

  function SpecialCard(props){
  return <div className = "home-card-main">
  <div className="home-card-main-part">
  <div className ="home-card-title">Hey There</div>
  <div className = "home-card-description">CybrHome curates the best of the web at one place thereby making it easier for you to know the best sites, apps, blogs and products for every purpose. With the help of our community, we’re building the best knowledge base of curated lists for the internet. Whether you need tools for making videos</div>
  <div className = "home-card-conclude"><span>Shared By Aditya Prakash</span><span>Upvotes</span></div>
  </div>
  </div>
  }
  

  return <div className= "home-card-theme">
  <div className = "home-card-reason">Most Helpful Resource</div>
  <SpecialCard />
</div>
}

export default Temp;
