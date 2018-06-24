import * as React from 'react'
import './settleProtocol.scss'
import { Button } from 'antd'
import getAgreements from '../../product/agreements'


class SettleProtocol extends React.Component {
  render() {
    const {
      isVisible,
      onClick
    } = this.props
    const vStyle = isVisible ? 'block' : 'none'
    const isEnglish = localStorage.getItem("ezbuy_lang") === "en" ? true : false;
    return (
      <section style={{ display: vStyle }} className='settleProtocol'>
        <div className="mask">
          <div className="settleContent">
            {isEnglish ? (
              <iframe width="100%" height="400" src="https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub"></iframe>
            ) : (
                <div>
                  <header>ezbuy商家入驻协议{}</header>
                  <iframe width="100%" height="400" src="/asset/ezbuysellerterms.html"></iframe>
                </div>
              )}
            <p style={{ textAlign: 'center', marginTop: 30 }}>
              <Button onClick={onClick} style={{height: 40}}>
                {isEnglish ? (<span>YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, <br/> UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.</span>) : "我已阅读此协议，并保证上传的资料全部真实可靠"}
              </Button>
            </p>
          </div>
        </div>
      </section >
    )
  }
}

export default SettleProtocol
