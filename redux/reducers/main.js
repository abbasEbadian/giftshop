import * as t from '../types'
import {HYDRATE} from 'next-redux-wrapper';

const init_state = {
    popular_cards : [],
    top_sale_cards: [],
    brands: [],
    countries: [], 
    fetching_cards: false,
    fetching_brands: false,
    fetching_countries: false
}


  
const mainReducer = (state=init_state,action)=>{
    switch(action.type){
        case HYDRATE:
            return {...state, ...action.payload};

        case t.UPDATE_CARDS: 
            return {
                ...state,
                popular_cards: action.payload
            }
        case t.UPDATE_TOP_SALE: 
            return {
                ...state,
                top_sale_cards: action.payload
            }
        case t.UPDATE_BRANDS: 
            return {
                ...state,
                brands: action.payload
            }
        case t.UPDATE_COUNTRIES: 
            return {
                ...state,
                countries: action.payload
            }
        case t.UPDATE_FETCHING_BRANDS: 
            return {
                ...state,
                fetching_brands: action.payload
            }
        case t.UPDATE_FETCHING_CARDS: 
            return {
                ...state,
                fetching_cards: action.payload
            }
        case t.UPDATE_FETCHING_COUNTRIES: 
            return {
                ...state,
                fetching_countries: action.payload
            }
        default: return {...state}
    }
}
export default mainReducer
