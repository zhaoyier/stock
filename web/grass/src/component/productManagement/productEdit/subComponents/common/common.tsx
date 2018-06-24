import React from "react";
import { observer } from "mobx-react";
import { Table, Input, Icon, Switch, message } from "antd";
const styles = require("../../index.scss");

interface EditCellInputProps {
	value: number;
	onChange: any;
}

interface EditCellInputState {
	value: any;
}

interface EditCellSwitchProps {
	isOnSale: boolean;
	onChange: any;
}

interface EditCellSwitchState {
	isOnSale: boolean;
}
// 编辑单元格
@observer
export class EditableCellInput extends React.Component<EditCellInputProps, EditCellInputState> {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}

	handleBlurInput(text) {
		const { value } = this.props;
		console.log("====>>blur:", text, value, text.length, text === value, typeof text, typeof value);
		if (text.length <= 0) {
			return message.warn("不能为空");
		}
		if (text === (value || "").toString()) {
			return;
		}
		if (this.props.onChange) {
			this.props.onChange(text);
		}
	}

	handleChangeInput(text) {
		this.setState({ value: text });
	}

	componentWillReceiveProps(props) {
		this.setState({ value: props.value });
	}

	render() {
		const { value } = this.state;
		// console.log("=====>>>common:", value);
		// const { isChanged, inputValue } = this.state;
		return (
			<Input
				value={value}
				style={{ padding: "0px" }}
				className={styles.sku_td_input}
				onChange={e => this.handleChangeInput(e.target.value)}
				onBlur={e => this.handleBlurInput(e.target["value"])}
			/>
		);
	}
}

export class EditableCellSwitch extends React.Component<EditCellSwitchProps, {}> {
	state = {
		isOnSale: this.props.isOnSale
	};

	handlerChange(status) {
		console.log("=====>>switch:", status);
		this.setState(
			{
				isOnSale: status
			},
			this.props.onChange(status)
		);
	}

	render() {
		const { isOnSale } = this.state;
		return (
			<Switch
				checkedChildren="开"
				unCheckedChildren="关"
				checked={isOnSale}
				onChange={e => this.handlerChange(e)}
			/>
		);
	}
}
