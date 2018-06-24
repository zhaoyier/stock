import React, {Component} from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { MAIN_MENU } from '../../constant'
import { redirect } from '../../util/history'
import { connect } from 'react-redux'
import { locale } from '../../config/locale'
import * as Cookies from 'js-cookie'
import './header.scss'

@connect(state=>({
  activeMenu: state.common.activeMenu,
  accountInfo: state.common.accountInfo
}))
class Header extends Component{
  logout(){
    window.sessionStorage.login = ''
    Cookies.remove('data')
    location.pathname = '/signin.html'
  }
  componentWillMount () {
    this.__ = locale(this.props.accountInfo.shop.originCode)
  }
  render(){
    const getText = this.__
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" href="##">英文</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="##">简体中文</a>
        </Menu.Item>
      </Menu>
    )
    const {
      activeMenu,
      accountInfo,
      dispatch
    } = this.props
    return (
      <header className="page-header">
        <div className="topHeader">
          <div style={{marginLeft:10}}>
            <img src="../../static/logo.png" alt="ezbuy is the best"/>
            <b>{accountInfo.shop.shopName}</b>
          </div>
          <div>
            <div>
              <ul>
                <li onClick={()=>{
                  this.logout()
                }}>
                  {getText('logout')}
                  <div></div>
                </li>
                <li>
                  {getText('welcome')},{accountInfo.username}
                  <div></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="topMenu">
        </div>
      </header>
    )
  }
}
export default Header
