import * as React from "react";
import { connect } from "react-redux";
import {
	Table,
} from "antd";
import { userExportTaskList, alterTaskListSearchInfo } from "../../../action/order";
import { getColumns, getDataSource, getSelectOption, getLocale } from "../utility/kit";
import TaskHeader from "../utility/header";
import "../utility/index.scss";

interface TasksObj {
	createBy: string;
	createdAt: number;
	err: string;
	fileUrl: string;
	id: string;
	status: number;
	taskType: number;
}

interface ExportTaskProps {
	dispatch: Function;
	taskCenterExport: {
		selectValue: string,
		taskId: string,
		total: number,
		tasks: TasksObj[]
	};
	accountInfo: any;
}

interface ExportTaskState {
	isFirstReceiveProps: boolean;
	readonly originCode: string;
}

@connect(state => ({
	taskCenterExport: state.order.taskCenterExport,
	accountInfo: state.common.accountInfo
}))
export default class ExportTask extends React.Component<ExportTaskProps, ExportTaskState> {
	constructor(props) {
		super(props);
		this.state = {
			originCode: this.props.accountInfo.shop.originCode,
			isFirstReceiveProps: true
		};
	}

	componentWillMount() {
		this.firstReceiveTaskIdByProps(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.firstReceiveTaskIdByProps(nextProps);
	}

	componentDidMount() {
		this.handleSearch(0);
	}

	firstReceiveTaskIdByProps(props) {
		const { taskCenterExport, location } = props;
		const { id } = location.query;
		const { isFirstReceiveProps } = this.state;
		if (isFirstReceiveProps && ( (id && taskCenterExport.taskId === id) || (!id && taskCenterExport.taskId !== ""))) {
			this.setState({
				isFirstReceiveProps: false
			});
		}
	}

	alterSearchInfo(data): boolean {
		const { dispatch } = this.props;
		const { isFirstReceiveProps } = this.state;
		if (isFirstReceiveProps) {
			this.setState({
				isFirstReceiveProps: false
			});
			return false;
		}
		dispatch(alterTaskListSearchInfo(data));
		return true;
	}

	handleSearch(offset: number) {
		const { dispatch, taskCenterExport } = this.props;
		const url = window.location.href;
		if (url.indexOf("taskId=") > -1) {
			const urlTaskId = url.substring(url.indexOf("taskId=") + 7);
			console.log(urlTaskId);
			if (urlTaskId.length > 0) {
				taskCenterExport.taskId = urlTaskId;
			}

		}
		const { selectValue, taskId } = taskCenterExport;
		const filter = selectValue === "0" ? { id: taskId } : { taskType: parseInt(selectValue), id: taskId };
		const parms = {
			filter,
			offset,
			limit: 10
		};
		dispatch(userExportTaskList({ ...parms }));
	}

	render() {
		const { tasks, total } = this.props.taskCenterExport;
		const { originCode } = this.state;
		const pagination = {
			total: total,
			onChange: page => this.handleSearch((page - 1) * 10)
		};
		const selectOption = getSelectOption(originCode, "export");
		return (
			<div>
				<TaskHeader
					taskCenterData={this.props.taskCenterExport}
					selectOption={selectOption}
					alterSearchInfo={this.alterSearchInfo.bind(this)}
					handleSearch={() => this.handleSearch(0)}
				/>
				<section className="taskSection">
					<Table
						locale={getLocale(originCode)}
						pagination={pagination}
						columns={getColumns(originCode, "export", this)}
						dataSource={getDataSource(tasks.length === 1 && tasks[0].id === "" ? [] : tasks, originCode)} />
				</section>
			</div>
		);
	}
}

