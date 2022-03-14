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
import * as e from '../../redux/endpoints'
function PayDirect({setOpen}) {
    // user = useSelector(s=>s.auth.user)
    const [loading, setLoading] = React.useState(false)
    const [payOpen, setPayOpen] = React.useState(false)
    const [redirecting, setRedirecting] = React.useState(false)
    const [card, setCard] = React.useState(null)
    const dispatch = useDispatch()
    
    const _payment = ()=>{
        setLoading(true)
        axios.post(GET_PAYMENT_LINK, {card, token: window.location.href.indexOf('org')>-1? "org": "ir"})
        .then(response=>{
          const {data} = response
          if (data.error === 0 ){
            let {clientRefId:card, source, amount} = data.data
            
            axios.post('/gen_code', data.data)
            .then(response2=>{
              let {data:data2} = response2
              if(data2.error === 0){
                if(data2.code){
                  let ddd = {
                    card,
                    description: data2.code
                  }
                  if(source === "wallet") ddd["amount"] = amount
                  axios.post(e.GENERATE_WALLET_TRANSACRTION, ddd)
                  .then(r=>{
                    let {data:data3} = r
                    if(data3.error === 0){
                      setRedirecting(true)
                      
                      toast.success("در حال انتقال", {
                        duration: 3000,
                        onClose: ()=>{
                          window.open("https://api.payping.ir/v2/pay/gotoipg/"+data2.code, "_self")
                          setOpen(false)  
                        }
                      })
                    }
                    else toast.error("خطا در ایجاد تراکنش")
                  })
                  .catch(err2=>{
                    console.log(err2)
                    toast.error("خطا در ایجاد تراکنش")
                  })
                }
              }else{
                toast.error(data2.message)
              }
            })
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
            <LoadingButton loading={loading || redirecting}
            onClick={e=>setPayOpen(true)}
            variant="contained" color="primary" sx={{minWidth: "160px"}}>پرداخت مستقیم </LoadingButton>
        </Box>
        <WalletDepositSelectCard open={payOpen} setOpen={setPayOpen} onClick={_payment} card={card} setCard={setCard}></WalletDepositSelectCard>
        </>
    )
}
export default PayDirect