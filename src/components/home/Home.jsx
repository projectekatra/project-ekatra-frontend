import React, {useState} from "react"

import Mainbody from "./Mainbody";
import PopularPart from "./PopularPart";
import Footer from "./Footer";
function Homecontent(){
document.title = "Home | Project Ekatra"
  return <div>
    <Mainbody />
  <PopularPart />
   <Footer />
   </div>
}

export default Homecontent;
