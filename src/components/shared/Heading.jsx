import React from "react"
import {baseUrl} from "./baseUrl"
import Cookies from "js-cookie";

function Check(props){

function handleClick(event){
event.preventDefault()
var send_data;
if(Cookies.get("sessions")!==undefined)
{
send_data = {id:props.id,value:1,userId: Cookies.getJSON("sessions").id}
}
else
{
send_data = {id:props.id,value:1}
}
const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(send_data)
      };
fetch(baseUrl+"api/visitedadd",requestOptions)
.then(response=>{window.open(props.link,"_blank");})
}
return <a href={props.link} className={props.className} onClick={handleClick} target="_blank">
          {props.heading}
        </a>
}


export default Check
