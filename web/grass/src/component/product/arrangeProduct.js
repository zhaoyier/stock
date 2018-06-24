import * as React from 'react'
import { Icon, Row, Col, Input, Select, Button, Tabs, Dropdown, Menu, Table, Switch, Modal, message, DatePicker, InputNumber, Popconfirm, Card, Upload, Tooltip, Checkbox } from 'antd'
import { redirect } from '../../util/history'
import { connect } from 'react-redux'
import moment from 'moment'
import { QINIU_UPLOAD_URL } from '../../constant/index'
import { getToken } from '../../api/other'
import { warn, success } from '../../util/antd'
import { getDomain, getPriceSymbol } from '../../util/kit'
import {
	getSearchParamValue
} from '../../util/url'
import EditExtra from '../coSale/editExtra'
import { locale } from '../../config/locale'
import { NET_MAP, COUNTRY_CODE_MAP } from '../../constant'
import { userUploadProducts } from '../../api/productManage'
import './arrangeProduct.scss'
import {
  productList,
  productGet,
  productFilter,
  productChange,
  getValueOptions,
  userProductQuickUpdate,
  userProductBatchDelete,
  productUpdate,
  shopExportSkus,
  changeCategory,
} from '../../action/productManage'
import { changeMenu } from '../../action/common'
import enUS from 'antd/lib/locale-provider/en_US';
const Option = Select.Option
const TabPane = Tabs.TabPane
const ButtonGroup = Button.Group
const { MonthPicker, RangePicker } = DatePicker

@connect(state => ({
  products: state.productManage.products,
  filter: state.productManage.filter,
  productSkus: state.productManage.productSkus,
  productData: state.productManage.productData,
  accountInfo: state.common.accountInfo
}))
class ArrangeProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      coSaleProductName: '',
      search: false,
      selectedRowKeys: [],
      selectedRowKey: [],
      editTitleData: {
        visible: false,
        pid: 0,
        text: ''
      }
    }
  }
  componentWillMount() {
    const {
      dispatch,
      accountInfo,
      filter,
    } = this.props
    const arrangeProductSearch = location.href.split('arrangeProduct')[1]
    const searchValue = getSearchParamValue('isOnSale', arrangeProductSearch)
    if (searchValue !== '') {
      filter.dataFilter.isOnSale = searchValue === 'true'
    }
    this.reloadProducts(filter)
    getToken((info) => {
      this.setState({
        baseUrl: info.baseUrl,
        token: info.token
      })
    })
    dispatch(changeMenu({
      main: 0,
      sub: '02'
    }))

    this.__ = locale(accountInfo.shop.originCode)
  }
  reloadProducts(filter) {
    const {
      current,
      pageSize,
      dataFilter,
    } = filter
    const { dispatch } = this.props
    dispatch(productFilter(filter))
    dispatch(productList((current - 1) * pageSize, pageSize, dataFilter))
  }
  verifiSkus(skus) {
    if (skus.length == 0) {
      warn('请输入sku数据！')
      return
    }
    let flag = false
    for (let i = 0; i < skus.length; i++) {
      if (skus[i].isOnSale) {
        if (!skus[i].price) {
          warn('sku数据不完整！')
          return false
        }
        if (!skus[i].quantity) {
          warn('sku数据不完整！')
          return false
        }
        if (!skus[i].originalPrice) {
          warn('sku数据不完整！')
          return false
        }
        if (!skus[i].weight) {
          warn('sku数据不完整！')
          return false
        }
      }
    }
    if (!flag) {
      if (skus.length == 1 && skus[0].name == 'single') {
        warn('库存不能为0!')
      } else {
        warn('不允许每个SKU库存都为0！')
      }
      return false
    }
    return true
  }
  searchCondition(e, name) {
    let state = this.state
    if (e.target.value != '' && isNaN(parseInt(e.target.value))) {
      message.info('请输入数字')
    } else {
      state[name] = e.target.value == '' ? null : parseInt(e.target.value)
      state.search = false
      this.setState(state)
    }
  }
  render() {
    const {
      dispatch,
      products,
      accountInfo,
      productSkus,
      productData,
    } = this.props
    let { filter } = this.props
    const {
      visible,
      coSaleProductName,
      search,
      editTitleData,
    } = this.state
    const isCN = this.props.accountInfo.shop.originCode === 'CN'
    const getText = this.__
    const columnsToNormal = [{
      title: getText('name_of_product'),
      key: 'name',
      dataIndex: 'name',
      width: 200,
      render: (text, record) => (
        <div style={{ width: 200 }}>
          <a
            target="_blank"
            className="productTitleLink"
            style={{ wordBreak: 'break-all' }}
            onClick={() => {
              const pattern = /id=(\d*)/i
              window.open(getDomain(accountInfo.shop.originCode) + '/product/' + pattern.exec(record.url)[1] + '.html', '_blank')
            }}>
            <span> {text} </span>
            <Icon
              className="editIcon"
              type="edit"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                this.setState({
                  editTitleData: {
                    pid: record.pid,
                    visible: true,
                    text
                  }
                })
              }} />
          </a>
        </div>)
    }, {
      title: `${getText('selling_price')}(${getPriceSymbol(this.props.accountInfo.shop.originCode)})`,
      key: 'price',
      dataIndex: 'price',
    }].concat(isCN ? [
      {
        title: '是否含有电池/液体/粉末',
        key: 'shipment',
        dataIndex: 'shipment',
        render: (text, record) => <Switch
          onChange={ checked => {
            dispatch(userProductQuickUpdate([record.pid], {
                shipment: checked ? 2 : 1
              }, () => {
                this.reloadProducts(filter)
              }))
          } }
          checked={text === 2}
          checkedChildren="开"
          unCheckedChildren="关" />
      }
    ] : []).concat([{
      title: getText('product_thumbnail'),
      key: 'primaryImage',
      dataIndex: 'primaryImage',
      render: (text) => (
        <a target="_blank" href={text}><img src={text} style={{ width: 100 }} /></a>
      )
    }, {
      title: getText('status'),
      key: 'isOnSale',
      dataIndex: 'isOnSale',
      render: (text, record) => {
        if (record.forcedOffSale) {
          return (<span>{getText('compulsory_off_sales')}</span>)
        } else if (text) {
          return (<span>{getText('on_sale')}</span>)
        } else {
          return (<span>{getText('off_sale')}</span>)
        }
      }
    }, {
      title: getText('sales_amount'),
      key: 'soldCount',
      dataIndex: 'soldCount'
    }, {
      title: getText('operation'),
      key: 'operate',
      render: (text, record) => (
        <section>
          <Button style={{ marginRight: 10 }} onClick={() => {
              dispatch(changeCategory(false))
              dispatch(getValueOptions(record.categoryId, () => {
                redirect('/productEdit', {
                  from: 'checkProduct',
                  pid: record.pid,
                  categoryId: record.categoryId
                })
              }))
          }}>
            {getText('edit_product')}
          </Button>
          {
            record.isOnSale && (<Button onClick={() => {
              dispatch(userProductQuickUpdate([record.pid], {
                isOnSale: false
              }, () => {
                this.reloadProducts(filter)
              }))
            }}>{getText('off_sale')}</Button>)
          }
          {
            record.forcedOffSale && <Button style={{ marginRight: 10 }} onClick={() => {
              Modal.info({
                title: `${getText('offsale_reason')}`,
                okText: 'OK',
                content: (
                  <div>
                    {
                      record.opLogs.map(log => (
                        <div style={{ padding: '10px 5px' }}>
                          <p>{getText('time')}：{`${moment(log.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss')}`}</p>
                          <p>{getText('reason')}：{log.text || '-'}</p>
                        </div>
                      ))
                    }
                  </div>
                )
              })
            }}>{getText('offsale_reason')}</Button>
          }
          {
            !record.isOnSale && (<Button onClick={() => {
              dispatch(userProductQuickUpdate([record.pid], {
                isOnSale: true
              }, () => {
                this.reloadProducts(filter)
              }))
            }}>{getText('product_on_sale')}</Button>)
          }
        </section>
      )
    }])
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      selections: true,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys
        })
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        let selectedRowKey = selectedRows.map(item => item.pid)
        this.setState({
          selectedRowKey: selectedRowKey
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let choosePids = selectedRows.map((item) => {
          return item.pid
        })
        this.setState({
          selectedRowKeys: choosePids
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    }

    const pagination = {
      total: products.total,
      showTotal: (total) => (`${getText('total')} ${total} ${getText('listing')}`),
      current: filter.current,
      showSizeChanger: true,
      showQuickJumper: true,
      locale: {
        items_per_page: `${getText('items_per_page')}`
      },
      onChange: (current) => {
        filter.current = current
        this.reloadProducts(filter)
      },
      onShowSizeChange: (current, pageSize) => {
        filter.current = current
        filter.pageSize = pageSize
        this.reloadProducts(filter)
      }
    }
    const rowKey = record => record.pid
    const locale = {
      filterConfirm: '确定排序',
      filterReset: null,
      emptyText: null
    }

    const isLocal = accountInfo.shop.originCode === 'SGLocal'
      || accountInfo.shop.originCode === 'MYLocal'

    const props = {
      name: 'file',
      action: QINIU_UPLOAD_URL,
      accept: '.xlsx',
      data: { token: this.state.token },
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status === 'done') {
          userUploadProducts(info.file.response.key, (result) => {
            if (result.length === 0) {
              message.success('success')
            } else {
              for (let i = 0; i < result.length; i++) {
                message.error(result[i])
              }
            }
          })
        }
      }
    }
    return (<section className="arrangeProduct">
      <h1>{getText('product_management')}
      </h1>
      <section>
        <div style={{ position: 'relative', minHeight: 300 }}>
          <Tabs defaultActiveKey="1" onChange={(v) => {
            switch (v) {
              case '1':
                filter.dataFilter.productSellType = 1
                filter.current = 1
                this.reloadProducts(filter)
                break
              case '2':
                filter.dataFilter.productSellType = 1
                filter.current = 1
                filter.dataFilter.isOnSale = null
                this.reloadProducts(filter)
                break
              default:
                break
            }
          }}>
            {/* 普通商品 */}
            <TabPane tab={<span>{getText('common_product')}</span>} key="1">
              <div style={{ marginBottom: 10 }}>
                <Card>
                  <Row>
                    <Col span="24">
                      <label>{getText('is_stock')}：</label>
                      <Select value={filter.dataFilter.isOnSale} onChange={(v) => {
                        filter.dataFilter.isOnSale = v
                        this.reloadProducts(filter)
                      }} style={{ width: 100, marginRight: 10 }}>
                        <Option key='2' value={null}>{getText('all')}</Option>
                        <Option key='0' value={true}>{getText('yes')}</Option>
                        <Option key='1' value={false}>{getText('no')}</Option>
                      </Select>
                      {isLocal &&
                        <span>
                          <label>{getText('in_stock')}</label>
                          <Select
                            value={filter.dataFilter.isStocked}
                            onChange={v => {
                              filter.dataFilter.isStocked = v
                              this.reloadProducts(filter)
                            }} style={{ width: 100, margin: '0 0.5rem' }}>
                            <Option key='2' value={null}>{getText('all')}</Option>
                            <Option key='0' value={true}>{getText('yes')}</Option>
                            <Option key='1' value={false}>{getText('no')}</Option>
                          </Select>
                        </span>
                      }
                      <label>{getText('product_name')}</label>
                      <Input type='text' style={{ marginLeft: 10, width: 300, marginRight: 10 }} onChange={(e) => { filter.dataFilter.productName = e.target.value }} />
                    </Col>
                    <Col style={{ display: 'inline-block', marginTop: 7 }}>
                      {getText('price_rage')}：
                          <InputNumber style={{ margin: '0 0.5rem' }} min={0} value={filter.dataFilter.minPrice || 0} onChange={(v) => {
                        filter.dataFilter.minPrice = v
                        dispatch(productFilter(filter))
                      }} />
                      {getText('to')}
                      <InputNumber style={{ margin: '0 0.5rem' }} min={0} value={filter.dataFilter.maxPrice || 0} onChange={(v) => {
                        filter.dataFilter.maxPrice = v
                        dispatch(productFilter(filter))
                      }} />
                      {getText('time_created')}：
                          <RangePicker
                        style={{ width: 225 }}
                        defaultValue={moment().locale('en').utcOffset(0)}
                        locale={enUS}
                        onChange={(value, dateString) => {
                          let minDate = moment(value[0]).startOf('day').unix()
                          let maxDate = moment(value[1]).endOf('day').unix() - 1
                          filter.dataFilter.minCreateDate = minDate
                          filter.dataFilter.maxCreateDate = maxDate
                          dispatch(productFilter(filter))
                        }} />
                      <Button style={{ marginLeft: 10 }} onClick={() => {
                        filter.current = 1
                        this.reloadProducts(filter)
                      }}>
                        {getText('search')}
                      </Button>
                      <span style={{ marginLeft: 30 }}>
                        {`${getText('results_as_per_current_search')}:${products.total}，${getText('number_of_on_sales')}:${products.onSaleCount}`}
                      </span>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col span={24}>
                      <ButtonGroup>
                        <Button onClick={() => {
                          dispatch(shopExportSkus(filter.dataFilter, (fileId) => {
                            let url = window.location.href.includes('ezbuy') ? 'https://webapi.ezbuy.com' : 'http://webapi.sg.65emall.net'
                            window.open(`${url}/api/EzSeller/ExportFile/Download/${fileId}`)
                          }))
                        }}>{getText('Export SKU Details')}</Button>
                        <Upload {...props}>
                          <Tooltip placement="topLeft" title={getText('Import SKU Details tips')}>
                            <Button>
                              <Icon type="upload" /> {getText('Import SKU Details')}
                            </Button>
                          </Tooltip>
                        </Upload>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Card>
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Button.Group>
                      <Popconfirm title={getText('delete_tips')}
                        okText={getText('confirm')}
                        cancelText={getText('back_to_selection')}
                        onConfirm={() => {
                          dispatch(userProductBatchDelete(this.state.selectedRowKeys, () => {
                            this.setState({
                              selectedRowKeys: []
                            })
                            this.reloadProducts(filter)
                          }))
                        }}
                      >
                        <Button>{getText('bulk_delete')}</Button>
                      </Popconfirm>
                      {/* selectedRowKeys choosePids 设计的有点烂, 重复字段 */}
                      <Popconfirm title={getText('on_sale_tips')}
                        cancelText={getText('back_to_selection')}
                        okText={getText('Yes')}
                        onConfirm={() => {
                          dispatch(userProductQuickUpdate(this.state.selectedRowKeys, { isOnSale: true }, () => {
                            this.setState({
                              selectedRowKeys: []
                            })
                            this.reloadProducts(filter)
                          }))
                        }}
                      >
                        <Button>{getText('Bulk On-Sale')}</Button>
                      </Popconfirm>
                      <Popconfirm title={getText('off_sale_tips')}
                        cancelText={getText('back_to_selection')}
                        okText={getText('Yes')}
                        onConfirm={() => {
                          dispatch(userProductQuickUpdate(this.state.selectedRowKeys, { isOnSale: false }, () => {
                            this.reloadProducts(filter)
                            this.setState({
                              selectedRowKeys: []
                            })
                          }))
                        }}
                      >
                        <Button>{getText('Bulk Off-Sale')}</Button>
                      </Popconfirm>
                    </Button.Group>
                    <Select
                      value={filter.dataFilter.soldCountSortType}
                      className="sortSales"
                      placeholder={getText('Sort Sales Amount')}
                      onSelect={ value => {
                        filter.dataFilter.soldCountSortType = value
                        dispatch(productFilter(filter))
                        this.reloadProducts(filter)
                      } }>
                      <Option value={0}>{getText('default')}</Option>
                      <Option value={2}>{getText('from_top_to_low')}</Option>
                      <Option value={1}>{getText('from_low_to_top')}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
              <Table
                bordered
                rowSelection={rowSelection}
                rowKey={rowKey}
                columns={columnsToNormal}
                dataSource={products.products}
                pagination={pagination}
                locale={{ filterConfirm: 'OK', filterReset: 'Cancel' }} />
            </TabPane>
          </Tabs>
        </div>
      </section>
      <Modal title="产品跟卖" visible={visible} width={1100}
        onOk={() => {
          if (!this.verifiSkus(productSkus)) {
            return
          }
          dispatch(productUpdate(productData, productSkus, () => {
            this.reloadProducts(filter)
          }))
          this.setState({ visible: false })
        }} onCancel={() => {
          this.setState({ visible: false })
        }}
      >
        <EditExtra />
      </Modal>
      <Modal
        okText={getText('submit')}
        cancelText={getText('cancel')}
        title={<span>
            <Icon type="edit" style={{marginRight: '10px'}}/>
            {getText('name_of_product')}
          </span>}
        visible={editTitleData.visible}
        width={600}
        onOk={ () => {
          editTitleData.visible = false
          dispatch(userProductQuickUpdate([editTitleData.pid], {
            name: editTitleData.text,
            shouldTranslateName: isCN && localStorage.getItem('shouldTranslateName') === 'true'
          }, () => {
            this.reloadProducts(filter)
            this.setState({ editTitleData })
          }))
        } }
        onCancel={ () => {
          editTitleData.visible = false
          this.setState({ editTitleData })} }>
          <div style={{ margin: '20px 0'}}>
            <Input
              value={editTitleData.text}
              onChange={ e => {
                editTitleData.text = e.target.value
                this.setState({ editTitleData })
              }} />
          </div>
          {
            isCN &&
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Checkbox
                checked={localStorage.getItem('shouldTranslateName') === 'true'}
                onChange={ (e) => {
                  localStorage.setItem('shouldTranslateName', e.target.checked)
                  this.forceUpdate()
                } }/>
              <span style={{ marginLeft: '-10px' }}> 自动翻译商品标题 </span>
            </div>
          }
      </Modal>
    </section>)
  }
}
export default ArrangeProduct
