
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from '../reducer'

const middleware = [reduxThunk]

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')

  middleware.push(createLogger())
}

const createStoreWithMiddleware = applyMiddleware(
  ...middleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

export default store