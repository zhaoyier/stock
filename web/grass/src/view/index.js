import * as React from 'react'
import ReactDOM from 'react-dom'

import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { rootRoutes } from '../route'
import store from '../store'
import 'antd/dist/antd.min.css'
import accountInfo from '../util/accountInfo'

function render(rootRoutes){
	const target = document.getElementById('container')
	ReactDOM.unmountComponentAtNode(target)
  ReactDOM.render(
    <Router routes={rootRoutes} history={hashHistory} />,
    target
  )
}

function firstRender() {
  const isLogin = accountInfo && accountInfo.username
  if (!isLogin) {
    window.location.href = '/signin.html'
  } else {
    render(rootRoutes)
  }
}

firstRender()

if (module.hot) {
  module.hot.accept('../route', () => {
    render(rootRoutes)
  })
}
