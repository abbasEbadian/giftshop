import * as React from "react";
import ProfileAside from '../../components/ProfileAside'
import withAuth from "../../redux/withAuth";
import {profile} from "../../redux/actions";
import * as e from "../../redux/endpoints";
import Head from "next/head";
import {useSelector, useDispatch} from 'react-redux'
import { Grid, Card, Chip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import CardActions from '@mui/material/CardActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText  from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import {toast} from 'react-toastify'
import {IMaskInput} from 'react-imask'
 function CreditCards() {
  const user = useSelector(s=>s.auth.user)
  const [addMode, setAddMode] = React.useState(false)
  const [newCardNumber, setNewCardNumber] = React.useState("")
  const [newCardShaba, setNewCardShaba] = React.useState("")
  const [adding, setAdding] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [toDelete, setToDelete] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(profile())
  }, [])
  const _reset_form = ()=>{
    setNewCardNumber("")
    setNewCardShaba("")
  }
  const _pre_delete = (card)=>{
    setToDelete(card)
    setOpen(true)
  }

  const handleClose = ()=>{setOpen(false)}
  const _delete_card = ()=>{
    setDeleting(true)
    axios.post(e.DELETE_CARD, {number:  toDelete})
    .then(response=>{
      const {data} = response
      if(data.error === 0){
        toast.success(data.message)
        dispatch(profile())
        handleClose()
      }else{
        toast(data.message, {type: data.type})
      }
    })
    .catch(err=>{
      console.log(err)
      toast.error("خطا در برقراری ارتباط با سرور")
    })
    .finally(f=>{
      setDeleting(false)
    })
  }

  const _addCard = ()=>{
    if(newCardNumber.length !== 16 || (newCardShaba.length!==0 && newCardShaba.length !== 26)){
      toast.warning("اطلاعات وارد شده ناقص است");
      return
    }
    setAdding(true)
    axios.post(e.ADD_CARD, {number:newCardNumber, shaba: newCardShaba})
    .then(response=>{
      const {data} = response
      if(data.error === 0){
        toast.success(data.message)
        dispatch(profile())
        setAddMode(false)
      }else{
        toast(data.message, {type: data.type})
      }
      
    })
    .catch(err=>{
      console.log(err)
      toast.error("خطا در برقراری ارتباط با سرور")
    })
    .finally(f=>{
      setAdding(false)
    })
  }
  return (
    <section className="container" id="credits">
      <Head><title>گیفت استاپ | کارت های اعتباری</title></Head>
      <div className="row">
        <ProfileAside active="credit_cards" />
        <div className=" col-lg-9 col-12 py-5 cards" >
          <h5 className="text-basket pb-3 m-0">کارت های <span>اعتباری</span></h5>
          <Grid container spacing={2}>
            {user&&user.creditcard_set.length?user.creditcard_set.map(i=>{
              return <Grid item xs={12} md={6} lg={4} key={i.number} >
                  <Card className="card-item">
                    <CardContent >
                      <div className="d-flex justify-content-between">
                        <span>شماره کارت:</span>
                        <span>{i.number}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>شماره شبا:</span>
                        <span>{i.shaba || "-"}</span>
                      </div>
                    </CardContent>
                    <CardActions>
                      
                      {/* {i.accepted?
                        <Chip label="تایید شده" color="success" size="small" variant="outlined" className="opacity-50 ms-auto">

                        </Chip>
                      :<Chip label="در انتظار تایید" color="info" size="small" variant="outlined" className="opacity-50 ms-auto">

                      </Chip>} */}
                      <LoadingButton  endIcon={<DeleteIcon  classes={{root: "mx-0"}}/>} color="error" variant="outlined"  size="small" onClick={_=>_pre_delete(i.number)}>
                      </LoadingButton>
                    </CardActions>
                  </Card>
              </Grid>
            }): null}
            <Grid item xs={12} md={6} lg={4}>
                <Card className=" card-item"> 
                  {addMode?<>
                    <CardContent className="d-flex flex-column pb-0 pt-2">
                      <small>شماره کارت</small>
                      <IMaskInput
                      className="form-control form-control-sm"
                          mask= '0000-0000-0000-0000'
                          radix="."
                          lazy={false}
                          unmask={true} // true|false|'typed'
                          // ref={ref}
                          // inputRef={el => this.input = el} 
                          onAccept={
                            (value, mask) => setNewCardNumber(value)
                          }
                          dir="ltr"
                        />
                      <br className="mb-1"/>
                      <small>شماره شبا (اختیاری)</small>
                      <IMaskInput
                      className="form-control form-control-sm"
                        lazy={false}
                          mask= '{IR}000000000000000000000000'
                          radix="."
                          unmask={true} // true|false|'typed'
                          // ref={ref}
                          // inputRef={el => this.input = el} 
                          onAccept={
                            (value, mask) => setNewCardShaba(value)
                          }
                          dir="ltr"
                        />
                    
                    </CardContent>
                    <CardActions>
                      <LoadingButton  classes={{root:"addicon"}}  color="success" variant="contained"  size="small" onClick={_addCard} >افزودن
                      </LoadingButton>
                      <Button size="small" color="error" variant="outlined" className="mx-2" onClick={()=>setAddMode(false)}>لغو</Button>
                    </CardActions>
                  </>
                  :
                  <AddIcon onClick={e=>setAddMode(true)}/>
                  }
                  
                </Card>
              </Grid>
          </Grid>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"حذف کارت"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف این کارت اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={_delete_card} autoFocus color="success" variant="contained" size="small" loading={deleting}> 
            تایید
          </LoadingButton>
          <Button onClick={handleClose} color="error" variant="outlined" size="small">لغو</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
export default withAuth(CreditCards)