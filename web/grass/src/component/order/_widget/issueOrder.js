import * as React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Select, Table, InputNumber, Button, Input, Card, message } from 'antd'
import './issueOrder.scss'
import * as api from '../../../api/order'
import { getText } from '../../../util/kit'

@connect(state =>({
  accountInfo: state.common.accountInfo
}))

export default class IssueOrder extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      logDataSource: [],
      skuItems: this.props.skuItems,
      confirmRegistry: false,
      textContent: '',
      editLog: '',
      hasExisted: false
    }
    this.confirmRegistry =  this.confirmRegistry.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.originSkuItems = []
  }

  componentDidMount() {
    const {
      skuItems,
      orderNum
    } = this.props
    this.getLog(orderNum)
    this.userOrderHasExisted(orderNum)
  }


  componentWillReceiveProps(nextProps) {
    const {
      skuItems,
      orderNum
    } = nextProps
    this.originSkuItems = skuItems
    if (nextProps.visible) {
      // 对话框打开
      this.setState({
        skuItems: skuItems
      })
      this.getLog(orderNum)
      this.userOrderHasExisted(orderNum)
    } else {
      // 对话框关闭
      this.setState({
        textContent: '',
        confirmRegistry: false,
        hasExisted: false
      })
    }
  }

  userOrderHasExisted(orderNum) {
    const baseInfo = {
      orderNum: orderNum,
      msgType: 1
    }
    api.userOrderHasExisted(baseInfo, (msg)=> {
      if (msg !== 'null') {
        // remove this -> [""]
        msg = msg.substr(2, msg.length - 4)
        this.setState({
          hasExisted: true
        })
      }
      this.setState({
        editLog: msg
      })
    })
  }

  getLog(orderNum) {
    api.snapshootOfEzseller(orderNum, (res) => {
      let msg = JSON.parse(res)
      msg = msg ? msg : {}
      this.setState({
        logDataSource: msg.snapshoot
      })
    })
  }

  userOrderStockout(orderNum, skuItems) {
    const baseInfo = {
      orderNum: orderNum,
      msgType: 1
    }
    api.userOrderStockout(baseInfo, skuItems, (msg) => {
      if (msg == 'true') {
        message.success(getText('add_success'))
        this.getLog(orderNum)
      }
      this.setState({
        confirmRegistry: true
      })
    })
  }

  confirmRegistry() {
    const { skuItems, orderNum } = this.props
    if (skuItems.some(item => item.quantity === 0)) {
      message.warn(getText('The stock can not be 0'))
      return
    }
    this.userOrderStockout(orderNum, skuItems)
  }

  sendMessage() {
    const {
      orderNum
    } = this.props
    this.getLog(orderNum)
    const body = {
     content: this.state.textContent,
     info: {orderNum: this.props.orderNum, msgType: 1}
    }
    if (this.state.textContent.replace(/(^\s*)|(\s*$)/g, '') == '') {
      message.warn(getText('Empty message cannot be sent'))
      this.setState({
        textContent: ''
      })
      return
    }
    api.sendFromEzseller(body, (msg)=> {
      if (msg == 'false') {
        if (this.state.hasExisted) {
          message.warn(getText('Order has be closed'))
        } else {
          message.warn(getText('Please submit order issues before sending a message'))
        }
      }
      if (msg == 'true') {
        message.success(getText('add_success'))
        this.setState({
          textContent: ''
        })
        this.getLog(orderNum)
      }
    })
  }

  render() {
    const {
      orderNum,
      skuItems,
      visible,
      accountInfo
    } = this.props
    const stockDataSource = this.state.skuItems

    const stockColumns = [{
      title: getText('sku_id'),
      dataIndex: 'sellerSkuId',
      key: 'sellerSkuId',
    }, {
      title: getText('SKU name'),
      dataIndex: 'skuName',
      key: 'skuName',
    }, {
      title: getText('Out of stock quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record, index) => {
        return(
          <InputNumber disabled={this.state.confirmRegistry} min={0} value={text} onChange={(value)=> {
            value = Number(Number(value).toFixed(0))
            stockDataSource[index].quantity = value
            this.setState({
              skuItems: stockDataSource,
              toChange: false
            })
          }} />
        )
      }
    }]


    const logColumns = [{
      title: getText('Time'),
      dataIndex: 'ctime',
      key: 'ctime',
      width: 90,
      render: (text) => {
        return(
          <div>
            <span>{moment(text * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        )
      }
    }, {
      title: getText('User ID'),
      dataIndex: 'createBy',
      width: 90,
      key: 'createBy',
      render: (text, record) => {
        let name = text
        if (record.from == 'ezbuySupporter') {
          name = 'ezbuy'
        }
        return (
          <span>{name}</span>
        )
      }
    }, {
      title: getText('Message'),
      dataIndex: 'content',
      key: 'content'
    }]
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true
    }
    return(
      <div style={{padding: '10px 15px'}}>
        {this.state.editLog !== 'null' ? (
          <Card style={{marginBottom: 15}}>
            <p dangerouslySetInnerHTML={{__html: this.state.editLog.replace(/\\n/g, '</br>')}} ></p>
          </Card>
        ) : (
          <Table dataSource={stockDataSource} columns={stockColumns} pagination={false} />
        )}
        {(this.state.editLog == 'null' && !this.state.confirmRegistry) && (
          <div className="buttonGroupStyle" >
            <Button onClick={this.confirmRegistry}>{getText('Confirm submission')}</Button>
            <p className="tagP">{getText('modification is not allowed afterwards')}</p>
          </div>
        )}
        <div>
          <Input.TextArea maxLength="200" width="100%" value={this.state.textContent} rows={5} onChange={(e) => {
            let value = e.target.value
            this.setState({
              textContent: value
            })
          }} />
          <div style={{color: '#eee'}}>
            {accountInfo.shop.originCode == 'CN' ? `还可以输入 ${200 - this.state.textContent.length} 字` : `${200 - this.state.textContent.length} words left`}
          </div>
        </div>
        <div className="buttonGroupStyle" >
          <Button onClick={this.sendMessage}>{getText('Send Message')}</Button>
          <p className="tagP">{getText('Message is unable to recall after sent')}</p>
        </div>
        <Table dataSource={this.state.logDataSource} columns={logColumns} pagination={pagination}/>
      </div>
    )
  }
}
