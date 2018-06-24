import * as React from "react";
import { redirect } from '../../util/history'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Input,
  Button,
  Steps,
  message
} from 'antd'
import LogoTitle from './_widget/logoTitle'
import {accountForgetPassword} from '../../action/account'
import './forgetPassword.scss'
import { locale } from '../../config/locale'
import {
  AccountForgetPassword,
  AccountResetPassword
} from '../../api/other'

const Step = Steps.Step;


@connect(state => ({ lang: state.lang }))
class ForgetPassword extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current: document.URL.indexOf('token') > -1 ? 1 : 0,
      userInformation: "",
      passWord: "",
      passWordAgain: "",
      timestamp: 120,
      noClick: false
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    const {
      current,
      userInformation,
      passWord,
      passWordAgain,
      noClick
    } = this.state
    let {
      timestamp
    } = this.state
    const {
      dispatch,
      lang,
    } = this.props
    const getText = locale(lang === 'zh' ? 'CN' : 'en')
    const infomation = <div>
      {getText('user_ID/Email_address')}：
      <Input
        type="text"
        style={{width: 330, marginRight: 33}}
        placeholder={getText('please_input_the_registered_User_ID_/_Email_address')}
        onChange={(e) => {
          this.setState({
            userInformation : e.target.value
          })
        }}
      />
      <Button
        type="primary"
        disabled={noClick}
        onClick={() => {
          if(userInformation !== ""){
            this.interval = setInterval(() => {
              if(timestamp == 0){
                clearInterval(this.interval);
                this.setState({
                  timestamp : 120,
                  noClick: false
                })
              }else{
                timestamp -= 1
                this.setState({
                  timestamp: timestamp,
                  noClick: true
                })
              }
            }, 1000);
            AccountForgetPassword({username: userInformation}, (info) => {
              if(info.errCode == 1){
                message.error(getText('the_user_does_not_exist'))
              }else{
                message.success(getText('success'))
              }
            })
          } else {
            message.error(getText('please_input_the_registered_User_ID_/_Email_address'))
          }
        }}
      >{`${getText('send_verification_email')} ${!noClick ? "" : `(${timestamp}s)`}`}</Button>
    </div>
    const passWordChangeStyle = {
      width: lang == "zh" ? 90 : 200
    }
    const passWordEdit = <div>
      <span className="passWordChange" style={passWordChangeStyle}>{getText('please_input_new_password')}：</span>
      <Input
        type="password"
        style={{width: 230}}
        onChange={(e) => {
          this.setState({
            passWord: e.target.value
          })
        }}
      /><br />
      <span className="passWordChange" style={passWordChangeStyle}>{getText('please_confirm_new_password')}：</span>
      <Input
        type="password"
        style={{width: 230, marginTop: 30, marginBottom: 30}}
        onChange={(e) => {
          this.setState({
            passWordAgain: e.target.value
          })
        }}
      /><br />
      <Button
        type="primary"
        style={{marginLeft: lang == "zh" ? 90 : 200, width: 230}}
        disabled={passWord == "" || passWord != passWordAgain}
        onClick={() => {
          const url = document.location.href
          const token = url.slice(url.indexOf("token=") + 6, url.indexOf("&") === -1 ? url.length : url.indexOf("&"))
          AccountResetPassword({
            token: token,
            newpass: passWord
          }, (info) => {
            if(!info.errCode){
              message.success(getText('success'))
              this.setState({
                current: 2
              })
              setTimeout(() => {
                window.location.href = "/signin.html"
              },2000)
            }
          })
        }}
      >{getText('submit')}</Button>
    </div>
    return(<section className='forgetPassword'>
      <div className="content">
        <LogoTitle title={getText('reset_password')}></LogoTitle>
        <Steps current={current}>
          <Step title={getText('inpput_account_details')} />
          <Step title={getText('reset_password')} />
          <Step title={getText('done')} />
        </Steps>
        <Row type='flex' justify='start' style={{marginTop: 70}}>
          <Col span="20">
            {current > 0 ? passWordEdit : infomation}
          </Col>
        </Row>
        <div className="back">
          <a href="/signin.html">{getText('back_to_Registration')}</a>
        </div>
      </div>
    </section>)
  }
}

export default ForgetPassword
