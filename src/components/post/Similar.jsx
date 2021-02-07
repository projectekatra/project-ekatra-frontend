import React from "react";
import Heading from "../shared/Heading";
import Upvote from "../shared/Upvote";
import {Link} from "react-router-dom";

function Similar(props){

return <div>
<h4 className="post-page-category" style={{marginTop: "20px"}}>Similar Resources</h4>
<div>{props.resources.map( post=>
<div key = {post._id} className="post-page-recommend-post">
<Heading link={post.link} className="post-page-recommend-heading" heading = {post.heading} id = {post._id} />
<div className="post-page-recommend-content">
<Link key={post._id} style={{textDecoration: "none", color: "black"}} to={"/post/"+post._id} target="_blank">
<div>
{post.description.substring(0,298)}...
</div>
</Link>
<span style={{display: "flex",justifyContent: "space-between"}}><Link style={{cursor: "pointer"}} to={"/post/"+post._id} target="_blank">Read More</Link> <Upvote id = {post._id} upvote={post.upvotes} /></span>
</div>
</div>)}
</div></div>

}

export default Similar;
