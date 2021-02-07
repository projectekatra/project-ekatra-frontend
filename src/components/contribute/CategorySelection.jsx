import React, {useState} from "react";
import CreatableSelect from 'react-select/creatable';
import { baseUrl } from "../shared/baseUrl"

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    margin: "0 auto 10px auto",
    width: "330px"
  }),
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    color: "black",
    backgroundColor: "white",
    fontFamily: '"Source Sans Pro", sans-serif',
    padding: "2px 0px",
    fontSize: "18px"
  }),
  menu: (provided, state) => ({
    margin: 0,
    ...provided,
    color: "black",
    position: "relative",
    left: 0,
    top: 0,
    fontFamily: '"Source Sans Pro", sans-serif',
    fontweight: "300px",
    fontSize: "18px",
    backgroundColor: "white"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    margin: 0,
    borderRadius: "3px",
    maxMenuHeight: 200,
    backgroundColor: "white",
    fontFamily: '"Source Sans Pro", sans-serif',
    padding: "5px 20px",
    fontSize: "18px"
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    backgroundColor: "white"
  })
};

function CategorySelection(props) {

  
  var [isLoading, setIsLoading] = useState(true)
  var [options, setOptions] = useState([])
  var [isLoadingMessage, setIsloadingmessage] = useState("Options Loading")
  var [isdisabled, setIsdisabled] = useState(true)
  if(isLoading)
 {
    fetch(baseUrl+"api/categories")
    .then((response)=> response.json())
    .then((data)=> {
     setIsLoading(false)
     setOptions(data)
     setIsloadingmessage("Select Categories (Type to Search)")
     setIsdisabled(false)
     })
    .catch(err=>{
     setIsLoading(false)
     setIsloadingmessage("Server Error!")
     setIsdisabled(true)
     })
}
  function handleChange(opt, meta) {
    props.onChanged(opt);
  }

  return (
    <CreatableSelect
      defaultOptions={true}
      styles={customStyles}
      isSearchable = {true}
      isClearable
      isMulti={true}
      isLoading = {isLoading}
      isDisabled = {isdisabled}
      options = {options}
      menuShouldScrollIntoView boolean = {true}
      placeholder= {isLoadingMessage}
      onChange={handleChange}
      
    />
  );
}

export default CategorySelection;
