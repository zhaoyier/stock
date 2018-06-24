import * as React from 'react'
import { connect } from 'react-redux'
import JsBarcode from 'jsbarcode'
import {
  Table,
  Tabs,
  Button,
  Row,
  Col,
  Modal,
  Form,
  message,
  Input,
  AutoComplete
} from 'antd'
import ExpressSelect from './_widget/expressSelect'
import { SH_ADDRESS_INFO, GZ_ADDRESS_INFO, US_ADDRESS_INFO } from '../../constant'
import { Link } from 'react-router'
import './checkDeliveredOrder.scss'
import { toTimestamp,showTimestamp } from '../../util/kit'
import { getDomain } from '../../util/kit'
import { redirect } from '../../util/history'
import { locale } from '../../config/locale'
import {
  userOrderItemList,
  userOrderItemReturnConfirm,
  userOrderRemarkAdd,
  getOrderItemGroup,
  userOrderItemTrackUpdate,
  userOrderTrackUpdate,
  deliveriedFilter,
  userGetProductSimpleinfo
} from '../../action/order'
import {changeMenu} from '../../action/common'
import {
  injectPrintScript,
  previewSellerOrderHorizontalOld,
  previewSellerOrderVerticalOld
} from '../../util/print/SellerPrint'

const FormItem = Form.Item
const AutoOption = AutoComplete.Option
const TabPane = Tabs.TabPane
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 }
}

@connect(state =>({
  accountInfo: state.common.accountInfo,
  orderItemList:state.order.orderItemList,
  orderItemGroups:state.order.orderItemGroups,
  deliveriedFilter:state.order.deliveriedFilter,
}))

class CheckDeliveredOrder extends React.Component{
  constructor(props){
    super(props)
    let warehouse = 1
    if (this.props.accountInfo == 'US') {
      warehouse = 3
    }
    this.state ={
      visible: false,
      showPrint: false,
      showProductName: '',
      orderNum:-1,
      trackingNum:-1,
      orderItemIds:[],
      selectedRowKeys: [],
      provider:'',
      warehouse: warehouse,
      autoComplete: [],
      timeout: true,
      loading: false
    }
    this.searchProductName = this.searchProductName.bind(this)
    this.selectSearchProductName = this.selectSearchProductName.bind(this)
    this.searchProductLink = this.searchProductLink.bind(this)
  }
  componentDidMount() {
    injectPrintScript()
  }
  componentWillMount(){
    const {
      orderItemList,
      accountInfo,
      dispatch
    } = this.props
    this.__ = locale(accountInfo.shop.originCode)
    dispatch(getOrderItemGroup(0,10,{
      status: 2
    }))
    dispatch(changeMenu({
      main:0,
      sub: '21'
    }))
  }

  batchPrint (type) {
    message.loading('processing...')
    const { orderItemGroups } = this.props
    const { selectedRowKeys } = this.state
    orderItemGroups.data.forEach(order => {
      if (selectedRowKeys.includes(order.orderNum)) {
        const productName = order.productName.length > 50 ? order.productName.substring(0, 50)+ '...' : order.productName
        if (type === 0) {
          previewSellerOrderHorizontalOld(productName, order.orderNum, 1)
        } else {
          previewSellerOrderVerticalOld(productName, order.orderNum, 1)
        }
      }
    })
  }
  reloadOrders(filter){
    const {dispatch} = this.props
    const {
      current,
      pageSize,
      dataFilter,
    } = filter
    const offset = (current-1)*pageSize
    const limit = pageSize
    this.setState({
      loading: true
    })
    dispatch(deliveriedFilter(filter))
    dispatch(getOrderItemGroup(offset,limit,dataFilter, () => {
      this.setState({
        loading: false
      })
    }))
  }

  searchProductName(e) {
    const {dispatch} = this.props
    setTimeout(()=> {
      this.setState({
        timeout: true
      })
    }, 200)
    if (this.state.timeout) {
      if (!e) {
        let filter = this.props.deliveriedFilter
        filter.dataFilter.productId = null
        dispatch(deliveriedFilter(filter))
      }
      dispatch(userGetProductSimpleinfo(e, (msg) => {
        this.setState({
          autoComplete: msg
        })
        let filter = this.props.deliveriedFilter
        filter.dataFilter.productId = parseInt(msg[0].productId)
        dispatch(deliveriedFilter(filter))
      }))
    }
    this.setState({
      timeout: false
    })
  }

  selectSearchProductName(e) {
    const {dispatch} = this.props
    let filter = this.props.deliveriedFilter
    filter.dataFilter.productId = parseInt(e)
    dispatch(deliveriedFilter(filter))
  }

  searchProductLink(e) {
    const {dispatch} = this.props
    let filter = this.props.deliveriedFilter
    filter.dataFilter.productUrl = e.target.value
    dispatch(deliveriedFilter(filter))
  }

  render(){
    const getText = this.__
    const{
      visible,
      orderNum,
      trackingNum,
      showProductName,
      orderItemIds,
      selectedRowKeys,
      provider,
      warehouse,
    } = this.state
    const{
      dispatch,
      orderItemList,
      accountInfo,
      orderItemGroups,
      deliveriedFilter
    } = this.props
    let filter = deliveriedFilter
    const {
      current,
      pageSize,
    } = filter
    const {
      data,
      total,
    } = orderItemGroups
    let addressInfo = {}
    if (accountInfo.shop.originCode === 'US') {
      addressInfo = US_ADDRESS_INFO
    } else {
      addressInfo = warehouse == 2?GZ_ADDRESS_INFO:SH_ADDRESS_INFO
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: (newKeys) => this.setState({
        selectedRowKeys: newKeys
      })
    }
    const orderStyle = {
      productName: '400px',
      unitPrice: '50px',
      quantity: '50px',
      status: '100px',
      track: '100px'
    }
    const columns=[{
      title:(<div>
        <span style={{display: 'inline-block', width: orderStyle.productName}}>产品</span>
        <span style={{display: 'inline-block', width: orderStyle.unitPrice}}>单价({accountInfo.shop.originCode === 'US' ? '$' : '¥'})</span>
        <span style={{display: 'inline-block', width: orderStyle.quantity}}>数量</span>
        <span style={{display: 'inline-block', width: orderStyle.status}}>交易状态</span>
        <span style={{display: 'inline-block'}}>物流信息</span>
      </div>),
      key:'items',
      width: 1000,
      render:(items,record) => {
        const url = record.productUrl || 'id=00000'
        let columnsToItem = [{
          title:'产品',
          key:'productName',
          width: 400,
          dataIndex:'productName',
          render:(item,record) =>{
            const pattern = /id=(\d*)/i
            return <p style={{width: 400, wordBreak: 'break-all'}}>
              <span style={{color:'black'}}>
                <a target="_blank" href={getDomain(accountInfo.shop.originCode)+'/product/'+pattern.exec(url)[1] + '.html'}>{item}</a>
              </span>
              <br/>
              <span>{record.skuName}{record.sellerSkuId ? `(${record.sellerSkuId})` : ''}</span>
            </p>
          }
        },{
          title:'单价',
          key:'unitPrice',
          dataIndex:'unitPrice',
          width: 50
        },{
          title:'数量',
          key:'quantity',
          dataIndex:'quantity',
          width: 50
        },{
          title:'状态',
          key:'status',
          dataIndex:'status',
          width: 100,
          render: text =>{
            switch (text) {
              case 1:
                return <span>待发货</span>
              case 2:
                return <span>已发货</span>
              case 3:
                return <span>已取消</span>
              case 4:
                return <span>已发起退货</span>
              case 5:
                return <span>已确认退货</span>
              case 6:
                return <span>已完成</span>
              case 7:
                return <span>未付款</span>
              default:
                break
              // case 1:
              //   return (<span>待处理</span>)
              // case 2:
              //   return (<span>已取消</span>)
              // case 3:
              //   return (<span>已完成</span>)
              // case 5:
              //   return (<span>已发货</span>)
              // case 6:
              //   return (<span>已抵达仓库</span>)
              // default:
              //   break;
            }
          }
        },{
          title:'物流信息',
          key:'track',
          dataIndex:'track',
          render:(text)=>{
            if(text){
              return (<p>
                物流信息：{text.provider} <br/>
                运单号：{text.trackingNum}
              </p>)
            }
          }
        }]
        let orderNum = record.orderNum
        let sellType = record.sellType
        return (<section>
          <p style={{fontWeight:'bold',color:'#39a30e'}}>订单编号：{orderNum}
            {
              sellType == 2 && (<i className='coSaleIcon'>G</i>)
            }
          </p>
          <Table
            bordered
            showHeader={false}
            columns={columnsToItem}
            dataSource={record.items}
            pagination={false} />
        </section>)
      }
    },{
      title: '产品列表图',
      key: 'primaryImage',
      dataIndex: 'primaryImage',
      render: (text) =>(
        <a target="_blank" href={text}><img src={text} style={{width:100}}/></a>
      )
    },{
      title:'操作',
      key: 'operate',
      render: (text,record) => {
        const printItems = []
        const track = record.items[0].track
        orderItemGroups.data.forEach(group => {
          let items = group.items
          for (let i = 0, length = items.length; i < length; i++)
            if (items[i].track.provider == track.provider && items[i].track.trackingNum == track.trackingNum)
              printItems.push(items[i])
        })
        return (<section>
          <p style={{ margin: '0.5rem 0' }}>
            <Link to={`/order-detail/${record.orderNum}`}>查看详情</Link>
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <a onClick={()=>{
              this.setState({
                visible:true,
                orderNum:record.orderNum,
                provider:record.track.provider,
                trackingNum:record.track.trackingNum,
                warehouse:record.warehouse
              })
            }}>修改运单</a>
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <a href="javascript:;" onClick={() => {
              const productName = record.productName.length > 50 ? record.productName.substring(0, 50)+ '...' : record.productName
              previewSellerOrderHorizontalOld(productName, record.orderNum)
            }}>打印订单号(50x25)</a>
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <a href="javascript:;" onClick={() => {
              const productName = record.productName.length > 50 ? record.productName.substring(0, 50)+ '...' : record.productName
              previewSellerOrderVerticalOld(productName, record.orderNum)
            }}>打印订单号(60x40)</a>
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <a
              href={`${window.location.href.replace(/index\S+/g, 'print_order.html?track=')}${encodeURIComponent(JSON.stringify(track))}`}
              target="_blank">打印发货清单
            </a>
          </p>
        </section>)
      },
      width:200
    }]
    const pagination = {
      total,
      showTotal:(total) => `共${total}个`,
      current,
      pageSize,
      showQuickJumper: true,
      showSizeChanger:true,
      onChange: (current) =>{
        filter.current = current
        this.reloadOrders(filter)
      },
      onShowSizeChange: (current,pageSize) =>{
        filter.current = current
        filter.pageSize = pageSize
        this.reloadOrders(filter)
      }
    }
    const styleLabel = {
      display: 'inline-block',
      minWidth: 50,
      marginRight: 10
    }

    const autoCompleteChildren = this.state.autoComplete.map((item) => {
      return (<AutoOption key={item.productId}>{item.productName}</AutoOption>)
    })

    return <section className='checkDeliveredOrder'>
      <Row>
        <Col span={6}>
          <span>
            运单号
          </span>
          <input type="text" placeholder='请输入运单号' className="ant-input" ref='trackingNum' style={{marginRight:10,width:200}}/>
        </Col>
        <Col span={6}>
          <span>
            订单号
          </span>
          <input type="text" placeholder='请输入订单号' className="ant-input" ref='orderNum' style={{marginRight:10,width:200}}/>
        </Col>
        <Col span={3}>
          <Button
          type="primary"
          onClick={this.batchPrint.bind(this, 0)}
          disabled={this.state.selectedRowKeys.length === 0}>批量打印（50x25) </Button>
        </Col>
        <Col span={3}>
          <Button
              type="primary"
              style={{ marginLeft: '1rem' }}
              onClick={this.batchPrint.bind(this, 1)}
              disabled={this.state.selectedRowKeys.length === 0}>批量打印（60x40) </Button>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col span={8}>
          <span>
            {getText('Product Name')}
          </span>
          <AutoComplete placeholder={getText('Please enter the complete product name or choose the name in the list')} filterOption={false} allowClear={true} style={{minWidth: 290}} onChange={this.searchProductName} onSelect={this.selectSearchProductName} >
            {autoCompleteChildren}
          </AutoComplete>
        </Col>
        <Col span={6}>
          <span>
            {getText('Product Link')}
          </span>
          <Input value={filter.dataFilter.productUrl} style={{width: 150}} onChange={this.searchProductLink} style={{width:200}}/>
        </Col>
      </Row>
      <hr style={{display: 'block', marginTop: 10, marginBottom: 10, height: 1, background: '#eee', border: 0}}/>
      <Row style={{marginBottom: 30}}>
        <Col span="6">
          <Button onClick={()=>{
            filter.dataFilter.trackingNum = this.refs.trackingNum.value
            filter.dataFilter.orderNum = this.refs.orderNum.value
            this.reloadOrders(filter)
          }}>确定</Button>
        </Col>
      </Row>
      <Table bordered loading={this.state.loading} columns={columns} rowKey={row => row.orderNum} dataSource={data} pagination={pagination} rowSelection={rowSelection} />
      <Modal
        visible={this.state.showPrint}
        title="打印订单号"
        onCancel={() => this.setState({ showPrint: false })}>
        <p>{this.state.showProductName}</p>
        <canvas id="orderBarcode" />
      </Modal>
      <Modal visible={visible} title={'修改运单'} onOk={()=>{

        dispatch(userOrderTrackUpdate(orderNum,{
          provider,
          trackingNum
        },()=>{
          this.reloadOrders(filter)
          this.setState({
            visible:false
          })
        }))
      }} onCancel={()=>{
        this.setState({visible:false})
      }}>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="到货仓库："
          >
            {addressInfo.title}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收货地址："
          >
            {addressInfo.content}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收货人："
          >
            {addressInfo.receiver}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系电话："
          >
            {addressInfo.phone}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="物流公司："
          >
            <ExpressSelect value={provider} onChange={(v)=>{
              this.setState({provider:v})
            }} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="运单号："
          >
            <Input value={trackingNum} style={{width:200}} onChange={(e)=>{
              this.setState({trackingNum:e.target.value})
            }}/>
          </FormItem>
        </Form>
      </Modal>
    </section>
  }
}
export default CheckDeliveredOrder
