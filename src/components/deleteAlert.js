import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({handleAlertClose,handleAlertClickOpen,alertOpen,handleDelete}) {
 
    const HandleDelete = async()=>{
       await handleDelete()
        handleAlertClose()
    }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleAlertClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          alert!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Disagree</Button>
          <Button onClick={HandleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}