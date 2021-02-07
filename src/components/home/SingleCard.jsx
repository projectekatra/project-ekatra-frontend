import React from "react";
import Upvote from "../shared/Upvote";
import Heading from "../shared/Heading";
import {Link} from "react-router-dom";
function SingleCard(props) {
  return (
    <div className="sub-recent-single-post">
         <Heading link={props.resource.link} className="top-single-post-heading" heading = {props.resource.heading} id = {props.resource._id} />
<br />
         <div className="top-single-post" style={{marginBottom: "5px"}}><span><span className ="top-single-post-label">Category:</span>
      <span className ="top-single-post-label top-single-post-category" href="category"> {props.resource.category.map(x=><span><Link style={{textDecoration: "underline"}} to={"/contents/"+x} >{x}</Link>{"    "}</span>)}</span></span><span></span>
      </div>
      <Link style={{textDecoration: "none", color: "black"}} to={"/post/"+props.resource._id}><p>{props.resource.description.substring(0,297)}...</p></Link>
      <div className="top-single-post">
        <span className ="post-page-info">Shared by {props.resource.author}</span>
          <span className="post-page-info"><Upvote id = {props.resource._id} upvote={props.resource.upvotes} /></span>
      </div>
    </div>
  );
}

export default SingleCard;
