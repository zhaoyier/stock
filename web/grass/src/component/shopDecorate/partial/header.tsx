import * as React from "react";
import { Component } from "react";
import { DeviceType } from "../constant";

import { i18nText } from "../../../util/kit";
import { Button } from "antd";

interface HeaderProps {
	changeDevice: Function;
	typeDevice: string;
	preview?: Function;
	submit?: Function;
	styleName?: string;
}

export default class Header extends Component<HeaderProps> {
	render() {
		const { changeDevice, typeDevice, preview, submit, styleName, } = this.props;
		return (
			<div className={`header ${styleName}`}>
				<Button.Group className="client__type">
					<Button style={{width: 120}} onClick={e => changeDevice(DeviceType.PC)} className={`type ${typeDevice === DeviceType.PC ? "active" : ""}`}> {i18nText("PC Store")} </Button>
					<Button style={{width: 120}} onClick={e => changeDevice(DeviceType.APP)} className={`type ${typeDevice === DeviceType.APP ? "active" : ""}`}> {i18nText("Wireless Store")} </Button>
				</Button.Group>
				{(preview && submit) && (
					<div className="submit__btn">
						<Button onClick={e => preview()} className="preview">{i18nText("Preview")}</Button>
						<Button onClick={e => submit()} className="publish">{i18nText("Publish")}</Button>
					</div>
				)}
			</div>
		);
	}
}