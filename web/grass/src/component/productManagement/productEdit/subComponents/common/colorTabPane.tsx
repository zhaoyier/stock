import React from "react";
import { Tabs, Select, Input, Button, Row, Col, Tag, Icon } from "antd";
const styles = require("../../index.scss");
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const CheckableTag = Tag.CheckableTag;


interface SubTabPaneState {
	label: string;
	checked: boolean;
}

interface SubTabPaneProps {
	subs: any;
	onChange: any;
	onClose: any;
}

export default class SubTabPane extends React.Component<SubTabPaneProps, SubTabPaneState> {
	constructor(props) {
		super(props);
		this.state = {
			label: "",
			checked: false,
		};
	}

	handleChange = (item, checked, index) => {
		console.log("===>>click:", item, checked);
		this.setState({
			label: item.label,
			checked: checked,
		});
		this.props.onChange(item);
	}

	handleChecked(item) {
		const { checked, label } = this.state;
		return checked && item.label === label;
	}

	handleClose = () => {
		console.log("====>>>close");
		this.props.onClose();
	}

	render () {
		const { subs } = this.props;
		const { checked, label } = this.state;
		console.log("====>>0012:", subs, checked, label);
		return (
			<div style={{width: 400}}>
				<div style={{marginTop: 20}}>
					<span>常用标准色</span>
					<span style={{position: "relative", left: 180}} onClick={this.handleClose}><Icon type="close" />{" "}关闭</span>
				</div>
				<div style={{marginTop: "18px"}}>
					{
						(subs || []).map((item, index) => (
							<CheckableTag
								key={index}
								checked={this.handleChecked(item)}
								onChange={checked => this.handleChange(item, checked, index)}
							>
								<span className={styles.circle} style={{background: item.color}}></span>
								<span style={{position: "relative", left: "5px" }}>{item.label}</span>
							</CheckableTag>
						))
					}
				</div>
			</div>
		);
	}
}
