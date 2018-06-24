import * as React from "react";
import { Icon, Tooltip } from "antd";
import { showTimestamp, getText } from "../../../util/kit";
import { exportSelectOption, importSelectOption, exportTaskStatus } from "./constant";


export const getSelectOption = (originCode, whichPort) => {
  let HandleDate: any = [];
  switch (whichPort) {
    case "export":
      HandleDate = exportSelectOption;
      break;
    case "import":
      HandleDate = importSelectOption;
      break;
  }
  let result: any = [];
  HandleDate.map(c => {
    const current = c;
    current.value = getText(c.value);
    result.push(current);
  });
  return result;
};

const columns = [{
  title: "ID",
  dataIndex: "id",
  key: "id",
}, {
  title: "type",
  dataIndex: "taskType",
  key: "taskType",
  render: (text) => getTypeText(text)
}, {
  title: "time_created",
  dataIndex: "createdAt",
  key: "createdAt",
}, {
  title: "Founder",
  dataIndex: "createBy",
  key: "createBy",
}, {
  title: "status",
  dataIndex: "status",
  key: "status",
  render: (text, record) => getStatusText(record)
}, {
  title: "Action",
  dataIndex: "operation",
  key: "operation",
  render: (text, record) =>
    getOperationText(record)
}];


const importColumns = (scope) => {
  return [{
    title: "ID",
    dataIndex: "id",
    key: "id",
  }, {
    title: "type",
    dataIndex: "taskType",
    key: "taskType",
    render: (text) => getTypeText(text)
  }, {
    title: "time_created",
    dataIndex: "createdAt",
    key: "createdAt",
  }, {
    title: "Founder",
    dataIndex: "createBy",
    key: "createBy",
  }, {
    title: "status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => getStatusText(record)
  }, {
    title: "result",
    key: "result",
    render: (text, record) => {
      return (
        <a href="javascript:void(0);" onClick={() => {
          scope.checkImportResult(record);
        }}>{getText("view result")}</a>
      );
    }
  }, {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => {
      switch (record.status) {
        case 3:
        case 1:
          return (<span>--</span>);
        default:
          return (<a onClick={() => { scope.userImportTaskRetry(record.id); }} href="javascript:void(0);">{getText("re-upload")}</a>);
      }
    }
  }];
};

export const getColumns = (originCode, whichPort = "export", scope) => {
  let newColumns: any = columns;
  switch (whichPort) {
    case "import":
      newColumns = importColumns(scope);
      break;
  }
  let result: any = [];
  newColumns.map(c => {
    const current = c;
    current.title = getText(c.title);
    result.push(current);
  });
  return result;
};


const getStatusText = (record) => {
  const status = record.status;
  const currentText = getText(exportTaskStatus[status]);
  switch (status) {
    case 3:
      return <span className="taskSuccess"> {currentText} </span>;
    case 4:
      return <span className="taskFailure"> {currentText} </span>;
  }
  return <span> {currentText} </span>;
};

const getOperationText = (record) => {
  switch (record.status) {
    case 3:
      return <a href={record.fileUrl}>{getText("Download")}</a>;
    case 4:
      return <Tooltip title={record.err}><Icon type="question-circle-o" /></Tooltip>;
  }
  return null;
};

const getTypeText = (text) => {
  let value;
  exportSelectOption.forEach(s => {
    if (s.taskType === text) {
      value = s.value;
    }
  });
  return <span> {value} </span>;
};

export const getDataSource = (tasks, originCode) =>
  tasks.map((t, index) => {
    return {
      key: index,
      id: t.id,
      taskType: t.taskType,
      createdAt: showTimestamp(t.createdAt),
      createBy: t.createBy,
      status: t.status,
      operation: index,
      fileUrl: t.fileUrl,
      err: t.err || t.error,
      originCode
    };
  });

export const getLocale = originCode => {
  return {
    emptyText: getText("No data")
  };
};

