import mainReducer from './main'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    main: mainReducer
})
export default rootReducer