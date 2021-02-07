import React from "react";
import Upvote from "../shared/Upvote";
import Heading from "../shared/Heading";
import {Link} from "react-router-dom";
function SingleCard(props) {

  return (
    <div className="single-post">
         <Heading link={props.link} className="top-single-post-heading" heading = {props.heading} id = {props.id} />
<br />
         <div className="top-single-post" style={{marginBottom: "5px"}}><span><span className ="top-single-post-label">Category:</span>
      <span className ="top-single-post-label top-single-post-category">{props.category.map(x=><span><span style={{textDecoration: "underline", color: "#007bff"}} onClick = {()=>{props.check(["id", x])}}>{x}</span>{"    "}</span>)}</span></span><span></span>
      </div>
      <Link style={{textDecoration: "none", color: "black"}} to={"/post/"+props.id}><p>{props.description.substring(0,400)}...</p></Link>
      <div className="top-single-post">
        <span className ="post-page-info">Shared by {props.author}</span>
          <span className="post-page-info"><Upvote id = {props.id} upvote={props.upvotes} /></span>
      </div>
    </div>
  );
}

export default SingleCard;
