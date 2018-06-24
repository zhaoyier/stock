import React from "react";
import { observer, inject } from "mobx-react";
import { Table, Input, Icon, Divider, Button, message } from "antd";

import { toJS } from "mobx";
// import "./style.scss";
const styles = require("../../index.scss");

import { EditableCellInput, EditableCellSwitch } from "./common";

interface TableSkuProps {
	skus: any;
}

@inject("store")
@observer
class TableSku extends React.Component<TableSkuProps, {}> {
	constructor(props) {
		super(props);
		this.cellInputChange = this.cellInputChange.bind(this);
	}

	componentDidMount() {}
	getContinuousNumber(key, value, index) {
		// console.log("====>>continue:", key, value, index);
		let pre = -1,
			total = 0;
		const skus = toJS(this.props.skus);
		if (skus[index][key] !== value) return 0;
		// console.log("====>>continue 002:", key, value, index, skus[index][key] !== value);

		for (let i in skus) {
			// 判断索引是否第一个
			// console.log("====>>continue 003:", key, value, index);
			if (skus[i][key] === value && index - 1 === Number(i)) {
				return 0;
			}
		}

		for (let i in skus) {
			// console.log("====>>continue 004:", i, key, value, index);
			if (i < index) continue;
			if (skus[i][key] === value && (pre === -1 || Number(i) - pre === 1)) {
				total += 1;
				pre = Number(i);
				continue;
			}
			break;
		}

		return total;
	}

	onChangeInput(e) {
		console.log("===>>change input:", e);
	}

	cellInputChange = (index, value, key) => {
		console.log("=====>>cell:", index, value, key);
		const { setSkuRulesProps } = this.props["store"];
		setSkuRulesProps(key, value, index);
	};

	render() {
		const { skus } = this.props;
		const { skuProps } = this.props["store"];
		// 可变Sku组合
		const rules = (skuProps || []).map((item, i1) => {
			console.log("====>>rule:", item, i1);
			return {
				title: item.propName,
				dataIndex: item.propName,
				render: (value, row, index) => {
					const obj = {
						children: row[item.propName],
						props: { rowSpan: 1 }
					};

					const num = this.getContinuousNumber(item.propName, row[item.propName], index) || 0;
					// console.log("====>>>num:", item.propName, row[item.propName], num);
					obj.props.rowSpan = num;
					return obj;
				}
			};
		});
		console.log("====>>rule:", rules);
		const columns = rules.concat([
			{
				title: "原价",
				dataIndex: "originalPrice",
				render: (value, row, index) => (
					<EditableCellInput
						value={value}
						onChange={text => this.cellInputChange(index, text, "originalPrice")}
					/>
				)
			},
			{
				title: "*售价",
				dataIndex: "price",
				render: (value, row, index) => (
					<EditableCellInput
						value={value}
						onChange={text => this.cellInputChange(index, text, "price")}
					/>
				)
			},
			{
				title: "*库存",
				dataIndex: "quantity",
				render: (value, row, index) => (
					<EditableCellInput
						value={value}
						onChange={text => this.cellInputChange(index, text, "quantity")}
					/>
				)
			},
			{
				title: "*重量(kg)",
				dataIndex: "weight",
				width: "8%",
				render: (value, row, index) => (
					<EditableCellInput
						value={value}
						onChange={text => this.cellInputChange(index, text, "weight")}
					/>
				)
			},
			{
				title: "长(cm)",
				dataIndex: "length",
				render: (value, row, index) => (
					<EditableCellInput
						value={row["volume"]["length"]}
						onChange={text => this.cellInputChange(index, text, "volume.length")}
					/>
				)
			},
			{
				title: "宽(cm)",
				dataIndex: "width",
				render: (value, row, index) => (
					<EditableCellInput
						value={row["volume"]["width"]}
						onChange={text => this.cellInputChange(index, text, "volume.width")}
					/>
				)
			},
			{
				title: "高(cm)",
				dataIndex: "height",
				render: (value, row, index) => (
					<EditableCellInput
						value={row["volume"]["height"]}
						onChange={text => this.cellInputChange(index, text, "volume.height")}
					/>
				)
			},
			{
				title: "商家编码",
				dataIndex: "sellerSkuId"
			},
			{
				title: "是否售卖",
				dataIndex: "isOnSale",
				render: (value, row, index) => (
					<EditableCellSwitch
						isOnSale={value}
						onChange={text => this.cellInputChange(index, text, "")}
					/>
				)
			}
		]);

		console.log("=====>>>table:", toJS(skus));
		return (
			<div style={{ background: "#FFFFFF" }}>
				<Table
					bordered
					rowKey="skuId"
					className={styles.sku_table}
					pagination={false}
					columns={columns}
					dataSource={toJS(skus)}
				/>
			</div>
		);
	}
}

export default TableSku;
