import * as React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { changeMenu } from '../../../action/common'
import { alterTaskListSearchInfo } from '../../../action/order'
import { getDomain, getPriceSymbol, } from '../../../util/kit'
import { redirect } from '../../../util/history'
import {LocaleProvider, Tabs, DatePicker, Form, Input, Button, Select, Table, Row, Col, Modal, message, Upload } from 'antd'
import './index.scss'
import mock from '../mock.js'
import enUS from 'antd/lib/locale-provider/en_US'
import { UserBatchPackageDispatch, UserPackageList, InvoiceGet, UserPackingListExportTask, UserPackageDispatch, UserAlterPackageTrackInfo, UserPackageTrackInfoDispatchImportTask, GetEzsellerNewMessage } from '../../../services/EzSellerService'
import{ defaultPackage, defaultFilter, sellerPackageState, TabPaneKey, defaultResult, LogisticCompanyItems, JPlogisticCompanyItems, } from '../utility/constant.ts'
import {getPkgNumbersBasePkgId} from '../utility/util.ts'
import { QINIU_UPLOAD_URL } from '../../../constant/index'
import { getToken } from '../../../api/other'
import IssueOrders from '../issueOrder'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option
const OptGroup = Select.OptGroup
const { RangePicker } = DatePicker
const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
}
const packageWithTab = {
  1: 'waitingPackageData',
  2: 'dispatchedPackageData',
  3: 'cancelledPackageData'
}

@connect(state => ({
  accountInfo: state.common.accountInfo,
}))

class PackageDelivery extends React.Component {

  constructor(props) {
    super(props)
    this.getPost = this.getPost.bind(this)
    this.changeRangeTime = this.changeRangeTime.bind(this)
    this.changeDispatchedTime = this.changeDispatchedTime.bind(this)
    this.changeTypeOfParcel = this.changeTypeOfParcel.bind(this)
    this.changeTranscation = this.changeTranscation.bind(this)
    this.tabClick = this.tabClick.bind(this)
    this.batchDispatch = this.batchDispatch.bind(this)
    this.onClickDispatch = this.onClickDispatch.bind(this)
    this.state = {
      activeTab: 1,
      filter: defaultFilter,
      choosePackageIds: [],
      waitingPackageData: defaultPackage,
      dispatchedPackageData: defaultPackage,
      cancelledPackageData: defaultPackage,
      disabledBatchButton: false,
      loading: false,
      token: null,
      messageBack: []
    }
  }

  componentWillMount() {
    this.getTokenData()
    this.getPost()
  }

  getPost(otherState) {
    const self = this
    const { waitingPackageData, dispatchedPackageData, cancelledPackageData } = this.state
    const {accountInfo} = this.props
    const country = accountInfo.shop.originCode
    const SgOrMy = country === 'SGLocal' || country === 'MYLocal'
    const { startTime, endTime ,pkgNumber, startTimeDispatched, endTimeDispatched, transactionStatus, typeOf, orderNumber } = this.state.filter
    const state = otherState || parseInt(self.state.activeTab)
    const { offset, limit } = this.state[TabPaneKey[state]]
    const filter = {
      state,
      pkgCreateDateStart: startTime,
      pkgCreateDateEnd: endTime,
      pkgShopDispatchDateStart: startTimeDispatched,
      pkgShopDispatchDateEnd: endTimeDispatched,
      pkgState: sellerPackageState.map(item => item.val).indexOf(transactionStatus),
      pkgNumber,
      isStocked: typeOf === 'Consignment',
      orderNumber
    }

    if( !startTime || !endTime) {
      delete filter.pkgCreateDateStart
      delete filter.pkgCreateDateEnd
    }
    if( !startTimeDispatched || !endTimeDispatched ){
      delete filter.pkgShopDispatchDateStart
      delete filter.pkgShopDispatchDateEnd
    }
    typeOf === 'All' && delete filter.isStocked
    filter.pkgState <= 0 && delete filter.pkgState
    !pkgNumber && delete filter.pkgNumber
    !orderNumber && delete filter.orderNumber
    this.setState({
      loading: true
    })
    UserPackageList(filter, offset, limit)
    .then(result => {
      this.setState({
        loading: false
      })
      const currentResult = !!(result && result.data) ? result : defaultResult
      // console.log(!!(result && result.data),defaultResult,currentResult)
      switch(state.toString()) {
        case '1':
          self.setState({
            waitingPackageData: Object.assign({}, waitingPackageData, currentResult)
          }, this.getEzsellerNewMessageTmp)
          break
        case '2':
          self.setState({
            dispatchedPackageData: Object.assign({}, dispatchedPackageData, currentResult)
          }, this.getEzsellerNewMessageTmp)
          break
        case '3':
            self.setState({
              cancelledPackageData: Object.assign({}, cancelledPackageData, currentResult)
            }, this.getEzsellerNewMessageTmp)
          break
      }
    })
  }

  changeRangeTime(value, dateString) {
    const startTime = moment(dateString[0]).unix()
    const endTime = moment(dateString[1]).unix()
    let filter = this.state.filter
    filter.startTime = startTime
    filter.endTime = endTime
    this.setState({
      filter: filter
    })
  }

  changeDispatchedTime(value, dateString) {
    const startTime = moment(dateString[0]).unix()
    const endTime = moment(dateString[1]).unix()
    let filter = this.state.filter
    filter.startTimeDispatched = startTime
    filter.endTimeDispatched = endTime
    this.setState({
      filter: filter
    })
  }

  filterPkgNumber(e) {
    const value = e.target.value
    let filter = this.state.filter
    filter.pkgNumber = value
    this.setState({
      filter: filter
    })
  }

  changeTypeOfParcel(e) {
    let filter = this.state.filter
    filter.typeOf = e
    this.setState({
      filter: filter
    })
  }

  changeTranscation(e) {
    let filter = this.state.filter
    filter.transactionStatus = e
    this.setState({
      filter: filter
    })
  }

  changeOrderNumber(e) {
    let filter = this.state.filter
    filter.orderNumber = e.target.value
    this.setState({
      filter: filter
    })
  }

  batchDispatch() {
    const ref = Modal.confirm({
      title: 'Proceed to bulk dispatch parcels?',
      onOk: () => {
        const self = this
        if (this.state.choosePackageIds.length === 0) {
          message.warn('no package has be choosen')
          return
        }
        this.setState({
          disabledBatchButton: true
        })
        UserBatchPackageDispatch(this.state.choosePackageIds)
          .then(result => {
            this.setState({
              disabledBatchButton: false
            })
            if (result.length === 0) {
              this.setState({
                choosePackageIds: []
              })
              message.success('success')
              // 更新三个tab选项
              this.getPost(1)
              this.getPost(2)
              this.getPost(3)
            } else {
              let errorStr = result && result.length > 0 ? result.map((item) => {
                return item.message
              }).join('\n') : ''
              errorStr += ' Please  print parcel details before dispatching parcels.'

              message.warn(errorStr)
            }
          })
      },
      cancelText: 'cancel',
      onCancel() {ref.destroy()},
    })
  }

  printBill () {
    const pkgIds = this.state.choosePackageIds

    pkgIds.forEach(pkgId => {
        InvoiceGet(pkgId)
        .then(result => {
          PrintKoreaBill(result)
        })
    })
  }

   checkRemarks (remarks) {
    const clms = [{
      title: '备注内容',
      dataIndex: 'text',
      key: 'text'
    },{
      title: '备注时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render (text) {
        return moment(Number(text) * 1000).format('YYYY-MM-DD')
      }
    }]
    Modal.info({
      title: '查看备注',
      content: (
        <div>
          <Table
            bordered
            columns={clms}
            dataSource={remarks}/>
        </div>
      )
    })
  }

  tabClick(e) {
    const self = this
    let filter = this.state.filter
    filter.transactionStatus = 'All'
    this.setState({
      activeTab: parseInt(e),
      choosePackageIds: [],
      filter: filter
    }, self.getPost)
  }

  setPackageData(packageDataName, alterData) {
    const beforePackageData = this.state[packageDataName]
    const currentPackageData = Object.assign({}, beforePackageData, alterData)
    this.setState({
      [packageDataName]: currentPackageData
    }, this.getPost)
  }

  getPagination(packageDataName) {
    const packageData = this.state[packageDataName]
    return {
      total: packageData.total,
      onChange: (page, pageSize) => {
        this.setPackageData(packageDataName, {offset: (page-1)*pageSize})
      },
      showQuickJumper: true,
      showSizeChanger: true,
      onShowSizeChange: (current, size) => {
        this.setPackageData(packageDataName, {limit: size})
      },
      pageSizeOptions: ['10', '20', '40', '60', '80', '100']
    }
  }

  onClickDispatch(record) {
    const { activeTab } = this.state
    const {accountInfo} = this.props
    let Company = activeTab === 1 ? 'Post-office Delivery' : record.trackInfo.provider
    let Tracking = activeTab === 1 ? '' : record.trackInfo.trackingNumber
    const isDisabled = record.state !== 2 && activeTab === 2
    const LogisticCompany = accountInfo.shop.originCode === 'JP' ? JPlogisticCompanyItems : LogisticCompanyItems
    Modal.confirm({
      title: 'Dispatching Information',
      width: 600,
      content: (
        <div>
          <div style={{margin: '30px 0'}}>
            Logistic Company:
            {
              isDisabled ?
              <span className="dispatchingInp"> {Company} </span>:
              <Select
                className="dispatchingInp"
                defaultValue={Company}
                onChange={ val => Company = val }>
                {
                  LogisticCompany.map((item, index) =>
                    <Option key={index} value={item}> {item} </Option>
                )
                }
              </Select>
            }
          </div>
          <div>
            Tracking Number:
            {
              isDisabled ?
              <span className="dispatchingInp"> {Tracking} </span>:
              <Input
                className="dispatchingInp"
                defaultValue={Tracking}
                onChange={ e => Tracking = e.target.value }/>
            }
          </div>
        </div>
      ),
      onOk: () => {
        const Services = activeTab === 1 ? UserPackageDispatch : UserAlterPackageTrackInfo
        !isDisabled && Services(record.pkgId, {
          provider: Company,
          trackingNumber: Tracking
        }).then(result => {
          if (result.code === 0) {
            this.setState({
              choosePackageIds: []
            })
            message.success('success')
            this.getPost()
          } else {
            message.error(result ? result.message : '')
          }
        })
      },
      okText: isDisabled ? 'Confirm' : 'Submit'
    })
  }
  getTokenData() {
        getToken(info => {
            this.setState({
              token: info.token
            })
        })
    }
    onClickIssue(record) {
      Modal.confirm({
        title: 'Submit Order Issue',
        width: '1000px',
        content: <IssueOrders orderItems={record.orderItems} />
      })
    }
    getEzsellerNewMessageTmp() {
      const { activeTab } = this.state
      const data = this.state[packageWithTab[activeTab]]
      const allData = data.data.reduce((pVal, cVal) => {
        return pVal.concat(cVal.orderItems)
      }, [])
      GetEzsellerNewMessage({
        orderNums: allData.map(item => item.orderNumber),
        sender: 2,
        msgType: 1
      }).then(result => {
        if (result && result.result)
          this.setState({
            messageBack: Object.keys(result.result)
          })
      })
    }

  render () {
    const self = this
    const {choosePackageIds, activeTab, token, messageBack} = this.state
    const {accountInfo, dispatch} = this.props
    const country = accountInfo.shop.originCode
    const isCN = country === 'CN'
    const isKR = country === 'KR'
    // 下面的这个SgOrMy跟业务强强强强耦合，没事不要乱动 -- 善意提醒
    const SgOrMy = country === 'SGLocal' || country === 'MYLocal'
    const rowSelection = {
      selectedRowKeys: choosePackageIds,
      onChange(selectedRowKeys, selectedRows) {
        self.setState({
          choosePackageIds: selectedRowKeys
        })
      },
      onSelectAll(selected, selectedRows, changeRows) {
        const packageIds = selectedRows.map((item) => {
          return item.pkgId
        })
        const cPackageIds = changeRows.map((item) => {
          return item.pkgId
        })
        if (selected) {
          const currentChoosePackageIds = Array.from(new Set([...choosePackageIds, ...packageIds]))
          self.setState({
            choosePackageIds: currentChoosePackageIds
          })
        } else {
          const currentChoosePackageIds = choosePackageIds.filter(id => !cPackageIds.includes(id))
          self.setState({
            choosePackageIds: currentChoosePackageIds
          })
        }
      }
    }
    const uploadProps = {
        name: 'file',
        action: QINIU_UPLOAD_URL,
        data: { token },
        accept: '.xlsx',
        onChange: info => {
            if (info.file.status === 'done') {
              UserPackageTrackInfoDispatchImportTask(info.file.response.key)
                .then(result => result && result.id && redirect(`/importTask?id=${result.id}`))
            }
            else if (info.file.status === 'error') {
                message.warn(`${info.file.name} ${getText('upload_fail')}`)
            }
        }
    }

    const TableInfo = [
      {
        title: (
          SgOrMy ?
          <Row style={{textAlign: 'center'}}>
            <Col span={6}> Product Name </Col>
            <Col span={2}>Payable Amount({getPriceSymbol(country)})</Col>
            <Col style={{textAlign: 'center'}} span={2}>Quantity</Col>
            <Col span={2}>Product Thumbnail</Col>
            <Col span={SgOrMy ? '2' : '4'}>Remarks</Col>
            <Col span={SgOrMy ? '2' : '4'}>Transaction Status</Col>
            <Col span={SgOrMy ? '2' : '0'}>Type of Parcel</Col>
            <Col span={2}>Dispatch Deadline</Col>
            <Col span={2}>Parcel Dispatched Time</Col>
            <Col span={2}> Operation </Col>
          </Row>
          :
          <Row style={{textAlign: 'center'}}>
            <Col span={parseInt(activeTab) === 2 ? 4 : 6}> Product Name </Col>
            <Col span={2}>Payable Amount({getPriceSymbol(country)})</Col>
            <Col style={{textAlign: 'center'}} span={2}>Quantity</Col>
            <Col span={2}>Product Thumbnail</Col>
            <Col span={SgOrMy ? '2' : '4'}>Remarks</Col>
            <Col span={SgOrMy ? '3' : '4'}>Transaction Status</Col>
            <Col span={SgOrMy ? '3' : '0'}>Type of Parcel</Col>
            <Col span={2}>Dispatch Deadline</Col>
            {
              parseInt(activeTab) !== 1 && <Col span={2}>Parcel Dispatched Time</Col>
            }
            <Col span={2}> Operation </Col>
          </Row>
        ),
        render(text, record, index) {
          // 包裹的record
          const span = {
            span2: '8.3%',
            span3: '12.5%',
            span4: '16.66%',
            span6: '25.00%'
          }
          const packageItem = record
          const packageInfo = [{
            title: 'Product Name',
            dataIndex: 'productName',
            width: parseInt(activeTab) !== 2 ? span.span6 : span.span4,
            render: (text, record) => {
            // 单品SKU的record
              const stateArr = ['', '', '', 'Cancelled', '', '', '', '']
              const pattern = /id=(\d*)/i
              const url = record.productUrl || 'id=00000'
              return(
                <div style={{ width: '100%'}}>
                  <p> Order Number: {record.orderNumber}</p>
                  <p>
                    <a
                      target="_blank"
                      href={getDomain(accountInfo.shop.originCode)+'/product/'+pattern.exec(url)[1] + '.html'}
                       style={{ wordBreak: 'break-all'}}
                      >
                      {text}
                    </a>
                  </p>
                  {record.skuName}{record.sellerSkuId ? `(${record.sellerSkuId})` : ''} &nbsp;&nbsp;
                  <span style={{color: '#f00'}}>{stateArr[record.state]}</span>
                </div>
              )
            }
          },{
            title: 'Single Unit Price',
            dataIndex: 'itemPaidAmount',
            width: span.span2,
            render: (text) => (<span>{Number(text).toFixed(2)}</span>)
          },{
            title: 'Quantity',
            dataIndex: 'quantity',
            className: 'text-center',
            width: span.span2
          },{
            title: 'Product Thumbnail',
            dataIndex: 'img',
            width: span.span2,
            render: (text) => {
              return(
                <a href={text} target="_blank">
                  <img className="skuImage" src={text} alt="" style={{ width: '80px', height: '80px' }}/>
                </a>
              )
            }
          },{
            title: 'Remarks',
            // 这里要实现一个弹窗
            dataIndex: 'remarks',
            width: span.span2,
            render: (text, record) => {
              return (
                <div>
                  {record.remarks.length > 0 ? (
                    <p><a href="javascript:;" onClick={self.checkRemarks.bind(self, record.remarks)}>Remarks({record.remarks.length})</a></p>
                  ) : (<span></span>)}
                </div>
              )
            }

          },{
            title: 'Transaction Status',
            width: span.span3,
            render: (text, record, index) => {
              const obj = {
                children: (<span>{packageItem.state}</span>),
                props: {},
              }
              if (index === 0) {
                obj.props.rowSpan = packageItem.orderItems.length
              }
              if (index > 0) {
                obj.props.rowSpan = 0
              }
              return obj
            }
          },{
            title: 'Type of Parcel',
            width: SgOrMy ? span.span3 : 0,
            className: SgOrMy ? '' : 'hide',
            render: (text, record, index) => {
              const obj = {
                children: (<span>{packageItem.isStocked ? 'Consignment' : 'Presales'}</span>),
                props: {},
              }
              if (index === 0) {
                obj.props.rowSpan = packageItem.orderItems.length
              }
              if (index > 0) {
                obj.props.rowSpan = 0
              }
              return obj
            }
          },{
            title: 'Dispatch Deadline',
            width: span.span2,
            render: (text, record, index) => {
              const obj = {
                children: (
                  <div>
                    <p>{moment(packageItem.expiredAt*1000).format('YYYY-MM-DD')}</p>
                    <p>{moment(packageItem.expiredAt*1000).format('HH:mm:ss')}</p>
                  </div>
                ),
                props: {},
              }
              if (index === 0) {
                obj.props.rowSpan = packageItem.orderItems.length
              }
              if (index > 0) {
                obj.props.rowSpan = 0
              }
              return obj
            }
          }]
          .concat(parseInt(activeTab) === 1 ? [] : [{
            title: 'Parcel Dispatched Time',
            width: span.span2,
            render: (text, record, index) => {
              const obj = {
                children: packageItem.dispatchedAt
                  ? (
                    <div>
                      <p>{moment(packageItem.dispatchedAt*1000).format('YYYY-MM-DD')}</p>
                      <p>{moment(packageItem.dispatchedAt*1000).format('HH:mm:ss')}</p>
                    </div>
                  )
                  : '-',
                props: {},
              }
              if (index === 0) {
                obj.props.rowSpan = packageItem.orderItems.length
              }
              if (index > 0) {
                obj.props.rowSpan = 0
              }
              return obj
            }
          }])
          .concat([
            {
              title: 'Operation',
              width: span.span2,
              render: (text, record, index) => {
                const obj = {
                  children: (
                    <div>
                      {
                        parseInt(activeTab) !== 3 && !SgOrMy ?
                        <a onClick={() => self.onClickDispatch(record)}>
                        { activeTab === 1 ? 'Dispatch' : (record.state !== 2 ? 'Dispatching Information' : 'Check and Change dispatching infomation')} </a>
                        :
                        null
                      }
                      {
                        isKR ?
                        <span>
                          {  record.orderItems.some(item => messageBack.includes(item.orderNumber)) ?
                            <span className="taged" /> : null
                          }
                          <a onClick={() => self.onClickIssue(record)}>
                            Submit Order Issue
                          </a>
                        </span>
                      :
                      null
                      }
                    </div>
                  ),
                  props: {},
                }
                if (index === 0) {
                  obj.props.rowSpan = packageItem.orderItems.length
                }
                if (index > 0) {
                  obj.props.rowSpan = 0
                }
                return obj
              }
            }
          ])
          return (
            <section>
              <h4>
                <span style={{marginRight: 10}}>pkgNumber:</span>
                <var style={{marginRight: 20}}>{record.pkgNumber}</var>
                <span>Generated Time：{moment(record.createdAt*1000).format('YYYY-MM-DD HH:mm:ss')}</span>
              </h4>
              <Table bordered columns={packageInfo} dataSource={record.orderItems.map(item => ({...item, orderItems: record.orderItems, pkgId: record.pkgId, trackInfo: record.trackInfo}))} pagination={false} showHeader={false}/>
            </section>
          )
        }
      }
    ]

    return (
      <LocaleProvider locale={enUS}>
        <div className="packageDelivery">
          <Row>
            <Col span={12}>
              <span> Generated Time </span>
              <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime defaultValue={moment().locale('en').utcOffset(0)} locale={enUS} onChange={this.changeRangeTime} />
            </Col>
            <Col span={12}>
              <span> Parcel Dispatched Time </span>
              <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime defaultValue={moment().locale('en').utcOffset(0)} locale={enUS} onChange={this.changeDispatchedTime} />
            </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col span={12}>
              <span> Parcel Number </span>
              <Input placeholder="Parcel Number" onChange={this.filterPkgNumber.bind(this)} className="inlineBlock" />
            </Col>
            <Col span={12}>
              <span> Order Number </span>
              <Input placeholder="Order Number" onChange={this.changeOrderNumber.bind(this)} className="inlineBlock" />
            </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col span={SgOrMy ? 8 : 0}>
              <span> Type of Parcel </span>
              <Select defaultValue="All" style={{ width: 120 }} onChange={this.changeTypeOfParcel}>
                <Option value="All">All</Option>
                <Option value="Presales">Presales</Option>
                <Option value="Consignment">Consignment</Option>
              </Select>
            </Col>
            <Col span={8}>
              <span> Transaction Status </span>
              <Select value={this.state.filter.transactionStatus} style={{ width: 220 }} onChange={this.changeTranscation}>
                <Option value="All">All</Option>
                {sellerPackageState.map((item, index) => {
                  return (<Option key={index} value={item.val}>{item.describe}</Option>)
                })}
              </Select>
            </Col>
            <Col span={8}>
              <Button onClick={() => this.getPost()}>Confirm</Button>
            </Col>
          </Row>
          <Tabs onTabClick={this.tabClick} className="packageTable" defaultActiveKey="1" >
            <TabPane tab={`Waiting To Be Dispatched(${this.state.waitingPackageData.total})`} key="1">
              <Row style={{marginBottom: 15}}>
                <Col span={4}>
                  <Button
                      disabled={!this.state.choosePackageIds.length}
                      onClick={() => {
                        const pkgIds = this.state.choosePackageIds
                        {/* const data = this.state[TabPaneKey[this.state.activeTab]].data
                        const pkgNumbers = getPkgNumbersBasePkgId(data, pkgIds) */}
                        UserPackingListExportTask({pkgIds}, isCN ? 1 : 2)
                          .then(result => {
                            if (result && result.id)
                              window.open(`/index.html#/exportTask?taskId=${result.id}`, '_blank')
                          })
                      }}>Download Packing List</Button>
                </Col>
                <Col span={4} style={{marginRight: '20px'}}>
                  <Button
                      disabled={!this.state.choosePackageIds.length}
                      onClick={() => {
                        const packageIds = this.state.choosePackageIds
                        window.open(`/printOrder.html?pkgIds=${encodeURIComponent(packageIds)}&country=${accountInfo.shop.originCode}`)
                      }}>Bulk Print Parcel Number</Button>
                </Col>
                <Col span={4}>
                {
                    SgOrMy ?
                    <Button disabled={this.state.disabledBatchButton} onClick={this.batchDispatch}>Bulk Dispatch Parcels</Button> :
                    <Upload
                      {...uploadProps}>
                      <Button disabled={this.state.disabledBatchButton}>Bulk Dispatch Parcels</Button>
                    </Upload>
                  }
                </Col>
              </Row>
              <Table loading={this.state.loading} pagination={this.getPagination('waitingPackageData')} locale={enUS} bordered rowSelection={rowSelection} rowKey={row => row.pkgId} columns={TableInfo} dataSource={this.state.waitingPackageData.data} />
            </TabPane>
            <TabPane tab={`Parcels Dispatched(${this.state.dispatchedPackageData.total})`} key="2">
              <div className="formBtn">
                <Button
                disabled={!this.state.choosePackageIds.length}
                style={{marginRight: '10px'}}
                onClick={() => {
                  const pkgIds = this.state.choosePackageIds
                  {/* const data = this.state[TabPaneKey[this.state.activeTab]].data
                  const pkgNumbers = getPkgNumbersBasePkgId(data, pkgIds) */}
                  UserPackingListExportTask({pkgIds}, isCN ? 1 : 2)
                    .then(result => {
                      if (result && result.id) {
                        dispatch(alterTaskListSearchInfo({taskId: result.id}))
                        window.open(`/index.html#/exportTask?taskId=${result.id}`)
                      }
                    })
                }}>Download Packing List</Button>
                <Button
                  disabled={!this.state.choosePackageIds.length}
                  onClick={() => {
                    const packageIds = this.state.choosePackageIds
                    window.open(`/printOrder.html?pkgIds=${encodeURIComponent(packageIds)}&country=${accountInfo.shop.originCode}`)
                  }}>Bulk Print Parcel Number</Button>
              </div>
              <Table loading={this.state.loading} pagination={this.getPagination('dispatchedPackageData')} rowSelection={rowSelection} rowKey={row => row.pkgId} columns={TableInfo} dataSource={this.state.dispatchedPackageData.data} />
            </TabPane>
            <TabPane tab={`Parcels Cancelled(${this.state.cancelledPackageData.total})`} key="3">
              <Table loading={this.state.loading} pagination={this.getPagination('cancelledPackageData')} rowSelection={rowSelection} rowKey={row => row.pkgId} columns={TableInfo} dataSource={this.state.cancelledPackageData.data} />
            </TabPane>
          </Tabs>
        </div>
      </LocaleProvider>
    )
  }
}

export default PackageDelivery
