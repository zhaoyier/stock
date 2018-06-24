import * as React from 'react'
import {Switch, Tabs, DatePicker, Form, Input, Button, Select, Table, Row, Col, Modal, message } from 'antd';
import { connect } from 'react-redux'
import { UserShopShutDown } from '../../services/EzSellerService'
const FormItem = Form.Item;
import * as Cookies from 'js-cookie'

@connect(state=>({
  accountInfo: state.common.accountInfo,
}))

export default class SuspendBusiness extends React.Component {
  switchChange(checked) {
    let data = JSON.parse(Cookies.get('data'));
    UserShopShutDown(checked)
    .then(result => {
      data.shop.isShutDown = checked
      window.sessionStorage.setItem('data', JSON.stringify(data));
    })
  }
  render() {
    const {accountInfo } = this.props
    return (
      <div style={{marginTop: 100}}>
        <Form>
          <FormItem>
            <div style={{ marginLeft: 300 }}>
              <span style={{fontSize: 22, marginRight: 20, verticalAlign: 'bottom'}}> 店铺暂停营业 </span>
              <Switch defaultChecked={accountInfo.shop.isShutDown} onChange={this.switchChange} checkedChildren={'启用'} unCheckedChildren={'不启用'} />
              <div style={{color: '#ccc'}}>
                <span>暂停营业后，店铺中所有商品将不会被购买</span>
              </div>
            </div>
          </FormItem>
        </Form>
      </div>
    )
  }
}
