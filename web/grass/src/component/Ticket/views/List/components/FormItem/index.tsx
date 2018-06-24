import * as React from "react";
import { Input, Select, DatePicker, Radio } from "antd";
import { OptionProps } from "../../../../constants";
const styles = require("./index.scss");

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const Textarea = Input.TextArea;

function joinClass(classList: string[]) {
	return classList.filter(c => !!c).join(" ");
}

export enum FormItemType {
	Select,
	BetterSelect,
	Input,
	RangeTime,
	RangeInput,
	CheckBox,
	RadioGroup,
	Custom,
	Date,
	Textarea
}

export interface FormItemProps {
	label: string;
	width?: number;
	labelWidth?: number | string;
	contentWidth?: number | string;
	onChange?: Function;
	itemType: FormItemType;
	optionList?: OptionProps[];
	style?: React.CSSProperties;
	value?: any;
	name?: string;
	showSearch?: boolean;
	allowClear?: boolean;
	child?: any;
	className?: string;
	labelClass?: string;
	onPressEnter?: () => void;
	labelStyle?: React.CSSProperties;
}

export class FormItem extends React.PureComponent<FormItemProps, {}> {
	onChange = (value: any) => {
		const { onChange, name } = this.props;
		if (onChange) {
			if (name) value = { [name]: value };
			onChange(value);
		}
	}

	onEventChange = (e: React.ChangeEvent<any>) => {
		this.onChange(e.target.value);
	}

	render() {
		const {
			itemType,
			label,
			optionList,
			style,
			value,
			contentWidth,
			showSearch,
			allowClear,
			labelWidth,
			child,
			className,
			labelClass,
			width,
			onPressEnter,
			labelStyle
		} = this.props;

		let content: any = null;
		switch (itemType) {
			case FormItemType.Input:
				content = <Input onChange={this.onEventChange} value={value} onPressEnter={onPressEnter} />;
				break;
			case FormItemType.Select:
				content = (
					<Select
						style={{ width: "100%" }}
						value={value}
						onChange={this.onChange}
						showSearch={showSearch}
						allowClear={allowClear}
						filterOption={(input, option: any) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{optionList!.map(o => (
							<Option value={o.value} key={o.value} title={o.label}>
								{o.label}
							</Option>
						))}
					</Select>
				);
				break;
			case FormItemType.RangeTime:
				content = <RangePicker value={value} onChange={this.onChange} allowClear={allowClear} />;
				break;
			case FormItemType.Date:
				content = <DatePicker value={value} onChange={this.onChange} allowClear={allowClear} />;
				break;
			case FormItemType.RadioGroup:
				content = <RadioGroup options={optionList} value={value} onChange={this.onEventChange} />;
				break;
			case FormItemType.Textarea:
				content = <Textarea value={value} onChange={this.onEventChange} />;
				break;
			case FormItemType.Custom:
				content = child;
				break;
			default:
				break;
		}

		const contentStyle: any = contentWidth ? { width: contentWidth } : null;
		let containerStyle;
		if (style) {
			containerStyle = style;
		} else if (width) {
			containerStyle = { width };
		}

		return (
			<div className={joinClass([styles.container, className])} style={containerStyle}>
				<span
					className={joinClass([styles.label, labelClass])}
					style={labelStyle ? labelStyle : { width: labelWidth }}
					title={label}
				>
					{`${label}:`}
				</span>
				<div className={styles.content} style={contentStyle}>
					{content}
				</div>
			</div>
		);
	}
}
