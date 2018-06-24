import * as React from "react";
import { Col, Button } from "antd";

import Container from "../container";

import accountInfo from "../../../../util/accountInfo";

console.log(accountInfo);

// export enum ShopRegisterStep {
// 	AppliedPening = 2,
// 	ApplyApproved = 3,
// 	ApplyDenied = 4,
// 	MaxLimit = 5,
// 	NewRegister = 1,
// 	Unknown = 0,
// }

const gotoStepTwo = type => {
  window.sessionStorage.setItem("registerType", type);
  window.location.href = "/index.html#registerTwo";
};

const StepOne = () => {
  const shop = accountInfo["shop"] || {};
  if (shop["step"] === 4 || shop["step"] === 2) {
    window.location.href = "/index.html#registerFour";
  }

  return (
    <div>
      <Container step={1}>
        <Col offset={6} span={5} >
          <div className="panel__choose">
            <div className="img">
              <img src={require("../../image/person.png")} alt="" />
            </div>
            <div className="title">个人开店认证 </div>
            <div className="info">个人、个体，提供身份证实名和手持身份证认证后即可完成身份认证。</div>
            <Button className="button" type="primary" onClick={e => { gotoStepTwo("person"); }}>
              进入认证
        </Button>
          </div>
        </Col>
        <Col offset={2} span={5} >
          <div className="panel__choose">
            <div className="img">
              <img src={require("../../image/company.png")} alt="" />
            </div>
            <div className="title">企业开店认证 </div>
            <div className="info">公司企业提供营业执照等证件后即可成为企业商家。</div>
            <Button className="button" type="primary" onClick={e => { gotoStepTwo("company"); }}>
              进入认证
        </Button>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default StepOne;