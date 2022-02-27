import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Search from './Search'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open, setOpen}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        >
          <div className='d-flex align-items-center justify-content-between px-2 py-4'>
        <h5>فیلتر محصولات</h5>
        <Button onClick={e=>setOpen(false)}>
          <CloseIcon/>
        </Button>
      </div>
      <hr className="mt-0" />
        <Search setOpen={setOpen}/>
      </Dialog>
  );
}