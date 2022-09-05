import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import {GET_PAYMENT_LINK } from '../../redux/endpoints'
import WalletDepositSelectCard from './WalletDepositSelectCard'
import {toast} from 'react-toastify'
import  axios from 'axios'
import * as e from '../../redux/endpoints'
function PayDirect({setOpen}) {

    const [loading, setLoading] = React.useState(false)
    const [payOpen, setPayOpen] = React.useState(false)
    const [redirecting, setRedirecting] = React.useState(false)
    const [card, setCard] = React.useState(null)
    const [dargah, setDargah] = React.useState('zarinpal')

    const _payment = async ()=>{
        let user_location = ""
        setLoading(true)
        try {
          user_location = await axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client")
          user_location = JSON.stringify(user_location)
        } catch (error) {
          console.log(error)
        }
        axios.post(GET_PAYMENT_LINK, { card, dargah, user_location })
        .then(response=>{
          const {data} = response
          if (data.error === 0 ){
            let {clientRefId:card, source, amount} = data.data
            
            axios.post('/gen_code', {...data.data, dargah})
            .then(response2=>{
              let {data:data2} = response2
              if(data2.error === 0){
                if(data2.url){
                  let ddd = {
                    card,
                    description: data2.url.split("/")[ data2.url.split("/").length - 1 ]
                  }
                  if(source === "wallet") ddd["amount"] = amount
                  axios.post(e.GENERATE_WALLET_TRANSACRTION, ddd)
                  .then(r=>{
                    let {data:data3} = r
                    if(data3.error === 0){
                      setRedirecting(true)
                      window.open(data2.url, "_self")
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
        <WalletDepositSelectCard 
          open={payOpen} setOpen={setPayOpen}
          onClick={_payment} card={card} setCard={setCard}
          dargah={dargah} setDargah={setDargah}
          ></WalletDepositSelectCard>
        </>
    )
}
export default PayDirect