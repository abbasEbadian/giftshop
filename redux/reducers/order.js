import * as t from '../types'

const init_state = {
    basket: []
}

const orderReducer = (state=init_state, action)=>{
    const {type, payload} = action
    
    switch(type){
        case t.UPDATE_BASKET: 
           
            return {
                ...state, 
                basket: payload
            }
        
        default: 
        return state
    }
}

export default orderReducer;