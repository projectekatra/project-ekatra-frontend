import React, {useState} from "react"
import Upvote from "../shared/Upvote";
import Heading from "../shared/Heading";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import { baseUrl } from "../../shared/baseUrl"

function Profile(){

var [array, setArray] = useState(undefined)


var [message, setMessage]=useState("")
function fetchData(postId){
fetch(baseUrl+"api/post/"+postId)
      .then((response) => {console.log(response); return response.json()})
      .then((data) => {console.log(data)
       setArray(prevArray=>{prevArray.push(data)
                             return prevArray})
      })
}

function changeArray(somearray)
{
console.log(somearray)
setArray([])
if(somearray.length!==0)
{
setMessage("Loading...")
}
else
{
setMessage("No Record Found!!")
}
for(var i = somearray.length-1;i<=0;i--)
{
fetchData(somearray[i])
}
}

if(array===undefined)
{
console.log("First Time Rendering")
if(Cookies.getJSON("data").visited===undefined)
changeArray([])
else
changeArray(Cookies.getJSON("data").visited)
}


function handleChange(e) {
    if(e.target.value==="visited")
    {
     if(Cookies.getJSON("data").visited===undefined)
	changeArray([])
     else
	changeArray(Cookies.getJSON("data").visited)
    }
    else
    {
    if(Cookies.getJSON("data").upvotes===undefined)
	changeArray([])
	else
	changeArray(Cookies.getJSON("data").upvotes)
    }
  }

function SingleCard(props)
{
return <div className = "single-post" style={{background: "#ffdcb8"}}>
       <Heading link="{props.link}" className="top-single-post-heading" heading = "{props.heading}" id = "{props.id}" />
<br />
         <div className="top-single-post" style={{marginBottom: "5px"}}><span><span className ="top-single-post-label">Category:</span>
      <span className ="top-single-post-label top-single-post-category" href="category"> Categories</span></span><span></span>
      </div>
      <Link style={{textDecoration: "none", color: "black"}} to={"/post/"+props.id}><p>I am here for you my load. DO you know me. No id on't know you. But I will llike to know you Why will you want to know me. I don't know...</p></Link>
      <div className="top-single-post">
        <span className ="post-page-info">Shared by {props.author}</span>
          <span className="post-page-info"><Upvote id = {props.id} upvote={props.upvotes} /></span>
      </div>
       </div>
}

return <div className="profile-main-container">{Cookies.get("data")===undefined? "Try Refreshing the Page":
<div><div className="profile-name-title"><span style={{marginLeft: "50px"}}><span style={{color: "#184d47"}}>Hello,</span><span style={{color: "#ff884b"}}>{" { "}</span><span style={{color: "#e27802"}}>{Cookies.getJSON("data").name}</span><span style={{color: "#ff884b"}}>{" }"}</span></span><span style={{marginRight: "20px", cursor: "pointer"}}>Log Out</span></div>
<div className = "profile-subtype-main">
<div className="selection-part">
        <select className="select-part" onChange={handleChange} defaultValue = "visited">
          <option value="visited">History</option>
          <option value="liked">Liked</option>
        </select>
      </div>
      <div className = "post-part" style={{borderColor: "#fdffbc"}}>
       <div className = "main-post-part" style={{background: "#fdffbc"}}>
       {array===undefined? "Loading...": <SingleCard />}
       </div>
       </div>
</div></div>}
</div>

}
export default Profile;
