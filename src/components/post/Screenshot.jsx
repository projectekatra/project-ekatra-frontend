import React, {useState} from "react";


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


return<div style={{textAlign: "center", marginTop: "20px", marginBottom: "40px"}}>
{image?<img src={image} alt={props.url} className="post-page-image" />:<img src = "/images/blurred.jpg" alt="Blurred"  className = "post-page-image"/>}
</div>
}

export default Screenshot;
