import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PayWithWalletButton from './PayWithWalletButton';
import PayDirect from './PayDirect';

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
      
      <Dialog
        open={open}
        onClose={handleClose} 
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"انتخاب روش پرداخت"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className='text-center'>
            <PayWithWalletButton setOpen={setOpen}/>
            <br /><br />
            <PayDirect setOpen={setOpen}/>
            </div>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={_click}>تایید</Button>
          <Button onClick={handleClose} autoFocus>
            لغو
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}