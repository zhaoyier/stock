import * as React from "react";
import {
	Dropdown,
	Menu,
	Icon
} from "antd";
import { originCode } from "../../../util/kit";
import "./index.scss";

const langItems = {
	CN: {
		icon: require("../image/china.svg"),
		text: "中文"
	},
	US: {
		icon: require("../image/english.png"),
		text: "English"
	}
};

interface LangSelectProps {
	className?: string;
}

class LangSelect extends React.Component<LangSelectProps, {}> {
	renderContent(icon: boolean = true) {
		const { className = "" } = this.props;
		const langItem = originCode === "CN" ? langItems.CN : langItems.US;

		return (
			<div className={`LangSelectContent ${className}`}>
				<img style={{width: "25px", height: "16px"}} src={langItem.icon} />
				<span> { langItem.text } </span>
				{ icon ? <Icon
						style={{color: "#8CA0B3", fontSize: "12px"}}
						type="caret-down"/> : null  }
			</div>
		);
	}
	render() {
		const menu = (
			<Menu>
				<Menu.Item style={{padding: "10px 30px"}}>
					{ this.renderContent(false) }
				</Menu.Item>
			</Menu>
		);

		return (
			<Dropdown
				overlay={menu}>
				{ this.renderContent() }
			</Dropdown>
		);
	}
}

export default LangSelect;