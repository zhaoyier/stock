import * as React from "react";
import * as moment from "moment";
import { DatePicker } from "antd";

const containerStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center"
};
const spanStyle: React.CSSProperties = {
	margin: "0 2px"
};

export type MomentType = moment.Moment | undefined;

interface RangeDateProps {
	startName: string;
	endName: string;
	startValue: MomentType;
	endValue: MomentType;
	onChange: (val: { [index: string]: MomentType }) => void;
}

export class RangeDate extends React.PureComponent<RangeDateProps, {}> {
	onStartChange = val => {
		const { onChange, startName } = this.props;
		onChange({
			[startName]: val
		});
	};

	onEndChange = val => {
		const { onChange, endName } = this.props;
		onChange({
			[endName]: val
		});
	};

	render() {
		const { startValue, endValue } = this.props;
		return (
			<div style={containerStyle}>
				<DatePicker allowClear value={startValue} onChange={this.onStartChange} />
				<span style={spanStyle}>-</span>
				<DatePicker allowClear value={endValue} onChange={this.onEndChange} />
			</div>
		);
	}
}
