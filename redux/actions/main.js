import axios from 'axios'
import * as t from '../types'

export const get_initial_data = ()=>{
    return dispatch =>{
        dispatch(fetch_brands())
        dispatch(fetch_cards())
        dispatch(fetch_countries())
    }
}

export const fetch_brands = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_brands(true))
        return (
            axios.get(t.BASE_URL + "/api/brands/all")
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
        return axios.get(t.BASE_URL + "/api/cards/all")
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
export const fetch_countries = () =>{
    return async (dispatch, getState)=>{
        dispatch(update_fetching_countries(true))
        return axios.get(t.BASE_URL + "/api/country/all")
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

