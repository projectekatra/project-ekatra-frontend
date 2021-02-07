import React from "react";
import Heading from "../shared/Heading";
import Upvote from "../shared/Upvote";
import {Link} from "react-router-dom";

function PostPage(props){

function getDate(date){
var year = date.substring(0,4)
var day = date.substring(8,10)
var month = parseInt(date.substring(5,7))
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
var month_s = months[month-1]
return day+" "+month_s+" "+year
}

function handleBookMark(e)
{
  if (window.sidebar && window.sidebar.addPanel) { // Firefox <23
		
		window.sidebar.addPanel(props.post.heading,props.post.link,'');

	} else if(window.external && ('AddFavorite' in window.external)) { // Internet Explorer

		window.external.AddFavorite(props.post.link,props.post.heading); }
  else
  { 
   alert("Sorry! Your browser doesn't support this function.");
  }
}

return<div>
<div className="post-page-categories">
{props.post.category.map((x,i) => <Link key={x} className="post-page-category" style={{textDecoration: "none"}} to={"/contents/"+x}>{x}</Link>)}
</div>
<Heading link={props.post.link} className="post-page-heading" heading = {props.post.heading} id = {props.post._id} />
<div style={{display: "flex", justifyContent: "space-between"}}><div className="post-page-info">Shared By {props.post.author} | {getDate(props.post.date)} | <Upvote id = {props.post._id} upvote={props.post.upvotes} />
</div>
<img style={{width: "30px", height: "35px",cursor: "pointer"}} onClick = {handleBookMark} src="https://img.icons8.com/cute-clipart/64/000000/bookmark-ribbon.png"/>
</div>
<div className="post-page-content">
<p>
{props.post.description}
</p> 
</div>
</div>
}

export default PostPage;
