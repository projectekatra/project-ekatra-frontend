import React, {useState} from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import { baseUrl } from "../shared/baseUrl"
import Skeleton from '@material-ui/lab/Skeleton';

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}


function Tip() {
  
  function Splideslide(x)
  {
    return <SplideSlide>
    <div className = "home-tip-main-slide">
    <div className = "home-tip-main-slide-sub">
    <h1>{x.title}</h1>
    <p>{x.tip}</p></div></div>
  </SplideSlide>
  }
  
  let [open, setOpen] = useState(false)
  let [tip, setTip] = useState({title: "", tip: ""})
  let [dofetch, setFetch] = useState(true)
  let [tips, setTips] = useState()
  let [sopen, setSopen] = useState({set: false, message: "Is there hope?", severity: "info"});
  var primaryOptions = {type: "loop",
                        perPage: 1,  
                        perMove: 1, 
                        autoplay: true,
                        pagination: false        	 	    	
                	}
                	
  if(dofetch)
  {
     setFetch(false)
  	fetch(baseUrl+"api/gettips")
  	.then(response=>response.json())
  	.then(data => {setTips(data)})
  	.catch(()=>{setTips([{title: "Sever Error", tip: "Server Error, please refresh the page to continue!!"}])})
  }
  
  function handleFABClick(){
      setOpen(true)
  }
  
  function handleClose(){
     setOpen(false)
  }
  
  function handleSClose(event, reason) {
  if (reason === 'clickaway') {
      return;
    }
  setSopen((prevValue) => {return {...prevValue, set: false}});  
  }
  
  function display(message, severity){
  setSopen({set: true, message: message, severity: severity})
  setTimeout(handleSClose, 5000);
  }
  
  function submitTip(){
    if(tip.title!=="" && tip.tip!=="")
    {
       if(tip.tip.length <=280)
       {
       const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tip),
      };
      display("Saving Tip...", "info")
       fetch(baseUrl + "api/addtip", requestOptions)
       .then(response => {if(response.status === 200 || response.status===201){display("Tip Added Successfully", "success")}
       else{display("Error While Saving", "error")}})
       .catch(()=>{display("Error While Saving", "error")})
       setTips((prevValue => [...prevValue, tip]))
       
       setTip({title: "", tip: ""})
       
       handleClose();
       }
       else
       {
       display("More Than 280 characters!!", "warning")
       }
    }
    else
    {
        display("Both field need to be filled !!", "warning");
    }
  }
  
  function handleChange(event){
     var id = event.target.id;
     var value = event.target.value;
     setTip((prevValue)=> {return {...prevValue, [id]: value}});
  }
  
  return (
  <div>
  <div className="sub-home-heading" style = {{display: "flex", justifyContent: "space-between"}}>
      <Snackbar 
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      TransitionComponent= {TransitionLeft}
      open={sopen.set} onClose={handleSClose}>
				<Alert onClose={handleSClose} severity= {sopen.severity}>
					{sopen.message}
				</Alert>
			</Snackbar>  
      <span>Tips:</span> <Fab color="primary" aria-label="add" onClick = {handleFABClick}>
        <AddIcon />
      </Fab>
   </div>
   <div className="sub-recent-post-part">
        <div className="sub-recent-main-post-part">
						<Splide options = {primaryOptions}>
						{tips===undefined ?<SplideSlide><Skeleton variant="rect" height={220} animation = "wave"/></SplideSlide> : tips.map(Splideslide)}
					  </Splide>
   </div>
   </div>
   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Tip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You know some kind of hack for anything related to education that can be expressed in less than 280 characters. Feel free to share with others.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tip Is Related To?"
            type="text"
            fullWidth
            onChange = {handleChange}
          />
          <TextField
            margin="dense"
            id="tip"
            label="Tip"
            type="text"
            fullWidth
            onChange = {handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitTip} color="primary">
            Add Tip
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
   </div>
  );
}

export default Tip;
