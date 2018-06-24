import * as React from "react";
import {
	Input,
	Form,
	Table
} from "antd";
import * as moment from "moment";
import {
	OrderItemRemark
} from "../../../../../services/EzSellerService";
import { getText } from "../../../../../util/kit";


const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

interface MerchantRemarkProps {
	data: {
		orderNum: string;
		remark: string;
		sellerRemark: OrderItemRemark[];
	};
	updateRemark: Function;
}

class MerchantRemark extends React.Component<MerchantRemarkProps, {}> {
	render() {
		const { data, updateRemark } = this.props;
		const columns = [
			{
				title: getText("Remarks"),
				dataIndex: "remark",
				key: "remark",
			}, {
				title: getText("time_created"),
				dataIndex: "createdAt",
				key: "createdAt",
				render: text => <p> {moment(text * 1000).format("YYYY-MM-DD HH:mm")} </p>
			}, {
				title: getText("Founder"),
				dataIndex: "userName",
				key: "userName",
			}
		];
		return (
			<Form layout="horizontal">
				<Table
					dataSource={data.sellerRemark}
					columns={columns} />
				<FormItem
					{...formItemLayout}
					label={getText("order_number")}
				>
					{data.orderNum}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={getText("remark_content")}
				>
					<Input.TextArea onChange={(e: any) => updateRemark(e.target.value)} />
				</FormItem>
			</Form>
		);
	}
}

export default MerchantRemark;
