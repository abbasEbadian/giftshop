import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useSelector, useDispatch} from 'react-redux'
import Link from 'next/link'
import { update_login_modal } from '../redux/actions';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({open, setOpen}) {
    const loginModalOpen = useSelector(s=>s.main.loginModalOpen)
    const [ checked, setChecked] = React.useState(false)
    const handleClose = () => {
      dispatch(update_login_modal(false))
    };
    const dispatch = useDispatch()

  return (
    <div>
      <Dialog
        onBackdropClick={handleClose}
        open={loginModalOpen}
        fullWidth
        maxWidth={"xs"}
        TransitionComponent={Transition}
        keepMounted
        className="mb-5 pb-5"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className="text-center">
            ابتدا وارد سایت شوید
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={"contained"} color="success" className="mx-auto">
            <Link href="/auth"><a className='text-white'>
            ورود به حساب  
            </a>
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}