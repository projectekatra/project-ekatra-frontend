import React from "react";
import SingleCard from "./SingleCard";


function Card(props) {

function CreateCard(resource) {
  return (
    <SingleCard
      key={resource._id}
      id = {resource._id}
      link={resource.link}
      heading={resource.heading}
      description={resource.description}
      category = {resource.category}
      author={resource.author}
      upvotes={resource.upvotes}
      downvotes={resource.downvotes}
      check = {(e)=>{props.check(e)}}
    />
  );
}

  return props.resources.map(CreateCard);
}

export default Card;
