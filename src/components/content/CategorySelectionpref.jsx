import React from "react";
import Select from 'react-select';

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    margin: "15px auto 10px auto",
    width: "200px"
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

  var options = [
{
label: "Relevance",
value: "relevant"
},
{
label: "Date",
value: "latest"
},
{
label: "Popularity",
value: "popular"
}]
  function handleChange(opt, meta) {
    props.check(["sort",opt.value])
  }

  return (
    <Select
      defaultValue = {{label: "Relevance", value: "relevant"}}
      defaultOptions={true}
      styles={customStyles}
      options = {options}
      menuShouldScrollIntoView boolean = {true}
      onChange={handleChange}
      placeholder = "Sort By"
    />
  );
}

export default CategorySelection;
