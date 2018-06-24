import * as React from "react";
import * as moment from "moment";
import {
	Card
} from "antd";
import {
	OrderItemRemark
} from "../../../../../services/EzSellerService";
import { getText } from "../../../../../util/kit";


interface UserRemarkProps {
	data: Array<OrderItemRemark>;
}

class UserRemark extends React.Component<UserRemarkProps, {}> {
	render() {
		const { data } = this.props;
		return (
			<div>
				{
					data && data.length > 0 ? data.map((item, index) =>
						<Card title={moment(item.createdAt * 1000).format("YYYY-MM-DD HH:mm")}>
							<div style={{ wordBreak: "break-all" }}>
								{item.remark}
							</div>
						</Card>
					) : getText("No data")
				}
			</div>
		);
	}
}

export default UserRemark;
