import * as React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { rootRoutes } from '../route/register'
import store from '../store/register'
import { Router, hashHistory } from 'react-router'
import 'antd/dist/antd.min.css'


const container = document.querySelector('#container')
ReactDOM.render(<Provider store={store}>
    <Router routes={rootRoutes} history={hashHistory} />
  </Provider>, container)

