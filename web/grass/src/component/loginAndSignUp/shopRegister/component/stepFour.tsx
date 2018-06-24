import * as React from "react";
import { Component } from "react";
import { Row, Col, Button, Icon } from "antd";

import Container from "../container";

import {
	UserShopApprovalFormGet,
} from "../../../../services/EzSellerService";

interface StepFourState {
	refuseMark: string;
	status: number;
}

class StepFour extends Component<{}, StepFourState> {

	constructor(props) {
		super(props);
		this.state = {
			refuseMark: "",
			status: 0
		};
	}

	componentDidMount() {
		UserShopApprovalFormGet()
			.then(res => {
				console.log(res);
				this.setState({
					refuseMark: res.refuseMark || "",
					status: res.status
				});
			});
	}

	render() {
		let renderState = (<div><Icon type="loading" /></div>);
		if (this.state.status === 3) {
			renderState = (
				<div>
					<Row style={{ width: 1000, margin: "100px auto" }}>
						<Col style={{ textAlign: "center" }} span={8}>
							<img src={require("../../image/denied.png")} alt="" />
						</Col>
						<Col style={{ fontSize: 24 }} span={12}>
							<p style={{ color: "#ff525e", marginTop: 50 }}>您的店铺审核未通过，失败原因为：</p>
							<div> {this.state.refuseMark} </div>
							<Button style={{ width: 175, height: 35, marginTop: 30 }} type="primary">
								<a href="/index.html#/registerThree">进入编辑</a>
							</Button>
						</Col>
					</Row>
				</div>
			);
		}
		if (this.state.status === 1) {
			renderState = (
				<div>
					<Row style={{ width: 1000, margin: "100px auto" }}>
						<Col style={{ textAlign: "center" }} span={8}>
							<img src={require("../../image/waiting.png")} alt="" />
						</Col>
						<Col style={{ fontSize: 24 }} span={12}>
							<p style={{ color: "#3e82f7", marginTop: 50 }}> 您的店铺正在进行审核， </p>
							<div> 需要 3~5 个工作日，请耐心等待！ </div>
						</Col>
					</Row>
				</div>
			);
		}
		return (
			<Container step={4}>
				{renderState}
			</Container>
		);
	}
}



export default StepFour;