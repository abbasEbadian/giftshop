import { Button } from '@mui/material'
import React, { useMemo, useState } from 'react'
import LoaderButton from "./LoaderButton";
import {ADD_TO_CART} from '../redux/endpoints'
import { useDispatch } from 'react-redux';
import { get_cart, update_login_modal } from '../redux/actions';
import { toast } from 'react-toastify';
import axios from 'axios'
const NoSale = () => {
    return <Button color='error' variant="outlined" className="exclude mt-2" fullWidth>ناموجود</Button>
}
const AskMe = ({ link }) => {
    return <a target={"_blank"} href={link ?? "#"} className="text-primary w-100 mt-2"><Button color='info' variant="outlined" className="exclude" fullWidth>استعلام موجودی</Button></a>
}
const AddToCartButton = React.memo(({ template, whatsappLink, basket }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const increaseCount = () => {}
    const decreaseCount = () => {}
    console.log(basket)
    const [count, is_in_cart] = useMemo(() => {
        let lines = basket?.orderlines?.filter(line => line.template_id.id === template.id)
        if(!lines) return [0, false]
        return [lines.length, true ]
    }, [basket])

    const _addToCart = () => {
        setLoading(true)
        axios.post(ADD_TO_CART, {
          template_id: template.id
        }).then(({data}) => {
          if (data.error === 0) dispatch(get_cart())
          else if (data.error === 1 && data.message.indexOf('وارد') > -1) {
            dispatch(update_login_modal(true))
          }
          toast(data.message, { type: data.type })
        })
          .catch(AddToCardError => console.log(AddToCardError) )
          .finally(f => setLoading(false) )
      }

    return (
        <>
            {template?.no_sell ? <NoSale /> :
                template?.ask_me ? <AskMe link={whatsappLink} />
                    : <>{
                        is_in_cart ?
                            <div dir="ltr" className="counter">
                                <span onClick={increaseCount}>+</span>
                                <span className="border-bottom mx-2 ">{count}</span>
                                <span onClick={decreaseCount}>-</span>
                            </div>
                            :
                            <LoaderButton text={"افزودن به سبد"} loading={loading} onClick={_addToCart} />
                        }
                    </>

            }
        </>
    )
})

export default AddToCartButton