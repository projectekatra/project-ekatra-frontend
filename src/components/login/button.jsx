import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
   backgroundColor: "rgba(255,255,255,.3)",
   border: "lightgrey",
   display: "inline",
   marginTop: "10px",
   color: "black",
    '&:hover': {
      backgroundColor: "rgba(255,255,255,.5)",
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
 

fabProgress: {
    color: green[500],
    position: 'absolute',
    top: 4,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: "#4aa96c",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -7,
    marginLeft: -12,
  },
}));

function SubmitButton(props)
{
const classes = useStyles();
return <div className={classes.root}>
        <div className={classes.wrapper}>
		      <Fab
		        aria-label="save"
		        color="white"
		        className = {props.submit==2 ? classes.buttonSuccess: classes.buttonNormal}
		        onClick = {props.onFormSubmit}
		      >
		        {props.submit===2 ? <CheckIcon /> :  <AccountCircleIcon />}
		      </Fab>
		      {props.submit===1 && <CircularProgress size={68} className={classes.fabProgress} />}
		    </div>
		    <div className={classes.wrapper}>
		      <Button
		        variant="contained"
		        color="primary"
		        className = {props.submit===2 ? classes.buttonSuccess  : classes.buttonNormal} 
		        disabled={props.submit===1}
		        onClick = {props.onFormSubmit}
		      >
		        {props.submit===0 ? props.message : props.submit === 1 ? props.progressmess : props.successmess }
		      </Button>
		      {props.submit===1 && <CircularProgress size={24} className={classes.buttonProgress} />}
		    </div>
		     </div>

}

export default SubmitButton;
