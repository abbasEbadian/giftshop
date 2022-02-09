import mainReducer from './main'
import authReducer from './auth'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    main: mainReducer,
    auth: authReducer
})
export default rootReducer