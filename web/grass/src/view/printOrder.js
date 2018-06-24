import '../scss/_base.scss'
import * as React from "react";
import { Component } from 'react'
import ReactDOM from 'react-dom'

import Fetch from 'fetch.io'
import {getApiPrefix} from '../util/kit'
import queryString from 'query-string'
import PrintTable from '../component/printOrder/printTable.tsx'
import * as SellerPrint from '../util/print/SellerPrint.js'

let track
if (window.location.search.includes('packageIds')) {
  track = { packageIds: queryString.parse(location.search).packageIds.split(',') }
} else if (window.location.search.includes('pkgIds')) {
  track = { pkgIds: queryString.parse(location.search).pkgIds.split(',') }
} else {
  track = JSON.parse(queryString.parse(location.search).track)
}
const theads = ['编号', '订单号', '商品名称', '商品SKU', '商品数量']
const hostname = getApiPrefix()

import { UserOrderItemGroupList, UserPickList, InvoiceGet } from '../services/EzSellerService'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      picks: [],
      invoices: []
    }
  }

  componentDidMount() {
    SellerPrint.injectPrintScript()
  }

  componentWillMount() {
    const { track } = this.props
    if (track.provider) {
        UserOrderItemGroupList(0,9999,{status: 2,trackingProvider: track.provider,trackingNum: track.trackingNum})
        .then(result => {
          this.setState({
            orders: result.data
          })
        })
    } else if (track.packageIds) {
      const pkgIds = track.packageIds.map(id => Number(id))
        UserPickList(pkgIds)
        .then(result => {
          this.setState({
            picks: result
          })
        })
    } else {
      const pkgIds = track.pkgIds.map(id => Number(id))
      pkgIds.forEach(pkgId => {
          InvoiceGet(pkgId)
          .then(result => {
            !result.message && this.setState({
              invoices: this.state.invoices.concat(result)
            })
          })
      })
    }
  }

  render () {
    const { orders, picks, invoices } = this.state

    if (!orders.length && !picks.length && !invoices.length) return (<h1>Loading...</h1>)
    if (orders.length) {
      const _orders = []
      for (let i = 0; i < orders.length ;i ++) {
        for (let j = 0;j < orders[i].items.length; j++) {
          _orders.push(orders[i].items[j])
        }
      }
      return (
        <div style={{ padding: '8px 16px' }}>
          <div id="ordersContainer">
            <div style={{
              borderBottom: '1px solid #CCC',
              display: '-webkit-box',
              WebkitBoxPack: 'center',
              WebkitBoxAlign: 'center'
            }}>
              <div style={{
                display: '-webkit-box',
                WebkitBoxPack: 'center',
                WebkitBoxAlign: 'center',
                paddingTop: '1rem'
              }}>
                <img src="../static/ezbuy_logo@1x.png" style={{ width: '5.8rem', verticalAlign: 'middle', marginTop: '0.5rem'}} />
                <span style={{margin: '0.6rem 0 0.8rem 1rem', fontWeight: '300' }}>发货清单</span>
              </div>
              <div style={{ WebkitBoxFlex: 1, textAlign: 'right', marginRight: '1rem' }}>
                <span style={{ fontSize: '14px' }}>物流公司:  <strong>{`${orders[0].track.provider}`}</strong></span>
                <span style={{ display: 'inline-block', paddingLeft: '1rem', fontSize: '14px' }}>运单号:  <strong>{`${orders[0].track.trackingNum}`}</strong></span>
              </div>
            </div>
            <div>
              <table className="printTable">
                <thead>
                  <tr>
                    {
                      theads.map(text => (<th>{text}</th>))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    _orders.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.orderNum}</td>
                          <td>{item.productName}</td>
                          <td>{item.skuName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
              className="ui teal button"
              onClick={() => SellerPrint.print('ordersContainer')}
              style={{ position: 'fixed' , right: '32rem', top: '1rem' }}>
              Print
            </button>
            <button
              className="ui teal button"
              onClick={() => SellerPrint.preview('ordersContainer')}
              style={{ position: 'fixed' , right: '25rem', top: '1rem' }}>
              Preview
            </button>
          </div>
        </div>
      )
    } else if (picks.length) {
      const heads = ['Parcel Number', 'SKUID', 'Product Name', 'Sku Detail', 'Quantity']
      return (
        <div style={{ padding: '8px 16px' }}>
          <div style={{
            borderBottom: '1px solid #CCC',
            display: '-webkit-box',
            WebkitBoxPack: 'center',
            WebkitBoxAlign: 'center'
          }}>
            <div style={{
              display: '-webkit-box',
              WebkitBoxPack: 'center',
              WebkitBoxAlign: 'center'
            }}>
              <img src="../static/ezbuy_logo@1x.png" style={{ width: '5.8rem', verticalAlign: 'middle', marginTop: '-5px' }} />
              <h2 style={{ display: 'inline-block', margin: '0.6rem 0 0.8rem 1rem', fontWeight: '300' }}>Packing List</h2>
            </div>
            <div style={{ WebkitBoxFlex: 1, textAlign: 'right' }}>
              <span style={{ fontSize: '14px' }}><strong></strong></span>
            </div>
          </div>
          <div id="picksContainer">
            <table className="printTable">
              <thead>
                <tr>
                  {
                    heads.map(text => (<th>{text}</th>))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  picks.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.packageNumber}</td>
                        <td>{item.sellerSkuId ? item.sellerSkuId : item.skuId}</td>
                        <td>{item.productName}</td>
                        <td>{item.skuInfo}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
                className="ui teal button"
                onClick={() => SellerPrint.print('picksContainer')}
                style={{ position: 'fixed' , right: '3rem', top: '1rem' }}>
                Print
            </button>
            <button
              className="ui teal button"
              onClick={() => SellerPrint.preview('picksContainer')}
              style={{ position: 'fixed' , right: '9rem', top: '1rem' }}>
              Preview
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="miandan">
          {/* <button
            className="ui teal button"
            onClick={() => SellerPrint.pagingPrint('page', 2)}
            style={{ position: 'fixed' , right: '3rem', top: '3rem' }}>
            Print
          </button>
          <button
            className="ui teal button"
            onClick={() => SellerPrint.pagingPreview('page', 2)}
            style={{ position: 'fixed' , right: '3rem', top: '6rem' }}>
            Preview
          </button> */}
          <button
            className="ui teal button"
            style={{ position: 'fixed' , right: '3rem', top: '6rem' }}
            onClick={() => window.print()}>
            Print
          </button>
          <div id="printHtml">
            {
              invoices.map((pkg, index) => {
                // one page contains four orders
                if (index % 4 !== 0) {
                  return
                }
                if (pkg.subPkgNumbers === undefined) {
                  pkg.subPkgNumbers[0] = {}
                }
                const upOrder_on_a_page0 = invoices[index]
                const upOrder_on_a_page1 = invoices[index + 1]
                const upOrder_on_a_page2 = invoices[index + 2]
                const upOrder_on_a_page3 = invoices[index + 3]
                return (
                  <div className="page">
                    <PrintTable pkg={upOrder_on_a_page0} key={`pt${index}`} />
                    {upOrder_on_a_page1 && <PrintTable pkg={upOrder_on_a_page1} key={`pt${index+1}`} />}
                    {upOrder_on_a_page2 && <PrintTable pkg={upOrder_on_a_page2} key={`pt${index+2}`} />}
                    {upOrder_on_a_page3 && <PrintTable pkg={upOrder_on_a_page3} key={`pt${index+3}`} />}
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <Main track={track}></Main>,
  document.getElementById('app')
)
