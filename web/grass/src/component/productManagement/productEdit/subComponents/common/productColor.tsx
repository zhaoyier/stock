import React from "react";
import { observer, inject } from "mobx-react";
import {
	Checkbox,
	Divider,
	Input,
	Button,
	Select,
	Row,
	Col,
	Upload,
	Modal,
	Tabs,
	Tooltip,
	Icon
} from "antd";
import { getToken } from "../../../../../api/other";
import { QINIU_UPLOAD_URL } from "../../../../../constant/index";
import { colors } from "../../../constant";
import ColorTabPane from "./colorTabPane";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const styles = require("../../index.scss");

interface ProductColorProps {
	index: number;
	data: any;
}
interface ProductColorState {
	previewVisible: boolean;
	colorSkus: Array<any>;
	baseUrl: string;
	token: string;
	selectContent: string;
	tabPosition: string;
	disable: string;
	colorIndex: number;
}

const mainColor = (text, color) => (
	<div>
		<span className={styles.circle} style={{background: `${color}`}}></span>
		<span style={{position: "relative",  left: "5px" }}>{text}</span>
	</div>
);

@inject("store")
@observer
class ProductColor extends React.Component<ProductColorProps, ProductColorState> {
	constructor(props) {
		super(props);
		this.state = {
			colorSkus: [],
			baseUrl: "",
			token: "",
			previewVisible: false,
			selectContent: "",
			tabPosition: "left",
			disable: "none",
			colorIndex: -1,
		};
		this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
		this.onChangeSelect = this.onChangeSelect.bind(this);
		this.handleCustomInput = this.handleCustomInput.bind(this);
		this.handleBlurColor = this.handleBlurColor.bind(this);
		this.handleSelectColor = this.handleSelectColor.bind(this);
		this.handleCloseColor = this.handleCloseColor.bind(this);
	}

	componentDidMount() {
		let { colorSkus } = this.state;
		for (let i = 1; i < 3; i++) {
			colorSkus.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}
		getToken(info => {
			this.setState({
				baseUrl: info.baseUrl,
				token: info.token
			});
		});
		this.setState({
			colorSkus
		});
	}

	getMaxValueId() {
		const { data } = this.props;
		return (data.values || []).reduce((max, cur) => {
			return max.valueId > cur.valueId ? max.valueId : cur.valueId;
		}, 0);
	}

	checkShowImage(id) {
		const { skuColors } = this.props["store"];
		const res = (skuColors || []).find(item => id === item.valueId);
		return res && res.image ? true : false;
	}

	handlePreview() {
		this.setState({
			previewVisible: true
		});
	}

	onClosePreview() {
		this.setState({
			previewVisible: false
		});
	}

	onDeleteImage = (index) => {
		console.log("===>>>onDeleteImage:", index);
		const { data } = this.props;
		const { setSkuProps } = this.props["store"];
		let item = data.values[index];
		item.image = "";
		setSkuProps(this.props.index, index, item, "edit");
	}

	onUploadImage = (info, pos) => {
		console.log("===>>>onUploadImage:", info, pos);
		let { baseUrl } = this.state;
		// let { skuColors, setSkuColors } = this.props["store"];
		if (info.file.status !== "done") {
			return;
		}

		const { data, index } = this.props;
		const { setSkuProps } = this.props["store"];
		if (pos < data.values.length) {
			let item = data.values[index];
			item.image = baseUrl + info.file.response.key;
			setSkuProps(index, pos, item, "edit");
		} else {
			let item = {
				valueId: this.getMaxValueId(),
				valueName: "",
				image: baseUrl + info.file.response.key
			};
			setSkuProps(index, pos, item, "add");
		}
	}

	onChangeSelect(pos, text, item, tag) {
		console.log("====>>select:", pos, text, item, tag, tag === undefined);
		if (text === "" || text.trim() === "") return;
		// this.setState({ selectContent: text });
		const { index } = this.props;
		const { setSkuProps } = this.props["store"];
		if (tag === "add") {
			setSkuProps(index, pos, { valueId: this.getMaxValueId(), valueName: text, image: "" }, "add");
		} else {
			item.valueName = text;
			setSkuProps(index, pos, item, "edit");
		}
	}

	onChangeCheckbox(state, record, pos) {
		console.log("=====>>check 001:", state, pos, record);
		const { data, index } = this.props;
		const { setSkuProps } = this.props["store"];
		if (!data.values[pos] || state === true) {
			return;
		}

		Modal.confirm({
			title: "警告",
			content: "是否要删除",
			onOk() {
				setSkuProps(index, pos, record, "del");
			},
			onCancel() {}
		});
	}

	handleCustomInput(index) {
		this.setState({
			disable: "block",
			colorIndex: index,
		}, () => {
			console.log("====>>002:", this.state.disable);
		});
	}

	handleChangeInput = (value, pos) => {
		console.log("=====>handleChangeInput:", value, pos);
		const { index, data } = this.props;
		const { setSkuProps } = this.props["store"];
		if (pos < data.values.length) {
			let item = data.values[pos];
			item.valueName = value;
			setSkuProps(index, pos, item, "edit");
		} else {
			let item = {
				valueId: this.getMaxValueId(),
				valueName: value
			};
			setSkuProps(index, pos, item, "add");
		}
	}

	handleBlurColor() {
		this.setState({
			disable: "block",
		}, () => {
			console.log("====>>002:", this.state.disable);
		});
	}

	handleSelectColor(obj) {
		console.log("=====>>>color:", obj, this.state.colorIndex);
		const { data } = this.props;
		const { colorIndex } = this.state;
		const { setSkuProps } = this.props["store"];

		if (colorIndex < data.values.length) {
			let item = data.values[this.state.colorIndex];
			item.valueName = obj.label;
			setSkuProps(this.props.index, this.state.colorIndex, item, "edit");
		} else {
			let item = {
				valueId: this.getMaxValueId(),
				valueName: obj.label,
			};
			setSkuProps(this.props.index, this.state.colorIndex, item, "add");
		}
	}

	handleCloseColor() {
		this.setState({
			colorIndex: -1
		});
	}

	render() {
		const { data } = this.props;
		const { token, previewVisible, disable, colorIndex } = this.state;
		const rowColor = (item, ri, tag) => {
			// console.log("====>>row:", toJS(item), toJS(ri), toJS(tag));
			return (
				<Row key={ri} style={{marginBottom: 16}}>
					<Col span={1} push={1}>
						<Checkbox
							checked={item.valueId >= 0}
							onChange={e => this.onChangeCheckbox(e.target.checked, item, ri)}
						/>
					</Col>

					<Col span={8} push={1}>
						<Input
							placeholder="自定义颜色"
							value={item.valueName}
							onClick={e => this.handleCustomInput(ri)}
							onChange={e => this.handleChangeInput(e.target.value, ri)}
							onBlur = {this.handleBlurColor}
							/>
							{colorIndex === ri &&
							<Tabs
								tabPosition="left"
								style={{display: disable, height: 200, width: 500, backgroundColor: "#FFFF9"}}
							>
								{
									colors.map((item, index) => (
										<TabPane
										key={index}
										tab={mainColor(item.label, item.color)}
										>
											<ColorTabPane subs={item.children} onChange={this.handleSelectColor} onClose={this.handleCloseColor}/>
										</TabPane>
									))
								}
							</Tabs>}
					</Col>

					{item.image && (
						<Col span={2} push={2}>
							<img
								src={item.image}
								alt="avatar"
								style={{ width: "32px", height: "32", cursor: "pointer" }}
								onClick={this.handlePreview.bind(this)}
							/>
							<Modal
								visible={previewVisible}
								footer={null}
								onCancel={this.onClosePreview.bind(this)}
							>
								<img alt="example" style={{ width: "100%" }} src={item.image} />
							</Modal>
						</Col>
					)}
					{item.image && (
						<Col span={2} push={2}>
							<Button onClick={e => this.onDeleteImage(ri)}>删除</Button>
						</Col>
					)}
					{!item.image && (
						<Col span={5} push={4}>
							<Upload
								name="file"
								action={QINIU_UPLOAD_URL}
								data={{ token }}
								accept=".jpg,.jpeg,.png,.gif"
								listType="picture"
								showUploadList={false}
								onChange={e => this.onUploadImage(e, ri)}
							>
								<Button icon="upload" disabled={false}>
									上传文件
								</Button>
								<Tooltip title="选择标准颜色样式" >
									<Icon type="question-circle" style={{marginLeft: 8, color: "#FAAD14"}}/>
								</Tooltip>
							</Upload>
						</Col>
					)}
				</Row>
			);
		};
		return (
			<div className={styles.item__attr}>
				<div className={styles.title}>{data.propName}</div>
				<div style={{ marginTop: 15 }}>
					{(data.values || []).map(rowColor)}
					{rowColor({}, (data.values || []).length, "add")}
				</div>
				<Divider />
			</div>
		);
	}
}

export default ProductColor;
