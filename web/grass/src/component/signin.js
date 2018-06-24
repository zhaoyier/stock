
import { warn } from '../util/antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { redirect } from '../util/history'
import LanguageSwitch from './register/languageSwitch'
import { locale } from '../config/locale'
import SettleProtocol from './register/_widget/settleProtocol'
import LogoTitle from './register/_widget/logoTitle'
import './signin.scss'
import * as Cookies from 'js-cookie'
import {
  Checkbox,
  Col,
  Row,
  Form,
  Input,
  Button,
  message,
  Icon
} from 'antd'
const FormItem = Form.Item
import {
  accountSignin
} from '../action/account'

@connect(state => ({ lang: state.lang }))
class SigninPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      isLoading: false
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.clickSignin()
      }
    })
  }
  componentWillMount() {
    const { lang } = this.props
    const cookie = Cookies.get('data')
    let data = cookie ? JSON.parse(cookie) : {}
    if(data.hasOwnProperty('username')){
      if(data.hasOwnProperty('shop') && data.shop.isApproved){
        window.location.pathname = window.location.pathname.replace('signin.html', 'index.html')
      }else{
        window.location.pathname = window.location.pathname.replace('signin.html', 'approve.html')
      }
    }
  }
  clickSignin() {
    const{ dispatch, lang } = this.props
    const username = this.refs.username.value
    const password = this.refs.password.value
    const getText = locale(lang === 'zh' ? 'CN' : 'en')

    if (!username || !password) {
      return warn(getText('please_fill_username_passwd'))
    }

    if(this.state.isLoading) {
      return false
    }

    this.setState({
      isLoading: true
    })

    const failCb = (res) => {
      this.setState({
        isLoading: false
      })
      switch(res.errCode) {
        case 1:
          message.error('无效的登录名和密码')
          break
        default:
          message.error(res.errMessage)
          break
      }
    }
    dispatch(accountSignin(username,password,(data)=>{
      var expireDate = new Date()
      expireDate.setDate(expireDate.getDate() + 1)
      if (data.isActivated && data.shop === undefined) {
        window.location.href = '/approve.html'
      }
      if(data.shop.isApproved){
        sessionStorage.login = 'true'
        if (data.hasOwnProperty('shop')) {
          // 登录成功，记录cookie
          Cookies.set('data', data, {expires: expireDate})
          // 重构商品编辑页面
          window.localStorage.setItem("beta_edit", "on");
          window.location.href = '/index.html'
        } else {
          window.location.href = '/approve.html'
        }
      } else if(!data.shop.isApproved && !data.shop.approvalProcessing) {
        message.warn('该账户审核被拒绝，请联系商家运营')
        failCb()
      } else if(data.shop.approvalProcessing) {
        message.warn('已提交未审核')
        failCb()
      } else {
        message.warn('登录失败，请重试')
        failCb()
      }
    }, (res) => {
      failCb(res)
    }))
  }

  render() {
    const {
      visible,
      isLoading
    } =  this.state
    const {
      dispatch,
      lang
    } = this.props
    const getText = locale(lang === 'zh' ? 'CN' : 'en')
    return (
      <section className='signin'>
        <header className='signinHeader'>
          <div className="title">
            <img className="ezbuy" src="../resources/static/ezbuyR.png" alt="ezbuy is the best"/>
            <span className="span">{getText('seller_login')}</span>
            <div className="languageSwitch">
              <LanguageSwitch />
            </div>
          </div>
        </header>
        <div className="content">
          <div className="main">
            <div className="signinForm">
              <div className="inputArea">
                <p className='title'><label htmlFor="username">{getText('username')}：</label></p>
                <p><input ref='username' className='ezbuyInput' type='text' id='username' placeholder={getText('please_fill_email_username')} /></p>
              </div>
              <div className="inputArea">
                <p className='title'>
                  <label htmlFor="username">{getText('passwd')}：</label>
                  <a style={{color : '#3e82f7'}} onClick={()=>redirect('/forgetPassword')}>{getText('forget_password')}</a>
                </p>
                <p>
                  <input ref='password' className='ezbuyInput' type='password' id='password' placeholder={getText('please_fill_passwd')} />
                </p>
                <p className='tips'>
                  <label className="label-custom-checkbox" htmlFor="custom-checkbox">
                    <input defaultChecked={true} id="custom-checkbox" type="checkbox" className="custom-checkbox" />
                    <img className="ezbuy" src="../static/blue-right.png" alt="ezbuy is the best"/>
                  </label>
                  {getText('have_read_terms')}
                  <a className="sign-document"
                    onClick={()=> {
                      // this.setState({visible:true});
                      const url = lang === "zh" ?  "/asset/ezbuysellerterms.html" : "https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub"
                      window.open(url, "_blank");
                  }}>
                    {getText('have_read_terms_words')}
                  </a>
                </p>
              </div>
              <div className='button'>
                <a onClick={()=>this.clickSignin()}>
                  { isLoading ?
                    <span>
                      <span style={{marginRight: '10px'}}>{ getText('login in') }</span>
                      <Icon type="loading" />
                    </span>
                    : getText('login') }
                </a>
              </div>
              <p className='register'>
                <a onClick={()=>redirect('/registerPageFirst')}>{getText('register')}</a>
              </p>
            </div>
          </div>
        </div>
        <SettleProtocol isVisible={visible} onClick={()=>this.setState({visible:false})} />
      </section>
    )
  }
}

export default SigninPage
