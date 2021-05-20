import React,{useState} from "react";
import {useParams} from "react-router-dom";
import { baseUrl } from "../shared/baseUrl"
import Similar from "./Similar";
import Screenshot from "./Screenshot";
import Main from "./Main";
import Skeleton from '@material-ui/lab/Skeleton';
import ReplayIcon from '@material-ui/icons/Replay';
import Fab from '@material-ui/core/Fab';

function PostPage(){

function getPost(Id)
{
   fetch(baseUrl+"api/post/"+Id)
      .then((response) => response.json())
      .then((data) => {
       document.title = data.heading+" | Project Ekatra"
       setPost(data)
      })
      .catch(()=>{setPost("reloadTime")})
}

function getRecommendedPost(Id)
{
   fetch(baseUrl+"api/recommend/post/"+Id)
      .then((response) => response.json())
      .then((data) => {
       setrecommendpost(data)
      })
      .catch(() => {})
}

let [post, setPost] = useState()
let [recommendpost, setrecommendpost] = useState()
const {Id} = useParams();

if(!post)
{
getPost(Id)
}

if(post && !recommendpost)
{
   getRecommendedPost(Id)
}


return <div style={{textAlign:"center"}}>
<div className="post-page-container">
{post? (post==="reloadTime" ? <Fab
		        aria-label="save"
		        color="white"
		        onClick = {()=>{getPost(Id); setPost(undefined)}}
		      >
		      <ReplayIcon />
		      </Fab> : <div><Main post={post} /> <Screenshot url = {post.link} /></div>) : <div>
      <Skeleton width = {"90%"} animation = "wave"/>
      <Skeleton width = {"90%"} animation="wave" />
      <Skeleton width = {"90%"} animation="wave" />
    </div>}
{recommendpost?<Similar resources = {recommendpost}/>:null}
</div></div>
}

export default PostPage;
