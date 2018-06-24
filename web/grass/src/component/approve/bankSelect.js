import * as React from 'react'
import {Select} from 'antd'
import {BANKS} from '../../constant/index'
const Option = Select.Option
class BankSelect extends React.Component{
  render(){
    const {
      onChange,
    } = this.props
    const Options = BANKS.map((item,index)=>(<Option key={index} value={item}>{item}</Option>))
    return (<Select style={{width:200}} defaultValue={'中国银行'} onChange = {onChange}>
      {Options}
    </Select>)
  }
}
export default BankSelect
