import React, {Component} from 'react'
import moment from 'moment'
import {showTimestamp} from '../../util/kit'
import { Table, Form, Row, Col } from 'antd'
import { UserOrderDetail } from '../../services/EzSellerService'

import './orderDetail.scss'

const orderOperation = ['Unknown', 'Create', 'Dispatch', 'Cancel', 'Remark', 'ReturnConfirm', 'Finish', 'MaxLimit']
const orderItemStatus = ['Unknown', '正在处理', '已分发', '已取消', '退货中', '已退货', '完成', '未付款', 'MaxLimit']
const orderStatus = ['Unknown', '待处理', '已取消', '已完成', '', '已发货', '已抵达仓库']

const FormItem = Form.Item
const columns1 = [{
  title: '产品',
  dataIndex: 'product',
  key: 'product'
},{
  title: 'SKU',
  dataIndex: 'skuName',
  key: 'skuName'
},{
  title: '单价',
  dataIndex: 'unitPrice',
  key: 'unitPrice',
  render (text) {
    return '￥ ' + text
  }
},{
  title: '数量',
  dataIndex: 'quantity',
  key: 'quantity'
}]

const columns2 = [{
  title: '操作时间',
  dataIndex: 'createAt',
  key: 'createAt',
  render (text) {
    return showTimestamp(text)
  }
},{
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render (text) {
    return orderOperation[Number(text)]
  }
},{
  title: '备注',
  dataIndex: 'text',
  key: 'text'
},{
  title: '操作人',
  dataIndex: 'operator',
  key: 'operator'
}]

class OrderDetail extends Component{

  constructor(props) {
    super(props)

    this.state = {
      order: {},
      history: []
    }
  }

  getItem (label, obj) {
    return (
      <FormItem
        label={label + ":"}
        style={{ color: '#888' }}
        labelCol={{ span: 7 }}>
        {obj}
      </FormItem>
    )
  }

  componentWillMount() {
    const orderNum = this.props.params.id
      UserOrderDetail(orderNum)
      .then(data => {
        data.order.items.forEach(item => item.product = data.order.productName)
        this.setState({
          order: data.order,
          history: data.history
        })
      })
  }

  render () {
    const { order, history } = this.state
    if (!order.orderNum) return (<h2>Loading...</h2>)
    return (
      <div className="order-detail">
        <h1>订单详情</h1>
        <Row>
          <Col span="6">
            {this.getItem(
              '订单编号',
              <p>{order.orderNum ? order.orderNum + '' : ''}</p>
            )}
          </Col>
          <Col span="6">
            {this.getItem(
              '订单状态',
              <p>{orderStatus[order.status] || ''}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col span="12">
            {this.getItem(
              '订单生成时间',
              <p>{showTimestamp(order.createdAt)}</p>
            )}
          </Col>
          <Col span="12">
            {this.getItem(
              '订单完成时间',
              <p>{showTimestamp(order.finishedAt)}</p>
            )}
          </Col>
        </Row>
        { order.items.length
          ? ( <Row>
            <Col span="12">
              {this.getItem(
                '物流公司',
                <p>{order.items[0].track.provider}</p>
              )}
            </Col>
            <Col span="12">
              {this.getItem(
                '快递单号',
                <p>{order.items[0].track.trackingNum}</p>
              )}
            </Col>
          </Row> )
          : null
        }
        <div className="goods">
          <h2>订单商品</h2>
          <Table
            columns={columns1}
            rowKey={row => row.orderItemId}
            pagination={false}
            dataSource={order.items}
            footer={() => {
            let productPayment = 0, orderPayment = 0
            order.items.forEach(item => {
              productPayment += item.totalAmount
            })
            return (
              <div className="order-footer">
                <span>{`商品总价: ￥ ${parseFloat(productPayment).toFixed(2)}
                  运费: ￥ 0.00  订单总价: ￥ ${parseFloat(orderPayment + productPayment).toFixed(2)}`}</span>
              </div>
            )
          }}/>
        </div>

        <div className="history">
          <h2>订单操作历史</h2>
          <Table columns={columns2} pagination={false} dataSource={history} />
        </div>
      </div>
    )
  }
}

export default OrderDetail

