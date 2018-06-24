import * as React from 'react'
import { warn, success } from '../../util/antd'
import LogoTitle from '../register/_widget/logoTitle'
import SettleProtocol from '../register/_widget/settleProtocol'
import './personalSettled.scss'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { getToken } from '../../api/other'
import BankSelect from './bankSelect'
import {
  userShopApprovalPersonal,
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
  Radio,
  Cascader
} from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const assign = Object.assign
const RadioGroup = Radio.Group

class PersonalSettled extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,
      baseUrl: '',
      token: '',
      imgToHeadSide: '',
      imgToEmblemSide: '',
      imgToInHand: '',
      shopName: '',
      requester: {
        realName: '',
        identifierNum: '',
        phone: '',
        aliShopUrl: ''
      },
      originCode: 'CN',
      form: {
        responsibleInfo: {
          realName: '',
          identifierNum: '',
          approvalImages: []
        },
        bankInfo: {
          bankName: '中国银行',
          agencyAddress: '',
          agencyName: '',
          accountNumber: ''
        }
      }
    }
  }
  verifiRequester(requester) {
    if (!requester.realName) {
      warn('请填写真实姓名！')
      return false
    }
    // const identifierNumPattern = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
    const identifierNumPattern = /^.*$/
    if (!requester.identifierNum || !identifierNumPattern.test(requester.identifierNum)) {
      warn('身份证号有误！')
      return false
    }
    // const phonePattern = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}
    const phonePattern = /^.*$/
    if (!requester.phone || !phonePattern.test(requester.phone)) {
      warn('手机号有误！')
      return false
    }
    return true
  }
  verifiForm(form) {
    if (!form.responsibleInfo.approvalImages[0]) {
      warn('请上传身份证头像面！')
      return false
    }
    if (!form.responsibleInfo.approvalImages[1]) {
      warn('请上传身份证国徽面！')
      return false
    }
    if (!form.responsibleInfo.approvalImages[2]) {
      warn('请上传手持身份证照！')
      return false
    }
    if (!form.bankInfo.agencyAddress) {
      warn('请选择地区！')
      return false
    }
    if (!form.bankInfo.agencyName) {
      warn('请输入支行名字！')
      return false
    }
    if (!form.bankInfo.accountNumber) {
      warn('请输入支行账户！')
      return false
    }
    return true
  }
  componentWillMount() {
    getToken((info) => {
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })
  }
  componentDidMount() {
    const uploadInside0 = document.querySelector('.pHeadSide')
    const uploadOutside0 = document.querySelector('.pOutHeadSide')
    const uploadInside1 = document.querySelector('.pEmblemSide')
    const uploadOutside1 = document.querySelector('.pOutEmblemSide')
    const uploadInside2 = document.querySelector('.pInHand')
    const uploadOutside2 = document.querySelector('.pOutInHand')
    uploadOutside0.addEventListener('click', function () {
      document.querySelector('.pHeadSide').click()
    })
    uploadOutside1.addEventListener('click', function () {
      document.querySelector('.pEmblemSide').click()
    })
    uploadOutside2.addEventListener('click', function () {
      document.querySelector('.pInHand').click()
    })
  }
  render() {
    const {
      token,
      baseUrl,
      imgToHeadSide,
      imgToEmblemSide,
      imgToInHand,
      form,
      shopName,
      originCode,
      isVisible
    } = this.state
    let {
      requester
    } = this.state
    const propsToHeadSide = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: { token: token },
      accept: '.jpg,.jpeg,.png,.gif',
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
          this.setState({ imgToHeadSide: baseUrl + info.file.response.key })
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToEmblemSide = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: { token: token },
      accept: '.jpg,.jpeg,.png,.gif',
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
          this.setState({ imgToEmblemSide: baseUrl + info.file.response.key })
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    const propsToInHand = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: { token: token },
      listType: 'picture',
      accept: '.jpg,.jpeg,.png,.gif',
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
          this.setState({ imgToInHand: baseUrl + info.file.response.key })
        } else if (info.file.status === 'error') {
          warn(`${info.file.name} 上传失败。`)
        }
      }
    }
    return (<section className="personalSettled">
      <header><LogoTitle title={'商家入驻'} /></header>
      <h2>个人入驻</h2>
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
                onChange={(e) => {
                  requester.realName = e.target.value
                  this.setState({ requester })
                }} />
            </FormItem>
            <FormItem
              label="身份证号："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              required
            >
              <Input placeholder='请输入身份证号'
                onChange={(e) => {
                  requester.identifierNum = e.target.value
                  this.setState({ requester })
                }} />
            </FormItem>
            <FormItem
              label="手机号码："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              required
            >
              <Input placeholder='请输入手机号'
                onChange={(e) => {
                  requester.phone = e.target.value
                  this.setState({ requester })
                }} />
            </FormItem>
            <FormItem
              label="淘宝店铺链接："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              validateStatus=""
              help=""
            >
              <Input placeholder='请输入淘宝店铺链接' onChange={(e) => {
                requester.aliShopUrl = e.target.value
                this.setState({ requester })
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
                { /*CN(默认）----RMB--￥ SG---SGD-- S$ MY---MYR-- M$ US---USD-- $ KR---KRW-- ₩ */}
                <Radio value={'CN'}><img className="country__icon" src="../../static/country/cn.png" alt="" />/RMB</Radio>
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
              <Input placeholder='请输入店铺名称' onChange={(e) => {
                this.setState({ shopName: e.target.value })
              }} />
            </FormItem>
            <FormItem
              label="身份证照片："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              validateStatus=""
              help=""
              required
            >
              <div className="picture pOutHeadSide">
                <div className="name">
                  头像面
                  </div>
                <div className="img">
                  <div className="icon">
                    <Icon type="plus" style={{ fontSize: 40 }} />
                  </div>
                  <div className="uploadImage">
                    {
                      imgToHeadSide && (<img style={{ width: '100%', height: '100%' }} src={imgToHeadSide} />)
                    }
                  </div>
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <Upload {...propsToHeadSide} >
                  <Icon type="plus" className='pHeadSide' />
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
              </div>
              <div className="picture pOutEmblemSide">
                <div className="name">
                  国徽面
                  </div>
                <div className="img">
                  <div className="icon">
                    <Icon type="plus" style={{ fontSize: 40 }} />
                  </div>
                  <div className="uploadImage">
                    {
                      imgToEmblemSide && (<img style={{ width: '100%', height: '100%' }} src={imgToEmblemSide} />)
                    }
                  </div>
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <Upload {...propsToEmblemSide} >
                  <Icon type="plus" className='pEmblemSide' />
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
              </div>
              <div className="picture pOutInHand">
                <div className="name">
                  手持身份证头部照
                  </div>
                <div className="img">
                  <div className="icon">
                    <Icon type="plus" style={{ fontSize: 40 }} />
                  </div>
                  <div className="uploadImage">
                    {
                      imgToInHand && (<img style={{ width: '100%', height: '100%' }} src={imgToInHand} />)
                    }
                  </div>
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <Upload {...propsToInHand} >
                  <Icon type="plus" className='pInHand' />
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
              <BankSelect onChange={(v) => {
                let { form } = this.state
                form.bankInfo.bankName = v
                this.setState({ form })
              }} />
            </FormItem>
            <FormItem
              label="开户行所在地："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              validateStatus=""
              help=""
              required
            >
              <Cascader options={linkData} placeholder="请选择地区" onChange={(v) => {
                let { form } = this.state
                form.bankInfo.agencyAddress = v.join()
                this.setState({ form })
              }} />
            </FormItem>
            <FormItem
              label="支行名称："
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              validateStatus=""
              help=""
              required
            >
              <Input placeholder="请输入支行名称" onChange={(e) => {
                let { form } = this.state
                form.bankInfo.agencyName = e.target.value
                this.setState({ form })
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
              <Input placeholder='请输入开户账号' onChange={(e) => {
                let { form } = this.state
                const value = e.target.value
                if (isNaN(value)) {
                  warn('只能填写数字')
                  e.target.value = ''
                }
                form.bankInfo.accountNumber = value
                this.setState({ form })
              }} />
            </FormItem>
            <FormItem wrapperCol={{ span: 16, offset: 8 }}>
              <Button type='primary' onClick={() => {
                let { form } = this.state
                form.responsibleInfo.approvalImages[0] = imgToHeadSide
                form.responsibleInfo.approvalImages[1] = imgToEmblemSide
                form.responsibleInfo.approvalImages[2] = imgToInHand
                if (!shopName) {
                  return warn('请输入店铺名！')
                }
                const accountNumberLength = form.bankInfo.accountNumber.length;
                if (accountNumberLength !== 16 && accountNumberLength !== 19) {
                  return warn('银行卡为16位或者19位纯数字!')
                }
                userShopValidShopName(shopName)
                  .then(result => {
                    const r = JSON.parse(result)
                    if (typeof (r) == 'boolean' && r) {
                      if (!this.verifiRequester(requester)) {
                        return
                      }
                      if (!this.verifiForm(form)) {
                        return
                      }
                      userShopApprovalPersonal(shopName, requester, form, originCode)
                        .then(result => {
                          if (typeof (result) == 'boolean' && result) {
                            success('填写信息成功！')
                            window.location.href = '/signin.html'
                          } else if (typeof (result) == 'object') {
                            warn(result.errMessage)
                          } else {
                            warn('操作失败！')
                          }
                        })
                        .catch(res => {
                          warn(`服务器错误，错误信息${result.errMessage}`)
                        })
                    } else {
                      warn('店铺名验证失败,请重试')
                    }
                  })
                  .catch(res => {
                    warn(`服务器错误，错误信息${result.errMessage}`)
                  })
              }} >确认提交</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <SettleProtocol isVisible={isVisible} onClick={() => {
        this.setState({ isVisible: false })
      }} />
    </section>)
  }
}
export default PersonalSettled
