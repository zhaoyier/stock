import * as React from "react";
import {
	Input,
	Form,
	Tabs,
} from "antd";
import ExpressSelect from "../expressSelect";
import { getText } from "../../../../../util/kit";
import { AlterOrderTrackMode } from "../orderBodyTable/type";

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

interface AlterOrderTrackProps {
	data: {
		orderNum: string;
		provider: string;
		trackingNum: string;
		data: Array<any>;
		mode: AlterOrderTrackMode;
	};
	updateData: Function;
}

class AlterOrderTrack extends React.Component<AlterOrderTrackProps, {}> {

	render() {
		const { data, updateData } = this.props;
		const { provider, trackingNum, mode, } = data;
		const FormItemSelect = (name, index = -1) => {
			return (
				<FormItem
					{...formItemLayout}
					label={getText("express")}
				>
					<ExpressSelect
						value={name}
						disabled={mode === "view"}
						onChange={val => {
							if (index === -1) {
								updateData({ provider: val });
							} else {
								data.data[index].provider = val;
								updateData({ data: data.data });
							}
						}
						} />
				</FormItem>
			)
		}
		return (
			<Form layout="horizontal" >
				{
					mode === "create" ?
						<div>
							{FormItemSelect(provider)}
							<FormItem
								{...formItemLayout}
								label={getText("express_number")}
							>
								<Input
									value={trackingNum}
									onChange={(e: any) => updateData({ trackingNum: e.target.value })} />
							</FormItem>
						</div>
						:
						<Tabs type="card">
							{
								data.data.map((item, index) =>
									<Tabs.TabPane key={index} tab={`快递${index + 1}`}>
										{FormItemSelect(item.provider, index)}
										<FormItem
											{...formItemLayout}
											label={getText("express_number")}
										>
											<Input
												disabled={mode === "view"}
												value={item.trackingNum}
												onChange={(e: any) => {
													data.data[index].trackingNum = e.target.value;
													updateData({ data: data.data });
												}} />
										</FormItem>
									</Tabs.TabPane>
								)
							}
						</Tabs>
				}
			</Form>
		);
	}
}

export default AlterOrderTrack;
