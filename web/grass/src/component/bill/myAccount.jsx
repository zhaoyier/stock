import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import { request, TRANSFER_STATUS, BILL_STATUS, BILL_REMARK_TYPE, BILL_PERIOD } from '../../util/bill'
import { changeMenu, changeBillPagenum } from '../../action/common'
import { locale } from '../../config/locale.js'
import {
  Table,
  Modal,
  Form,
  Input,
  message,
  Button,
  Icon,
  Tooltip
} from 'antd'
import { UserBillList, UserTransferAccountInfo, UserBillTransferAdd, UserBillTransferInfo, UserBillAppeal } from '../../services/EzSellerService'

function notNumberAndSpeialChar(s) {
  var pattern = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？0123456789]')
  var rs = ''
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '')
  }
  return rs
}

const FormItem = Form.Item

@connect(state => ({ pageNum: state.common.billPagenum, accountInfo: state.common.accountInfo }))
class MyAccount extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      total: 0,
      loading: false,
      appealBillNum: '',
      appealAmount: '',
      appealReason: '',
      withDrawBillNum: '',
      bankName: '',
      accountNumber: '',
      accountName: '',
      confirmAccountName: '',
      billList: [],
      pageSize: 10,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { accountInfo } = this.props
    this.__ = locale(accountInfo.shop.originCode)
    dispatch(changeMenu({
      main: 0,
      sub: '30'
    }))
    this.reloadBillList()
  }

  reloadBillList(offset = 0, limit = 10) {
    this.setState({ loading: true })
    UserBillList(offset, limit)
      .then(result => {
        this.setState({
          billList: result.data,
          loading: false,
          total: result.total
        })
      })
  }

  preWithDraw(billNum) {
    const hide = message.loading('processing...')
    UserTransferAccountInfo()
      .then(result => {
        result = result.transferAccount
        hide()
        this.setState({
          bankName: result.bankName,
          accountNumber: result.accountNumber,
          withDrawBillNum: billNum,
          accountName: result.accountName
        })
      })
  }

  checkRemarks(billNum) {
    const getText = this.__
    const clms = [{
      title: getText('remark_content'),
      dataIndex: 'text',
      key: 'text',
      render: text => (
        <span style={{ wordBreak: 'break-all' }}>{text}</span>
      )
    }, {
      title: getText('time'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render(text) {
        return moment(Number(text) * 1000).format('YYYY-MM-DD')
      }
    }, {
      title: getText('type'),
      dataIndex: 'type',
      key: 'type',
      render(text) {
        return BILL_REMARK_TYPE[Number(text)]
      }
    }, {
      title: getText('User ID'),
      dataIndex: 'createdBy',
      key: 'createdBy'
    }]
    const ds = this.state.billList.find(b => b.billNum == billNum).remarks
    Modal.info({
      title: 'view remarks',
      width: 900,
      okText: getText('confirm'),
      content: (
        <div>
          <Table
            bordered
            columns={clms}
            dataSource={ds} />
        </div>
      )
    })
  }

  confirmTransfer() {
    const getText = this.__
    const { accountInfo } = this.props
    const country = accountInfo.shop.originCode
    const isCN = country === 'CN'
    if (!this.state.confirmAccountName && isCN) {
      message.warn(getText('Please fill in the cardholder‘s name'))
      return
    }
    // if (this.state.confirmAccountName !== this.state.accountName) {
    //   message.warn("开户名有误")
    //   return;
    // }
    const inputStr = notNumberAndSpeialChar(this.state.accountName)
    console.log(inputStr, this.state.confirmAccountName)
    if (this.state.accountName === '' && this.state.accountName.length > inputStr.length) {
      message.warn('不能输入数字和特殊字符')
      return
    }
    const hide = message.loading('proccessing...')
    UserBillTransferAdd(this.state.withDrawBillNum, this.state.confirmAccountName)
      .then(result => {
        hide()
        if (result === true) {
          message.success(getText('withdrawn application successful'))
        } else {
          message.error('提现失败')
        }
      })
    this.setState({
      withDrawBillNum: '',
      bankName: '',
      accountNumber: '',
      accountName: '',
      confirmAccountName: ''
    })
    this.reloadBillList((this.props.pageNum - 1) * 10, 10)
  }

  showTransferDetail(billNum) {
    const hide = message.loading('preparing...')
    const getText = this.__
    UserBillTransferInfo(billNum)
      .then(result => {
        hide()
        Modal.info({
          title: getText('withdrawn details'),
          okText: getText('confirm'),
          content: (
            <div>
              <p>{getText('bank')}：{result.account.bankName}</p>
              <p>{getText('account number')}：{result.account.accountNumber}</p>
              <p>{getText('withdrawn amount')}：{result.account.bankName}：<span style={{ color: 'red' }}>{result.amount}</span></p>
              <p style={{ display: result.status === 3 ? 'block' : 'none' }}>{getText('Transaction Administration Fees')}：<span>{result.transferInfo.fee}</span></p>
              <p>{getText('Withdrawn Status')}：{getText(TRANSFER_STATUS[Number(result.status)])}</p>
              <p style={{ display: result.status === 3 && (result.remarks || []).length ? 'block' : 'none' }}>{getText('withdrawn remarks')}：{(result.remarks || []).length ? result.remarks[0].text : ''}</p>
              <p style={{ display: result.status === 3 ? 'block' : 'none' }}>{getText('Transaction Number')}：{result.transferInfo.trackingNum}</p>
            </div>
          )
        })
      })
  }

  appealHandler() {
    const { appealBillNum, appealAmount, appealReason } = this.state
    const getText = this.__
    if (!Number(appealAmount)) {
      message.warn(getText('incorrect amount'))
      return
    }
    if (!appealReason) {
      message.warn(getText('Please enter the reason'))
      return
    }
    UserBillAppeal(appealBillNum, Number(appealAmount), appealReason)
      .then(result => {
        if (result === true) {
          message.success(getText('appeal successful'))
          this.setState({
            appealBillNum: '',
            appealAmount: '',
            appealReason: ''
          })
          this.reloadBillList((this.props.pageNum - 1) * 10, 10)
        }
      })
  }
  onClickINV(record) {
    const targetUrl = '/index.html#/INV'
    sessionStorage.setItem('INV', JSON.stringify(record))
    window.open(targetUrl, '_blank')
  }

  render() {
    const {
      billList,
      appealBillNum,
      withDrawBillNum,
      total
    } = this.state

    const getText = this.__
    const countryCode = this.props.accountInfo.shop.originCode || 'CN'
    const SgOrMy = countryCode === 'SGLocal' || countryCode === 'MYLocal'

    const formItemLayout = {
      labelCol: { span: 6, cols: 2 },
      wrapperCol: { span: 14 },
    }
    const columns = [{
      title: getText('Bill Period'),
      dataIndex: 'range',
      key: 'range',
      render(text, record) {
        return (
          <div>
            {record.rangeStart > 0 && (
              <div>
                <p>{getText('from')}</p>
                <p>{moment(record.rangeStart * 1000).format('YYYY-MM-DD')}</p>
                <p>{getText('to')}</p>
              </div>
            )}
            <p>{moment(record.rangeEnd * 1000).format('YYYY-MM-DD')}</p>
          </div>
        )
      }
    }, {
      title: getText('Bill Type'),
      dataIndex: 'periodType',
      key: 'periodType',
      render(text) {
        return getText(BILL_PERIOD[Number(text)])
      }
    }, {
      title: <Tooltip
        title={getText('accumulated settlement amount for products which met the requirement')}
        placement="topRight"
      >
        {getText('Settlement Amount for Products', true)}
        <Icon type="question-circle-o" />
      </Tooltip>,
      dataIndex: 'orderTotalAmount',
      key: 'orderTotalAmount'
    }, {
      title: <Tooltip
        title={getText('accumulated number of products for settlement which met the requirement')}
        placement="topRight"
      >
        {getText('Number of Products in Settlement')}
        <Icon type="question-circle-o" />
      </Tooltip>,
      dataIndex: 'orderQuantity',
      key: 'orderQuantity'
    }, {
      title: <Tooltip
        title={getText('settlement which deducted away the technical service fees')}
        placement="topRight"
      >
        {getText('Final Settlement', true)}
        <Icon type="question-circle-o" />
      </Tooltip>,
      dataIndex: 'finalAmount',
      key: 'finalAmount'
    }, {
      title: <Tooltip
        title={getText('final settlement amount after confirmation from both sellers & finance department')}
        placement="topRight"
      >
        {getText('Settlement After Confirmation', true)}
        <Icon type="question-circle-o" />
      </Tooltip>,
      dataIndex: 'approvedAmount',
      key: 'approvedAmount'
    }, {
      title: <Tooltip
        title={getText('expected final settlement from sellers(please click “appeal” for any related submission)')}
        placement="topRight"
      >
        {getText('Appeal Amount', true)}
        <Icon type="question-circle-o" />
      </Tooltip>,
      dataIndex: 'appeallingAmount',
      key: 'appeallingAmount',
      render(text, record) {
        return text || '-'
      }
    }, {
      title: getText('Bill Status'),
      dataIndex: 'status',
      key: 'status',
      render(text) {
        return getText(BILL_STATUS[Number(text)])
      }
    }, {
      title: getText('Transfer Status'),
      dataIndex: 'transferStatus',
      key: 'transferStatus',
      render(text) {
        return getText(TRANSFER_STATUS[Number(text) || 0])
      }
    }, {
      title: getText('Action'),
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div>
            <p><Link to={`/bill-detail/${record.billNum}`}>{getText('billing details')}</Link></p>
            <p><a href="javascript:;" onClick={this.checkRemarks.bind(this, record.billNum)}>{getText('view remarks')}</a></p>
            <p style={{ display: record.status === 2 ? 'block' : 'none' }}>
              <a href="javascript:;" onClick={this.preWithDraw.bind(this, record.billNum)}>{getText('withdrawn')}</a>
            </p>
            <p style={{ display: record.status === 4 ? 'block' : 'none' }}>
              <a href="javascript:;" onClick={this.showTransferDetail.bind(this, record.billNum)}>{getText('withdrawn details')}</a>
            </p>
            <p style={{ display: record.status === 2 ? 'block' : 'none' }}>
              <a href="javascript:;" onClick={() => this.setState({ appealBillNum: record.billNum })}>{getText('billing appeal')}</a>
            </p>
            {
              // SgOrMy && record.status !== 3 &&
              // <p>
              //   <a onClick={this.onClickINV.bind(this, record)}>
              //     View INV
              //   </a>
              // </p>
            }
          </div>
        )
      }
    }]
    // const ds = billList.map(bill => )
    const tableStyle = {
      'word-break': 'keep-all'
    }

    const pagination = {
      total,
      current: this.props.pageNum,
      showTotal: total => `${getText('total')} ${total} ${getText('billing statements')}`,
      onChange: current => {
        this.reloadBillList((current - 1) * 10, 10)
        this.props.dispatch(changeBillPagenum(current))
      }
    }

    const formNormalProps = {
      okText: getText('confirm'),
      cancelText: getText('cancel'),
      width: '1000px'
    }

    return (
      <div style={{ backgroundColor: '#FFF', padding: '10px' }}>
        <h1 style={{
          padding: '10px 20px'
        }}>{getText('Bill Statement')}</h1>

        <Table
          bordered
          loading={this.state.loading}
          pagination={pagination}
          columns={columns}
          dataSource={billList.map((item, index) => ({ ...item, key: index }))}
          style={tableStyle}
        />
        <Modal
          title={getText('Billing Statement Appeal')}
          visible={this.state.appealBillNum}
          onCancel={() => this.setState({ appealBillNum: '', appealAmount: '', appealReason: '' })}
          onOk={this.appealHandler.bind(this)}
          {...formNormalProps}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label={getText('settlement amount', true)}>
              <p>{(billList.find(n => n.billNum == appealBillNum) || {})['approvedAmount']}</p>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={getText('intended settlement amount', true)}
              required>
              <Input
                type="text"
                value={this.state.appealAmount}
                onChange={e => this.setState({ appealAmount: e.target.value })}
                placeholder={getText('please enter your expected settlement amount')} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={getText('please enter the reason')}
              required>
              <Input.TextArea
                value={this.state.appealReason}
                onChange={e => this.setState({ appealReason: e.target.value })}
                placeholder={getText('please enter your expected settlement amount')}
                autosize={{ minRows: 3, maxRows: 5 }} />
            </FormItem>
          </Form>
        </Modal>

        <Modal
          title={getText('billing withdrawn')}
          visible={this.state.withDrawBillNum}
          onCancel={() => this.setState({ withDrawBillNum: '' })}
          onOk={this.confirmTransfer.bind(this)}
          {...formNormalProps}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label={getText('withdrawn amount', true)}>
              <p style={{ color: 'red' }}>
                {(billList.find(n => n.billNum == withDrawBillNum) || {})['approvedAmount']}
                <span style={{ color: '#666' }}>  ({getText('the actual withdrawn amount will deduct away the bank transaction administration fees')})</span>
              </p>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={getText('bank')}>
              <p>{this.state.bankName}</p>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={getText('Account Number')}>
              <p>{this.state.accountNumber}</p>
            </FormItem>
            {
              this.props.accountInfo.shop.originCode === 'CN' &&
              <FormItem
                {...formItemLayout}
                label={getText('Please fill in the name of the account holder')}>
                <Input
                  type="text"
                  value={this.state.confirmAccountName}
                  onChange={e => this.setState({ confirmAccountName: e.target.value })}
                  placeholer={getText('Please fill in the name of the account holder')} />
              </FormItem>
            }
          </Form>
        </Modal>

      </div>
    )
  }
}

export default MyAccount
