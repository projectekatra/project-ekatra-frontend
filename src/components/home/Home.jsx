import React, {useState, useEffect} from "react"
import { baseUrl } from "../shared/baseUrl"
import Mainbody from "./Mainbody";
import PopularPart from "./PopularPart";
import Footer from "./Footer";
function Homecontent(){
document.title = "Home | Project Ekatra"

useEffect(() => {
  // Send request to backend on page load
  fetch(baseUrl+"api/load")
  .then(response => {console.log("Page Loaded Successfully")})
    .catch((error) => console.error("Error:", error));
}, []);

  return <div>
    <Mainbody />
  <PopularPart />
   <Footer />
   </div>
}

export default Homecontent;
