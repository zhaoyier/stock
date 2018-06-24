import * as React from "react";
import {
	Select
} from "antd";
import {
	SelectValue
} from "antd/lib/select";
import {
	getOriginCode
} from "../../../../../util/kit";
import { EXPRESS } from "../../../../../constant/index";

const Option = Select.Option;

interface ExpressSelectProps {
	value: SelectValue;
	onChange: (value: SelectValue) => void;
	disabled?: boolean;
}

class ExpressSelect extends React.Component<ExpressSelectProps, {}> {
	render() {
		const originCode = getOriginCode();
		const countryExpress = EXPRESS[originCode] ? EXPRESS[originCode] : EXPRESS["CN"];
		const { value, onChange, disabled } = this.props;

		return (
			<Select
				value={value}
				disabled={Boolean(disabled)}
				onChange={onChange}>
				{
					countryExpress.map((item, index) =>
						<Option key={index} value={item}>{item}</Option>)
				}
			</Select>
		);
	}
}

export default ExpressSelect;
