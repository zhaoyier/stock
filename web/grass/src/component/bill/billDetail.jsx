import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { redirect } from '../../util/history'
import {request1} from '../../api/base/client'
import * as Cookies from 'js-cookie'
import {
  Tooltip,
  Icon,
  Tabs,
  Button,
  message,
  Table,
  Input
} from 'antd'
import { UserBillOrderList, UserBillOrderItemList, UserBillOrderListExport, UserBillOrderItemListExport } from '../../services/EzSellerService'
import { alterTaskListSearchInfo } from '../../action/order'
import { locale } from '../../config/locale'
import './bill.scss'
import { adjustmentReceiptFeeType } from '../costAdjustment/common/constant'
import { showTimestamp, originCode } from '../../util/kit'
import {
  GetSellerAdjustmentReceiptsByBillNum,
  ExportSellerAdjustmentReceiptsByBillNum
} from 'services/ezseller/bill'

const TabPane = Tabs.TabPane
const Search = Input.Search
const reportPrefix = 'http://d2dreport.graysheep.me'
// const SYH_API = new Fetch({ prefix: reportPrefix })
const ORDER_WAREHOUSE = ['未知', '上海', '广州', 'MaxLimit']
const defaultFilter = {
  packageNum: '',
  orderNum: ''
}

@connect(state=>({
  categoryTree: state.productManage.categoryTree,
  accountInfo: state.common.accountInfo
}))

class BillDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      billOrderList: [],
      billOrderItemList: [],
      orderLoading: true,
      productLoading: true,
      filter: defaultFilter,
      receipts: {
        total: 0,
        receipts: []
      }
    }
  }

  componentWillMount () {
    const { billNum } = this.props.params
    this.__ = locale(this.props.accountInfo.shop.originCode)
    UserBillOrderList(billNum)
      .then(result => {
        this.setState({
          billOrderList: result.orders,
          orderLoading: false
        })
      })
    if (this.props.accountInfo.shop.originCode === 'CN') {
      this.getListData()
    }

    // UserBillOrderItemList(billNum)
    //   .then(result => {
    //     this.setState({
    //       billOrderItemList: result.items,
    //       productLoading: false
    //     })
    //   })
  }
  getListData(offset = 0, limit = 10) {
    const { billNum } = this.props.params
		GetSellerAdjustmentReceiptsByBillNum({billNum, offset, limit})
			.then(result => this.setState({
				receipts: result
			}))
	}

  exportTask(billNum, address) {
    const hide = message.loading('processing...')
    request1
    .post(address)
    .config({
      credentials: 'include'
    })
    .send({ billNum })
    .json()
    .then(result => {
      hide()
      if(result.hasOwnProperty('errMessage')){
        warn(result.errMessage)
        return false
      }else{
        this.props.dispatch(alterTaskListSearchInfo({ taskId:  result.id}))
        redirect('/exportTask')
        return result
      }
    })
  }
  setFilter(data) {
    const filter = { ...defaultFilter, ...data }
    this.setState({filter})
  }
  getDataSource() {
    const { billOrderList, filter } = this.state
    const { packageNum, orderNum } = filter
    return billOrderList.filter(order => {
      if (packageNum) {
        return order.packageNum.includes(packageNum)
      }
      if (orderNum) {
        return order.orderNum.includes(orderNum)
      }
      return true
    })
  }

  render () {
    const { accountInfo } = this.props
    const { filter, receipts } = this.state
    const { billNum } = this.props.params
    const getText = this.__
    const countryCode = this.props.accountInfo.shop.originCode || 'CN'
    const SgOrMy = countryCode === 'SGLocal' || countryCode === 'MYLocal'
    const orderColumns = [{
      title: getText('Parcel Number'),
      dataIndex: 'packageNum',
      key: 'packageNum'
    },{
      title: getText('order_number'),
      dataIndex: 'orderNum',
      key: 'orderNum'
    },{
      title: getText('Origin Total Amount'),
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },{
      title: getText('Active Offset Amount'),
      dataIndex: 'offsetAmount',
      key: 'offsetAmount'
    },{
      title: getText('Order Generated Time'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render (text) {
        return moment(text * 1000).format('YYYY-MM-DD')
      }
    },{
      title: getText('Order Finished Time'),
      dataIndex: 'finishedAt',
      key: 'finishedAt',
      render (text) {
        return moment(text * 1000).format('YYYY-MM-DD')
      }
    }].concat(SgOrMy ? [{
      title: getText('Delivery fee', true),
      dataIndex: 'localDeliveryFee',
      key: 'localDeliveryFee'
    }]: []).concat([{
    //   title: getText('arrival_warehouses'),
    //   dataIndex: 'warehouse',
    //   key: 'warehouse',
    //   render (text) {
    //     return getText(ORDER_WAREHOUSE[Number(text)])
    //   }
    // },{
    //   title: getText('Logistics Company'),
    //   dataIndex: 'track.provider'
    // },{
    //   title: getText('Waybill Number'),
    //   dataIndex: 'track.trackingNum'
    // },{
      title: getText('shipping_fee', true),
      dataIndex: 'shippingFee',
      key: 'shippingFee'
    },{
      title: (<span>{getText('Commission Rate', true)}&nbsp;
        <Tooltip placement="topLeft" title={getText('Commission Rate =(Origin Total Amount-Active Offset Amount)*fee rate')}>
          <Icon style={{fontSize: 14}} type="question-circle" />
        </Tooltip>
      </span>),
      dataIndex: 'serviceFee',
      key: 'serviceFee'
    },{
      title: (<span>{getText('Final Settlement', true)}&nbsp;
        <Tooltip placement="topLeft" title={getText('Final Settlement =Origin Total Amount-Active Offset Amount-Delivery fee-Commission Rate')}>
          <Icon style={{fontSize: 14}} type="question-circle" />
        </Tooltip>
      </span>),
      dataIndex: 'finalAmount',
      key: 'finalAmount'
    }])

    // const productColumns = [{
    //   title: getText('Parcel Number'),
    //   dataIndex: 'packageNum',
    //   key: 'packageNum'
    // },{
    //   title: getText('order_number'),
    //   dataIndex: 'orderNum',
    //   key: 'orderNum'
    // },{
    //   title: getText('Product Name'),
    //   dataIndex: 'productName',
    //   key: 'productName'
    // },{
    //   title: getText('Product SKU'),
    //   dataIndex: 'skuName',
    //   key: 'skuName'
    // },{
    //   title: getText('Quantity'),
    //   dataIndex: 'quantity',
    //   key: 'quantity'
    // },{
    //   title: getText('SIngle Unit Price', true),
    //   dataIndex: 'unitPrice',
    //   key: 'unitPrice'
    // },{
    //   title: getText('Total Price', true
    //   ),
    //   dataIndex: 'totalAmount',
    //   key: 'totalAmount'
    // },{
    //   title: getText('Commission Rate', true),
    //   dataIndex: 'serviceFee',
    //   key: 'serviceFee'
    // },{
    //   title: getText('settlement amount', true),
    //   dataIndex: 'finalAmount',
    //   key: 'finalAmount'
    // }]

    if ( countryCode === 'CN') {
      orderColumns.shift()
      // productColumns.shift()
    }
    const columns = [
			{
				title: '订单编号',
				dataIndex: 'orderNo',
				key: 'orderNo',
				width: 100,
			},{
				title: '费用类型',
				dataIndex: 'feeType',
				key: 'feeType',
				width: 100,
				render(text) {
					return <span> {adjustmentReceiptFeeType[text] || ''} </span>
				}
			},
			{
				title: '调整原因',
				dataIndex: 'reason',
				key: 'reason',
				width: 100,
			},
			{
				title: '数量',
				dataIndex: 'quantity',
				key: 'quantity',
				width: 100,
			},
			{
				title: '调整金额',
				dataIndex: 'amount',
				key: 'amount',
        width: 100,
				render(text) {
					return <span style={{color: Number(text) > 0 ? '#000' : 'red'}}> {text} </span>
				}
			},
			{
				title: '备注',
				dataIndex: 'remark',
				key: 'remark',
				width: 100,
			},
			{
				title: '创建时间',
				dataIndex: 'createDate',
				key: 'createDate',
				width: 100,
				render(text) {
					return <div> {showTimestamp(text)} </div>
				}
      }]
    const pagination = {
      total: receipts.total,
      onChange: page => this.getListData((page - 1) * 10)
    }

    return (
      <div style={{
        padding: '10px'
      }}>
        <Tabs type="card">
          <TabPane tab={getText('Order Details')} key="1">
            <div style={{ padding: '0.5rem 0' }}>
              <Button
                type="primary"
                onClick={() => {
                  const { billOrderList } = this.state
                  let _data = [], line = []
                  orderColumns.forEach(col => line.push(col.title))
                  _data.push(line)
                  for (let i = 0, length = billOrderList.length; i< length; i++) {
                    line = []
                    orderColumns.forEach(col => {
                      line.push(col.render
                        ? col.render(billOrderList[i][col.dataIndex])
                        : billOrderList[i][col.dataIndex])
                    })
                    _data.push(line)
                  }
                  const { billNum } = this.props.params
                  this.exportTask(billNum, '/UserBillOrderExportTask')
                }}>{getText('Download Excel')}</Button>
            </div>
            <div>
              <Search
                value={filter.orderNum}
                placeholder={getText('Order Number')}
                className="search"
                onChange={e => this.setFilter({orderNum: e.target.value})} />&nbsp;
                {(accountInfo.shop.originCode !== 'CN' && accountInfo.shop.originCode !== 'US') && (
                  <Search
                    value={filter.packageNum}
                    placeholder={getText('Parcel Number')}
                    className="search"
                    onChange={e => this.setFilter({packageNum: e.target.value})} />
                )}
            </div>
            <div style={{ backgroundColor: '#FFF' }}>
              <Table
                bordered
                loading={this.state.orderLoading}
                columns={orderColumns}
                dataSource={this.getDataSource()} />
            </div>
          </TabPane>
          {
            countryCode === 'CN' &&
            <TabPane tab="费用调整明细" key="2">
                <div>
                  <Button
                    type="primary"
                    onClick={() => ExportSellerAdjustmentReceiptsByBillNum({billNum})
                      .then(result => {
                        this.props.dispatch(alterTaskListSearchInfo({ taskId: result.exportId}))
                        redirect('/exportTask')
                      })}>
                    {getText('Download Excel')}
                  </Button>
                </div>
                <Table
                  columns={columns}
                  pagination={pagination}
                  dataSource={receipts.receipts} />
            </TabPane>
          }
          {/* <TabPane tab={getText('Product Details')} key="2">
            <div style={{ padding: '0.5rem 0' }}>
              <Button
                type="primary"
                onClick={() => {
                  const { billOrderItemList } = this.state
                  let _data = [], line = []
                  productColumns.forEach(col => line.push(col.title))
                  _data.push(line)
                  for (let i = 0, length = billOrderItemList.length; i< length; i++) {
                    line = []
                    productColumns.forEach(col => {
                      line.push(col.render
                        ? col.render(billOrderItemList[i][col.dataIndex])
                        : billOrderItemList[i][col.dataIndex])
                    })
                    _data.push(line)
                  }
                  const { billNum } = this.props.params
                  this.exportTask(billNum, '/UserBillOrderItemExportTask')
                }}>{getText('Download Excel')}</Button>
            </div>
            <div style={{ backgroundColor: '#FFF' }}>
              <Table
                bordered
                loading={this.state.productLoading}
                columns={productColumns}
                dataSource={this.state.billOrderItemList} />
            </div>
          </TabPane> */}
        </Tabs>
      </div>
    )
  }
}

export default BillDetail
