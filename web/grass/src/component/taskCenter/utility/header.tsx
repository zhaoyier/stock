import * as React from "react";
import { connect } from "react-redux";
import {
    Select,
    Input,
    Button,
    Icon
} from "antd";
import { locale } from "../../../config/locale.js";
//  import { getSelectOption } from "../utility/kit";

const Option = Select.Option;

interface HeaderState {
  isFirstReceiveProps: boolean;
  readonly originCode: string;
  readonly getText: Function;
}

@connect(state => ({
  taskCenterImport: state.order.taskCenterImport,
  accountInfo: state.common.accountInfo
}))

class Header extends React.Component<any, HeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      originCode: this.props.accountInfo.shop.originCode,
      getText: locale(this.props.accountInfo.shop.originCode),
      isFirstReceiveProps: true
    };
  }
  taskIdInput: Input | null;

  getInputSuffix() {
    const { alterSearchInfo, taskCenter } = this.props;
    const { taskId } = taskCenter;

    return (
      taskId ?
        <Icon
          type="close-circle"
          onClick={() => {
            if ( this.taskIdInput !== null ) {
              this.taskIdInput.focus();
            }
           alterSearchInfo({ taskId: "" });
          }} />
        : null
    );
  }

  render() {
    const {
      alterSearchInfo,
      taskCenterData,
      handleSearch,
      selectOption
    } = this.props;
    const { taskId, selectValue } = taskCenterData;
    const { getText } = this.state;

    return (
      <header className="taskHeader">
        <span>
          <label className="formLabel"> {getText("Export task type")}: </label>
          <Select
            value={selectValue}
            onChange={ val => alterSearchInfo({ selectValue: val })}
            style={{ width: "200px", marginRight: "20px" }}>
            {
              selectOption.map(o =>
                <Option value={`${o.taskType}`}> {o.value} </Option>
              )
            }
          </Select>
          <label className="formLabel"> {getText("Task")}ID: </label>
          <Input
            value={taskId}
            suffix={this.getInputSuffix}
            onChange={ (e: any) => alterSearchInfo({ taskId: e.target.value })}
            ref={node => this.taskIdInput = node}
            style={{ width: "250px", marginRight: "20px" }} />
        </span>
        <Button
          icon="search"
          onClick={handleSearch}
        >{getText("Query")}</Button>
      </header>
    );
  }
}
export default Header;

