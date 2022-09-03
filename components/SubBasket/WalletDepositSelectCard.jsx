import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormSelect } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { IMaskInput } from 'react-imask'
import { toast } from 'react-toastify'
import { Badge } from '@mui/material';
import { Check, Mail } from '@mui/icons-material';

export default function WalletDepositSelectCard({ onClick, open, setOpen, cards = [], card, setCard, dargah, setDargah }) {
  const [newNumber, setNewCardNumber] = React.useState("")

  const changeDargah = e => setDargah(e)

  const handleClose = e => setOpen(false);

  const _click = () => {

    if (card.length !== 16) {
      toast.warning("کارت انتخاب شده صحیح نمی باشد")
      return
    }
    setCard(newNumber)
    onClick()
    handleClose()
  }

  const _change = (x) => {
    setNewCardNumber(x)
    if (x.length === 16) {
      setCard(x)
    }
  }

  const _setCard = (_card) => {
    if (_card.length === 16) {
      setCard(_card)
    }
  }

  const [_cards, setCards] = React.useState([])
  const user = useSelector(s => s.auth.user)

  React.useEffect(() => {
    if (user && user.creditcard_set)
      setCards(user.creditcard_set)
    else if (cards) {
      setCards(cards)
    }
  }, [user, cards])

  return (
    <div>
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
            <FormSelect value={card} onChange={e => _setCard(e.target.value)}>
              <option value="0">انتخاب کارت از لیست کارت های من</option>
              {_cards ? _cards.map((item, idx) => {
                return <option key={idx} value={item.number}>{item.number + (!item.accepted ? " - تایید نشده" : "")} </option>
              }) : null}
            </FormSelect>
            <br />
            {_cards ? <span className='d-block'>یا</span> : ""}
            <br />
            <small className="mt-2">وارد کردن شماره کارت جدید</small>
            <IMaskInput
              className="form-control form-control-md mt-2 text-center"
              mask='0000-0000-0000-0000'
              radix="."
              lazy={false}
              unmask={true}
              onAccept={
                (value, mask) => _change(value)
              }
              dir="ltr"

            />

          </DialogContentText>
          
          <p className='mt-2'> درگاه:</p>
          <div className="d-flex align-items-center justify-content-center">

            <Button onClick={e => changeDargah("zarinpal")} color={"success"} variant={dargah === 'zarinpal' ? "contained" : "outlined"} className={"d-flex flex-column"} sx={{ minWidth: 70 }}>
              <img src={"/image/zarinpal.png"} ></img>

            </Button>
            <div className='px-2'></div>
            <Button onClick={e => changeDargah("irandargah")} color={"success"} variant={dargah === 'irandargah' ? "contained" : "outlined"} className={"d-flex flex-column"} sx={{ minWidth: 70 }}>
              <img src={"/image/irandargah.png"} width={42}></img> <br />
              <small>ایران درگاه</small>
            </Button>


          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={_click} disabled={!card}>تایید</Button>
          <Button onClick={handleClose} autoFocus>
            لغو
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}