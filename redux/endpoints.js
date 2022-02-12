export const BASE_URL   = "http://localhost:8000" 
// export const BASE_URL = "http://130.185.78.233:8000"

const _ = (url) => {return BASE_URL + "/api/v1"+url} 


export const GET_BRANDS = _( "/brands/all" ) 
export const GET_CARDS  = _("/cards/all")
export const GET_TEMPLATES  = _("/cards/filtered/")
export const GET_CARD  = _("/cards/")
export const GET_COUNTRIES  = _("/country/all")


export const LOGIN = _("/login/")
export const LOGOUT = _("/logout/")
export const REGISTER = _("/register/")
export const PROFILE = _("/profile/")

export const GET_CART = _("/orders/get_cart/")
export const PATCH_CART = _("/orders/delete_from_cart/")
export const ADD_TO_CART = _("/orders/add_to_cart/")

export const TOGGLE_FAVORITES = _("/favorites/toggle_favorite/")
