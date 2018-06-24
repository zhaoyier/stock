import * as React from "react";
import { connect } from "react-redux";
import { warn, success } from "../../util/antd";
import { getDomain } from "../../util/kit";
import {
	SH_ADDRESS_INFO,
	GZ_ADDRESS_INFO,
	US_ADDRESS_INFO,
	SH_ADDRESS_INFO_EXPRESS,
	GZ_ADDRESS_INFO_EXPRESS
} from "../../constant";
import { QINIU_UPLOAD_URL } from "../../constant/index";
import { locale } from "../../config/locale";
import { getToken } from "../../api/other";
import {
	Table,
	Tabs,
	Button,
	Modal,
	Input,
	Form,
	Col,
	Row,
	Upload,
	Icon,
	AutoComplete,
	Badge
} from "antd";
import { Link } from "react-router";
import "./checkToDeliveryOrder.scss";
import { toTimestamp, showTimestamp } from "../../util/kit";
import { redirect } from "../../util/history";
import IssueOrder from "./_widget/issueOrder";
import {
	userOrderItemList,
	userOrderItemReturnConfirm,
	userOrderRemarkAdd,
	userOrderItemRemarkAdd,
	getOrderItemGroup,
	userOrderDispatch,
	userOrderItemGroupExportTask,
	userOrderDispatchImport,
	toDeliveryFilter as actionToDeliveryFilter,
	userGetProductSimpleinfo,
	getEzsellerNewMessage,
	userOrderDispatchImportTask
} from "../../action/order";
import { changeMenu } from "../../action/common";
import ExpressSelect from "./_widget/expressSelect";
const AutoOption = AutoComplete.Option;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

@connect(state => ({
	accountInfo: state.common.accountInfo,
	orderDispatchImportResult: state.order.orderDispatchImportResult,
	orderItemList: state.order.orderItemList,
	orderItemGroups: state.order.orderItemGroups,
	toDeliveryFilter: state.order.toDeliveryFilter
}))
class CheckToDeliveryOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			activeKey: "1",
			provider: "",
			trackingNum: "",
			orderItemIds: [],
			selectedRowKeys: [],
			title: "",
			orderNum: -1,
			remark: "",
			baseUrl: "",
			token: "",
			fileList: [],
			autoComplete: [],
			timeout: true,
			messageBack: [],
			current: this.props.toDeliveryFilter.current,
			loading: false
		};
		this.searchProductName = this.searchProductName.bind(this);
		this.selectSearchProductName = this.selectSearchProductName.bind(this);
		this.searchProductLink = this.searchProductLink.bind(this);
	}

	componentWillMount() {
		const { orderItemList, dispatch, accountInfo } = this.props;
		// US tempature is CN
		if (accountInfo.shop.originCode == "US") {
			this.__ = locale("CN");
		} else {
			this.__ = locale(accountInfo.shop.originCode);
		}
		let warehouse = 2;
		if (accountInfo.shop.originCode === "US") {
			warehouse = 3;
		}
		dispatch(
			getOrderItemGroup(
				0,
				10,
				{
					warehouse: warehouse,
					status: 1
				},
				res => {
					this.getMessage(res);
				}
			)
		);
		dispatch(
			changeMenu({
				main: 0,
				sub: "20"
			})
		);
		getToken(info => {
			this.setState({
				baseUrl: info.baseUrl,
				token: info.token
			});
		});
	}

	componentDidMount() {
		// let time = 60
		// setInterval(()=> {
		const { orderItemGroups } = this.props;
		if (orderItemGroups.data.length > 0) {
			this.getMessage();
		}
		// }, time * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	getMessage(res) {
		let { dispatch, orderItemGroups } = this.props;
		const filter = {
			orderNums: [],
			sender: 2,
			// sender: 1,
			msgType: 1
		};
		if (res) {
			orderItemGroups = res;
		}
		filter.orderNums = orderItemGroups.data.map(item => {
			return item.orderNum;
		});
		dispatch(
			getEzsellerNewMessage(filter, msg => {
				this.setState(
					{
						messageBack: Object.keys(msg.result)
					},
					this.forceUpdate()
				);
			})
		);
	}

	reloadOrders(filter, resetPage) {
		const { pageSize, dataFilter } = filter;
		const { dispatch } = this.props;
		const { current } = this.state;
		let offset = resetPage === undefined ? (current - 1) * pageSize : 0;
		let limit = resetPage === undefined ? pageSize : 10;
		if (resetPage !== undefined) {
			this.setState({
				current: 1
			});
		}
		this.setState({
			loading: true
		});
		dispatch(actionToDeliveryFilter(filter));
		dispatch(
			getOrderItemGroup(offset, limit, dataFilter, res => {
				this.getMessage(res);
				this.setState({
					loading: false
				});
			})
		);
	}

	searchProductName(e) {
		const { dispatch } = this.props;
		setTimeout(() => {
			this.setState({
				timeout: true
			});
		}, 200);
		if (this.state.timeout) {
			if (!e) {
				let filter = this.props.toDeliveryFilter;
				filter.dataFilter.productId = null;
				dispatch(actionToDeliveryFilter(filter));
			}
			dispatch(
				userGetProductSimpleinfo(e, msg => {
					this.setState({
						autoComplete: msg
					});
					let filter = this.props.toDeliveryFilter;
					filter.dataFilter.productId = parseInt(msg[0].productId);
					dispatch(actionToDeliveryFilter(filter));
				})
			);
		}
		this.setState({
			timeout: false
		});
	}

	selectSearchProductName(e) {
		const { dispatch } = this.props;
		let filter = this.props.toDeliveryFilter;
		filter.dataFilter.productId = parseInt(e);
		dispatch(actionToDeliveryFilter(filter));
	}

	searchProductLink(e) {
		const { dispatch } = this.props;
		let filter = this.props.toDeliveryFilter;
		filter.dataFilter.productUrl = e.target.value;
		dispatch(actionToDeliveryFilter(filter));
	}

	render() {
		const getText = this.__;
		const {
			activeKey,
			provider,
			trackingNum,
			orderItemIds,
			selectedRowKeys,
			visible,
			title,
			orderNum,
			remark,
			orderDispatchImportResult,
			baseUrl,
			token,
			fileList
		} = this.state;
		const { dispatch, orderItemList, accountInfo, orderItemGroups, toDeliveryFilter } = this.props;
		const isCN = accountInfo.shop.originCode === "CN";
		const filter = toDeliveryFilter;
		const { pageSize } = filter;
		const { current } = this.state;
		const { data, total } = orderItemGroups;
		let addressInfo = {};
		let addressInfoExpress = {};
		const isUS = accountInfo.shop.originCode == "US";
		if (isUS) {
			addressInfo = US_ADDRESS_INFO;
			addressInfoExpress = US_ADDRESS_INFO;
			filter.dataFilter.warehouse = 3;
		} else {
			addressInfo = activeKey == "1" ? GZ_ADDRESS_INFO : SH_ADDRESS_INFO;
			addressInfoExpress = activeKey == "1" ? GZ_ADDRESS_INFO_EXPRESS : SH_ADDRESS_INFO_EXPRESS;
		}
		const orderItemIdsSpans = orderItemIds.map(item => <span>{item}</span>);
		const props = {
			name: "file",
			action: QINIU_UPLOAD_URL,
			data: { token: token },
			accept: ".xlsx",
			listType: "text",
			onChange: info => {
				let fileList = info.fileList;

				// 1. 上传列表数量的限制
				//    只显示最近上传的一个，旧的会被新的顶掉
				fileList = fileList.slice(-1);
				this.setState({ fileList });
				if (info.file.status === "done") {
					dispatch(userOrderDispatchImportTask(info.file.response.key));
					// dispatch(
					//   userOrderDispatchImport(info.file.response.key, result => {
					//     if (result.length > 0) {
					//       const res = result.map((item, index) => {
					//         let error = ''
					//         switch (item.error) {
					//           case 1:
					//             error = '请保证上传表格的列数和原下载表格一致并填写订单号'
					//             break
					//           case 2:
					//             error = '订单非待发货状态'
					//             break
					//           case 3:
					//             error = '行内无物流商信息，请修改后重新提交'
					//             break
					//           case 4:
					//             error = '行内无运单号，请修改后重新提交'
					//             break
					//           case 5:
					//             error = '每个订单只能对应一个运单号，请修改后重新提交'
					//             break
					//           case 6:
					//             error = '指定订单不存在'
					//             break
					//           default:
					//             break
					//         }
					//         return (
					//           <p style={{ marginBottom: 10 }} key={index}>
					//             <label style={{ color: 'black' }}>订单号：</label>
					//             {item.orderNum}
					//             <br />
					//             <label style={{ color: 'black' }}>行号：</label>
					//             {item.rowNum}
					//             <br />
					//             <label style={{ color: 'black' }}>错误信息：</label>
					//             {error}
					//           </p>
					//         )
					//       })
					//       Modal.error({
					//         title: '错误信息',
					//         content: res,
					//         cancelText: '确定'
					//       })
					//     } else {
					//       success('提交发货成功！')
					//     }
					//     this.reloadOrders(filter)
					//   })
					// )
				} else if (info.file.status === "error") {
					warn(`${info.file.name} 上传失败。`);
				}
			}
		};
		const columns = [
			{
				title: (
					<Row>
						<Col span="15">产品</Col>
						<Col span="3">单价(¥)</Col>
						<Col span="3">数量</Col>
						<Col span="3">交易状态</Col>
					</Row>
				),
				key: "items",
				render: (items, record) => {
					const url = record.productUrl || "id=00000";
					let columnsToItem = [
						{
							title: "产品",
							key: "productName",
							dataIndex: "productName",
							width: 300,
							render: (item, record) => {
								const pattern = /id=(\d*)/i;
								return (
									<p style={{ width: 300, wordBreak: "break-all" }}>
										<span style={{ color: "black" }}>
											<a
												target="_blank"
												href={
													getDomain(accountInfo.shop.originCode) +
													"/product/" +
													pattern.exec(url)[1] +
													".html"
												}
											>
												{item}
											</a>
										</span>
										<br />
										<span style={{ color: "grey" }}>
											{record.skuName}
											{record.sellerSkuId ? `(${record.sellerSkuId})` : ""}
										</span>
									</p>
								);
							}
						},
						{
							title: "单价",
							key: "unitPrice",
							dataIndex: "unitPrice",
							width: "13%"
						},
						{
							title: "数量",
							key: "quantity",
							dataIndex: "quantity",
							width: "13%"
						},
						{
							title: "状态",
							key: "status",
							dataIndex: "status",
							render: text => {
								switch (text) {
									case 1:
										return <span>待发货</span>;
									case 2:
										return <span>已发货</span>;
									case 3:
										return <span>已取消</span>;
									case 4:
										return <span>已发起退货</span>;
									case 5:
										return <span>已确认退货</span>;
									case 6:
										return <span>已完成</span>;
									case 7:
										return <span>未付款</span>;
									default:
										break;
								}
							}
						}
					];
					let orderNum = record.orderNum;
					let sellType = record.sellType;
					return (
						<section>
							<p>
								<span
									style={{
										fontWeight: "bold",
										color: "#39a30e",
										marginRight: 10
									}}
								>
									订单编号：{orderNum}
								</span>
								{sellType == 2 && <i className="coSaleIcon">G</i>}
								<span>{showTimestamp(record.createdAt, "YYYY-MM-DD HH:mm:ss")}</span>
								{record.dispatchDelayed && (
									<span style={{ color: "red", marginLeft: 10 }}>发货已超时</span>
								)}
							</p>
							<Table
								bordered
								showHeader={false}
								columns={columnsToItem}
								dataSource={record.items}
								rowSelection={false}
								pagination={false}
							/>
						</section>
					);
				}
			},
			{
				title: "发货截止时间",
				key: "expectedDispatchAt",
				dataIndex: "expectedDispatchAt",
				render: text => <span>{showTimestamp(text, "YYYY-MM-DD HH:mm:ss")}</span>
			},
			{
				title: "产品列表图",
				key: "primaryImage",
				dataIndex: "primaryImage",
				render: text => (
					<a target="_blank" href={text}>
						<img src={text} style={{ width: 100 }} />
					</a>
				)
			},
			{
				title: "订单备注",
				key: "remarks",
				dataIndex: "remarks",
				render: text => {
					if (text) {
						const remarks = text.map((item, index) => {
							let type;
							switch (item.source) {
								case 1:
									type = "用户备注";
									break;
								case 2:
									type = "订单备注";
									break;
								default:
									type = "类型未知";
							}
							return (
								<p style={{ marginBottom: 10 }} key={index}>
									<span style={{ fontWeight: "bold" }}>类型：{type}</span>
									<br />
									内容：{item.text}
								</p>
							);
						});
						if (remarks && remarks.length > 0) {
							return (
								<a
									onClick={() => {
										Modal.info({
											title: "备注",
											content: remarks
										});
									}}
								>
									备注({remarks.length})
								</a>
							);
						}
					} else {
						return <span>接口未返回</span>;
					}
				}
			},
			{
				title: "操作",
				key: "operate",
				render: (text, record) => {
					return (
						<section>
							<a
								onClick={() => {
									let orderItemIds = record.items.map(item => item.orderItemId);
									this.setState({
										visible: true,
										orderNum: record.orderNum,
										title: "发货",
										trackingNum: ""
									});
								}}
							>
								发货
							</a>
							<br />
							<a
								onClick={() => {
									this.setState({
										visible: true,
										orderNum: record.orderNum,
										title: "备注"
									});
								}}
							>
								增加备注
							</a>
							<br />
							<Link to={`/order-detail/${record.orderNum}`}>查看详情</Link>
							<div>
								<div className={this.state.messageBack.includes(record.orderNum) ? "taged" : ""}>
									<a
										onClick={() => {
											this.setState({
												visible: true,
												title: getText("issue order"),
												currentSKUItems: record.items,
												currentOrderNum: record.orderNum
											});
										}}
									>
										{getText("issue order")}
									</a>
								</div>
							</div>
						</section>
					);
				}
			}
		];
		const rowSelection = {
			onChange: selectedRowKeys => {
				this.setState({ selectedRowKeys });
			}
		};
		const pagination = {
			total,
			showTotal: total => `共${total}个`,
			current,
			pageSize,
			showQuickJumper: true,
			showSizeChanger: true,
			onChange: current => {
				this.setState(
					{
						current: current
					},
					() => {
						this.reloadOrders(filter);
					}
				);
			},
			onShowSizeChange: (current, pageSize) => {
				this.setState(
					{
						current: current
					},
					() => {
						filter.pageSize = pageSize;
						this.reloadOrders(filter);
					}
				);
			}
		};
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 }
		};
		const formContent = () => {
			switch (title) {
				case "发货":
					return (
						<Form horizontal>
							<FormItem {...formItemLayout} label="到货仓库：">
								{addressInfo.title}
							</FormItem>
							<FormItem {...formItemLayout} label="收货地址：">
								{isUS ? (
									addressInfo.content
								) : (
									<p>
										<p>
											({getText("Express delivery")}: ){addressInfoExpress.content}
										</p>
										<p>
											({getText("Hair logistics")}: ){addressInfo.content}
										</p>
									</p>
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="收货人：">
								{isUS ? (
									addressInfo.receiver
								) : (
									<p>
										<p>
											({getText("Express delivery")}: ){addressInfoExpress.receiver}
										</p>
										<p>
											({getText("Hair logistics")}: ){addressInfo.receiver}
										</p>
									</p>
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="联系电话：">
								{isUS ? (
									addressInfo.phone
								) : (
									<p>
										<p>
											({getText("Express delivery")}: ){addressInfoExpress.phone}
										</p>
										<p>
											({getText("Hair logistics")}: ){addressInfo.phone}
										</p>
									</p>
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="物流公司：">
								<ExpressSelect
									onChange={v => {
										localStorage.express = v;
									}}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="运单号：">
								<Input
									value={trackingNum}
									style={{ width: 200 }}
									onChange={e => {
										this.setState({ trackingNum: e.target.value });
									}}
								/>
							</FormItem>
						</Form>
					);
				case "备注":
					return (
						<Form horizontal>
							<FormItem {...formItemLayout} label="订单号：">
								{orderNum}
							</FormItem>
							<FormItem {...formItemLayout} label="备注内容：">
								<Input.TextArea
									row={4}
									onChange={e => {
										this.setState({ remark: e.target.value });
									}}
								/>
							</FormItem>
						</Form>
					);
				case getText("issue order"):
					return (
						<IssueOrder
							visible={this.state.visible}
							skuItems={this.state.currentSKUItems}
							orderNum={this.state.currentOrderNum}
						/>
					);
			}
		};
		const styleLabel = {
			display: "inline-block",
			minWidth: 50,
			marginRight: 10
		};
		const autoCompleteChildren = this.state.autoComplete.map(item => {
			return <AutoOption key={item.productId}>{item.productName}</AutoOption>;
		});
		return (
			<section className="checkToDeliveryOrder">
				{accountInfo.shop.originCode == "US" ? (
					<div
						style={{
							marginBottom: 10,
							border: "1px solid #eee",
							padding: "15px 10px",
							background: "white",
							boxShadow: "rgba(0, 0, 0, 0.117647) 0px 1px 6px"
						}}
					>
						<label style={{ ...styleLabel }}>订单号：</label>
						<Input
							style={{ width: 290, marginRight: 10 }}
							onChange={e => {
								filter.orderNum = e.target.value;
								filter.dataFilter.orderNum = e.target.value;
								dispatch(actionToDeliveryFilter(filter));
							}}
						/>
						<Row style={{ marginTop: 10 }}>
							<Col span="9">
								<label style={{ ...styleLabel }}>产品名称</label>
								<AutoComplete
									placeholder="请输入产品全称或点击列表中的匹配名称进行搜索"
									filterOption={false}
									allowClear={true}
									style={{ minWidth: 290 }}
									onChange={this.searchProductName}
									onSelect={this.selectSearchProductName}
								>
									{autoCompleteChildren}
								</AutoComplete>
							</Col>
							<Col span="9">
								<label style={{ ...styleLabel }}>产品链接</label>
								<Input
									value={filter.dataFilter.productUrl}
									style={{ width: 150 }}
									onChange={this.searchProductLink}
								/>
							</Col>
						</Row>
						<hr
							style={{
								display: "block",
								marginTop: 10,
								marginBottom: 10,
								height: 1,
								background: "#eee",
								border: 0
							}}
						/>
						<Button
							onClick={() => {
								this.reloadOrders(filter);
							}}
						>
							确定
						</Button>
						<div className="excelOperate">
							<ButtonGroup>
								<Button
									type="primary"
									onClick={() => {
										dispatch(
											userOrderItemGroupExportTask(
												{
													warehouse: filter.dataFilter.warehouse,
													status: 1
												},
												isCN ? 1 : 2
											)
										);
									}}
								>
									导出待发货订单明细
								</Button>

								<Upload style={{ marginLeft: 20 }} {...props} fileList={fileList}>
									<Icon type="upload" />
									<div
										style={{
											display: "inline-block",
											marginLeft: "5px"
										}}
									>
										<Button type="primary"> 导入发货列表 </Button>
									</div>
								</Upload>
							</ButtonGroup>
						</div>
						<Table
							bordered
							columns={columns}
							dataSource={data}
							pagination={pagination}
							loading={this.state.loading}
						/>
					</div>
				) : (
					<div
						style={{
							marginBottom: 10,
							border: "1px solid #eee",
							padding: "15px 10px",
							background: "white",
							boxShadow: "rgba(0, 0, 0, 0.117647) 0px 1px 6px"
						}}
					>
						<Row>
							<Col span="12">
								<label style={{ ...styleLabel }}>订单号：</label>
								<Input
									style={{ width: 290, marginRight: 10 }}
									onChange={e => {
										filter.orderNum = e.target.value;
										filter.dataFilter.orderNum = e.target.value;
										dispatch(actionToDeliveryFilter(filter));
									}}
								/>
							</Col>
						</Row>
						<Row style={{ marginTop: 10, marginBottom: 10 }}>
							<Col md={24} lg={9} style={{ marginBottom: 10 }}>
								<label style={{ ...styleLabel }}>{getText("Product Name")}</label>
								<AutoComplete
									placeholder={getText(
										"Please enter the complete product name or choose the name in the list"
									)}
									filterOption={false}
									allowClear={true}
									style={{ minWidth: 290 }}
									onChange={this.searchProductName}
									onSelect={this.selectSearchProductName}
								>
									{autoCompleteChildren}
								</AutoComplete>
							</Col>
							<Col md={24} lg={9}>
								<label style={{ ...styleLabel }}>{getText("Product Link")}</label>
								<Input
									value={filter.dataFilter.productUrl}
									style={{ width: 150 }}
									onChange={this.searchProductLink}
								/>
							</Col>
						</Row>
						<hr
							style={{
								display: "block",
								marginTop: 10,
								marginBottom: 10,
								height: 1,
								background: "#eee",
								border: 0
							}}
						/>
						<Button
							onClick={() => {
								this.reloadOrders(filter);
							}}
						>
							确定
						</Button>
						<Tabs
							onChange={key => {
								this.setState({ activeKey: key });
								switch (key) {
									case "1":
										filter.dataFilter.warehouse = 2;
										this.reloadOrders(filter, "resetPage");
										break;
									case "2":
										filter.dataFilter.warehouse = 1;
										this.setState({ filter });
										this.reloadOrders(filter, "resetPage");
										break;
									default:
										break;
								}
							}}
						>
							<TabPane tab="东莞仓库" key="1">
								<div className="excelOperate">
									<ButtonGroup>
										<Button
											type="primary"
											onClick={() => {
												dispatch(
													userOrderItemGroupExportTask(
														{
															warehouse: filter.dataFilter.warehouse,
															status: 1
														},
														isCN ? 1 : 2
													)
												);
											}}
										>
											导出待发货订单明细
										</Button>

										<Upload style={{ marginLeft: 20 }} {...props} fileList={fileList}>
											<Icon type="upload" />
											<div
												style={{
													display: "inline-block",
													marginLeft: "5px"
												}}
											>
												<Button type="primary"> 导入发货列表 </Button>
											</div>
										</Upload>
									</ButtonGroup>
								</div>
								<Table
									bordered
									columns={columns}
									dataSource={data}
									pagination={pagination}
									loading={this.state.loading}
								/>
							</TabPane>
							<TabPane tab="嘉兴仓库" key="2">
								<div className="excelOperate">
									<ButtonGroup>
										<Button
											type="primary"
											onClick={() => {
												dispatch(
													userOrderItemGroupExportTask(
														{
															warehouse: filter.dataFilter.warehouse,
															status: 1
														},
														isCN ? 1 : 2
													)
												);
											}}
										>
											导出待发货订单明细
										</Button>

										<Upload style={{ marginLeft: 20 }} {...props} fileList={fileList}>
											<Icon type="upload" />
											<div
												style={{
													display: "inline-block",
													marginLeft: "5px"
												}}
											>
												<Button type="primary"> 导入发货列表 </Button>
											</div>
										</Upload>
									</ButtonGroup>
								</div>
								<Table
									bordered
									columns={columns}
									dataSource={data}
									pagination={pagination}
									loading={this.state.loading}
								/>
							</TabPane>
						</Tabs>
					</div>
				)}

				{/*<div style={{marginTop:15}}>
        <Button style={{marginRight:10}} onClick={()=>{
          if(selectedRowKeys.length == 0){
            return warn('请至少选择一列数据')
          }else {
            let orderItemIds = []
            for (let i = 0; i < selectedRowKeys.length; i++) {
              let num = selectedRowKeys[i]
              orderItemIds.push(orderItemList[num])
            }
            this.setState({orderItemIds,visible:true,title:'批量发货'})
          }
        }}>批量发货</Button>
        <Button onClick={()=>{
          if(selectedRowKeys.length == 0){
            return warn('请至少选择一列数据')
          }else {
            let orderItemIds = []
            for (let i = 0; i < selectedRowKeys.length; i++) {
              let num = selectedRowKeys[i]
              orderItemIds.push(orderItemList[num])
            }
            this.setState({orderItemIds,visible:true,title:'批量发货'})
          }
        }}>批量备注</Button>
      </div>*/}
				<div className="extraInfo">
					<Form horizontal>
						<FormItem
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							label={addressInfo.title + "地址："}
						>
							{isUS ? (
								addressInfo.content
							) : (
								<div>
									<p>
										({getText("Express delivery")}: ){addressInfoExpress.content}
									</p>
									<p>
										({getText("Hair logistics")}: ){addressInfo.content}
									</p>
								</div>
							)}
						</FormItem>
						<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="收货人：">
							{isUS ? (
								addressInfo.receiver
							) : (
								<div>
									<p>
										({getText("Express delivery")}: ){addressInfoExpress.receiver}
									</p>
									<p>
										({getText("Hair logistics")}: ){addressInfo.receiver}
									</p>
								</div>
							)}
						</FormItem>
						<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="联系电话：">
							{isUS ? (
								addressInfo.phone
							) : (
								<div>
									<p>
										({getText("Express delivery")}: ){addressInfoExpress.phone}
									</p>
									<p>
										({getText("Hair logistics")}: ){addressInfo.phone}
									</p>
								</div>
							)}
						</FormItem>
					</Form>
				</div>
				<Modal
					visible={visible}
					title={title}
					onOk={() => {
						switch (title) {
							case "发货":
								if (!localStorage.express) {
									warn("请输入物流公司！");
									return;
								}
								if (!trackingNum) {
									warn("请输入运单号！");
									return;
								}
								dispatch(
									userOrderDispatch(
										orderNum,
										{
											provider: localStorage.express,
											trackingNum
										},
										() => {
											this.reloadOrders(filter);
											this.setState({ visible: false });
										}
									)
								);
								break;
							case "备注":
								if (!remark) {
									return warn("请填写备注内容");
								}
								dispatch(
									userOrderRemarkAdd(orderNum, remark, () => {
										this.reloadOrders(filter);
										this.setState({
											visible: false
										});
									})
								);
								break;
							case "问题订单登记":
								this.setState({ visible: false });
								break;
						}
					}}
					onCancel={() => {
						this.setState({ visible: false });
					}}
				>
					{formContent()}
				</Modal>
			</section>
		);
	}
}
export default CheckToDeliveryOrder;
