import React, {Component} from 'react'
import {Button,Modal, Row, Col} from 'antd'
import './approve.scss'
import {connect} from 'react-redux'
import {redirect} from '../util/history'
import { locale } from '../config/locale'
import LanguageSwitch from './register/languageSwitch'
import * as Cookies from 'js-cookie'

@connect(state => ({ lang: state.lang }))
class ApproveIndex extends Component{
  constructor(props){
    super(props)
    this.state={
      applied:false,
      isApproved:-1,
      visible:false
    }
  }
  componentWillMount() {
    console.log(Cookies.get('data'))
    if(Cookies.get('data') !== undefined){
      let data = JSON.parse(Cookies.get('data'))
      console.log("approve", data);
        if(data.hasOwnProperty('shop')){
          this.setState({applied:true})
          if(data.shop.isApproved == false){
            this.setState({isApproved:false})
            if(data.shop.approvalProcessing == true){
              this.setState({visible:true})
            }
          }
        }
    }
  }
  render(){
    const{lang } = this.props
    const getText = locale(lang === 'zh' ? 'CN' : 'en')
    const {
      isApproved,
      applied,
      visible
    } = this.state
    // 修改界面布局在 chooseEntrance 这个变量里面，因为下面有一坨我也不敢改的逻辑重复调用了界面UI，而我不能违反DRY原则
    const chooseEntrance = (
      <div>
        <Row style={{marginBottom: 50}}>
          <Col span={2} push={22}>
            <LanguageSwitch />
          </Col>
        </Row>
        <Row style={{marginBottom: 50}}>
          <Col span={6}>
            <p style={{lineHeight: '40px', fontSize: 20, textAlign: 'right', marginRight: 20}} > {getText('China Sellers Registration')} </p>
          </Col>
          <Col span={18}>
            <p style={{display: 'inline-block', textAlign: 'left', marginRight: 20}}><Button style={{minWidth: 200,height:40,fontSize:20}} size="large" onClick={()=>{
            redirect('/personalSettled')
          }}>{getText('Personal Account Registration')}</Button></p>
            <p style={{display: 'inline-block', textAlign: 'left'}}><Button style={{minWidth: 200,height:40,fontSize:20}} size="large" onClick={()=>{
            redirect('/organizationSettled')
          }}>{getText('Business Organization Registration')}</Button></p>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <p style={{lineHeight: '40px', fontSize: 20, textAlign: 'right', marginRight: 20}} >{getText('Non-China Sellers Registrations')}</p>
          </Col>
          <Col span={18}>
            <p style={{textAlign: 'left'}}><Button style={{minWidth: 200,height:40,fontSize:20}} size="large" onClick={()=>{
            redirect('/unChinaOrgainzationSettled')
          }}>{getText('Business Organization Registration')}</Button></p>
          </Col>
        </Row>
      </div>
    )
    const getContent = () =>{
      if(!applied){
        return (
          <section style={{width: '100%'}}>
            {chooseEntrance}
          </section>
          )
      }else{
        if(isApproved == false){
          return <section>
            {
              !visible && (<p style={{color:'red'}}>{getText('approval failed!')}</p>)
            }
            {chooseEntrance}
          </section>
        }else{
          return <p style={{fontSize:20}}>{getText('awaiting approval please wait patiently1')}</p>
        }
      }
    }
    return (<section>
        {getContent()}
      <Modal closable={false} visible={visible} maskClosable={false} footer={
        <Button type='primary' onClick={()=>{
          Cookies.remove('data')
          window.location.pathname = window.location.pathname.replace('approve.html', 'signin.html')
        }}>{getText('confirm')}</Button>
      }>
        {/* <p style={{lineHeight:'50px'}}>{getText('awaiting approval please wait patiently')}</p> */}
        <p style={{lineHeight:'50px'}}>Your ezseller account registration is submitted and awaiting approval, please wait patiently!</p>
      </Modal>
      </section>)
  }
}
export default ApproveIndex
