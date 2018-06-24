import * as React from "react";
import { Component } from "react";
import { Row, Col, Button, } from "antd";

import LeftNav from "./partial/leftNav";
import Header from "./partial/header";
import { defaultTemplate, TemplateData } from "./constant";
import { DeviceType } from "./constant";
const { PC } = DeviceType;

import "./css/index.scss";
import { i18nText } from "util/kit";

interface ModelProps {
	editColse: Function;
}

interface ModelState {
	typeDevice: string;
}

export default class Model extends Component<ModelProps, ModelState> {
	constructor(props) {
		super(props);
		this.changeDevice = this.changeDevice.bind(this);
		this.click = this.click.bind(this);
		this.state = {
			typeDevice: window.sessionStorage.getItem("device") || DeviceType.PC,
		};
	}

	click(type) {
		const data = defaultTemplate[type];
		const { typeDevice } = this.state;
		const renderData = JSON.stringify({ [typeDevice]: data });
		window.sessionStorage.setItem(TemplateData, renderData);
		console.log(data);
		window.location.hash = "#/custom";
	}

	changeDevice(device) {
		window.sessionStorage.setItem("device", device);
		this.setState({
			typeDevice: device
		});
	}

	render() {
		const { editColse } = this.props;
		const { typeDevice } = this.state;
		const cartTemplate = (img, click, type) => (
			<div style={{ textAlign: "center" }}>
				<img style={{width: "90%"}} src={img} />
				<div style={{textAlign: "left"}}>
					<Button type="primary" style={{marginTop: 20, marginLeft: 20}} onClick={e => click(type)}>{i18nText("Apply")} </Button>
				</div>
			</div>
		);
		return (
			<div>
				<div className="clearfix">
					<LeftNav
						editColse={editColse}
					/>
					<div style={{ marginLeft: "12.5%", marginBottom: 20, height: 70, background: "#fff", }}>
						<Header styleName="model" changeDevice={this.changeDevice} typeDevice={typeDevice} />
					</div>
					<Row>
						<Col style={{marginBottom: 50}} offset={4} span={18}>
							{typeDevice === PC ? (
								<div>
									<Row>
										<Col span={8}>
											{cartTemplate(require("./image/PC_template_1.png"), this.click, 0)}
										</Col>
										<Col span={8}>
											{cartTemplate(require("./image/PC_template_2.png"), this.click, 1)}
										</Col>
										<Col span={8}>
											{cartTemplate(require("./image/PC_template_3.png"), this.click, 2)}
										</Col>
									</Row>
								</div>
							) : (
									<div>
										<Row>
											<Col span={8}>
												{cartTemplate(require("./image/AP_template_1.png"), this.click, 0)}
											</Col>
											<Col span={8}>
												{cartTemplate(require("./image/AP_template_2.png"), this.click, 1)}
											</Col>
											<Col span={8}>
												{cartTemplate(require("./image/AP_template_3.png"), this.click, 2)}
											</Col>
										</Row>
									</div>
								)}
						</Col>
					</Row>
					<div>
					</div>
				</div>
			</div>
		);
	}
}