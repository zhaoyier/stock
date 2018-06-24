import * as React from "react";
import { Component } from "react";

import { Table, Button, message } from "antd";

import { defaultConfig } from "../../../constant";
import { toJS } from "mobx";
import {
	ImportTaskAdd,
	ImportSubTaskManage,
	ImportSubTaskManageOp
} from "../../../../../services/ezseller/Product";

interface TableFailedProps {
	store: any;
}

interface TableFailedState {
	current: number;
	selectedRowKeys: Array<any>;
}

export default class Failed extends Component<TableFailedProps, TableFailedState> {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			selectedRowKeys: []
		};
	}

	importAgain(record) {
		const { params } = this.props.store;
		ImportSubTaskManage({
			op: ImportSubTaskManageOp.ImportSubTaskManageOpRetry,
			subTaskIds: [record.origUrl]
		})
			.then(res => {
				switch (res.result.code) {
					case 0:
						message.success("导入成功");
						window.location.hash = "#/importRecord";
						break;
					case 1:
						message.error("不支持的平台");
						break;
					default:
						message.warn("未知错误，请检查url");
						break;
				}
			})
			.catch(res => {
				console.log("[importAgain] 导入失败:", res);
			});
	}

	resetPage(current) {
		this.setState({
			current
		});
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
				title: "操作",
				render: (text, record) => {
					return (
						<span>
							<a onClick={() => this.importAgain(record)} href="javascript: void(0);">
								重新导入
							</a>
						</span>
					);
				}
			}
		];

		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedRowKeys });
				console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			}
		};

		const { current } = this.state;
		const { products, total, reloadProducts, page } = this.props.store;

		const pagination = {
			total: total,
			current: page,
			defaultPageSize: defaultConfig.limit,
			hideOnSinglePage: false,
			showQuickJumper: true,
			onChange: page => {
				reloadProducts(page, defaultConfig.limit);
				this.resetPage(page);
			}
		};

		return (
			<div>
				<Table
					rowKey={(record: any) => record.childTaskId}
					rowSelection={rowSelection}
					columns={columns}
					dataSource={toJS(products)}
					pagination={pagination}
				/>
				<div style={{ marginTop: -46 }}>
					已选{this.state.selectedRowKeys.length}条 &emsp;
					<Button type="primary">批量导入</Button>
				</div>
			</div>
		);
	}
}
