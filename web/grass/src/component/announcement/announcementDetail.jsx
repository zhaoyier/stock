import * as React from 'react'
import {Switch, Tabs, DatePicker, Form, Input, Button, Select, Table, Row, Col, Modal, message } from 'antd'
import { Link } from 'react-router'
import ReactQuill from 'react-quill-old-react16'
import {getApiPrefix} from '../../util/kit'
import moment from 'moment'
import { UserAnnouncementGet } from '../../services/EzSellerService'

export default class AnnouncementDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: {}
    }
  }

  componentWillMount() {
    const id = parseInt(this.props.location.query.announcementId)
    UserAnnouncementGet(id)
    .then(result => {
      this.originNotice = result.results
      this.setState({
        notice: result
      })
    })
  }

  render() {
    const detail = this.state.notice.detail || {}
    return(
      <div>
        <h2 style={{textAlign: 'center', marginTop: 20, marginBottom: 20}}>{detail.title}</h2>
        <ReactQuill readOnly toolbar={false} theme='snow' value={detail.content} />
        <Row>
          <Col style={{textAlign: 'center'}} span={24}>
            <Button style={{marginTop: 20}}>
              <Link to={'/viewAnnouncement'}>返回列表</Link>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
