import * as t from '../types'

const init_state = {
    user: null,
    authenticated: false,
    loading: false,
    register_success: false
}

const authReducer = (state=init_state, action)=>{
    const {type, payload} = action
    
    switch(type){
        case t.UPDATE_USER: 
            return {
                ...state, 
                user: payload
            }
        case t.UPDATE_STATUS:
            return {
                ...state,
                authenticated: payload
            }
        default: 
        return state
    }
}

export default authReducer;