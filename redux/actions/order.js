import axios from 'axios'
import * as t from '../types'
import * as e from '../endpoints'



export const get_cart = () =>{
    return async (dispatch, getState)=>{
        console.log(getState)
        axios.get(e.GET_CART).then(res=>{
            const {data} = res
            dispatch({type: t.UPDATE_BASKET,payload:  data })
        }).catch(e=>console.log(e))
    }
}
export const add_to_cart = (template_id, count) =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_brands(true))
        return (
            axios.get(e.GET_BRANDS)
            .then(response=>{
                const {data} = response
                dispatch(update_brands2(data))
            })
            .catch(err=>console.log(err))
            .finally(f=>setTimeout(() => {
                dispatch(update_fetching_brands(false))
            }, 2000))
        )
    }
}


export const update_brands = (brands)=>{
    return {
        type: t.UPDATE_BRANDS,
        payload: brands
    }
}

