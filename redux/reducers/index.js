import mainReducer from './main'
import authReducer from './auth'
import {combineReducers} from 'redux'
import { sessionReducer } from 'redux-react-session'
import orderReducer from './order'
const rootReducer = combineReducers({
    main: mainReducer,
    auth: authReducer,
    order:orderReducer,
    session: sessionReducer
})
export default rootReducer