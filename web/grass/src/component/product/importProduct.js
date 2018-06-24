import * as React from 'react'
import { redirect } from '../../util/history'
import { connect } from 'react-redux'
import { Select, Button, Input, Table, Alert, Modal, message } from 'antd'
import { warn, success } from '../../util/antd'
import './importProduct.scss'
import { showTimestamp } from '../../util/kit'
import { locale } from '../../config/locale'
import {
  importTaskAdd,
  importTaskList,
  changeCategory
} from '../../action/productManage'
import {
  UserImportEzbuyProducts
} from "../../services/EzSellerService";
import { changeMenu } from '../../action/common'
import accountInfo from '../../util/accountInfo';
const Option = Select.Option

@connect(state => ({
  taskList: state.productManage.tasks.taskList,
  total: state.productManage.tasks.total,
  accountInfo: state.common.accountInfo,
}))
class ImportProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      visible: false,
      urls: '',
      taobaoUrl: ''
    }
  }
  componentWillMount() {
    const {
      accountInfo,
      dispatch,
      filter
    } = this.props
    this.__ = locale(accountInfo.shop.originCode)
    dispatch(importTaskList(0, 10))
    dispatch(changeMenu({
      main: 0,
      sub: '00'
    }))
  }
  onPageChange(n) {
    this.setState({
      current: n
    })
    const { dispatch } = this.props
    message.loading('正在加载...')
    dispatch(importTaskList((n - 1) * 10, 10))
  }
  reloadTaskList() {
    message.loading('正在重新加载...')
    this.props.dispatch(importTaskList(0, 10))
    this.setState({
      current: 1
    })
  }
  render() {
    const {
      current,
      visible,
      urls,
      taobaoUrl
    } = this.state
    const getText = this.__
    const {
      dispatch,
      taskList
    } = this.props
    const columns = [{
      title: 'url',
      key: 'url',
      dataIndex: 'url',
      render: (text) => {
        return (<div style={{ maxWidth: 400, wordBreak: 'break-word' }}>{text}</div>)
      }
    }, {
      title: '商品名称／店铺名称',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: '状态',
      key: 'state',
      render: (text, record) => {
        const {
          state,
          totalCount,
          fetchedCount,
          failedCount
        } = record
        const status = () => {
          switch (state) {
            case 1:
              return <span style={{ color: 'orange' }}>正在处理</span>
              break
            case 2:
              return <span style={{ color: 'orange' }}>正在处理</span>
              break
            case 3:
              if (record.type == 1) {
                if (record.subTaskIdForQuickView) {
                  return <span style={{ color: 'green' }}>成功(未编辑)</span>
                } else {
                  if (failedCount) {
                    return <span style={{ color: 'red' }}>失败</span>
                  }
                  return <span style={{ color: 'green' }}>成功(已编辑)</span>
                }
              }
              break
            default:
              break
          }
        }
        return (<div>
          <p>状态：{status()}</p>
          <p>总数量：{totalCount}</p>
          <p>已抓取数量：{fetchedCount}</p>
          <p>已失败数量：{failedCount}</p>
        </div>)
      }
    }, {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark'
    }, {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text) => {
        return (<span>{showTimestamp(text)}</span>)
      }
    }, {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text) => {
        return (<span>{showTimestamp(text)}</span>)
      }
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => {
        if (record.type == 1) {
          if (record.state == 3 && record.subTaskIdForQuickView) {
            return (<div>
              <Button onClick={() => {
                dispatch(changeCategory(false))
                redirect('/productEdit', {
                  from: 'importEdit',
                  subTaskId: record.subTaskIdForQuickView
                })
              }}>编辑详情</Button>
            </div>)
          } else if (record.state == 2) {
            return <a onClick={() => {
              dispatch(importTaskAdd([record.url], 1, () => this.reloadTaskList()))
            }}>重新导入</a>
          }
        } else {
          return (<a onClick={() => {
            redirect(`/subImportProduct/${record.taskId}`)
          }}>查看详情</a>)
        }
      }
    }]
    const pagination = {
      total: this.props.total,
      current: this.state.current,
      onChange: this.onPageChange.bind(this)
    }
    let ifEzbuySoSelfShop = false;
    ifEzbuySoSelfShop = accountInfo.shop.shopName === "EzbuySO" ? true : false;
    return (
      <section className="importProduct">
        <h1>商品导入
        </h1>
        <section>
          <div className="infoCollect">
            <input value={taobaoUrl} onChange={(e) => this.setState({ taobaoUrl: e.target.value })} placeholder="输入淘宝店铺或单品URL" className='ant-input' type='text' ref='url' style={{ marginRight: 10, width: 400 }} />
            <Button style={{ marginRight: 10 }} onClick={() => {
              const url = [this.refs.url.value]
              if (this.refs.url.value) {
                // https://www.tapd.cn/20277871/prong/stories/view/1120277871001004710
                if (ifEzbuySoSelfShop && this.refs.url.value.indexOf("ezbuy.") > -1) {
                  UserImportEzbuyProducts([this.refs.url.value])
                  .then(res =>{
                    if (res) {
                      message.success("导入成功");
                      this.reloadTaskList();
                    } else {
                      message.success("导入失败")
                    }
                  });
                } else {
                  dispatch(importTaskAdd(url, 1, () => {
                    this.setState({ taobaoUrl: '' })
                    this.reloadTaskList()
                  }))
                }
              } else {
                warn('请输入url')
                return
              }
            }}>导入</Button>
            <Button style={{ marginRight: 10 }} onClick={() => this.setState({ visible: true })}>批量导入</Button>
            <Button onClick={() => {
              this.reloadTaskList()
            }}>刷新</Button>
          </div>
          <div style={{ position: 'relative' }}>
            <Table bordered columns={columns} dataSource={taskList} pagination={pagination} />
          </div>
        </section>
        <Modal title={'批量导入'} visible={visible} onOk={() => {
          let finalUrls = urls.split(/\n/)
          let temp = []
          let ezubyUrl = false;
          for (let i = 0; i < finalUrls.length; i++) {
            if (finalUrls[i]) {
              temp.push(finalUrls[i])
            }
            if (finalUrls[i].indexOf("ezbuy.") > -1) {
              ezubyUrl = true;
            }
          }
          finalUrls = temp
          if (ifEzbuySoSelfShop && ezubyUrl) {
            UserImportEzbuyProducts(finalUrls)
            .then(res =>{
              if (res) {
                message.success("导入成功");
                this.reloadTaskList();
              } else {
                message.success("导入失败")
              }
            });
          } else {
            dispatch(importTaskAdd(finalUrls, 1, () => this.reloadTaskList()))
          }
          this.setState({ visible: false })
        }} onCancel={() => this.setState({ visible: false })}>
          <p style={{ color: '#000', fontWeight: 'bold', marginBottom: 10 }}>换行输入不同url</p>
          <Input.TextArea rows={10} ref='urls' onChange={(e) => this.setState({ urls: e.target.value })} />
        </Modal>
      </section>
    )
  }
}
export default ImportProduct
