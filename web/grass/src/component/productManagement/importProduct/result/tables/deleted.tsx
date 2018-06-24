import * as React from "react";
import { Component } from "react";
import { toJS } from "mobx";

import { Table, Tooltip, Icon } from "antd";
import { defaultConfig } from "../../../constant";

interface DeletedProps {
	store: any;
}

export default class Deleted extends Component<DeletedProps, any> {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: []
		};
	}

	render() {
		const columns = [
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
				dataIndex: "stack"
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

		const { products, total, reloadProducts, page } = this.props.store;

		const pagination = {
			total: total,
			current: page,
			defaultPageSize: defaultConfig.limit,
			hideOnSinglePage: false,
			showQuickJumper: true,
			onChange: page => {
				reloadProducts(page, defaultConfig.limit);
			}
		};

		return (
			<div>
				<Table
					rowKey={(record: any) => record.childTaskId}
					columns={columns}
					dataSource={toJS(products)}
					pagination={pagination}
				/>
			</div>
		);
	}
}
