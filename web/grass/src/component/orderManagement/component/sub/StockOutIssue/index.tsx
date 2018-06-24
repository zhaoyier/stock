import * as React from "react";
import { message, Input, Button } from "antd";
import { RichTextEditor } from "component/Ticket/components/RichTextEditor";
import { UserTicketStockOut } from "services/ezseller/ticket";
import { checkAPIStatus } from "component/Ticket/utils";

export interface IssueOrderInfo {
	orderID: string;
	skuName: string;
	quantity: number;
	unitPrice: number;
}

interface StockOutIssueProps {
	data: IssueOrderInfo;
}

interface IssueOrderModalState {
	remark: string;
	qty: string;
	loading: boolean;
}

export class StockOutIssue extends React.PureComponent<StockOutIssueProps, IssueOrderModalState> {
	constructor(props) {
		super(props);

		this.state = {
			remark: "",
			qty: "",
			loading: false
		};
	}

	onDescChange = (remark: string) => {
		this.setState({
			remark
		});
	};

	onQTYChange = (e: React.ChangeEvent<any>) => {
		this.setState({
			qty: e.target.value
		});
	};

	onSubmit = () => {
		const { remark, qty } = this.state;
		let errMSG = "";

		if (!/^-?\d+$/.test(qty)) {
			errMSG = "数量格式错误";
		} else if (Number(qty) <= 0) {
			errMSG = "数量必须大于 0";
		}

		if (errMSG) {
			message.error(errMSG);
			return;
		}

		this.setState({
			loading: true
		});
		UserTicketStockOut({
			remark,
			qty,
			orderItemId: this.props.data.orderID
		})
			.then(checkAPIStatus)
			.then(() => {
				this.setState({
					loading: false
				});
				message.success("提交成功");
			})
			.catch(e => {
				this.setState({
					loading: false
				});
				message.error("提交失败");

				throw e;
			});
	};

	initState = (props: StockOutIssueProps) => {
		this.setState({
			qty: props.data.quantity.toString(),
			remark: ""
		});
	};

	componentWillReceiveProps(nextProps: StockOutIssueProps) {
		this.initState(nextProps);
	}

	componentDidMount() {
		this.initState(this.props);
	}

	render() {
		const { data } = this.props;
		const { remark, qty, loading } = this.state;
		return (
			<div title="问题件登记">
				<div>
					<p>SKU: {data.skuName}</p>
					<p>
						<span>缺货数量:</span>
						<Input style={{ width: 120, marginLeft: 10 }} value={qty} onChange={this.onQTYChange} />
					</p>
				</div>
				<RichTextEditor value={remark} onChange={this.onDescChange} />
				<div style={{ marginTop: 20, textAlign: "center" }}>
					<Button onClick={this.onSubmit} loading={loading} type="primary">
						提交
					</Button>
				</div>
			</div>
		);
	}
}
