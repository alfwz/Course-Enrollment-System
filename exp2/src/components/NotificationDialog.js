import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {DialogContentText} from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import './NotificationDialog.css';

export default function NoticationDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {renderDialogContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function renderDialogContent(){
        if(props.isSucceed){
            return (
                <div >
                        <DialogContentText>
                            <CheckCircleOutlineIcon className="succeed"/>
                            {props.message}
                        </DialogContentText>
                </div>
            )
        }

        return (
            <div >
                    <DialogContentText>
                        <ErrorIcon className="failed"/>
                        {props.message}
                    </DialogContentText>
            </div>
        )
    }
}
