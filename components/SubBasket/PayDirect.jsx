import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import {useSlector} from 'react-redux'
import {GET_PAYMENT_LINK } from '../../redux/endpoints'
import WalletDepositSelectCard from './WalletDepositSelectCard'
import {toast} from 'react-toastify'
import  axios from 'axios'
import {profile} from '../../redux/actions'
import {useDispatch} from 'react-redux'
function PayDirect({setOpen}) {
    // user = useSelector(s=>s.auth.user)
    const [loading, setLoading] = React.useState(false)
    const [payOpen, setPayOpen] = React.useState(false)
    const [card, setCard] = React.useState(null)
    const dispatch = useDispatch()
    const _payment = ()=>{
        setLoading(true)
        axios.post(GET_PAYMENT_LINK, {card})
        .then(response=>{
          const {data} = response
          if (data.error === 0 && data.message){
            toast.success('در حال انتقال', {
              onClose: ()=>{
                dispatch(profile())
              }
            })
            window.open("https://api.payping.ir/v2/pay/gotoipg/"+data.message, )
            setOpen(false)
          }else{
            toast(data.message, {type: data.type})
          }
        }).catch(e=>console.log(e))
        .finally(f=>{
            setLoading(false)
        })
      }
    
    return (<>
        <Box>
            <LoadingButton loading={loading}
            onClick={e=>setPayOpen(true)}
            variant="contained" color="primary" sx={{minWidth: "160px"}}>پرداخت مستقیم </LoadingButton>
        </Box>
        <WalletDepositSelectCard open={payOpen} setOpen={setPayOpen} onClick={_payment} card={card} setCard={setCard}></WalletDepositSelectCard>
        </>
    )
}

export default PayDirect