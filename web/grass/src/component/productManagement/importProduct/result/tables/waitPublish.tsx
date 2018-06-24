import * as React from "react";
import { Component } from "react";
import { toJS } from "mobx";

import { Table, Modal, Button, Tooltip, Icon, Switch, Alert, Checkbox, message } from "antd";
// import "../../index.scss";
const styles = require("../../index.scss");
import { defaultConfig } from "../../../constant";
import { observer, inject } from "mobx-react";

import { ImportSubTaskManage, ImportSubTaskManageOp } from "services/ezseller/Product";

interface TableWaitPublishProps {
	store: any;
}

interface TableWaitPublishState {
	footer: any;
	offset: number;
	selectedRowKeys: Array<any>;
}

const footer = () => (
	<Alert message="上架失败！原因：未导入成功的商品无法发布" type="error" showIcon />
);
@inject("store")
@observer
export default class TableWaitPublish extends Component<
	TableWaitPublishProps,
	TableWaitPublishState
> {
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			footer: undefined,
			selectedRowKeys: []
		};
		this.batchOnSale = this.batchOnSale.bind(this);
		this.batchDelete = this.batchDelete.bind(this);
	}

	importSubTaskManage(op, subTaskIds) {
		const { reloadProducts, page } = this.props.store;

		ImportSubTaskManage({ op, subTaskIds })
			.then(res => {
				console.log("====>>del res:", res);
				if (!res.result.code) {
					reloadProducts(page);
					return message.success(res.result.message);
				}
				throw new Error(JSON.stringify(res)); // TODO
			})
			.catch(res => {
				console.log("[deleteClick] 异常:", res);
			});
	}

	deleteClick(record) {
		Modal.confirm({
			title: "你确定删除这条商品吗？",
			onOk: () => {
				console.log("===>>del", record);
				this.importSubTaskManage(ImportSubTaskManageOp.ImportSubTaskManageOpDel, [
					record.childTaskId
				]);
			},
			onCancel: () => {}
		});
	}

	batchOnSale(e) {
		const { selectedRowKeys } = this.state;
		if (!selectedRowKeys.length) {
			message.warn("请先选择上架商品!");
		}
		Modal.confirm({
			title: "确认批量上架吗？",
			onOk: () => {
				console.log("===>>batchOnSale:", e, selectedRowKeys);
				// TODO 批量上架
				this.importSubTaskManage(
					ImportSubTaskManageOp.ImportSubTaskManageOpOnSale,
					selectedRowKeys
				);
			},
			onCancel: () => {}
		});
	}

	batchDelete(e) {
		const { selectedRowKeys } = this.state;
		if (!selectedRowKeys.length) {
			message.warn("请先选择需要删除的商品!");
		}
		Modal.confirm({
			title: "确认要删除这些商品吗？",
			onOk: () => {
				console.log(e);
				// TODO 批量删除
				this.importSubTaskManage(ImportSubTaskManageOp.ImportSubTaskManageOpDel, selectedRowKeys);
			},
			onCancel: () => {}
		});
	}

	onChangeSwitch(state, product) {
		// TODO 调用接口修改
		const { setProductSensitive } = this.props.store;
		console.log("====>>onChangeSwitch:", state, product);
		setProductSensitive(state, product);
	}

	getContinuousNumber(key, value, index) {
		// console.log("====>>>013:", key, value, index);
		let pre = -1,
			total = 0;
		const { products } = toJS(this.props.store);
		if (products[index][key] !== value) return 0;

		for (let i in products) {
			// 判断索引是否第一个
			if (products[i][key] === value && index - 1 === Number(i)) {
				return 0;
			}
		}

		for (let i in products) {
			if (i < index) continue;
			if (products[i][key] === value && (pre === -1 || Number(i) - pre === 1)) {
				total += 1;
				pre = Number(i);
				continue;
			}
			break;
		}

		return total;
	}

	render() {
		const { footer } = this.state;
		const spuCols = [
			{
				title: "主图",
				dataIndex: "primaryImg",
				render: text => {
					if (text) {
						return <img style={{ width: 100 }} src={text} alt="" />;
					} else {
						return (
							<img style={{ width: 100 }} src={require("../../../image/defaultImg.png")} alt="" />
						);
					}
				}
			},
			{
				title: "商品信息",
				dataIndex: "title",
				render: (text, record) => (
					<span>
						{text}
						<br />
						<a target="_blank" href={record.origUrl}>
							[原网页链接]
						</a>
					</span>
				)
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						有效SKU数 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "skuNum"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品价格 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "price"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品库存 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "quantity"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品重量 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "weight"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						敏感商品 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "sensitive",
				render: (text, record) => {
					return (
						<Switch
							checkedChildren="是"
							unCheckedChildren="否"
							checked={text ? true : false}
							onChange={state => this.onChangeSwitch(state, record)}
						/>
					);
				}
			},
			{
				title: "操作",
				render: (text, record) => {
					return (
						<span>
							<a
								href={`${window.location.pathname}#/productEdit?pid=${
									record.productId
								}&source=import`}
							>
								编辑并上架
							</a>
							<br />
							<a onClick={() => this.deleteClick(record)} href="javascript: void(0);">
								删除
							</a>
						</span>
					);
				}
			}
		];

		const skuCols = [
			{
				title: <Checkbox>全选</Checkbox>,
				render: (value, row, index) => {
					const obj = {
						children: <Checkbox />,
						props: { rowSpan: 1 }
					};
					obj.props.rowSpan =
						this.getContinuousNumber("childTaskId", row["childTaskId"], index) || 0;
					return obj;
				}
			},
			{
				title: "主图",
				dataIndex: "primaryImg",
				render: (value, row, index) => {
					if (value) {
						return <img style={{ width: 100 }} src={value} alt="" />;
					} else {
						return (
							<img style={{ width: 100 }} src={require("../../../image/defaultImg.png")} alt="" />
						);
					}
				}
			},
			{
				title: "商品信息",
				dataIndex: "title",
				render: (text, row) => (
					<span>
						{text}
						<br />
						<a target="_blank" href={row.origUrl}>
							[原网页链接]
						</a>
					</span>
				)
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						是否在售 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "onSale"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品价格 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "price"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品库存 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "quantity"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品重量 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "weight"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						敏感商品 <Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "sensitive",
				render: (value, row, index) => {
					console.log("=====>>>敏感:", value);
					const obj = {
						children: (
							<Switch
								checkedChildren="是"
								unCheckedChildren="否"
								checked={value ? true : false}
								onChange={state => this.onChangeSwitch(state, row)}
							/>
						),
						props: { rowSpan: 1 }
					};
					obj.props.rowSpan =
						this.getContinuousNumber("childTaskId", row["childTaskId"], index) || 0;
					return obj;
				}
			},
			{
				title: "操作",
				render: (value, row, index) => {
					const obj = {
						children: (
							<span>
								<a
									href={`${window.location.pathname}#/productEdit?pid=${
										row.productId
									}&source=import`}
								>
									编辑并上架
								</a>
								<br />
								<a onClick={() => this.deleteClick(row)} href="javascript: void(0);">
									删除
								</a>
							</span>
						),
						props: { rowSpan: 1 }
					};
					obj.props.rowSpan =
						this.getContinuousNumber("childTaskId", row["childTaskId"], index) || 0;
					return obj;
				}
			}
		];

		const { products, total, reloadProducts, isSpu, page, pageSize } = this.props.store;
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys: selectedRows.map(item => {
						return item.childTaskId;
					})
				});
				console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			}
		};

		const pagination = {
			total: total,
			current: page,
			pageSize,
			hideOnSinglePage: false,
			showQuickJumper: true,
			onChange: page => {
				reloadProducts(page, defaultConfig.limit);
			}
		};
		console.log("=====>>>waite:", toJS(products));

		return (
			<div>
				{isSpu && (
					<Table
						bordered
						rowKey="title"
						rowSelection={rowSelection}
						columns={spuCols}
						dataSource={toJS(products)}
						footer={footer}
						pagination={pagination}
					/>
				)}
				{!isSpu && (
					<Table
						bordered
						rowKey="title"
						columns={skuCols}
						dataSource={toJS(products)}
						footer={footer}
						pagination={pagination}
					/>
				)}
				<div style={{ marginTop: -46 }}>
					已选{this.state.selectedRowKeys.length}条 &emsp;
					<Button type="primary" onClick={this.batchOnSale}>
						批量上架
					</Button>{" "}
					&emsp;
					<Button type="primary" onClick={this.batchDelete}>
						批量删除
					</Button>
				</div>
			</div>
		);
	}
}
