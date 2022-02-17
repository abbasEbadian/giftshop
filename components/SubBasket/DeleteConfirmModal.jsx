import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({onClick, open, setOpen}) {


  const handleClose = () => {
    setOpen(false);
  };

  const _click = ()=>{
    onClick()
    handleClose()
  }
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        تایید خالی کردن سبد
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"تایید خالی کردن سبد"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف کارت های موجود در سبد خود اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_click}>تایید</Button>
          <Button onClick={handleClose} autoFocus>
            لغو
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}