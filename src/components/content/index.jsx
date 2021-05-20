import React,{useState} from "react";
import CategorySelection from "./CategorySelection";
import CategorySelectionpref from "./CategorySelectionpref";
import SearchButton from "./Search";
import {useParams} from "react-router-dom";
import Cards from "./Cards";
import ErrorMessage from "./ErrorMessage"
import { baseUrl } from "../shared/baseUrl"
import Pagination from '@material-ui/lab/Pagination';

function ContentMain()
{

function fetchResources(Id, Search) {
   setloading(true)
    fetch(baseUrl+"api/contents/" + Id+"/"+Search)
      .then((response) => response.json())
      .then((data) => {
        setactivePage(1)
        if(criteria.sort==="latest")
{
setResources(data.sort((a, b) => (a.date > b.date) ? -1 : 1))
}
else if(criteria.sort==="popular")
{
setResources(data.sort((a, b) => (a.upvotes > b.upvotes) ? -1 : 1))
}
else
{
setResources(data)
}
setloading(false);
        setRelevant(data.map(x=> x._id))
        setIserror(false);
      })
     .catch((error) => {
setIserror(true);
setloading(false);
setTimeout(() => setIserror(false), 10000);
});
  }

window.addEventListener("load", ()=>{document.querySelector("nav").style.boxShadow = "none"})

function handleerrorClick()
{
setIserror(false);
}

const {Id,Search} = useParams();
let [criteria, setCriteria] = useState({id: Id===undefined? "all": Id, sort: "relevant", search: Search===undefined? "": Search})
let [first, setFirst] = useState(true)
var [iserror, setIserror] = useState(false);
var [resources, setResources] = useState([]);
var [activePage, setactivePage] = useState(1);
var [relevant, setRelevant] = useState([]);
var [isLoading, setloading] = useState(true);

if(first)
{
if(Id===undefined || Id==="all")
document.title = "Resources | Project Ekatra"
else
document.title = Id+" | Project Ekatra"
fetchResources(criteria.id, criteria.search)
setFirst(false)
}
function criteriaChange(e)
{
var type = e[0];
var value = e[1];
if(e[0]!=="sort")
{
if(e[0]==="id")
{
window.open("https://projectekatra.github.io/#/contents/"+value+"/"+criteria.search,"_self")
fetchResources(value, criteria.search)
}
else
{
window.open("https://projectekatra.github.io/#/contents/"+criteria.id+"/"+value,"_self")
fetchResources(criteria.id, value)
}
}
else
{
if(e[1]==="latest")
{
setResources((resources) => resources.sort((a, b) => (a.date > b.date) ? -1 : 1))
}
else if(e[1]==="popular")
{
setResources((resources) => resources.sort((a, b) => (a.upvotes > b.upvotes) ? -1 : 1))
}
else {
var sorted = []
for(var i = 0;i<relevant.length;i++)
{
sorted.push(resources.find(x=>x._id===relevant[i]))
}
setResources(sorted)
}
}

setCriteria(prevValue=>{
return {
...prevValue,
[type]: value
}
})

}


return <div className = "contents-main">
{iserror && <ErrorMessage onClicked = {handleerrorClick} />}
<div style={{position: "fixed", top: 0, background: "white",height: "60px", width: "100%", zIndex: 120}}>
</div>
<div className = "search-features">
<CategorySelection category = {criteria.id} check = {criteriaChange}/>
<CategorySelectionpref sort  = {criteria.sort} check = {criteriaChange} />
<SearchButton text = {criteria.search} check = {criteriaChange} />
{isLoading && <div className="spinner-border text-info spinner-border-sm" role="status" style={{marginTop: "28px", marginRight: "50px"}}>
        <span className="sr-only">Loading...</span>
      </div>}
</div>
<div className = "content-part">
<div className="main-post-part" style={{marginLeft: "10px", marginRight: "10px", backgroundColor: "white"}}>
<Cards resources = {resources.slice((activePage-1)*6,activePage*6)} check = {criteriaChange}/>
<div style={{display: "flex", justifyContent: "center",marginTop: "20px"}}>
<Pagination 
  page = {activePage}
  defaultPage = {activePage}
  count = {parseInt(resources.length/7)}
  onChange = {(event, value) => {setactivePage(value); window.scrollTo(0,0)}}
  boundaryCount = {3}
	color="primary.light" />
</div>
</div>
</div>
</div>

}

export default ContentMain;
