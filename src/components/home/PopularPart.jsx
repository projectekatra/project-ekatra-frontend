import React, { useState } from "react";
import Card from "./SingleCard";
import Loading from "./Loading";
import Heading from "../shared/Heading";
import Upvotes from "../shared/Upvote";
import { baseUrl } from "../shared/baseUrl"


function PopularPart() {
  
  var [recentdata, setData] = useState()
  var [mosthelpful, setHelpful] = useState()
  var [mostvisited, setVisited] = useState()
  if(mosthelpful===undefined)
  {
    fetch(baseUrl+"api/posts/popular")
  .then(responsehelpful=> responsehelpful.json())
  .then(datahelpful => {setHelpful(datahelpful)})
  }
  if(mostvisited===undefined)
  {
    fetch(baseUrl+"api/posts/visited")
  .then(responsevisited=> responsevisited.json())
  .then(datavisited => {setVisited(datavisited)})
  }
  
  
  if(recentdata===undefined){
  fetch(baseUrl+"api/posts/latest")
  .then(response=> response.json())
  .then(data => {setData(data)})
  }
  
  function crouselSlides(){
  var array = []
  array.push(<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active"><div class="mx-auto d-block"><Card resource={recentdata[0]} /></div></div>)
  for(var i=1;i<recentdata.length;i++)
  {
  array.push(<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3"><div class="mx-auto d-block"><Card resource={recentdata[i]} /></div></div>)
  }
  return array;
  }
  
  function SpecialCard(props){
  return <div className = "home-card-main">
  <div className="home-card-main-part">
  <div className ="home-card-title"><Heading link={props.link} heading={props.heading}/></div>
  <div className = "home-card-description">{props.description}</div>
  <div className = "home-card-conclude"><span>{"Shared By "+props.author} </span><span><Upvotes id={props.id} upvote={props.upvote}/></span></div>
  </div>
  </div>
  }
  
  
  return (
    <div className="popular-part">
   {mosthelpful===undefined? <Loading />:<div className= "home-card-theme">
  <div className = "home-card-reason">Most Helpful Resource</div>
   <SpecialCard heading={mosthelpful.heading} link={mosthelpful.link} description = {mosthelpful.description} author={mosthelpful.author} id={mosthelpful._id} upvote = {mosthelpful.upvotes}/>
</div>}
{mostvisited===undefined? <Loading />: <div className= "home-card-theme" style={{flexWrap: "wrap-reverse"}}>
  <SpecialCard heading={mostvisited.heading} link={mostvisited.link} description = {mostvisited.description} author={mostvisited.author} id={mostvisited._id} upvote = {mostvisited.upvotes}/>
  <div className = "home-card-reason">Most Visited Resource</div>
</div>}
      <div className="sub-home-heading">
      Recently Added:
      </div>
      <div className="sub-recent-post-part">
        <div className="sub-recent-main-post-part">
          {recentdata===undefined? <Loading />:
        	<div class="container-fluid">
        		<div id="carousel-example" class="carousel slide" data-ride="carousel">
        			<div class="carousel-inner row w-100 mx-auto" role="listbox">
            			{crouselSlides()}
        			</div>
        			<a class="carousel-control-prev" href="#carousel-example" role="button" data-slide="prev" style={{width: "5px"}}>
						<span style={{color: "black", fontSize: "3.5rem"}}>&#x2039;</span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carousel-example" role="button" data-slide="next" style={{width: "5px"}}>
						<span style={{color: "black", fontSize: "3.5rem"}}>&#x203A;</span>
						<span class="sr-only">Next</span>
					</a>
        		</div>
        	</div>
        	}
        </div>
      </div>
    </div>
  )
}

export default PopularPart;

