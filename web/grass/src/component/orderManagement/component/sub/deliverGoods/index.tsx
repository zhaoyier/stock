import * as React from "react";
import {
	Input,
	Form
} from "antd";
import ExpressSelect from "../expressSelect";
import { getText } from "../../../../../util/kit";
import {
	SH_ADDRESS_INFO,
	GZ_ADDRESS_INFO,
	SH_ADDRESS_INFO_EXPRESS,
	GZ_ADDRESS_INFO_EXPRESS,
} from "../../../../../constant";
import {
	OrderWarehouse
} from "../../../../../services/EzSellerService";
import "./index.scss";

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};

interface DeliverGoodsProps {
	data: {
		orderNum: string;
		provider: string;
		trackingNum: string;
		warehouse: OrderWarehouse;
	};
	updateData: Function;
}

class DeliverGoods extends React.Component<DeliverGoodsProps, {}> {
	render() {
		const { data, updateData } = this.props;
		const { provider, warehouse, trackingNum } = data;
		const addressInfo = warehouse === 2 ? GZ_ADDRESS_INFO : SH_ADDRESS_INFO;
		const addressInfoExpress = warehouse === 2 ? GZ_ADDRESS_INFO_EXPRESS : SH_ADDRESS_INFO_EXPRESS;
		return (
			<Form layout="horizontal">
				<FormItem
					{...formItemLayout}
					label={getText("arrival_warehouse")}
				>
					{addressInfo.title}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("receive_address")}
				>
					<div>({getText("Express delivery")}: ){addressInfoExpress.content}</div>
					<div>({getText("Hair logistics")}: ){addressInfo.content}</div>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("receiver")}
				>
					<div>({getText("Express delivery")}: ){addressInfoExpress.receiver}</div>
					<div>({getText("Hair logistics")}: ){addressInfo.receiver}</div>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("telephone")}
				>
					<div>({getText("Express delivery")}: ){addressInfoExpress.phone}</div>
					<div>({getText("Hair logistics")}: ){addressInfo.phone}</div>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("express")}
				>
					<ExpressSelect
						value={provider}
						onChange={val => updateData({ provider: val })} />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("express_number")}
				>
					<Input
						value={trackingNum}
						onChange={(e: any) => updateData({ trackingNum: e.target.value })} />
				</FormItem>
			</Form>
		);
	}
}

export default DeliverGoods;
