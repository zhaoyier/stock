import * as React from 'react'
import { connect } from 'react-redux'
import { redirect } from '../../util/history'
import {
  Button,
  Select,
  Table,
  Popconfirm
} from 'antd'
import {
  importSubTaskList,
  importTaskAdd
} from '../../action/productManage'
import './subImportProduct.scss'
const Option = Select.Option

@connect(state => ({
  subTaskList: state.productManage.subTaskList
}))
class SubImportProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      importStatus: '',
      current: 1
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    const { taskId } = this.props.params
    dispatch(importSubTaskList(taskId, 0, 10, {}))
  }
  render() {
    const {
      importStatus,
      current
    } = this.state
    const {
      dispatch,
      subTaskList
    } = this.props
    const { taskId } = this.props.params
    const columns = [{
      title: 'url',
      key: 'productUrl',
      dataIndex: 'productUrl',
      width: 200
    }, {
      title: '商品名',
      key: 'productName',
      dataIndex: 'productName'
    }, {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: (text, record) => {
        switch (text) {
          case 1:
            return <span style={{ color: 'orange' }}>正在处理</span>
            break
          case 2:
            return <span style={{ color: 'orange' }}>正在处理</span>
            break
          case 3:
            return <span style={{ color: 'green' }}>成功</span>
            break
          case 4:
            return <span style={{ color: 'red' }}>失败</span>
            break
          case 5:
            return <span style={{ color: 'green' }}>已提交</span>
            break
          default:
            break
        }
      }
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => {
        if (record.state == 3) {
          return (
            <Button
              onClick={() => {
                redirect('/productEdit', {
                  from: 'importEdit',
                  subTaskId: record.subTaskId
                })
              }}
            >编辑详情</Button>
          )
        } else if (record.state == 4) {
          return (<a onClick={() => {
            const url = [record.url]
            dispatch(importTaskAdd(url, () => {
              if (importStatus != '') {
                dispatch(importSubTaskList(taskId, 0, 10, { succeeded: importStatus }))
              } else {
                dispatch(importSubTaskList(taskId, 0, 10, {}))
              }
            }))
          }}>重新导入</a>)
        }
      }
    }]
    const pagination = {
      current,
      total: subTaskList.total,
      onChange: page => {
        const succeeded = this.state.importStatus
        const filter = succeeded === '' ? {} : { succeeded }
        dispatch(importSubTaskList(taskId, (page - 1) * 10, 10, filter))
        this.setState({ current: page })
      }
    }
    return (<section className='subImportProduct'>
      <h1>商品导入-店铺商品列表</h1>
      <section>
        <div>
          <Select value={importStatus} style={{ width: 200, marginBottom: 10 }} onChange={(v) => {
            this.setState({ importStatus: v })
            switch (v) {
              case '':
                dispatch(importSubTaskList(taskId, 0, 10, {}))
                break
              case true:
                dispatch(importSubTaskList(taskId, 0, 10, { succeeded: true }))
                break
              case false:
                dispatch(importSubTaskList(taskId, 0, 10, { succeeded: false }))
                break
              default:
                break
            }
          }}>
            <Option key='0' value=''>全部</Option>
            <Option key='1' value={true}>导入成功</Option>
            <Option key='2' value={false}>导入失败</Option>
          </Select>
        </div>
        <Table columns={columns} dataSource={subTaskList.list} pagination={pagination} />
      </section>
    </section>)
  }
}
export default SubImportProduct
