import * as React from "react";
import {
	Table,
	Button,
	Modal,
	Radio,
	message
} from "antd";
import ContainerWrap from "common/ContainerWrap";
import {
	GetOwnAddresses,
	AddressMsg,
	RemoveAddress,
	ModifyDefaultAddress,
	ModifyDefaultAddrReq
} from "services/ezseller/address";
import Create from "./create";

interface AddressState {
	data: AddressMsg[];
}

class Address extends React.Component<{}, AddressState> {
	state: AddressState = {
		data: []
	};

	componentDidMount() {
		this.getListData();
	}
	getListData(fourceUpdate: boolean = false) {
		GetOwnAddresses({}).then(result => {
			this.setState({
				data: result.addresses
			}, () => {
				if (fourceUpdate) {
					this.forceUpdate();
				}
			});
		});
	}
	handelCreate() {
		Modal.info({
			title: "地址库新增",
			content:
				<Create />,
			width: 800,
			okText: "退出"
		});
	}
	handelEdit(record) {
		Modal.info({
			title: "地址库编辑",
			content:
				<Create
					data={record}/>,
			width: 800,
			okText: "退出"
		});
	}
	handleDelete(id: string) {
		Modal.confirm({
			title: "确认删除?",
			onOk: () => {
				RemoveAddress({id})
					.then(result => {
						message.info(result.result.message);
						this.getListData();
					});
			}
		});
	}
	modifyDefaultAddress(id, key, val) {
		ModifyDefaultAddress({
			[key]: val,
			id
		} as ModifyDefaultAddrReq)
		.then(() => this.getListData(true));
	}
	render () {
		const {
			data
		} = this.state;
		const _self = this;
		const columns = [
			{
				title: "发货地址",
				dataIndex: "isShip",
				key: "isShip",
				width: 100,
				render(text, record) {
					return <div> <Radio
						checked={text}
						onChange={e => _self.modifyDefaultAddress(record.id, "isShip", e.target.checked)}> 默认 </Radio> </div>;
				}
			},
			{
				title: "退货地址",
				dataIndex: "isReceipt",
				key: "isReceipt",
				width: 100,
				render(text, record) {
					return <div> <Radio
						checked={text}
						onChange={e => _self.modifyDefaultAddress(record.id, "isReceipt", e.target.checked)}> 默认 </Radio> </div>;
				}
			},
			{
				title: "联系人",
				dataIndex: "contact",
				key: "contact",
				width: 100,
				render(text, record) {
					return <div style={{wordBreak: "break-all"}}> {text} </div>;
				}
			},
			{
				title: "所在地区",
				dataIndex: "admimArea",
				key: "admimArea",
				width: 100,
				render(text) {
					return <div> {text} </div>;
				}
			},
			{
				title: "街道地区",
				dataIndex: "street",
				key: "street",
				width: 100,
				render(text) {
					return <div style={{wordBreak: "break-all"}}> {text} </div>;
				}
			},
			{
				title: "联系方式",
				dataIndex: "contactMethod",
				key: "contactMethod",
				width: 100,
			},
			{
				title: "备注",
				dataIndex: "remark",
				key: "remark",
				width: 100,
				render(text) {
					return <div style={{wordBreak: "break-all"}}> {text} </div>;
				}
			},
			{
				title: "操作",
				dataIndex: "action",
				key: "action",
				width: 100,
				render: (text, record) => {
					return (
						<div>
							<a onClick={() => this.handelEdit(record)}> 编辑 </a>
							<a onClick={() => this.handleDelete(record.id)}> 删除 </a>
						</div>
					);
				}
			}];
		return (
			<ContainerWrap title="地址库管理">
				<section
					style={{margin: "26px"}}>
					<div style={{textAlign: "right", margin: "10px 0"}}>
						<Button
							type="primary"
							onClick={this.handelCreate.bind(this)}>
							新增
						</Button>
					</div>
					<Table
						columns={columns}
						dataSource={data} />
				</section>
			</ContainerWrap>
		);
	}
}

export default Address;
