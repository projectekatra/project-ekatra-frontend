import React, {useState} from "react"
import Upvote from "../shared/Upvote";
import Heading from "../shared/Heading";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import { baseUrl } from "../shared/baseUrl"

function Profile(){

if(Cookies.get("sessions")===undefined)
{
window.open("/","_self");
}

var [array, setArray] = useState(undefined)
var [message, setMessage]=useState("")

function fetchData(postId){
fetch(baseUrl+"api/post/"+postId)
      .then((response) => response.json())
      .then((data) => {setArray(prevArray=>{prevArray.push(data)
                             return prevArray})
                             setMessage("")
      })
}

function changeArray(somearray)
{
console.log(somearray)
if(somearray.length!==0)
{
setMessage("Loading...")
setArray([])
var temp_array = []
for(var i = somearray.length-1;i>=1;i--)
{
fetch(baseUrl+"api/post/"+somearray[i])
      .then((response) => response.json())
      .then((data) => {temp_array.push(data)})
}
fetch(baseUrl+"api/post/"+somearray[0])
      .then((response) => response.json())
      .then((data) => {temp_array.push(data)
                      setArray(temp_array)
                      })
}
else
{
setMessage("No Record Found!!")
setArray([])
}



}

if(array===undefined)
{
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
return <div className="single-post" style={{background: "#ffeebb"}}>
         <Heading link={props.link} className="top-single-post-heading" heading = {props.heading} id = {props.id} />
<br />
         <div className="top-single-post" style={{marginBottom: "5px"}}><span><span className ="top-single-post-label">Category:</span>
      <span className ="top-single-post-label top-single-post-category" href="category"> {props.category.map(x=><span><Link style={{textDecoration: "underline"}} to={"/contents/"+x} >{x}</Link>{"    "}</span>)}</span></span><span></span>
      </div>
      <Link style={{textDecoration: "none", color: "black"}} to={"/post/"+props.id}><p>{props.description.substring(0,297)}...</p></Link>
      <div className="top-single-post">
        <span className ="post-page-info">Shared by {props.author}</span>
          <span className="post-page-info"><Upvote id = {props.id} upvote={props.upvotes} /></span>
      </div>
    </div>
}


function logOut(){
if(Cookies.get("sessions")!==undefined)
{
Cookies.remove("sessions")
Cookies.remove("data")
window.open("/","_self")
}
}

return <div className="profile-main-container">{Cookies.get("data")===undefined? "Try Refreshing the Page":
<div><div className="profile-name-title"><span style={{marginLeft: "50px"}}><span style={{color: "#184d47"}}>Hello,</span><span style={{color: "#ff884b"}}>{" { "}</span><span style={{color: "#e27802"}}>{Cookies.getJSON("data").name}</span><span style={{color: "#ff884b"}}>{" }"}</span></span><span style={{marginRight: "20px", cursor: "pointer"}} onClick={logOut}>Log Out</span></div>
<div className = "profile-subtype-main">
<div className="selection-part">
        <select className="select-part" onChange={handleChange} defaultValue = "visited">
          <option value="visited">History</option>
          <option value="liked">Liked</option>
        </select>
      </div>
      <div className = "post-part" style={{borderColor: "#fdffbc"}}>
       <div className = "main-post-part" style={{background: "#fdffbc"}}>
       {array===undefined? "Loading...": array.length===0 ? message: array.map(x=> <SingleCard heading = {x.heading} link = {x.link} id = {x._id} category = {x.category} description = {x.description} author = {x.author} upvotes = {x.upvotes}/>)}
       </div>
       </div>
</div></div>}
</div>

}
export default Profile;
