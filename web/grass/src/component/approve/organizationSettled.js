import * as React from 'react'
import { warn,success } from '../../util/antd'
import LogoTitle from '../register/_widget/logoTitle'
import { connect } from 'react-redux'
import './organizationSettled.scss'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import SettleProtocol from '../register/_widget/settleProtocol'
import { getToken } from '../../api/other'
import BankSelect from './bankSelect'
import {
  userShopApprovalOrganization,
  userShopValidShopName
} from '../../api/account'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Upload,
  Icon,
  Select,
  Cascader,
  Radio
} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
// const identifierNumPattern = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
const identifierNumPattern = /^.*$/
// const phonePattern = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
const phonePattern = /^.*$/

class OrganizationSettled extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isVisible:true,
      baseUrl:'',
      token:'',
      imgToHeadSide:'',
      imgToEmblemSide:'',
      imgToBusiness:'',
      imgToOrganization:'',
      imgToTax:'',
      imgToBank:'',
      shopName:'',
      requester:{
        realName:'',
        identifierNum:'',
        phone:'',
        aliShopUrl:''
      },
      originCode: 'CN',
      form:{
        responsibleInfo:{
          realName:'',
          identifierNum:'',
          approvalImages:[]
        },
        contacts:[{
          name:'',
          phone:''
        },{
          name:'',
          phone:''
        }],
        orgInfo:{
          orgName:'',
          approvalImages:[]
        },
        bankInfo:{
          bankName:'中国银行',
          agencyAddress:'',
          agencyName:'',
          accountNumber:''
        }
      }
    }
  }
  componentWillMount(){
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })
  }
  componentDidMount(){
    const uploadInside0 = document.querySelector('.oHeadSide')
    const uploadOutside0 = document.querySelector('.oOutHeadSide')
    const uploadInside1 = document.querySelector('.oEmblemSide')
    const uploadOutside1 = document.querySelector('.oOutEmblemSide')
    const uploadInside2 = document.querySelector('.business')
    const uploadOutside2 = document.querySelector('.outBusiness')
    const uploadInside3 = document.querySelector('.organization')
    const uploadOutside3 = document.querySelector('.outOrganization')
    const uploadInside4 = document.querySelector('.tax')
    const uploadOutside4 = document.querySelector('.outTax')
    const uploadInside5 = document.querySelector('.bank')
    const uploadOutside5 = document.querySelector('.outBank')

    uploadOutside0.addEventListener('click', function(){
      document.querySelector('.oHeadSide').click()
    })
    uploadOutside1.addEventListener('click', function(){
      document.querySelector('.oEmblemSide').click()
    })
    uploadOutside2.addEventListener('click', function(){
      document.querySelector('.business').click()
    })
    uploadOutside3.addEventListener('click', function(){
      document.querySelector('.organization').click()
    })
    uploadOutside4.addEventListener('click', function(){
      document.querySelector('.tax').click()
    })
    uploadOutside5.addEventListener('click', function(){
      document.querySelector('.bank').click()
    })
  }
  verifiRequester(requester){
    if(!requester.realName){
      warn('请填写真实姓名！')
      return false
    }
    if(!requester.identifierNum || !identifierNumPattern.test(requester.identifierNum)){
      warn('身份证号有误！')
      return false
    }
    if(!requester.phone || !phonePattern.test(requester.phone)){
      warn('手机号有误！')
      return false
    }
    return true
  }
  verifiForm(form){
    if(!form.responsibleInfo.identifierNum || !identifierNumPattern.test(form.responsibleInfo.identifierNum)){
      warn('法人代表身份证号码有误！')
      return false
    }
    if(!form.responsibleInfo.realName){
      warn('请输入法人代表真实姓名！')
      return false
    }
    if(!form.responsibleInfo.approvalImages[0]){
      warn('请上传身份证头像面！')
      return false
    }
    if(!form.responsibleInfo.approvalImages[1]){
      warn('请上传身份证国徽面！')
      return false
    }
    let flag = false
    for (let i = 0; i < form.contacts.length; i++) {
      if(form.contacts[i].name && form.contacts[i].phone && phonePattern.test(form.contacts[i].phone)){
        flag = true
      }
    }
    if(!flag){
      warn('至少输入一组有效联系人信息！')
      return false
    }
    if(!form.orgInfo.orgName){
      warn('请输入公司名称！')
      return false
    }
    if(!form.orgInfo.approvalImages[0]){
      warn('请上传公司营业执照！')
      return false
    }
    if(!form.orgInfo.approvalImages[1]){
      warn('请上传组织机构代码证！')
      return false
    }
    if(!form.orgInfo.approvalImages[2]){
      warn('请上传税务登记证！')
      return false
    }
    if(!form.orgInfo.approvalImages[3]){
      warn('请上传银行开户许可证！')
      return false
    }
    if(!form.bankInfo.agencyAddress){
      warn('请选择地区！')
      return false
    }
    if(!form.bankInfo.agencyName){
      warn('请输入支行名字！')
      return false
    }
    if(!form.bankInfo.accountNumber){
      warn('请输入支行账户！')
      return false
    }
    return true
  }
  render(){
    const {
      baseUrl,
      token,
      imgToHeadSide,
      imgToEmblemSide,
      imgToBusiness,
      imgToOrganization,
      imgToTax,
      imgToBank,
      shopName,
      requester,
      originCode,
      isVisible
    } = this.state
    const propsToHeadSide = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-1)
        const type = info.file.originFileObj.type;
        if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToHeadSide: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    // 从这一行到330 几乎100行代码，我怎么看都想不通，为什么有这么垃圾的coder，会不停地复制粘贴一大堆恶心人。懒得blame。三省吾身，择其善者而从之其不善者而改之。 -- Todd Mark
    const propsToEmblemSide = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList
        const type = info.file.originFileObj.type;
        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-1)
         if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToEmblemSide: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToBusiness= {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        const type = info.file.originFileObj.type;
        fileList = fileList.slice(-1)
        if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToBusiness: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToOrganization = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        const type = info.file.originFileObj.type;
        fileList = fileList.slice(-1)
         if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToOrganization: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToTax= {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        const type = info.file.originFileObj.type;
        fileList = fileList.slice(-1)
         if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToTax: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToBank = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: token},
      accept:'.jpg,.jpeg,.png,.gif',
      listType: 'picture',
      onChange: (info) => {
        let fileList = info.fileList

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        const type = info.file.originFileObj.type;
        fileList = fileList.slice(-1)
         if (info.file.status === 'done') {
          if (type.indexOf("image") === -1) {
            warn(`${info.file.name} 格式错误。`)
            return
          }
          success(`${info.file.name} 上传成功。`)
          this.setState({imgToBank: baseUrl+info.file.response.key})
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    return(<section className="organizationSettled">
        <header><LogoTitle title={'商家入驻'}/></header>
        <h2>企业入驻</h2>
        <Row type='flex' justify='start'>
          <Col span="12">
             <Form horizontal>
             <p className="title">基本信息</p>
              <FormItem
                label="真实姓名："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                required
              >
                <Input placeholder='请输入真实姓名'
                  onChange={(e)=>{
                    requester.realName = e.target.value
                    this.setState({requester})
                }}/>
              </FormItem>
              <FormItem
                label="身份证号："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                required
              >
                <Input placeholder='请输入身份证号'
                onChange={(e)=>{
                  requester.identifierNum = e.target.value
                  this.setState({requester})
                }} />
              </FormItem>
              <FormItem
                label="手机号码："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                required
              >
                <Input placeholder='请输入手机号'
                onChange={(e)=>{
                  requester.phone =  e.target.value
                  this.setState({requester})
                }}  />
              </FormItem>
              <FormItem
                label="淘宝店铺链接："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
              >
                <Input placeholder='请输入淘宝店铺链接' onChange={(e)=>{
                  requester.aliShopUrl =  e.target.value
                  this.setState({requester})
                }} />
              </FormItem>
            </Form>
          </Col>
          <Col span={24}>
            <Form horizontal className="origin__code">
              <FormItem
                label="发货地所在国家"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <RadioGroup onChange={(e) => {
                  this.setState({ originCode: e.target.value })
                  }}
                  value={this.state.originCode} >
                  { /*CN(默认）----RMB--￥ SG---SGD-- S$ MY---MYR-- M$ US---USD-- $ KR---KRW-- ₩ */ }
                  <Radio value={'CN'}><img className="country__icon" src="../../static/country/cn.png" alt=""/>/RMB</Radio>
                  {/*<Radio value={'SGLocal'}><img className="country__icon" src="../../static/country/sgd.png" alt=""/>/SGD</Radio>
                  <Radio value={'MYLocal'}><img className="country__icon" src="../../static/country/my.png" alt=""/>/MYR</Radio>
                  <Radio value={'US'}><img className="country__icon" src="../../static/country/us.png" alt=""/>/USD</Radio>
                  <Radio value={'KR'}><img className="country__icon" src="../../static/country/kr.png" alt=""/>/KRW</Radio>*/}
                </RadioGroup>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row type='flex' justify='start'>
          <Col span="12">
             <Form horizontal>
              <p className="title">店铺资料填写</p>
              <FormItem
                label="店铺名称："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder='请输入店铺名称' onChange={(e)=>{
                  const shopName = e.target.value
                  this.setState({shopName})
                }}/>
              </FormItem>
              <FormItem
                label="法人代表身份证号码："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder='请输入法人代表身份证号码' onChange={(e)=>{
                  let form = this.state.form
                  form.responsibleInfo.identifierNum = e.target.value
                  this.setState({form})
                }} />
              </FormItem>
              <FormItem
                label="法人代表身份证姓名："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder='请输入法人代表身份证姓名' onChange={(e)=>{
                  let {form} = this.state
                  form.responsibleInfo.realName = e.target.value
                  this.setState({form})
                }} />
              </FormItem>
              <FormItem
                label="法人代表身份证照片："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <div className="picture oOutHeadSide">
                  <div className="name">
                    头像面
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                    {
                      imgToHeadSide && (<img style={{width:'100%',height:'100%'}} src={imgToHeadSide} />)
                    }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToHeadSide} >
                    <Icon type="plus" className='oHeadSide'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
                <div className="picture oOutEmblemSide">
                  <div className="name">
                    国徽面
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                      {
                        imgToEmblemSide && (<img style={{width:'100%',height:'100%'}} src={imgToEmblemSide} />)
                      }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToEmblemSide} >
                    <Icon type="plus" className='oEmblemSide'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
              </FormItem>
              <p className="title">补充联系人信息</p>
              <FormItem
                label="紧急联系人姓名："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input onChange={(e)=>{
                  let {form} = this.state
                  form.contacts[0].name = e.target.value
                  this.setState({form})
                }}  />
              </FormItem>
              <FormItem
                label="紧急联系人电话："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input onChange={(e)=>{
                  let {form} = this.state
                  form.contacts[0].phone = e.target.value
                  this.setState({form})
                }}  />
              </FormItem>
              <FormItem
                label="紧急联系人姓名："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input onChange={(e)=>{
                  let {form} = this.state
                  form.contacts[1].name = e.target.value
                  this.setState({form})
                }}  />
              </FormItem>
              <FormItem
                label="紧急联系人电话："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input onChange={(e)=>{
                  let {form} = this.state
                  form.contacts[1].phone = e.target.value
                  this.setState({form})
                }}  />
              </FormItem>
              <p className="title">公司资料认证</p>
              <FormItem
                label="公司名称："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder='请输入公司名称' onChange={(e)=>{
                  let {form} = this.state
                  form.orgInfo.orgName = e.target.value
                  this.setState({form})
                }}  />
              </FormItem>
              <FormItem
                label="公司资质照片："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <div className="picture outBusiness">
                  <div className="name">
                    公司营业执照
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                      {
                        imgToBusiness && (<img style={{width:'100%',height:'100%'}} src={imgToBusiness} />)
                      }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToBusiness} >
                    <Icon type="plus" className='business'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
                <div className="picture outOrganization">
                  <div className="name">
                    组织机构代码证
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                      {
                        imgToOrganization && (<img style={{width:'100%',height:'100%'}} src={imgToOrganization} />)
                      }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToOrganization} >
                    <Icon type="plus" className='organization'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
                <div className="picture outTax">
                  <div className="name">
                    税务登记证
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                      {
                        imgToTax && (<img style={{width:'100%',height:'100%'}} src={imgToTax} />)
                      }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToTax} >
                    <Icon type="plus" className='tax'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
                <div className="picture outBank">
                  <div className="name">
                    银行开户许可证
                  </div>
                  <div className="img">
                    <div className="icon">
                      <Icon type="plus" style={{fontSize:40}} />
                    </div>
                    <div className="uploadImage">
                      {
                        imgToBank && (<img style={{width:'100%',height:'100%'}} src={imgToBank} />)
                      }
                    </div>
                  </div>
                </div>
                <div style={{display:'none'}}>
                  <Upload {...propsToBank} >
                    <Icon type="plus" className='bank'/>
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                </div>
              </FormItem>
              <p className="title">账户资料认证</p>
              <FormItem
                label="开户银行："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <BankSelect onChange={(v)=>{
                  let {form} = this.state
                  form.bankInfo.bankName = v
                  this.setState({form})
                }}/>
              </FormItem>
              <FormItem
                label="开户行所在地："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Cascader options={linkData} placeholder="请选择地区" onChange={(v)=>{
                  let {form} = this.state
                  form.bankInfo.agencyAddress = v.join()
                  this.setState({form})
                }}/>
              </FormItem>
              <FormItem
                label="支行名称："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder="请输入支行名称" onChange={(e)=>{
                  let {form} = this.state
                  form.bankInfo.agencyName = e.target.value
                  this.setState({form})
                }} />
              </FormItem>
              <FormItem
                label="开户账号："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
                required
              >
                <Input placeholder='请输入开户账号' maxLength='20' onChange={(e)=>{
                  let {form} = this.state
                  const value = e.target.value
                  if (isNaN(value)) {
                    warn('只能填写数字')
                    e.target.value = ''
                  }
                  form.bankInfo.accountNumber = value
                  this.setState({form})
                }} />
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Button type='primary' onClick={()=>{
                  let {form} = this.state
                  form.responsibleInfo.approvalImages[0] = imgToHeadSide
                  form.responsibleInfo.approvalImages[1] = imgToEmblemSide
                  form.orgInfo.approvalImages[0] = imgToBusiness
                  form.orgInfo.approvalImages[1] = imgToOrganization
                  form.orgInfo.approvalImages[2] = imgToTax
                  form.orgInfo.approvalImages[3] = imgToBank
                  if(!shopName){
                    return warn('请输入店铺名！')
                  }
                  userShopValidShopName(shopName)
                    .then(result=>{
                      const r = result
                      if(typeof(r) == 'boolean' && r){
                        if(!this.verifiRequester(requester)){
                          return
                        }
                        if(!this.verifiForm(form)){
                          return
                        }
                        // const accountNumberLength = form.bankInfo.accountNumber.length;
                        // if (accountNumberLength !== 16 && accountNumberLength !== 19) {
                        //   return warn('银行卡为16位或者19位纯数字!')
                        // }
                        userShopApprovalOrganization(shopName,requester,form, originCode)
                          .then( result =>{
                            const res = result
                            if(typeof(res) == 'boolean' && res){
                              success('填写信息成功！')
                              window.location.href = '/signin.html'
                            }else if(typeof(res) == 'object'){
                              warn(res.errMessage)
                            }else{
                              warn('操作失败！')
                            }
                          })
                      }else{
                        warn('店铺名已注册，请更换店铺名后重试！')
                      }
                    })

                }} >确认提交</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <SettleProtocol isVisible={isVisible} onClick={()=>{
          this.setState({isVisible:false})
        }}/>
      </section>)
  }
}
export default OrganizationSettled
