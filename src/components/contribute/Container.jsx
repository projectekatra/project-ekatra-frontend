import React, { useState } from "react";
import CategorySelection from "./CategorySelection";
import { baseUrl } from "../shared/baseUrl"
import Cookies from "js-cookie";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => ({

root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
  },
wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonNormal: {
   backgroundColor: "white",
   border: "lightgrey",
   display: "inline",
   color: "black",
    '&:hover': {
      backgroundColor: "lightgrey",
    },
  },  
buttonSuccess: {
    backgroundColor: "#4aa96c",
    border: "#4aa96c",
    color: "white",
    '&:hover': {
      backgroundColor: green[500],
    },
  },
  
buttonRetry: {
	backgroundColor: "#3f51b5",
	color: "lightgrey",	
	'&:hover': {
      backgroundColor: "#3f51b5",
    },
},

fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: "#4aa96c",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
function Container(props) {
  const classes = useStyles();
  
  var values = {
    name: Cookies.get("data")===undefined? "": Cookies.getJSON("data").name,
    email: Cookies.get("data")===undefined? "": Cookies.getJSON("data").email,
    heading: "",
    link: "",
    description: "",
    category: []
  };
  
  const [finalValue, setfinalValue] = useState(values);
  let [submit, setSubmit] = useState(0);
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
  event.preventDefault();
     setSubmit(0);
    finalValue.category = finalValue.category.filter(x=>x!=="")
    if (finalValue.heading === "") {
      props.onSubmission({
        message: "Resource Title is Required!",
        set: true,
        severity: "warning",
      });
    } else if (finalValue.link === "") {
      props.onSubmission({
        message: "Resource Link(URL) is Required!",
        set: true, severity: "warning",
      });
    } else if (finalValue.description === "") {
      props.onSubmission({
        message: "Resource Description is Required!",
        set: true, severity: "warning"
      });
    } else if (finalValue.category.length===0) {
      props.onSubmission({
        message: "Resource Category is Required!",
        set: true, severity: "warning"
      });
    } else {
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValue),
      };
      setSubmit(1)
      fetch(baseUrl+"api/contribute", requestOptions)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
          setSubmit(2);
          setTimeout(()=>{setSubmit(0); setfinalValue(values);},4000)
            props.onSubmission({
message: "Resource Successfully saved!", set: true, severity: "success"}
);
          } 
   else if(response.status===700)
{
setSubmit(0);
props.onSubmission({
              message: "Resource Already Exists!",
              set: true, severity: "info",
            });
}     
else {
           setSubmit(3);
            props.onSubmission({
              message: "Error Uploading. Please Try Again Later!",
              set: true, severity: "error",
            });
          }
        })
        .catch((error) => {
          setSubmit(3);
          props.onSubmission({
            message: "Error Uploading. Please Try Again Later!",
            severity: "error",
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
        <CategorySelection onChanged={handlecategoryChange} category = {finalValue.category}/>
        <div className={classes.root}>
        <div className={classes.wrapper}>
		      <Fab
		        aria-label="save"
		        color="white"
		        className = {submit==2 ? classes.buttonSuccess : submit == 3 ? classes.buttonRetry : classes.buttonNormal}
		        onClick = {onFormSubmit}
		      >
		        {submit===2 ? <CheckIcon /> : submit===3 ? <ReplayIcon />: <SaveIcon />}
		      </Fab>
		      {submit===1 && <CircularProgress size={68} className={classes.fabProgress} />}
		    </div>
		    <div className={classes.wrapper}>
		      <Button
		        variant="contained"
		        color="primary"
		        className = {submit===2 ? classes.buttonSuccess : submit === 3 ? classes.buttonRetry : classes.buttonNormal} 
		        disabled={submit===1}
		        onClick = {onFormSubmit}
		      >
		        {submit===0 ? "Submit" : submit === 1 ? "Submitting" : submit == 2 ? "Success" : "Retry" }
		      </Button>
		      {submit===1 && <CircularProgress size={24} className={classes.buttonProgress} />}
		    </div>
		     </div>
      </form>
    </div>
  );
}

export default Container;

