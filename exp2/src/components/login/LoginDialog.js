import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import {JwtService} from "../../services/JwtService";
import {DialogContentText} from "@material-ui/core";
import cookie from 'react-cookies';
import {TOKEN_COOKIE_NAME} from "../../Constant";

export default function LoginDialog(props) {
    const [errorMessage, setErrorMessage] = useState('');
    let username=null;
    let password=null;
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <TextField id="username" label="Username" fullWidth autoFocus onChange={event=>username=event.target.value}/>
                    <TextField id="password" label="Password" fullWidth type="password" onChange={event=>password=event.target.value}/>
                    <DialogContentText color="error">
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={login} color="primary" >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function login(){
        //send xhr
        //get jwt token store in cookies
        setErrorMessage('');
        JwtService.login(username, password)
            .then(response =>{
                cookie.save(TOKEN_COOKIE_NAME, response.data.id_token);
                window.location.reload();
            })
            .catch(error => {
                setErrorMessage(String(error.response.data.detail));
            });
    }

}
