import React from 'react'
import Button from '@mui/material/Button'
import {CONVERT_POINT_TO_WALLET} from '../../redux/endpoints'
import {profile} from '../../redux/actions'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'


function ConvertPointToWalletButton({points_converted, id}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)

    const _payment = ()=>{
        setLoading(true)

        axios.post(CONVERT_POINT_TO_WALLET, {id})
        .then(response=>{
          const {data} = response
          if (data.error === 0 && data.message){
            toast(data.message, {type: data.type})
            dispatch(profile())
          }else{
            toast(data.message, {type: data.type})
          }
        }).catch(e=>toast.error("خطا در برقراری ارتباط با سرور"))
        .finally(f=>{
            setLoading(false)
        })
      }
  return (<>
    {points_converted?
        <Button variant={"oultined"} disabled>تبدیل شده</Button>
        :
        <Button size={"small"}  loading={loading} variant={"contained"} onClick={_payment}>انتقال امتیاز به کیف پول</Button>} 
    </>
  )
}

export default ConvertPointToWalletButton