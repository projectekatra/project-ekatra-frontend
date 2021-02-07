import React, {useState} from "react";

function Search(props)
{

let [value, setValue] = useState(props.text)
function handleChange(e)
{
setValue(e.target.value)
}

function handlekeypress(e){
if(e.which===13)
{
props.check(["search",value])
}
}

return <div className="search-main-container">
<div className=" css-dxfpeq-ValueContainer">
<div className = "css-1kz58cg-Input">
<div style={{display: "inline-block"}}>
<input className = "search-input" type = "text" placeholder = "Search" value = {value} onChange = {handleChange} onKeyPress = {handlekeypress}/>
</div>
</div>
</div>
<div className = " css-195904m-IndicatorsContainer">
<span className = " css-1okebmr-indicatorSeparator"></span>
<div class = " css-tlfecz-indicatorContainer" style={{cursor: "pointer"}} aria-hidden = "true" onClick = {()=>{props.check(["search",value])}}>
&#128269;
</div>
</div>
</div>
}
export default Search;
