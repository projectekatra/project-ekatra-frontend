import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import Profile from "./ProfileButton";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const drawerWidth = "100%";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "rgb(215,251,232)",
    color: "#4aa96c", 
    height: "60px",
    zIndex: 1500,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  profileMenu: {
  zIndex: 2000,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgb(215,251,232)",
    color: "#4aa96c",
  },
  title: {
  	flexGrow: 1,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function HideOnScroll(props) {
  const { children, window, open } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined }) && !open;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


function Navigator(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <HideOnScroll {...props} open = {open}>
    <div className={classes.root+ " nav-main"}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={!open? handleDrawerOpen : handleDrawerClose}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <Link className = "nav-logo-image" to="/">
				    <img
				      src="/images/forfavicon.png"
				      alt="Project Ekatra"
				      height="40"
				      loading="lazy"
				    />
				    <span className="logo-title" id="logoTitle">
				      Project Ekatra
				    </span>
				  </Link>
          </Typography>
          
          {Cookies.get("sessions") !== undefined && 
          		<div>
          			<IconButton
                aria-label="User Profile"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              	<img className = "nav-profile-image" src="/images/user.png" alt="Profile Pic"/>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
          		</div>
          		
          }
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="top"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick = {() => setOpen(false)}
      >
      <Toolbar />
      <div className={classes.drawerContainer} role = "presentation">
        <List>
          {[
		        {link: "/contents", text: "Resources"},
		        {link: "/contribute", text: "Contribute"},
		        {link: "/contributors", text: "Contributors"},
		        {link: "/about", text: "About"}          
          ].map((text, index) => (
            <ListItem button key={text.text} text = {text.text}>
              <Link to= {text.link} className="nav-navbar-item">
              {text.text}
            </Link>
            </ListItem>
          ))}
          <ListItem button key="Feedback" text = "Feedback">
          <a href="https://forms.gle/ugNLq6bQFUsMLCpZA" className="nav-navbar-item" target="_blank">
              Feedback
            </a>
          </ListItem>
          {Cookies.get("sessions") === undefined &&
          <ListItem button key="Login/Profile" text = "Login/Profile">
          <Link to ={"/login/"+encodeURIComponent(window.location.href)} className="nav-navbar-item">Login/SignUp</Link>
          </ListItem>}
        </List>
        </div>
      </Drawer>
    </div>
    </HideOnScroll>
  );
}

export default Navigator;
