import * as React from 'react'
import { Switch, Tabs, DatePicker, Form, Input, Button, Select, Table, Row, Col, Modal, message, LocaleProvider } from 'antd'
import { Link } from 'react-router'
import moment from 'moment'
import { UserAnnouncementList } from '../../services/EzSellerService'

const FormItem = Form.Item
const { RangePicker } = DatePicker
import zh from "antd/lib/locale-provider/zh_CN";

export default class ViewAnnouncement extends React.Component {
  constructor(props) {
    super(props)
    this.getUserAnnouncementList = this.getUserAnnouncementList.bind(this)
    this.filterTitle = this.filterTitle.bind(this)
    this.filterDate = this.filterDate.bind(this)
    this.state = {
      notice: [],
      total: 0,
      current: 1,
      filter: {
        publishedAtFrom: null,
        publishedAtTo: null,
        title: ''
      }
    }
  }

  getUserAnnouncementList(offset = 0, limit = 10) {
    const { filter } = this.state
    UserAnnouncementList(offset, limit, filter)
      .then(result => {
        // 给左侧导航栏添加未读标记
        // let wantedNavItem = document.getElementsByClassName('ant-menu-item');
        // for(let i = 0; i < wantedNavItem.length;i++) {
        //   if (wantedNavItem[i].innerHTML == '查看公告') {
        //     wantedNavItem = wantedNavItem[i];
        //   }
        // }
        // for (let i = 0; i < result.results.length; i++) {
        //   if (!result.results[i].viewed) {
        //     wantedNavItem.innerHTML += '<i class="un-read-notice"></i>';
        //     break;
        //   }
        // }
        this.setState({
          notice: result.results,
          total: result.total,
          current: (offset / limit) + 1,
        })
      })
      .catch(result => {
        this.setState({
          notice: [],
          total: 0
        })
      })
  }

  componentWillMount() {
    this.getUserAnnouncementList()
  }

  filterTitle(e) {
    const value = e.target.value
    const filter = this.state.filter
    filter.title = value
    this.setState({
      filter: filter
    })
  }

  filterDate(date, dataString) {
    let data = []
    data[0] = moment(dataString[0]).unix()
    data[1] = moment(dataString[1]).unix()
    const filter = this.state.filter
    filter.publishedAtFrom = data[0]
    if (data[0] === data[1]) {
      data[1] += 86400
    }
    filter.publishedAtTo = data[1]
    this.setState({
      filter: filter
    })
  }

  render() {
    const {
      current,
      notice
    } = this.state
    const dataSource = notice
    const columns = [{
      title: '发布时间',
      dataIndex: 'publishedAt',
      key: 'name',
      render: (text, record) => (
        <div key={record.announcementId}>
          {moment(record.publishedAt * 1000).format('YYYY-MM-DD')}
        </div>
      )
    }, {
      title: '公告主题',
      dataIndex: 'title',
      key: 'age',
      render: (text, record) => (
        <div key={record.announcementId}>
          {record.viewed ? (
            <Link style={{ color: '#7ec2f3' }} to={`/notice_detail?announcementId=${record.announcementId}`}>{record.title}</Link>
          ) : (
              <Link to={`/notice_detail?announcementId=${record.announcementId}`}>{record.title}</Link>
            )}
        </div>
      )
    }]
    const pagination = {
      current,
      total: this.state.total,
      showQuickJumper: true,
      onChange: page => this.getUserAnnouncementList((page - 1) * 10)
    }
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    }
    return (
      <LocaleProvider locale={zh}>
        <div style={{ marginTop: 20, marginLeft: 20 }}>
          <Form inline>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="发布时间"
                >
                  <RangePicker onChange={this.filterDate} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="公告主题"
                >
                  <Input onChange={this.filterTitle} />
                </FormItem>
              </Col>
              <Col span={24}>
                <Button onClick={() => this.getUserAnnouncementList()}>确定</Button>
              </Col>
            </Row>
          </Form>
          <Table
            style={{ marginTop: 20 }}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination} />
        </div>
      </LocaleProvider>
    )
  }
}
