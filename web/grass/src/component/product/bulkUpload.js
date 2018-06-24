import * as React from 'react'
import { connect } from 'react-redux'
import {Row, Col, Button, Input, Breadcrumb, Select, Form, message, Upload, Icon } from 'antd'
import { Link } from 'react-router'
import { locale } from '../../config/locale'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { getToken } from '../../api/other'
import {
  getCategories,
  getPrefix,
} from '../../action/productManage'

import { UserUploadProductsExport, UserUploadProducts } from '../../services/EzSellerService'

const Option = Select.Option
const FormItem = Form.Item
message.config({
  duration: 5
});
@connect(state=>({
  categoryTree: state.productManage.categoryTree,
  accountInfo: state.common.accountInfo
}))

class BulkUpload extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cid: 0,
      baseUrl: '',
      token: '',
      fileKey: '',
      downloadBtnloading: false
    }
    this.downloadCategoryModel = this.downloadCategoryModel.bind(this)
  }
  componentWillMount() {
    const { accountInfo } = this.props
    const query = {
      prefix: '',
      caseSensitive: false,
      limit: 0
    }
    const {dispatch} = this.props
    dispatch(getCategories(query, 0, 0))
    getToken((info)=>{
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })

    this.__ = locale(accountInfo.shop.originCode)
  }

  selecteCategory(value) {
    this.setState({
      cid: value
    })
  }

  downloadCategoryModel() {
    const self = this;
    if (this.state.cid === 0) {
      message.warn('please choose a template!')
      return
    }
    this.setState({
      downloadBtnloading: true
    })
    if (this.state.downloadBtnloading) {
      return;
    }
      UserUploadProductsExport(parseInt(self.state.cid))
      .then(result => {
        self.setState({
          downloadBtnloading: false
        })
        if (result.message) {
          message.warn(result.message);
          return
        }
        if (result.errMessage) {
          message.warn(result.errMessage);
          return
        }
        let url = window.location.href.includes("ezbuy") ? `https://webapi.ezbuy.com` : `http://webapi.sg.65emall.net`
        window.open(`${url}/api/EzSeller/ExportFile/Download/${result.fileUrl}`)
      })
      .catch(result => {
        message.warn('error')
      })
  }
  render(){
    const{
      categoryTree,
      accountInfo,
    } = this.props
    const getText = this.__
    const linkStyle = {marginTop: 7, marginLeft: 20, width: 200, float: 'right'}
    const isCN = accountInfo.shop.originCode === 'CN'
    const firstCategory = categoryTree[0].all.length > 0 ? categoryTree[0].all : []
    const props = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      data: {token: this.state.token},
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            UserUploadProducts(info.file.response.key)
            .then(result => {
              if (result.length === 0) {
                message.success('success')
              } else {
                console.log('error message from API length: ', result.length);
                for(let i = 0; i < 10; i++) {
                  message.error(result[i])
                }
              }
            })
            .catch(function(result){
              // message.error('error server')
            })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return(
      <div style={{marginTop: 20}}>
        <h2>{getText('Product Bulk Upload')}</h2>
          <Form inline>
            <Row>
              <Col span={18} >
                <h3 style={{marginTop: 40}}>{getText('Step1')}</h3>
                <FormItem label={getText('Please Select the Category')}>
                  <Select onChange={(value) => this.selecteCategory(value)} placeholder={getText('Please Select')} style={{width: 400}}>
                    {firstCategory.map((item, index) => {
                      return (<Option key={index} value={item.cid} >{isCN ? item.translation.CN : item.name}</Option>)
                    })}
                  </Select>
                </FormItem>
                <Button style={linkStyle} loading={this.state.downloadBtnloading} onClick={this.downloadCategoryModel} >{getText('Download Template')}</Button>
              </Col>
            </Row>
            <Row>
              <Col span={18} >
                <h3 style={{marginTop: 40}}>{getText('Step2')}</h3>
                <FormItem label={getText('Please Bulk Upload Product Details in all categories')}>
                </FormItem>
                <span style={{width: 200, float: 'right'}}>
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> {getText('Upload Product Details')}
                    </Button>
                  </Upload>
                </span>
              </Col>
            </Row>
            <Row style={{marginTop: 40}}>
              <Col span={18}>
                <Link to="/editbulkupload">
                  <Button style={{width: 200, float: 'right'}}>{getText('Go to see the products')}</Button>
                </Link>
              </Col>
            </Row>
          </Form>
      </div>
    )
  }
}

export default BulkUpload
