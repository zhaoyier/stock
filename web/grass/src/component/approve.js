import * as React from 'react'
import { Button, Modal, Row, Col } from 'antd'
import './approve.scss'
import { connect } from 'react-redux'
import { locale } from '../config/locale'
import LanguageSwitch from './register/languageSwitch'
import * as Cookies from 'js-cookie'


@connect(state => ({ lang: state.lang }))
class Approve extends React.Component {
  logout() {
    window.sessionStorage.login = ''
    Cookies.remove('data')
    location = 'signin.html'
  }
  render() {
    const { lang } = this.props
    const getText = locale(lang === 'zh' ? 'CN' : 'en')
    return (
      <div>
        <div className="approve">
          <Row>
            <Col style={{padding: '1rem', textAlign: 'right'}} span={2} push={22}>
              <a href="javascript:void(0);" onClick={() => { this.logout() }}>
                {getText('logout')}
              </a>
            </Col>
            <Col span={24}>
              {this.props.children}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Approve
