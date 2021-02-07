import React, { useState } from "react";
import CategorySelection from "./CategorySelection";
import { baseUrl } from "../../shared/baseUrl"
import Cookies from "js-cookie";

function Container(props) {
  var values = {
    name: Cookies.get("data")===undefined? "": Cookies.getJSON("data").name,
    email: Cookies.get("data")===undefined? "": Cookies.getJSON("data").email,
    heading: "",
    link: "",
    description: "",
    category: []
  };
  
  const [finalValue, setfinalValue] = useState(values);
  function handletextChange(event) {
    const { name, value } = event.target;

    setfinalValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handlecategoryChange(props) {
    setfinalValue((prevValue) => {
      return {
        ...prevValue,
        category: props
      };
    });
  }

  function onFormSubmit(event) {
    finalValue.category = finalValue.category.filter(x=>x!=="")
    event.preventDefault();
    if (finalValue.heading === "") {
      props.onSubmission({
        message: "Resource Title is Required!",
        set: true,
        background: "#ff8b8b", color: "red"
      });
    } else if (finalValue.link === "") {
      props.onSubmission({
        message: "Resource Link(URL) is Required!",
        set: true,background: "#ff8b8b", color: "red"
      });
    } else if (finalValue.description === "") {
      props.onSubmission({
        message: "Resource Description is Required!",
        set: true,background: "#ff8b8b", color: "red"
      });
    } else if (finalValue.category.length===0) {
      props.onSubmission({
        message: "Resource Category is Required!",
        set: true,background: "#ff8b8b", color: "red"
      });
    } else {
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValue),
      };
      props.onSuccess(true);
      fetch(baseUrl+"api/contribute", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            props.onSubmission({
message: "Resource Successfully saved!", set: true,background: "#A2B5A2",color: "green"});
          } 
   else if(response.status===700)
{
props.onSubmission({
              message: "Resource Already Exists!",
              set: true,background: "#ff8b8b", color: "red"
            });
}     
else {
            props.onSubmission({
              message: "Error Uploading. Please Try Again Later!",
              set: true,background: "#ff8b8b", color: "red"
            });
          }
props.onSuccess(false);
        })
        .catch((error) => {
          props.onSuccess(false);
          props.onSubmission({
            message: "Error Uploading. Please Try Again Later!",
            background: "#ff8b8b", color: "red",
            set: true,
          });
        });
    }
  }

  return (
    <div className="contribute_container">
      <h1>
        <span role="img" aria-label="wizard">
          Become a Wizard🧙
        </span>
      </h1>
      <form onSubmit={onFormSubmit}>
        <input
          name="name"
          type="text"
          value={finalValue.name}
          placeholder="Your Name (Optional)"
          onChange={handletextChange}
        />
        <input
          name="email"
          type="email"
          value={finalValue.email}
          placeholder="Your Email (Optional)"
          onChange={handletextChange}
        />
        <input
          name="heading"
          type="text"
          value={finalValue.heading}
          placeholder="Resource Title"
          onChange={handletextChange}
        />
        <input
          name="link"
          type="url"
          value={finalValue.link}
          placeholder="Resource Link"
          onChange={handletextChange}
        />
        <textarea
          name="description"
          rows="8"
          cols="40"
          value={finalValue.description}
          placeholder="What's this resource for and how is it helpful?"
          onChange={handletextChange}
        ></textarea>
        <CategorySelection onChanged={handlecategoryChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Container;

