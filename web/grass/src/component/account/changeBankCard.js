import * as React from 'react'
import { Component } from 'react'
import {
	getText,
    isCN,
    isUS,
  	showTimestamp
} from '../../util/kit'
import { Switch, Tabs, DatePicker, Form, Input, Button, Select, Table, Row, Col, Modal, Cascader, message, Tooltip } from 'antd'
import {
	UserTransferAccountInfo,
	UserTransferAccountInfoUpdate,
	UserTransferAccountInfoUpdateCancel
} from '../../services/EzSellerService'

function getModifyInterval() {
  const isCNOrUs = isCN || isUS
  return isCNOrUs ? 30 : 15
}

function getApplyEditBtnText(status) {
	if ( status === 2) {
		return getText('Waiting for audit')
  }
  if ( status === 3) {
		return getText('Modify reject')
  }
  if ( status === 6 ) {
    return getText('In effect')
  }
	return getText('Apply Edit')
}

function getTimeText(time, isPersonalShop) {
  const formatTime = showTimestamp(time)
  return isCN ?
  `(已于 ${formatTime} 提交修改申请${isPersonalShop ? '' : ', 请联系运营审核'})`:
  `(The revised application has been submitted in ${formatTime}${isPersonalShop ? '' : ', please contact the operation audit'})`
}

function getTooltipText(isPersonalShop) {
	if (isPersonalShop) {
		return getText('After the application is submitted, it will take effect after 48 hours')
  }
  return getText(`Due to the safety of bank accounts, the time to change again needs more than ${getModifyInterval()} natural days`)
}

const FormItem = Form.Item

class ChangeBankCard extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			accountInfo: {
				transferAccount: {},
				changeTransferAccount: {},
				changeStatus: 0,
				rejectedMsg: '',
				changeDate: ''
			},
			formTransferAccount: {},
			password: '',
			passwordError: {},
			disabledEditBank: true
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleOk = this.handleOk.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.changePassword = this.changePassword.bind(this)
		this.updateCancel = this.updateCancel.bind(this)
	}

	componentWillMount() {
		this.userTransferAccountInfo()
	}
	userTransferAccountInfo() {
		UserTransferAccountInfo()
		.then(result => {
			this.setState({
				accountInfo: result,
				password: '',
			})
		})
	}
	updateCancel() {
		let password = ''
		Modal.confirm({
			title: getText('Please fill in the account login password'),
			content:
				<Input type="password" onChange={e => password = e.target.value}/>,
			onOk: () => {
				if (password !== '') {
					UserTransferAccountInfoUpdateCancel(password)
						.then( result => {
							if (result) {
								this.userTransferAccountInfo()
							}
						} )
        		}
			}
		})
	}
	changePassword(e) {
		this.setState({
			password: e.target.value
		})
		if (e.target.value !== '') {
			this.setState({passwordError: {}})
		} else {
			this.setState({
				passwordError: {
					validateStatus: 'error',
					help: getText('Please fill in the security code')
				}
		 })
		}
	}
	updateAccountInfo() {
		const { password, formTransferAccount } = this.state
		UserTransferAccountInfoUpdate(password, formTransferAccount)
		.then(result => {
			this.setState({
				visible: false,
				confirmLoading: false,
				password: ''
			})
			this.userTransferAccountInfo()
			if (result.errMessage) {
				message.error(result.errMessage)
			} else {
				message.success(getText('Modify successfully'))
				this.setState({
					disabledEditBank: true
				})
			}
		})
	}
	getCorrectTransferAccount() {
		const { accountInfo } = this.state
		const { changeStatus, transferAccount, changeTransferAccount } = accountInfo
		const returnChangeStatus = [2, 3, 5, 6]
		if (returnChangeStatus.includes(changeStatus)) {
			return changeTransferAccount
		}
		return transferAccount
	}
	isDisabledApplyEditBtn() {
		const { changeStatus, changeDate } = this.state.accountInfo
    const now = new Date().getTime()
    const interval = getModifyInterval()
		const isPending = changeStatus === 2 || changeStatus === 6
    const isSucceed = changeStatus === 5 && (now - changeDate * 1000 < interval * 24 * 60 * 60 * 1000)
    const isPendingSucceed = changeStatus === 6 && (now - changeDate * 1000 < interval * 24 * 60 * 60 * 1000)
		return isPending || isSucceed || isPendingSucceed
	}
	handleSubmit(e) {
		e && e.preventDefault()
		this.props.form.validateFields((err, values) => {
			// if (values.accountNumber.length !== 16 && values.accountNumber.length !== 19) {
			//   return message.error('银行卡为16位或者19位纯数字');
			// }
			if (!err) {
				if ( values.agencyAddress ) {
					values.agencyAddress = values.agencyAddress.join(',')
				}
				this.setState({
					formTransferAccount: values,
					visible: true
				})
			}
		})
	}
	handleOk() {
		if (this.state.password !== '') {
			this.setState({
				confirmLoading: true,
			})
			this.updateAccountInfo()
		} else {
			const error = {
				validateStatus: 'error',
				help: getText('Please fill in the security code')
			}
			this.setState({
				passwordError: error
			})
		}
	}
	handleCancel() {
		this.setState({
			visible: false,
		})
	}
	handleApplyEdit() {
		const { disabledEditBank } = this.state
		if (disabledEditBank) {
			this.setState({
				disabledEditBank: false
			})
		}
	}

	render() {
		const { disabledEditBank, accountInfo, passwordError } = this.state
		const transferAccount = this.getCorrectTransferAccount()
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 12 },
		}
		const tailFormItemLayout = {
			wrapperCol: {
				span: 14,
				offset: 6,
			},
		}
		const { getFieldDecorator } = this.props.form
		const isPersonalShop = accountInfo.changeStatus === 6

		return(
			<div style={{marginTop: 50, marginLeft: 50}}>
				<h2 style={{marginBottom: 20, display: 'flex'}}>
					<span>{ getText('Edit Bank Details') }</span>
					<div>
						<div>
							<Tooltip
								placement="right"
								title={getTooltipText(isPersonalShop)}>
								<Button
									disabled={this.isDisabledApplyEditBtn()}
									style={{marginLeft: '10px'}}
									onClick={this.handleApplyEdit.bind(this)}
									type="primary">
										{ getApplyEditBtnText(accountInfo.changeStatus) }
								</Button>
							</Tooltip>
						</div>
						{
							(accountInfo.changeStatus === 2 || accountInfo.changeStatus === 3 || isPersonalShop) &&
							<div style={{color: 'red'}}>
									{getTimeText(accountInfo.changeDate, isPersonalShop)}
							</div>
            }
            {
              accountInfo.changeStatus === 5 &&
              <div style={{color: 'red'}}>
                {isCN ?
                  `上次修改时间: ${showTimestamp(accountInfo.changeDate)} 修改成功` :
                  `Last time of modification: ${showTimestamp(accountInfo.changeDate)} Modified successfully`
                }
            </div>
            }
						{
							accountInfo.changeStatus === 3 &&
							<div style={{color: 'red'}}>
								驳回理由: {accountInfo.rejectedMsg}
							</div>
						}
					</div>
				</h2>
				<Form horizontal>
					<FormItem
						{...formItemLayout}
						label={getText('Bank Name')}
						hasFeedback
					>
					 {getFieldDecorator('bankName', {
							rules: [{
								required: true, message: getText('please fill in bank name')
							}],
							initialValue: transferAccount.bankName
						})(
							<Input disabled={disabledEditBank}/>
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label={ getText('Bank Account Number') }
						hasFeedback
					>
					 {getFieldDecorator('accountNumber', {
							rules: [{
								required: true, message: getText('please fill in bank account number')
							}],
							initialValue: transferAccount.accountNumber
						})(
							<Input type="number" disabled={disabledEditBank}/>
						)}
					</FormItem>
					{
						isCN ?
						<div>
							<FormItem
								{...formItemLayout}
								label="开户银行支行名称"
								hasFeedback
							>
							{getFieldDecorator('agencyName', {
									rules: [{
										required: true, message: '请填写开户银行支行名称'
									}],
									initialValue: transferAccount.agencyName
								})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="开户银行所在地"
							>
							{getFieldDecorator('agencyAddress', {
									rules: [{ type: 'array', required: true, message: '请填写开户银行所在地' }],
									initialValue: transferAccount.agencyAddress && transferAccount.agencyAddress.split(','),
								})(
									<Cascader placeholder="请选择地区" options={linkData} disabled={disabledEditBank}/>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="开户人姓名"
								hasFeedback
							>
							{getFieldDecorator('accountName', {
									rules: [{
										required: true, message: '请填写开户人姓名',
									}],
									initialValue: transferAccount.accountName
								})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="手机号"
								hasFeedback
							>
							{getFieldDecorator('phone', {
									rules: [{
										required: true, message: '请填写手机号',
									}],
									initialValue: transferAccount.phone
								})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
						</div>
							:
						<div>
							<FormItem
								{...formItemLayout}
								label="Beneficiary Name"
								hasFeedback
							>
							{getFieldDecorator('beneficiaryName', {
									rules: [{
										required: true, message: getText('please fill in beneficiary name')
									}],
									initialValue: transferAccount.beneficiaryName
								})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Bank Swift Code"
							>
							{getFieldDecorator('bankSwiftCode', {
								initialValue: transferAccount.bankSwiftCode,
							})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Beneficiary Bank Address"
							>
							{getFieldDecorator('beneficiaryBankAddress', {
									initialValue:transferAccount.beneficiaryBankAddress,
								})(
									<Input disabled={disabledEditBank}/>
								)}
							</FormItem>
						</div>
					}
					<FormItem
						{...tailFormItemLayout}
					>
						<Button
							disabled={disabledEditBank}
							onClick={this.handleSubmit}>
							{ getText('confirm') }
						</Button>
						{
							accountInfo.changeStatus === 3 &&
							<Button
								disabled={disabledEditBank}
								onClick={this.updateCancel}>
								{ getText('cancel') }
							</Button>
						}
					</FormItem>
				</Form>
				<Modal title={ getText('Please fill in the account login password') }
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
				>
					<FormItem
						{...passwordError}
					>
						<Input type="password" value={this.state.password} onChange={this.changePassword} />
					</FormItem>
				</Modal>
			</div>
		)
	}
}

export default ChangeBankCard = Form.create({})(ChangeBankCard)
