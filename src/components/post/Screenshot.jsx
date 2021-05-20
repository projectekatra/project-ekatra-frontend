import React, {useState} from "react";
import Skeleton from '@material-ui/lab/Skeleton';


function Screenshot(props){

const [image,setImage] = useState()

if(!image)
{
fetch("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=AIzaSyDNNtbwe3HqHTcQ436jh_1FhqchniLT56o%20&strategy=desktop&url="+props.url+"&screenshot=true")
.then(response=>response.json())
.then(data=>{
setImage(data.lighthouseResult.audits["final-screenshot"].details.data)
}) 
}


return<div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "20px", marginBottom: "40px"}}>
{image?<img src={image} alt={props.url} className="post-page-image" />:<Skeleton variant="rect" className = "post-page-image" height={400} animation = "wave"/>}
</div>
}

export default Screenshot;
