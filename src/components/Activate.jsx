import React, {useState} from "react";
import {useParams} from "react-router-dom";
import { baseUrl } from "./shared/baseUrl";

function Activate() {
  
  const { Hash } = useParams();
  let [message, setMessage] = useState({message: "Activating...",color: "black"})
  let [check, setCheck] = useState(true);
  if(check)
  {
  setCheck(false)
  fetch(baseUrl+"api/user/activate/"+Hash)
      .then((response) => {
          if(response.status===204)
          {
          setMessage({message: "Invalid Link.",color: "red"})
          }
          else if(response.status===202)
          {
          setMessage({message: "Account Activated Successfully.",color: "green"})
          }
          else
          {
          setMessage({message: "Server Side Error. Please try again later!!",color: "red"})
          }
      })
      }
  
  return (
    <div style={{padding: "30px 30px",color: message.color}}>{message.message}</div>
  );
}

export default Activate;
