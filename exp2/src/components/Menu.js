import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import LoginDialog from "./login/LoginDialog";
import {TOKEN_COOKIE_NAME} from "../Constant";
import * as cookie from "react-cookies";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Menu() {
  const classes = useStyles();
  const token = cookie.load(TOKEN_COOKIE_NAME);
  const loginString = token ? "Logout" : "Login";
  //react hook allow use state in function component
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Course Enrollment System
          </Typography>
          <Button color="inherit" component={Link} to ="/">All Courses</Button>
          <Button color="inherit" component={Link} to ="/enrolled-courses">Enrolled Courses</Button>
          <Button color="inherit" onClick={handleLoginClick}>{loginString}</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={openDialog} handleClose={handleDialogClose} />
    </div>
  );

  function handleDialogClose(){
    setOpenDialog(false);
  }

  function handleLoginClick(){
    if(token){
      cookie.remove(TOKEN_COOKIE_NAME);
      window.location.reload();
    }else{
      setOpenDialog(true);
    }
    setOpenDialog(true);
  }
}
