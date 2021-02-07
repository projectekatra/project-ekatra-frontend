import React,{useState} from "react";
import {useParams} from "react-router-dom";
import { baseUrl } from "../shared/baseUrl"
import Similar from "./Similar";
import Screenshot from "./Screenshot";
import Main from "./Main";
import Loading from "./Loading";

function PostPage(){


let [post, setPost] = useState()
let [recommendpost, setrecommendpost] = useState()
const {Id} = useParams();

if(!post)
{
fetch(baseUrl+"api/post/"+Id)
      .then((response) => response.json())
      .then((data) => {
       document.title = data.heading+" | Project Ekatra"
       setPost(data)
      })
}

if(post && !recommendpost)
{
fetch(baseUrl+"api/recommend/post/"+Id)
      .then((response) => response.json())
      .then((data) => {
       setrecommendpost(data)
      })
}


return <div style={{textAlign:"center"}}>
<div className="post-page-container">
{post? <div><Main post={post} /> <Screenshot url = {post.link} /></div>: <Loading />}
{recommendpost?<Similar resources = {recommendpost}/>:null}
</div></div>
}

export default PostPage;
