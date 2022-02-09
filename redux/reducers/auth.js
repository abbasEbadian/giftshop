const init_state = {
    user: null,
    authenticated: false,
    loading: false,
    register_success: false
}

const authReducer = (state=init_state, action)=>{
    const {type, payload} = action

    switch(type){
        default: 
        return state
    }
}

export default authReducer;