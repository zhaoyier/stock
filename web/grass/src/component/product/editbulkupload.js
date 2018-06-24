import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input, Breadcrumb, Select, Form, Table, message } from 'antd'
import { Link } from 'react-router'
import { locale } from '../../config/locale'
const Option = Select.Option
const FormItem = Form.Item
import { UserProductsFromSource } from '../../services/EzSellerService'
import {
  changeCategory
} from '../../action/productManage'

@connect(state => ({
  accountInfo: state.common.accountInfo
}))

class Editbulkupload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      total: 0,
      loading: true,
      status: 1,
      current: 1,
    }
    this.getData = this.getData.bind(this)
  }
  componentWillMount() {
    const { accountInfo } = this.props
    this.__ = locale(accountInfo.shop.originCode)
    this.getData()
  }
  getData(offset = 0, limit = 10) {
    const self = this
    // enum ProductSource { Unknown, Published, Imported, Migrate, Uploaded, MaxLimit };
    // enum ProductState { Unknown, UnCommit, OnSale, OffSale, ForceOffSale, MaxLimit }
    UserProductsFromSource(4, parseInt(self.state.status) == 1 ? false : true, offset, limit)
      .then(result => {
        if (result.message) {
          return message.warn(result.message)
        }
        self.setState({
          result: result.results,
          total: result.total,
          loading: false,
          current: (offset / limit) + 1
        })
      })
      .catch(result => {
        message.warn('error')
      })
  }
  selectState(e) {
    this.setState({
      status: e,
    }, this.getData)
  }
  render() {
    const { dispatch } = this.props;
    const getText = this.__
    const dataSource = this.state.result
    const ProductState = ['Unknown', 'UnCommit', 'OnSale', 'OffSale', 'ForceOffSale', 'MaxLimit']
    const columns = [{
      title: getText('Product Name'),
      dataIndex: 'name',
      key: 'name',
    }, {
      title: getText('Product Thumbnail'),
      dataIndex: 'primaryImage',
      key: 'primaryImage',
      render: function (text) {
        return (
          <img style={{ maxWidth: 200 }} src={text} alt="暂无图片" />
        )
      }
    }, {
      title: getText('Status'),
      dataIndex: 'committed',
      key: 'committed',
      render: function (text) {
        return (
          <span>{text ? getText('Committed') : getText('UnCommit')}</span>
        )
      }
    }, {
      title: getText('Operation'),
      key: 'operation',
      render: function (text, record) {
        return record.committed ? (
          <Button onClick={() => {
            dispatch(changeCategory(false));
            window.location.href = `/index.html#productEdit?from=checkProduct&pid=${record.pid}&categoryId=${record.categoryId}`
          }}>{getText('Edit Products')}</Button>
        ) : (
            <Button onClick={() => {
            window.location.href = `/index.html#productEdit?from=bundleEdit&pid=${record.pid}&categoryId=${record.categoryId}`
            }}>{getText('Edit Products')}</Button>
          )
      }
    }]
    const pagination = {
      current: this.state.current,
      total: this.state.total,
      showQuickJumper: true,
      onChange: page => this.getData((page - 1) * 10)
    }

    return (
      <div style={{ marginTop: 20 }} >
        <Form inline>
          <h2 style={{ float: 'left', marginRight: 20 }}>{getText('Edit Products')}</h2>
          <span style={{ float: 'right', marginRight: 100 }}>
            <Link to="/bulkupload">
              <Button type="primary">
                {getText('back to upload excels')}
              </Button>
            </Link>
          </span>
          <FormItem label={getText("Status")}>
            <Select defaultValue={getText('UnCommit')} placeholder="please choose a status" style={{ width: 200, float: 'left' }} onChange={(e) => this.selectState(e, this)}>
              <Option value="1">{getText('UnCommit')}</Option>
              <Option value="2">{getText('Committed')}</Option>
            </Select>
          </FormItem>
        </Form>
        <Table
          loading={this.state.loading}
          style={{ marginTop: 20 }}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination} />
      </div>
    )
  }
}

export default Editbulkupload
