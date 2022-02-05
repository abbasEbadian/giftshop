import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }
// create a makeStore function
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
      if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
      return nextState
    } else {
      return rootReducer(state, action)
    }
  }
  
const makeStore = context => createStore(reducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});