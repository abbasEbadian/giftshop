import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormSelect } from 'react-bootstrap';
import { Typography } from '@mui/material';
import {useSelector} from 'react-redux'
export default function WalletDepositSelectCard({onClick, open, setOpen, cards=[], card, setCard}) {

  const handleClose = () => {
    setOpen(false);
  };

  const _click = ()=>{
    onClick()
    handleClose()
  }
  const [_cards, setCards] = React.useState([])
  const user = useSelector(s=>s.auth.user)
  React.useEffect(()=>{
    console.log(user && user.creditcard_set)
    if(user && user.creditcard_set)
      setCards(user.creditcard_set)
    else if(cards){
      setCards(cards)
    }
  }, [user, cards])
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        تایید خالی کردن سبد
      </Button> */}
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title2"
        aria-describedby="alert-dialog-description2"
      >
        <DialogTitle id="alert-dialog-title2">
          {"انتخاب کارت بانکی: "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description2">
            <FormSelect value={card} onChange={e=>setCard(e.target.value)}>
              <option value="0">انتخاب کارت</option>
              {_cards?_cards.map((item, idx)=>{
                return <option key={idx} value={item.number}>{item.number + (!item.accepted?" - تایید نشده":"")} </option>
              }): <p>کارتی ثبت نکرده اید.</p>}
            </FormSelect>
              {_cards?<Typography  sx={{color: "crimson", marginTop:"16px"}} component="p" variant={"caption"} >توجه: درصورتی که کارت انتخاب شده ، با کارتی که در صفحه درگاه انتخاب  می شود  یکسان نباشد ، پرداخت انجام نخواهد شد.</Typography>: null}
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