import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useSelector} from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AcceptRuleModal({open, setOpen}) {
    const configs = useSelector(s=>s.main.configs)
    const [ checked, setChecked] = React.useState(false)
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
      <Dialog
        onBackdropClick={e=>{return false}}
        disableEscapeKeyDown
        open={open || true}
        fullWidth
        maxWidth={"sm"}
        TransitionComponent={Transition}
        keepMounted
        className="mb-5 pb-5"
        aria-describedby="alert-dialog-slide-description"
      >
        <p className='fs-4 p-3'>{" قوانین گیفت استاپ"}</p>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {configs&&configs.rules&&configs.rules.content?
              configs&&configs.rules&&configs.rules.content.split("-").map((t, idx)=>{
                return t&&<span key={idx}> {"- "} {t}<br/><br/></span>
              })
            :""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="d-flex align-items-center justify-content-between w-100 border-top  pt-1">

          <FormControlLabel control={<Checkbox  checked={checked} onChange={e=>setChecked(e.target.checked)}/>} label={"قوانین را می پذیرم"} />
            
            <Button onClick={handleClose} variant={"outlined"} color="success" disabled={!checked}>ادامه</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}