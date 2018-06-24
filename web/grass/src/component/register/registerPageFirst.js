import React, {Component} from 'react'
import LogoTitle from './_widget/logoTitle'
import { connect } from 'react-redux'
import LanguageSwitch from './languageSwitch'
import { locale } from '../../config/locale'
import './registerPage.scss'
import { redirect } from '../../util/history'
import * as Cookies from 'js-cookie'
import {
  Form,
  Input,
  Button,
  Row,
  Col
} from 'antd'
import {
  changeRegisterInfo,
  accountValidEmail,
  accountValidUsername,
  accountRegister
} from '../../action/account'
const FormItem = Form.Item

@connect(state=>({
  registerInfo: state.registerInfo,
  lang: state.lang
}))
class RegisterPageFirst extends Component{
  constructor(props){
    super(props)
    this.state = {
      ensurePassword:'',
      validEmail:{
        status:'',
        message:''
      },
      validPassword:{
        status:'',
        message:''
      },
      validUsername:{
        status:'',
        message:''
      },
      validEnsurePassword:{
        status:'',
        message:''
      }
    }
  }
  componentWillMount(){
    this.__ = locale(this.props.lang === 'zh' ? 'CN' : 'en')
    document.title = this.props.lang === 'zh' ? '注册' : 'Register'
  }
  render(){
    const {
      registerInfo,
      dispatch
    } = this.props
    const {
      email,
      username,
      password
    } = registerInfo
    const {
      ensurePassword,
      validEmail,
      validPassword,
      validUsername,
      validEnsurePassword
    } = this.state
    document.title = this.props.lang === 'zh' ? '注册' : 'Register'
    const getText = locale(this.props.lang === 'zh' ? 'CN' : 'en')
    const emailPattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    return(<section className="registerPage">
        <LanguageSwitch />
        <header><LogoTitle title={getText('seller_register')}/></header>
        <h2>{getText('fill_in_basic_info')}</h2>
        <Row type='flex' justify='start'>
          <Col span="12">
             <Form horizontal>
              <FormItem
                label={getText('email_address')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus={validEmail.status}
                help={validEmail.message}
                required
              >
                <Input value={email} placeholder={getText('please_fill_in_email')}
                onChange={(e)=>{
                  dispatch(changeRegisterInfo({email:e.target.value}))
                }}
                onFocus={()=>this.setState({
                  validEmail:{
                    status:'',
                    message:''
                  }
                })}
                onBlur={(e)=>{
                  const email = e.target.value
                  if(!email){
                    return
                  }
                  if(!emailPattern.test(email) && email){
                    this.setState({
                      validEmail:{
                        status:'error',
                        message:getText('format_incorrect')
                      }
                    })
                    return
                  }
                  dispatch(accountValidEmail(email,(flag)=>{
                    if(flag === false){
                      this.setState({
                        validEmail:{
                          status:'error',
                          message:getText('email_registered')
                        }
                      })
                      return
                    }
                    dispatch(changeRegisterInfo({email}))
                  }))
                }}/>
              </FormItem>
              <FormItem
                label={getText('passwd')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus={validPassword.status}
                help={validPassword.message}
                required
              >
                <input className='ant-input' value={password} type='password' id='password' ref='password' placeholder={getText('please_fill_passwd')}
                  onChange={(e)=>{
                    dispatch(changeRegisterInfo({password:e.target.value}))
                    if(e.target.value == this.refs.ensurePassword.value){
                      this.setState({
                        validEnsurePassword:{
                          status:'',
                          message:''
                        }
                      })
                    }
                  }}
                  onFocus={()=>this.setState({
                    validPassword:{
                      status:'',
                      message:''
                    }
                  })}
                  onBlur={(e)=>{
                    const password = e.target.value
                    dispatch(changeRegisterInfo({password}))
                  }}
                />
              </FormItem>
              <FormItem
                label={getText('confirm_passwd')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus={validEnsurePassword.status}
                help={validEnsurePassword.message}
                required
              >
                <input className='ant-input' value={ensurePassword} type='password' ref='ensurePassword' placeholder={getText('confirm_passwd')}
                  onChange={(e)=>{
                    this.setState({ensurePassword:e.target.value})
                  }}
                  onFocus={()=>this.setState({
                    validEnsurePassword:{
                      status:'',
                      message:''
                    }
                  })}
                  onBlur={(e)=>{
                    if(this.refs.password.value != this.refs.ensurePassword.value){
                      this.setState({
                        validEnsurePassword:{
                          status:'error',
                          message:getText('password_not_same')
                        }
                      })
                      return
                    }
                    this.setState({ensurePassword:e.target.value})
                }}/>
              </FormItem>
              <FormItem
                label={getText('username')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus={validUsername.status}
                help={validUsername.message}
                required
              >
                <input className='ant-input' value={username} placeholder={getText('please_input_username')}
                onChange={(e)=>dispatch(changeRegisterInfo({username:e.target.value}))}
                onFocus={()=>this.setState({
                  validUsername:{
                    status:'',
                    message:''
                  }
                })}
                onBlur={(e)=>{
                  const username = e.target.value
                  if(!username){
                    return
                  }
                  dispatch(accountValidUsername(username,(flag)=>{
                    if(flag == 'false'){
                      this.setState({
                        validUsername:{
                          status:'error',
                          message: getText('username_registered')
                        }
                      })
                      return
                    } else {
                      dispatch(changeRegisterInfo({username}))
                    }
                  }))
                }}/>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Button type='primary' onClick={()=>{

                  if(!email && validEmail.message){
                    return
                  }
                  if(!email && !validEmail.message){
                    this.setState({
                      validEmail:{
                        status:'error',
                        message: getText('please_fill_in_email')
                      }
                    })
                    return
                  }
                  if(!emailPattern.test(email)){
                    this.setState({
                      validEmail:{
                        status:'error',
                        message: getText('format_incorrect')
                      }
                    })
                    return
                  }
                  if(!password){
                    this.setState({
                      validPassword:{
                        status:'error',
                        message: getText('please_fill_passwd')
                      }
                    })
                    return
                  }
                  if(!ensurePassword){
                    this.setState({
                      validEnsurePassword:{
                        status:'error',
                        message: getText('please_confirm_passwd')
                      }
                    })
                    return
                  }
                  if(!username){
                    this.setState({
                      validUsername:{
                        status:'error',
                        message: getText('please_input_username')
                      }
                    })
                    return
                  }
                  if(validEmail.message || validUsername.message || validPassword.message){
                    return
                  }
                  dispatch(accountValidEmail(email,(flag)=>{
                    if(flag === false){
                      this.setState({
                        validEmail:{
                          status:'error',
                          message: getText('email_registered')
                        }
                      })
                    }else{
                      dispatch(accountValidUsername(username,(flag)=>{
                        if(flag == 'false'){
                          this.setState({
                            validUsername:{
                              status:'error',
                              message: getText('username_registered')
                            }
                          })
                        }else{
                          let lowerCaseName = username.toLowerCase();
                          dispatch(accountRegister(email,lowerCaseName,password,(data)=>{
                            window.location.href = 'approve.html'
                          }))
                        }
                      }))
                    }
                  }))
                }}>{getText('submit')}</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </section>)
  }
}
export default RegisterPageFirst
