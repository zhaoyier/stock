import * as React from 'react'
import { connect } from 'react-redux'
import { warn,success } from '../../util/antd'
import { getToken } from '../../api/other'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { Form, Input, Button, Row, Col, Modal, Upload, Icon, Select, Cascader, Radio, message } from 'antd'
import { userShopCreate, bankListOfOrigin } from '../../api/account'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

const EnumOriginCode = [ 'None','CN', 'SG', 'MY','US','KR','MaxLimit' ]
class UnChinaOrganizationSettled extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      sellerInfo: {
        storeName: '',
        storeUrl: '',
        contactPerson: '',
        contactPhone: '',
        originCode: '',
        warehouseAddress: ''
      },
      bizInfo: {
        orgName: '',
        approvalImages: [],
        legalRepresentativeName: '',
        bizRegistrationNumber: ''
      },
      bankInfo: {
        agencyAddress: '',
        bankName: '',
        accountNumber: '',
        beneficiaryName: '',
        swiftCode: '',
        companyRegistrationNumber: ''
      },
      bankList: []
    }
    this.confirmInfo = this.confirmInfo.bind(this)
    this.changeOriginCode = this.changeOriginCode.bind(this);
  }

  componentWillMount(){
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })
  }

  confirmInfo() {
    const { sellerInfo, bizInfo, bankInfo } = this.state
    if (sellerInfo.storeName === '') {
      message.warn('Your store display name cannot be empty.')
      return
    }
    if (sellerInfo.contactPerson === '') {
      message.warn('Your contact person cannot be empty.')
      return
    }
    if (sellerInfo.contactPhone === '') {
      message.warn('Your contact phone cannot be empty.')
      return
    }
    if (sellerInfo.warehouseAddress === '') {
      message.warn('Your warehouse address cannot be empty.')
      return
    }
    if (bizInfo.orgName === '') {
      message.warn('Your company name cannot be empty.')
      return
    }
    if (bizInfo.approvalImages === '') {
      message.warn('Your scanned copy of the business registration cannot be empty.')
      return
    }
    if (bizInfo.legalRepresentativeName === '') {
      message.warn('Your legal representative name cannot be empty.')
      return
    }
    if (bizInfo.bizRegistrationNumber === '') {
      message.warn('Your business registration number cannot be empty.')
      return
    }
    if (bankInfo.beneficiaryName === '') {
      message.warn('Your beneficiary name cannot be empty.')
      return
    }
    if (bankInfo.bankName === '') {
      message.warn('Your bank name cannot be empty.')
      return
    }
    if (bankInfo.accountNumber === '') {
      message.warn('Your bank account number cannot be empty.')
      return
    }

    if (this.state.sellerInfo.originCode != 2 && this.state.sellerInfo.originCode != 3) {
      if (bankInfo.swiftCode === '') {
        message.warn('Your bank swift code cannot be empty.')
        return
      }
    }
    if (bankInfo.companyRegistrationNumber === '') {
      message.warn('Company Registration no used for bank account opening cannot be empty.')
      return
    }
    userShopCreate(sellerInfo, bizInfo, bankInfo)
    .then((res) => {
      console.log(res)
      const response = res
      if(response.code === 0){
        message.success('success')
        window.location.href = '/signin.html'
      }else if (response.message) {
        message.warn(response.message);
      }
    })
  }

  changeState(value, stateLv1, stateLv2) {
    // Don't repeat yourself, please pay attention to it.
    let newDate = this.state[stateLv1]
    newDate[stateLv2] = value
    this.setState({
      [stateLv1]: newDate
    })
  }

  changeOriginCode(e) {
    let newDate = this.state.sellerInfo
    newDate['originCode'] = e.target.value
    this.setState({
      sellerInfo: newDate
    }, () => {
        bankListOfOrigin(this.state.sellerInfo.originCode)
        .then((res) => {
          const response = res
          if (response){
            this.setState({
              bankList: response
            })
            message.success('bank update')
          }
        })
      }
    )
  }

  render() {
    const { baseUrl, token } = this.state
    const { accountInfo } = this.props;
    const country__icon = {
      width: 30,
      verticalAlign: 'middle'
    }
    const formStyle = {
      labelCol: {span: 8},
      wrapperCol: {span: 16}
    }
    const propsUpload = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        const type = info.file.originFileObj.type;
        console.log(info)
        if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          let imageUrl = baseUrl + info.file.response.key
          let bizInfo = this.state.bizInfo
          bizInfo.approvalImages.push(imageUrl)
          message.success(`${info.file.name} 上传成功。`)
          this.setState({bizInfo: bizInfo})
        } if (info.file.status === 'removed') {
          const fileList = info.fileList;
          const bizInfo = this.state.bizInfo;
          const result = fileList.map(item => {
            return baseUrl + item.response.key;
          })
          bizInfo.approvalImages = result;
          this.setState({ bizInfo });
        } else if (info.file.status === 'error') {
          message.warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    let styleSwiftCode = ''
    if (this.state.sellerInfo.originCode === 2 || this.state.sellerInfo.originCode === 3) {
      styleSwiftCode = 'none'
    }
    return (
      <div style={{width: 900, margin: '0 auto'}}>
        <h2 style={{marginTop: 50}}>SELLER  INFORMATION</h2>
        <hr/>
        <Row style={{marginTop: 20}}>
          <Col span={24}>
            <Form layout="horizontal">
              <FormItem label="Your store display name: " {...formStyle} required >
                <Input onChange={(e) => this.changeState(e.target.value, 'sellerInfo', 'storeName')} placeholder='' />
              </FormItem>
              <FormItem label="Website or link to your main store: " {...formStyle} >
                <Input placeholder='' onChange={(e) => this.changeState(e.target.value, 'sellerInfo', 'storeUrl' )} />
              </FormItem>
              <FormItem label="Contact person: " {...formStyle} required >
                <Input placeholder='' onChange={(e) => this.changeState(e.target.value, 'sellerInfo', 'contactPerson')} />
              </FormItem>
              <FormItem label="Contact phone: " {...formStyle} required >
                <Input placeholder='' onChange={(e) => this.changeState(e.target.value, 'sellerInfo', 'contactPhone')} />
              </FormItem>
              <FormItem label="Place of Origin: " {...formStyle} required >
                <RadioGroup value={this.state.sellerInfo.originCode}
                  onChange={ this.changeOriginCode } >
                  { /*CN(默认）----RMB--￥ SG---SGD-- S$ MY---MYR-- M$ US---USD-- $ KR---KRW-- ₩ */ }
                  {/*<Radio value={'CN'}><img className="country__icon" src="../../static/country/cn.png" alt=""/>/RMB</Radio>*/}
                  <Radio value={'SGLocal'}><img style={{...country__icon}} src="../../static/country/sgd.png" alt=""/>/SGD</Radio>
                  <Radio value={'MYLocal'}><img style={{...country__icon}} src="../../static/country/my.png" alt=""/>/MYR</Radio>
                  <Radio value={'US'}><img style={{...country__icon}} src="../../static/country/us.png" alt=""/>/USD</Radio>
                  <Radio value={'KR'}><img style={{...country__icon}} src="../../static/country/kr.png" alt=""/>/KRW</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="Warehouse Address: " {...formStyle} required>
                <Input type="textarea" placeholder='' onChange={(e) => this.changeState(e.target.value, 'sellerInfo', 'warehouseAddress')} />
              </FormItem>
            </Form>
          </Col>
        </Row>
        <h2 style={{marginTop: 50}} >BUSINESS INFORMATION</h2>
        <hr/>
        <Row style={{marginTop: 20}} >
          <Col span={24}>
            <Form layout="horizontal">
              <FormItem label="Your company name: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bizInfo', 'orgName')}></Input>
              </FormItem>
              <FormItem label="Legal Representative name: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bizInfo', 'legalRepresentativeName')}></Input>
              </FormItem>
              <FormItem label="Business Registration number: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bizInfo', 'bizRegistrationNumber')}></Input>
              </FormItem>
              <FormItem label="Please upload a scanned copy of your business Registration" labelCol={{span: 12}} required>
                <div>
                  <Upload {...propsUpload} >
                    <Icon type="plus" className='oHeadSide'/>
                    <Button>Choose</Button>
                  </Upload>
                </div>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <h2 style={{marginTop: 50}} >BANK DETAILS</h2>
        <hr/>
        <Row style={{marginTop: 20}} >
          <Col span={24}>
            <Form layout="horizontal">
              <FormItem label="Beneficiary name: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bankInfo', 'beneficiaryName')}></Input>
              </FormItem>
              <FormItem label="Bank Name: " {...formStyle} required>
                <Select placeholder="please choose a bank" onChange={(e) => this.changeState(e, 'bankInfo', 'bankName')}>
                  {this.state.bankList.map((i) =>{
                    return ( <Option value={i}>{i}</Option>)
                  })}
                </Select>
              </FormItem>
              <FormItem label="Bank Account Number: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bankInfo', 'accountNumber')}></Input>
              </FormItem>
              <FormItem style={{display: styleSwiftCode}} label="Bank Swift code: " {...formStyle} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bankInfo', 'swiftCode')}></Input>
              </FormItem>
              <FormItem label="Company Registration no used for bank account opening: " labelCol={{span: 12}} wrapperCol={{span: 12}} required>
                <Input onChange={(e) => this.changeState(e.target.value, 'bankInfo', 'companyRegistrationNumber')}></Input>
              </FormItem>
              <FormItem label="Beneficiary Bank Address: " {...formStyle}>
                <Input onChange={(e) => this.changeState(e.target.value, 'bankInfo', 'agencyAddress')}></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Button onClick={this.confirmInfo} style={{float: 'right', margin: '20px auto 20px'}} type="primary">Confirm</Button>
      </div>
    )
  }
}
export default UnChinaOrganizationSettled
