import * as React from 'react';
import {
  Input,
  Button,
  message,
  Switch,
} from "antd";

import "./editContactEmail.scss";
import {
  AccountUpdateNotificationChannel,
  AccountUpdateNotifications,
  AccountNotifications
} from "./../../api/account";

export default class EditContactEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      edit: false,
      openPush: false,
    };
  }
  render() {
    const {
      emailAddress,
      edit,
      openPush,
      returnData
    } = this.state;
    const changeEmail = <Input
      value={emailAddress}
      disabled={!edit}
      onChange={(e) => {
        this.setState({
          emailAddress: e.target.value
        });
      }}
    />
    const showEmail = <span style={{display: "inline-block", width: 230}}>{emailAddress}</span>
    return (
      <div className="box">
        <div>
          <strong>Your Contact Email Address:</strong><br/>
          <span style={{fontSize: 13, color: "#ccc"}}>This address will receive email reminder regarding<br/>orders/parcels dispatchment</span>
        </div>
        <div>
          {edit ? changeEmail : showEmail}
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if(reg.test(emailAddress) && edit){
                let data = {
                  channel: 1,
                  value: emailAddress
                }
                AccountUpdateNotificationChannel(data, (payload) => {
                  if(payload == "true"){
                    message.success("Success")
                    this.setState({
                      edit : false
                    })
                  }
                })
              } else {
                edit && message.error("Please enter a valid email address.")
                this.setState({
                  edit : true
                })
              }
            }}
          >{!edit ? "Edit" : "Submit"}</Button>
          <div className="openPush">
            Receive email reminder：
            <Switch
              checked={openPush}
              onChange={() => {
                if(emailAddress == ""){
                  message.error("The mail address cannot be empty")
                }else{
                  let data = {
                    types: openPush ? {"1": []} : {"1":[1]}
                  }
                  AccountUpdateNotifications(data, (payload) => {
                    if(payload == "true"){
                      this.loadData()
                    }else{
                      message("Failed, please try again ")
                    }
                  })
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadData()
  }

  loadData(){
    AccountNotifications((payload) => {
      if(payload){
        this.setState({
          emailAddress : payload["1"].channelValue,
          openPush: payload["1"].notifications[0].subscribed
        })
      }
    })
  }
}
