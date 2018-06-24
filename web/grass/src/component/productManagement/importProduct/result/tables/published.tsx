import * as React from "react";
import { Component } from "react";

import { Table, Tooltip, Icon } from "antd";
import { defaultConfig } from "../../../constant";

interface PublishedProps {
	store: any;
}

interface PublishedState {
	offset: number;
	current: number;
}

export default class Published extends Component<PublishedProps, PublishedState> {
	constructor(props) {
		super(props);
		this.state = {
			current: 1,
			offset: 0
		};
	}

	render() {
		const {
			isSpu,
			products,
			total,
			reloadProducts,
			page,
			pageSize,
			getContinuousNumber
		} = this.props.store;

		const spuCol = [
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
				render: text => (
					<span>
						{text}
						<br />
						<a href="javascript: void(0);">[原网页链接]</a>
					</span>
				)
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						有效SKU数<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "skuNum"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品价格<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "price"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品库存<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "quantity"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品重量<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "weight"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						敏感商品<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "sensitive",
				render: text => {
					return <span>{text ? "是" : "否"}</span>;
				}
			}
		];

		const skuCol = [
			{
				title: "商品信息",
				dataIndex: "title",
				render: (value, row, index) => (
					<span>
						{value}
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
						是否在售<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "onSale",
				render: value => {
					return value ? "是" : "否";
				}
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品价格<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "price"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品库存<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "quantity"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						商品重量<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "weight"
			},
			{
				title: (
					<Tooltip placement="topLeft" title={"666"}>
						敏感商品<Icon style={{ color: "#FAAD14" }} type="question-circle" />
					</Tooltip>
				),
				dataIndex: "sensitive",
				render: (value, row, index) => {
					const obj = {
						children: value ? "是" : "否",
						props: { rowSpan: 1 }
					};
					obj.props.rowSpan = getContinuousNumber("childTaskId", row["childTaskId"], index) || 0;
					return obj;
				}
			}
		];

		console.log("====>>published:", products.length, total, page, pageSize);
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

		return (
			<div>
				{isSpu && (
					<Table rowKey="title" columns={spuCol} dataSource={products} pagination={pagination} />
				)}
				{!isSpu && (
					<Table rowKey="title" columns={skuCol} dataSource={products} pagination={pagination} />
				)}
			</div>
		);
	}
}
