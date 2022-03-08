let base = "https://www.arsimodir.ir"

if(!process.env.NODE_ENV || process.env.NODE_ENV  === 'development')
    base = "http://localhost:8000" 

export const BASE_URL = base




const _ = (url) => {return BASE_URL + "/api/v1"+url} 


export const GET_BRANDS = _( "/brands/all" ) 
export const GET_CARDS  = _("/cards/all")
export const GET_POPULAR  = _("/cards/popular/")
export const GET_TOP_SALE  = _("/cards/top_sale/")
export const GET_TEMPLATES  = _("/cards/filtered/")
export const GET_CARD  = _("/cards/")
export const GET_COUNTRIES  = _("/country/all")


export const SEND_AUTH_CODE = _("/sms/send_verification_code/")
export const LOGIN = _("/check_auth/")
export const LOGOUT = _("/logout/")
export const REGISTER = _("/register/")
export const PROFILE = _("/profile/")
export const CONFIGS = _("/configs/")

export const GET_CART = _("/orders/get_cart/")
export const PATCH_CART = _("/orders/delete_from_cart/")
export const EMPTY_CART = _("/orders/delete_cart/")
export const ADD_TO_CART = _("/orders/add_to_cart/")

export const TOGGLE_FAVORITES = _("/favorites/toggle_favorite/")

export const SEND_REVIEW = _("/reviews/add_review/")
export const SEND_TICKET = _("/tickets/add_ticket/")
export const ADD_TICKET = _("/tickets/add_message/")
export const SEEN_TICKET = _("/tickets/seen/")
export const GET_PAYMENT_LINK = _("/orders/get_payment_url/")
export const GET_WALLET_DEPOSIT_LINK = _("/orders/get_wallet_deposit_url/")

export const PAY_WITH_WALLET = _("/orders/pay_with_wallet/")
export const CONVERT_POINT_TO_WALLET = _("/orders/convert_point_to_wallet/")

export const UPLOAD_BIRTH_CARD_IMAGE = _("/users/upload_birth_image/")
export const UPLOAD_NATIONAL_CARD_IMAGE = _("/users/upload_national_image/")
export const UPLOAD_AVATAR_IMAGE = _("/users/upload_avatar_image/")
export const UPDATE_PROFILE = _("/users/update_profile/")

export const ADD_CARD = _("/creditcard/add_card/")
export const DELETE_CARD = _("/creditcard/delete_card/")

export const SEARCH_OPTIONS = _("/search/options/")
export const CLOSE_TICKET = _("/tickets/close/")

export const APPLY_CODE = _("/orders/apply_code/")
export const SEND_CONTACT_US_MESSAGE = _("/contact-us/send_contact_us_message/")

