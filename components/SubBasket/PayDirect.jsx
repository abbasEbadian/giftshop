import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import {useSlector} from 'react-redux'
import {GET_PAYMENT_LINK } from '../../redux/endpoints'
import {toast} from 'react-toastify'
import  axios from 'axios'
function PayDirect({setOpen}) {
    // user = useSelector(s=>s.auth.user)
    const [loading, setLoading] = React.useState(false)
    const _payment = ()=>{
        setLoading(true)
        axios.post(GET_PAYMENT_LINK)
        .then(response=>{
          const {data} = response
          if (data.error === 0 && data.message){
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
    
    return (
        <Box>
            <LoadingButton loading={loading}
            onClick={_payment}
            variant="contained" color="primary" sx={{minWidth: "160px"}}>پرداخت مستقیم </LoadingButton>
        </Box>
    )
}

export default PayDirect