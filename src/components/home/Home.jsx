import React, {useState} from "react"
import ReactGA from 'react-ga';
import Mainbody from "./Mainbody";
import PopularPart from "./PopularPart";
import Footer from "./Footer";

function Homecontent(){
const [intialLoad, setIntialLoad] = useState(true);
if(intialLoad)
{
ReactGA.pageview("/");
setIntialLoad(false);
}
  


document.title = "Home | Project Ekatra"
  return <div>
    <Mainbody />
  <PopularPart />
   <Footer />
   </div>
}

export default Homecontent;
