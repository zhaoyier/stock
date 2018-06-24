import * as React from "react";
import { toJS } from "mobx";
import { Component } from "react";
import { observer } from "mobx-react";
import moment from "moment";

import { Icon, Table } from "antd";
// import { fakedata } from "./mock";
import getBreadCrumb from "./breadCrumb";
import { ProductImportTaskStatus, ImportProductSource } from "../../../services/ezseller/Product";
import ImportRecordModel from "./models/importRecord";
import { defaultConfig } from "../constant";
const styles = require("./index.scss");

interface ImportRecordProps {
	store: ImportRecordModel;
}

interface ImportRecordState {
	current: number;
	total: number;
}

@observer
class ImportRecord extends Component<ImportRecordProps, ImportRecordState> {
	constructor(props) {
		super(props);
		this.state = {
			current: 1,
			total: 0
		};
	}

	componentDidMount() {
		const { setTimer, getTaskList } = this.props.store;
		const timer = setInterval(() => {
			getTaskList();
		}, defaultConfig.delay);
		setTimer(timer);
	}

	componentWillUnmount() {
		const { timer } = this.props.store;
		clearTimeout(timer);
	}

	render() {
		const columns = [
			{
				title: "导入时间",
				dataIndex: "createTime",
				render: text => <span>{moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
			},
			{
				title: "导入来源",
				dataIndex: "source",
				render: text => {
					switch (text) {
						case ImportProductSource.ImportProductSourceTaobao:
							return <span>淘宝</span>;
						case ImportProductSource.ImportProductSourceAmazon:
							return <span>亚马逊</span>;
						case ImportProductSource.ImportProductSourceTmall:
							return <span>天猫</span>;
						default:
							return <span>其他</span>;
					}
				}
			},
			{
				title: "状态",
				dataIndex: "status",
				render: text => {
					switch (text) {
						case ProductImportTaskStatus.ProductImportTaskStatusFail:
							return <div>任务失败</div>;
						case ProductImportTaskStatus.ProductImportTaskStatusAborted:
							return <div>任务放弃</div>;
						case ProductImportTaskStatus.ProductImportTaskStatusPending:
							return <div>任务等待</div>;
						case ProductImportTaskStatus.ProductImportTaskStatusProcessing:
							return (
								<div>
									正在进行 <Icon type="loading" />
								</div>
							);
						case ProductImportTaskStatus.ProductImportTaskStatusSuc:
							return <div>任务成功</div>;
					}
				}
			},
			{
				title: "导入总量",
				dataIndex: "total",
				render: (text, record) => {
					if (record.status === ProductImportTaskStatus.ProductImportTaskStatusProcessing) {
						return (
							<div>
								正在进行 <Icon type="loading" />
							</div>
						);
					}

					return text;
				}
			},
			{
				title: "导入成功",
				dataIndex: "sucNum",
				render: (text, record) => {
					if (record.status === ProductImportTaskStatus.ProductImportTaskStatusProcessing) {
						return (
							<div>
								正在进行 <Icon type="loading" />
							</div>
						);
					}

					return (
						<span>
							{text}{" "}
							<a
								href={`${window.location.pathname}#/importResult?id=${record.taskId}&source=${
									record.source
								}&createTime=${record.createTime}`}
							>
								{" "}
								查看
							</a>
						</span>
					);
				}
			},
			{
				title: "导入失败",
				dataIndex: "failNum",
				render: (text, record) => {
					if (record.status === ProductImportTaskStatus.ProductImportTaskStatusProcessing) {
						return (
							<div>
								正在进行 <Icon type="loading" />
							</div>
						);
					}
					return (
						<span>
							{text}{" "}
							<a
								href={`${window.location.pathname}#/importResult?id=${record.taskId}&source=${
									record.source
								}&createTime=${record.createTime}`}
							>
								{" "}
								查看
							</a>
						</span>
					);
				}
			}
		];

		const { tableList, getTaskList, total } = this.props.store;
		const pagination = {
			total: total,
			defaultPageSize: defaultConfig.limit,
			hideOnSinglePage: false,
			showQuickJumper: true,
			onChange: page => {
				getTaskList((page - 1) * defaultConfig.limit, defaultConfig.limit);
			}
		};
		return (
			<div>
				<div className={styles.import__form}>
					<div className={`${styles.map__path} ${styles.clearfix}`}>{getBreadCrumb(2)}</div>
					<div style={{ marginTop: 20 }}>
						<Table
							rowKey={record => record["taskId"]}
							columns={columns}
							pagination={pagination}
							dataSource={toJS(tableList)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default () => <ImportRecord store={new ImportRecordModel()} />;
