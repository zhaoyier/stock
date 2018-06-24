import * as React from 'react'
import ReactDOM from 'react-dom'

import store from '../store'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { rootRoutes } from '../route/approve'
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <Provider store={store}>
    <Router routes={rootRoutes} history={hashHistory} />
  </Provider>,
  document.querySelector('#container')
)

