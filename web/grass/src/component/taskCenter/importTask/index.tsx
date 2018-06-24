import * as React from "react";
import { connect } from "react-redux";
import TaskHeader from "../utility/header";
import {
  Table,
  Modal,
  message,
} from "antd";
import { getSelectOption, getLocale, getColumns, getDataSource } from "../utility/kit";
import { getText } from "../../../util/kit";
import { newUserImportTaskList, importAlterTaskListSearchInfo, userImportTaskRetry } from "../../../action/order";

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
  taskCenterImport: {
    selectValue: string,
    taskId: string,
    total: number,
    tasks: TasksObj[]
  };
  accountInfo: any;
  location: any;
}

interface ExportTaskState {
  isFirstReceiveProps: boolean;
  readonly originCode: string;
}

@connect(state => ({
  taskCenterImport: state.order.taskCenterImport,
  accountInfo: state.common.accountInfo
}))

export default class ImportTask extends React.Component<ExportTaskProps, ExportTaskState> {
  constructor(props) {
    super(props);
    this.state = {
      originCode: this.props.accountInfo.shop.originCode,
      isFirstReceiveProps: true
    };
  }

  componentWillMount() {
    this.fromLocationSearch();
    this.firstReceiveTaskIdByProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.firstReceiveTaskIdByProps(nextProps);
  }

  fromLocationSearch() {
    const { dispatch } = this.props;
    const { id } = this.props.location.query;
    if (id)
      dispatch(importAlterTaskListSearchInfo({taskId: id}));
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
    dispatch(importAlterTaskListSearchInfo(data));
    return true;
  }

  firstReceiveTaskIdByProps(props) {
    const { taskCenterImport } = props;
    const { isFirstReceiveProps } = this.state;
    if (isFirstReceiveProps && taskCenterImport.taskId !== "") {
      this.handleSearch(0, props);
      this.setState({
        isFirstReceiveProps: false
      });
    }
  }

  handleSearch(offset: number, props = this.props) {
    const { dispatch, taskCenterImport } = props;
    const { selectValue, taskId } = taskCenterImport;
    const filter = selectValue === "0" ? { id: taskId } : { taskType: parseInt(selectValue), id: taskId };
    console.log(filter, offset);
    dispatch(newUserImportTaskList(filter, offset, 10));
  }

  checkImportResult(item) {
    const { global = "", lines } = item.err;
    const globalDom = global ? <p> {global} </p> : null;
    const resDom = lines.slice(0, 10).map((mes = {object: "", num: "", message: ""}, index) => {
      return (
        <p style={{ marginBottom: 10 }} key={index}>
          <label style={{ color: "black" }}>{getText("order_number")}：</label>
          {mes.object}
          <label style={{ color: "black" }}> | {getText("Line number")}：</label>
          {mes.num}
          <br />
          <label style={{ color: "black" }}>{getText("Error message")}：</label>
          {mes.message}
        </p>
      );
    });
    const errDom = <div>
      {resDom}
      {globalDom}
    </div>;
    if (lines.length > 0 || global) {
      Modal.error({
        title: getText("Error message"),
        content: errDom,
        cancelText: getText("confirm"),
        width: 600
      });
    } else {
      message.info(getText("No message"));
    }
  }

  userImportTaskRetry(id) {
    const { dispatch } = this.props;
    dispatch(userImportTaskRetry(id, () => {
      this.handleSearch(0);
    }));
  }

  render() {
    const { tasks, total } = this.props.taskCenterImport;
    const { originCode } = this.state;
    const selectOption = getSelectOption(originCode, "import");
    const pagination = {
      total: total,
      onChange: page => this.handleSearch((page - 1) * 10)
    };
    return (
      <div>
        <TaskHeader
          taskCenterData={this.props.taskCenterImport}
          selectOption={selectOption}
          alterSearchInfo={this.alterSearchInfo.bind(this)}
          handleSearch={() => this.handleSearch(0)}
        />
        <section className="taskSection">
          <Table
            locale={getLocale(originCode)}
            pagination={pagination}
            columns={getColumns(originCode, "import", this)}
            dataSource={getDataSource(tasks.length === 1 && tasks[0].id === "" ? [] : tasks, originCode)} />
        </section>
      </div>
    );
  }
}

