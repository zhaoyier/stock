import * as React from 'react'
import { connect } from 'react-redux'
import {Row, Col, Button, Input, Form, Modal} from 'antd'
import { warn, success } from '../../util/antd'
import {
	sellerUpdatePassword
} from '../../action/account'
import {changeMenu} from '../../action/common'
import { locale } from '../../config/locale'
import './changePassword.scss'
const FormItem = Form.Item

@connect(state =>({
	accountInfo: state.common.accountInfo
}))
class ChangePassword extends React.Component{
  constructor(props){
    super(props)
    this.state={
      oldpass:"",
      newpass:"",
      repeat:"",
      repeatSuccess:"",
      change:false
    }
  }
  componentWillMount(){
    const {
      accountInfo,
      dispatch
    } = this.props
    dispatch(changeMenu({
      main:0,
      sub:"40"
    }))

		this.__ = locale(accountInfo.shop.originCode)
	}
	canSub(){
		const {
			oldpass,
			newpass,
			repeat,
		} = this.state
		let can = false
		if(!oldpass){
			warn('请输入旧密码！')
		}else if(!newpass){
			warn('新密码不能为空！')
		}else if(repeat !== newpass){
			warn('两次输入密码不同！')
		}else {
			can = true
		}
		return can
	}
	render(){
		const {
			dispatch,
			accountInfo
		} = this.props
		const {
			oldpass,
			newpass,
			repeat,
			repeatSuccess,
			change
		} = this.state
		const {sellerId} = accountInfo
		const formItemLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 12 },
		}
		const getText = this.__
		return (<section className="changePassword">
				<h1>{getText('change_passwd')}</h1>
				<div className="update">
				 <Form horizontal>
					<FormItem
						{...formItemLayout}
						label={getText('old_passwd')}
						hasFeedback
					>
						<Input type="password" value={oldpass} style={{width:200}} onChange={(e)=>{
							this.setState({oldpass:e.target.value})
						}}/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label={getText('new_passwd')}
						hasFeedback
					>
						<Input type="text" value={newpass} style={{width:200}} onChange={(e)=>{
							this.setState({
								newpass:e.target.value,
								repeatSuccess:e.target.value === repeat ? 'success' : 'warning'
							})
						}} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label={getText('confirm_passwd')}
						hasFeedback
						validateStatus = {repeatSuccess}
					>
						<Input type="text" value={repeat} style={{width:200}} onChange={(e)=>{
							this.setState({
								repeat:e.target.value,
								repeatSuccess : e.target.value === newpass ? 'success' : 'warning'
							})
						}} />
					</FormItem>
					<FormItem wrapperCol={{ span: 12, offset: 7 }}>
						<Button type="primary" onClick={()=>{
							this.setState({change:true})
						}}>{getText('confirm')}</Button>
						<Button  type="primary" style={{marginLeft:25}} onClick={()=>{
							this.cleanState()
						}}>
							{getText('reset')}
						</Button>
					</FormItem>
				</Form>
				</div>
				{
					change && (
						<Modal title={getText('confirm_passwd')}
						visible={true}
						okText={getText('confirm')}
						cancelText={getText('cancel')}
						onOk={() => {
							if(this.canSub()){
								dispatch(sellerUpdatePassword(oldpass,newpass,(success)=>{
									if(success){
										this.cleanState()
									}else{
										this.setState({
											oldpass:''
										})
									}
								}))
							}
						}}
						onCancel={() => {
							this.setState({change:false})
						}}>
							<div>
								{getText('your_new_passwd_is')}：{newpass}<br />
								{getText('press_confirm_or_cancel')}
							</div>
						</Modal>
					)
				}
			</section>
		)
	}
	cleanState(){
		this.setState({
			oldpass:'',
			newpass:'',
			repeat:'',
			repeatSuccess:'',
			change:false
		})
	}
}

export default ChangePassword
