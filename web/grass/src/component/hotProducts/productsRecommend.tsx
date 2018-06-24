import * as React from "react";
import { Component } from "react";

import { message } from "antd";
import { getDomain, } from '../../util/kit'

import {
	FistClassPCatList,
	RecommendationList,
	CopyRecommendations,
} from "../../services/ezseller/amway";

import { Select, Table, Button, } from "antd";
const Option = Select.Option;

import accountInfo from "../../util/accountInfo";

interface ProductsRecommendState {
	selectedRowKeys: Array<any>;
	shopCategory: Array<any>;
	resList: Array<any>;
}
export default class ProductsRecommend extends Component<{}, ProductsRecommendState> {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			shopCategory: [],
			resList: [],
		}
		this.buttonClickCopy = this.buttonClickCopy.bind(this);
		this.loadList = this.loadList.bind(this);
	}

	componentDidMount() {
		// init select
		FistClassPCatList("")
			.then(res => {
				this.setState({
					shopCategory: res.list
				});
			})
			.catch(res => {
				message.error("服务错误，请稍后重试")
			})
		this.loadList();
	}

	loadList(id: any = 0) {
		// init table
		const request = {
			pcat: {
				PCatId: id,
				PCatName: "",
			},
			limit: 0,
			offset: 0,
		}
		RecommendationList(request)
			.then(res => {
				this.setState({
					resList: res.items
				})
			})
			.catch(res => {
				message.error("接口错误，稍后重试");
			})

	}

	buttonClickCopy() {
		const { selectedRowKeys } = this.state;
		if (selectedRowKeys.length === 0) {
			message.error("请选择商品");
			return;
		}
		const shopName = accountInfo.shop ? accountInfo.shop.shopName : "";
		CopyRecommendations({ productIds: selectedRowKeys, shopName, })
			.then(res => {
				message.success("复制成功");
				window.location.hash = "#/copyProductsList";
			})
	}

	render() {
		const { shopCategory, resList } = this.state;
		const originCode = accountInfo.shop ? accountInfo.shop.originCode : "";
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedRowKeys });
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
		};
		const columns = [{
			title: '商品主图',
			dataIndex: 'image',
			render: text => (
				<img style={{width: 100}} src={text} />
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
			title: '发布类目',
			dataIndex: 'catPath',
		}, {
			title: '售卖价(￥)',
			dataIndex: 'price',
			render: text => (
				<span>{(text / 100).toFixed(2)}</span>
			)
		}];
		const data = resList;
		return (
			<div style={{ margin: "40px 15px" }}>
				<h3>热销商品</h3>
				<div>
					<span>您店铺内的发布类目: </span>
					<Select defaultValue={"0"} style={{ width: 200 }} onChange={name => this.loadList(name)}>
						<Option key={0} value={"0"}>全部</Option>
						{shopCategory.map((item, key) => (
							<Option key={key+1} value={item.PCatId}>{item.PCatName}</Option>
						))}
					</Select>
					<Table style={{ marginTop: 10 }} rowKey={record => record["productId"]} rowSelection={rowSelection} columns={columns} dataSource={data} />
					<div>
						<Button style={{marginTop: 10}} onClick={this.buttonClickCopy} type="primary"> 一键复制 </Button>
					</div>
				</div>
			</div>
		)
	}
}