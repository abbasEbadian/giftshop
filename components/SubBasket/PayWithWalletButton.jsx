import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@mui/material'
import {PAY_WITH_WALLET} from '../../redux/endpoints'
import {get_cart, profile} from '../../redux/actions'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

function PayWithWalletButton({setOpen}) {
    const user = useSelector(s=>s.auth.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const _payment = ()=>{
        setLoading(true)

        axios.post(PAY_WITH_WALLET)
        .then(response=>{
          const {data} = response
          if (data.error === 0 && data.message){
            toast(data.message, {type: data.type})
            dispatch(get_cart())
            dispatch(profile())
            setOpen(false)
            setTimeout(()=>{
              router.push("/panel/purchase-report")
            }, 3000)
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
            <LoadingButton loading={loading}onClick={_payment} color={"success"} variant="contained" sx={{minWidth: "160px"}}> پرداخت با کیف پول</LoadingButton>
            <Typography sx={{fontSize: "12px", padding: "6px 0"}} >موجودی : <b className='text-success'>{(user.wallet?.balance || 0).toLocaleString()}</b> {" تومان "}</Typography >
        </Box>
    )
}

export default PayWithWalletButton