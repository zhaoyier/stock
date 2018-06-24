import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Select} from 'antd'
import {EXPRESS} from '../../../constant/index'
const Option = Select.Option

@connect(state =>({
  accountInfo: state.common.accountInfo,
}))


class ExpressSelect extends Component{
  render(){
    const { accountInfo } = this.props;
    let countryExpress = EXPRESS[accountInfo.shop.originCode] ? EXPRESS[accountInfo.shop.originCode] : EXPRESS['CN'] ;
    const {
      onChange,
      style,
      defaultValue = -1,
      value = -1
    } = this.props
    let {
      express = ''
    } = localStorage
    let propsToExtend = value == -1?{}:{value}
    const Options = countryExpress.map((item,index)=>(<Option key={index} value={item}>{item}</Option>))
    return (<Select style={style} defaultValue={defaultValue!=-1?defaultValue:express} {...propsToExtend} onChange = {onChange}>
      {Options}
    </Select>)
  }
}
export default ExpressSelect
