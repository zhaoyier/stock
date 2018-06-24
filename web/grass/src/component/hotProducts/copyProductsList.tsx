import * as React from "react";
import { Component } from "react";
import moment from "moment";

import { Table, } from "antd";
import { redirect, } from '../../util/history'
import { getDomain, } from '../../util/kit'
import accountInfo from "../../util/accountInfo";

import {
  CopyRecommendationList,
} from "../../services/ezseller/amway";
interface CopyProductsListState {
  list: Array<any>;
}
const Status = {
  "AmwayRecommendationTaskStatusProcessing": (<span style={{color: "#00ccaa"}}>正在进行</span>),
  "AmwayRecommendationTaskStatusSuccess": (<span style={{color: "green"}}>成功</span>),
  "AmwayRecommendationTaskStatusFail": (<span style={{color: "red"}}>失败</span>),
}
export default class CopyProductsList extends Component<{}, CopyProductsListState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    CopyRecommendationList({ status: 0, limit: 0, offset: 0 })
      .then(res => {
        this.setState({
          list: res.items
        })
      })
  }
  render() {
		const originCode = accountInfo.shop ? accountInfo.shop.originCode : "";
    const columns = [{
      title: '商品主图',
      dataIndex: 'image',
      render: text => (
        <img style={{ width: 100 }} src={text} />
      )
    }, {
      title: '复制时间',
      dataIndex: 'copyAt',
      render: text => (
        <span>
          {moment(Number(text) * 1000).format('YYYY-MM-DD')}
        </span>
      )
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => (
        <span>{Status[text]}</span>
      )
    }, {
      title: '商品标题',
      dataIndex: 'title',
			render: (text, record) => (
				<a target="_blank" href={`${getDomain(originCode)}/product/${record.productId}.html`}>
					{text}
				</a>
			)
    }, {
      title: '商品发布类目',
      dataIndex: 'catPath',
    }, {
      title: '操作',
      render: text => (
        <a onClick={ e => {
          redirect('/productEdit', {
            from: 'checkProduct',
            pid: text["productId"],
            categoryId: text["catId"],
          })
        }} href="javascript:void(0);">编辑</a>
      )
    }];
    const data = this.state.list;
    return (
      <div style={{ margin: "40px 15px" }}>
        <h3>商品复制</h3>
        <p> 注意：请手动刷新页面获取商品复制最新状态 </p>
        <div>
          <Table style={{ marginTop: 10 }} columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
}
