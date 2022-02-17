import axios from 'axios'
import * as t from '../types'
import * as e from '../endpoints'
import { get_cart, profile } from '.'

export const get_initial_data = ()=>{
    return dispatch =>{
        dispatch(check_user())
        dispatch(fetch_brands())
        dispatch(fetch_popular_cards())
        dispatch(fetch_top_sale_cards())
        dispatch(fetch_countries())
        dispatch(get_cart())
        dispatch(profile())
    }
}

export const check_user = ()=>{
    return dispatch=>{
        const token = localStorage.getItem("token")
        if(token){
            dispatch({type:t.UPDATE_STATUS, payload: true})
            dispatch(profile())
        }
    }
}
export const fetch_brands = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_brands(true))
        return (
            axios.get(e.GET_BRANDS)
            .then(response=>{
                const {data} = response
                dispatch(update_brands(data))
            })
            .catch(err=>console.log(err))
            .finally(f=>setTimeout(() => {
                dispatch(update_fetching_brands(false))
            }, 2000))
        )
    }
}
export const fetch_cards = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_cards(true))
        return axios.get(e.GET_CARDS)
        .then((response)=>{
            const {data} = response
            dispatch(update_cards(data))
        })
        .catch(err=>{console.log(err)})
        .finally(f=>setTimeout(() => {
            dispatch(update_fetching_cards(false))
        }, 2000))
    }
}
export const fetch_popular_cards = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_cards(true))
        return axios.get(e.GET_POPULAR)
        .then((response)=>{
            const {data} = response
            dispatch(update_popular_cards(data))
        })
        .catch(err=>{console.log(err)})
        .finally(f=>setTimeout(() => {
            dispatch(update_fetching_cards(false))
        }, 2000))
    }
}
export const fetch_top_sale_cards = () =>{
    return async (dispatch, getState)=>{
        return axios.get(e.GET_TOP_SALE)
        .then((response)=>{
            const {data} = response
            dispatch(update_top_sale_cards(data))
        })
        .catch(err=>{console.log(err)})
        
    }
}
export const fetch_countries = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_countries(true))
        return axios.get(e.GET_COUNTRIES)
        .then((response)=>{
            const {data} = response
            dispatch(update_countries(data))
        })
        .catch(err=>{console.log(err)})
        .finally(f=>setTimeout(() => {
            dispatch(update_fetching_countries(false))
        }, 2000))
    }
}


export const update_brands = (brands)=>{
    return {
        type: t.UPDATE_BRANDS,
        payload: brands
    }
}
export const update_fetching_brands = (is_active)=>{
    return {
        type: t.UPDATE_FETCHING_BRANDS,
        payload: is_active
    }
}

export const update_cards = (cards)=>{
    return {
        type: t.UPDATE_CARDS,
        payload: cards
    }
}
export const update_top_sale_cards = (cards)=>{
    return {
        type: t.UPDATE_TOP_SALE,
        payload: cards
    }
}
export const update_popular_cards = (cards)=>{
    return {
        type: t.UPDATE_CARDS,
        payload: cards
    }
}
export const update_fetching_cards = (is_active)=>{
    return {
        type: t.UPDATE_FETCHING_CARDS,
        payload: is_active
    }
}
export const update_countries = (countries)=>{
    return {
        type: t.UPDATE_COUNTRIES,
        payload: countries
    }
}
export const update_fetching_countries = (is_active)=>{
    return {
        type: t.UPDATE_FETCHING_COUNTRIES,
        payload: is_active
    }
}

