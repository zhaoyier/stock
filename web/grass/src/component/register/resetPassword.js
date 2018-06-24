import * as React from 'react'
import { redirect } from '../../util/history'
import {
  Row,
  Col,
  Form,
  Input,
  Button
} from 'antd'
import LogoTitle from './_widget/logoTitle'
const FormItem = Form.Item
import './resetPassword.scss'
class ResetPassword extends React.Component{
  render(){
    return(<section className='resetPassword'>
      <div className="content">
        <LogoTitle title={'重置密码'}></LogoTitle>
        <Row type='flex' justify='start'>
          <Col span="12">
             <Form horizontal>
             <FormItem
                label="用户名："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
              >
                jimmy
              </FormItem>
              <FormItem
                label="新密码："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
              >
                <Input defaultValue=""  />
              </FormItem>
              <FormItem
                label="确认密码："
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                validateStatus=""
                help=""
              >
                <Input defaultValue=""  />
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Button style={{marginRight:10}}>重置密码</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    </section>)
  }
}

export default ResetPassword
