import * as React from "react";
import {
	Input,
	Row,
	Col,
	Select,
	Button,
	Table,
	DatePicker
} from "antd";
import ContainerWrap from "../../common/ContainerWrap";
import * as moment from "moment";
import "./index.scss";
import {
	GetSellerAdjustmentReceipts,
	GetSellerAdjustmentReceiptsReq,
	GetSellerAdjustmentReceiptsResp,
	AdjustmentReceiptReason,
	AdjustmentReceiptStatus,
	AdjustmentReceiptFeeType,
} from "services/ezseller/bill";
import {
	adjustmentReceiptFeeType,
	adjustmentReceiptReason,
	adjustmentReceiptStatus
} from "./common/constant";
import { showTimestamp } from "util/kit";

const SelectOption = Select.Option;

interface CostAdjustmentState {
	filter: Partial<GetSellerAdjustmentReceiptsReq>;
	listData: GetSellerAdjustmentReceiptsResp | null;
}

class CostAdjustment extends React.Component<{}, CostAdjustmentState> {
	state: CostAdjustmentState = {
		filter: {
			limit: 10,
			offset: 0
		},
		listData: null
	};

	componentDidMount() {
		this.getListData();
	}
	setFilter(data: Partial<GetSellerAdjustmentReceiptsReq>, search = false) {
		let { filter } = this.state;
		filter =  { ...filter, ...data };
		this.setState({ filter }, () => {
			if (search) {
				this.getListData();
			}
		});
	}
	getListData() {
		const { filter } = this.state;
		if (filter.createEndTime === "NaN" || filter.createStartTime === "NaN") {
			delete filter.createStartTime;
			delete filter.createEndTime;
		}
		GetSellerAdjustmentReceipts(filter as GetSellerAdjustmentReceiptsReq)
			.then(result => this.setState({
				listData: result
			}));
	}
	onRangePickerChange(date, dateString) {
		const createStartTime = moment(dateString[0])
			.unix()
			.toString();
		const createEndTime = (moment(dateString[1])
			.unix() + 24 * 60 * 60 - 1)
			.toString();
		this.setFilter({ createStartTime, createEndTime });
	}
	render () {
		const {
			listData,
			filter
		} = this.state;
		const pagination = {
			total: listData ? listData.total : 0,
			current: ((filter.offset as number) / (filter.limit as number)) + 1,
			defaultPageSize: 10,
			showSizeChanger: true,
			showQuickJumper: true,
			onChange: page => this.setFilter({ offset: (page - 1) * (filter as any).limit }, true),
			onShowSizeChange: (current, size) => this.setFilter({ limit: size }, true)
		};
		const columns = [
			{
				title: "费用类型",
				dataIndex: "feeType",
				key: "feeType",
				width: 100,
				render(text) {
					return <span> {adjustmentReceiptFeeType[text] || ""} </span>;
				}
			},
			{
				title: "调整原因",
				dataIndex: "reason",
				key: "reason",
				width: 100,
				render(text) {
					return <span> {adjustmentReceiptReason[text] || ""} </span>;
				}
			},
			{
				title: "单据号",
				dataIndex: "orderNo",
				key: "orderNo",
				width: 100,
			},
			{
				title: "数量",
				dataIndex: "quantity",
				key: "quantity",
				width: 100,
			},
			{
				title: "调整金额",
				dataIndex: "amount",
				key: "amount",
				width: 100,
			},
			{
				title: "备注",
				dataIndex: "remark",
				key: "remark",
				width: 100,
				render(text) {
					return <div style={{wordBreak: "break-all"}}> {text} </div>;
				}
			},
			{
				title: "费用状态",
				dataIndex: "status",
				key: "status",
				width: 100,
				render(text) {
					return <span> {adjustmentReceiptStatus[text] || "" } </span>;
				}
			},
			{
				title: "创建时间",
				dataIndex: "createDate",
				key: "createDate",
				width: 200,
				render(text) {
					return <div> {showTimestamp(text)} </div>;
				}
			}];
			const dataSource = listData ? listData.receipts : [];
		const title = <span className="costAdjustment_title">
			<span> 资金管理 / </span>
			<span> 费用管理 </span>
		</span>;
		return (
			<ContainerWrap
				title={title}>
					<header className="costAdjustment_header">
						<Row>
							<Col span={8}>
								单据编号
								<Input
									className="input"
									value={filter.orderNo}
									onChange={e => this.setFilter({orderNo: e.target.value})}/>
							</Col>
							<Col span={8}>
								费用类型
								<Select
									className="input"
									value={filter.feeType}
									onChange={(feeType: AdjustmentReceiptFeeType) => this.setFilter({feeType})}>
								{
									Object.keys(adjustmentReceiptFeeType).map((item, index) =>
										<SelectOption key={item} value={item}>
										{  adjustmentReceiptFeeType[item] }
										</SelectOption>
									)
								}
								</Select>
							</Col>
							<Col span={8}>
								调整原因
								<Select
									className="input"
									value={filter.reason}
									onChange={(reason: AdjustmentReceiptReason) => this.setFilter({reason})}>
								{
									Object.keys(adjustmentReceiptReason).map((item, index) =>
										<SelectOption
											key={index}
											value={item}>
										{ adjustmentReceiptReason[item] }
										</SelectOption>
									)
								}
								</Select>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								单据状态
								<Select
									className="input"
									value={filter.status}
									onChange={(status: AdjustmentReceiptStatus) => this.setFilter({status})}>
								{
									Object.keys(adjustmentReceiptStatus).map((item, index) =>
										<SelectOption
											key={index}
											value={item}>
										{ adjustmentReceiptStatus[item] }
										</SelectOption>
									)
								}
								</Select>
							</Col>
							<Col span={8}>
								创建时间
								<DatePicker.RangePicker
									className="input"
									onChange={this.onRangePickerChange.bind(this)} />
							</Col>
							<Col span={8}>
								<Button
									type="primary"
									onClick={() => this.setFilter({offset: 0}, true)}>
									搜索
								</Button>
							</Col>
						</Row>
					</header>
					<section className="costAdjustment_section">
						<Table
							style={{border: "1px solid #E8E8E8"}}
							pagination={pagination}
							dataSource={dataSource}
							columns={columns}/>
					</section>
			</ContainerWrap>
		);
	}
}

export default CostAdjustment;
