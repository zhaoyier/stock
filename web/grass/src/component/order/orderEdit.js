import React, {Component} from 'react'
import {connect} from 'react-redux'
import { redirect } from '../../util/history'
import {Button} from 'antd'
import {
  orderDeliveryUpdate
} from '../../action/order'
import './orderEdit.scss'

@connect(state=>({
  accountInfo: state.common.accountInfo
}))
class OrderEdit extends Component{

  render(){
    const orderId = parseInt(this.props.params.id)
    const {sellerId} = this.props.accountInfo
    const {dispatch} = this.props
    return (<section className="orderEdit">
        <h1>订单编辑：</h1>
        <section>
          <input ref='sn' className='ant-input' type='text'  placeholder='请输入快递单号' />
          <input ref='provider' className='ant-input' type='text'  placeholder='请输入快递公司' />
          <Button onClick={()=>{
            let delivery = {}
            delivery.provider = this.refs.provider.value
            delivery.sn = this.refs.sn.value
            dispatch(orderDeliveryUpdate(sellerId,orderId,delivery,()=>redirect('/allOrders')))
          }}>提交更改</Button>
        </section>
      </section>)
  }
}
export default OrderEdit
