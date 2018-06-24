import * as React from "react";
import {
	Form,
	Input,
	Cascader,
	Button,
	message
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { CascaderOptionType } from "antd/lib/cascader";
import {
	CreateAddress,
	CreateAddressReq,
	AddressMsg,
	GetAdmimAreasByDepth,
	GetAdmimAreasByParentId,
	ModifyAddress
} from "services/ezseller/address";
import { phonePattern } from "util/regexp";

const styles = require("./index.scss");
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
};

interface CreateProps {
	data?: AddressMsg;

}
interface CreateState {
	options: CascaderOptionType[];
}

class Create extends React.Component<CreateProps & FormComponentProps, CreateState> {
	state: CreateState = {
		options: []
	};
	isEdit = Boolean(this.props.data);

	componentDidMount() {
		this.getAdmimAreasByDepth(this.isEdit);
	}
	getAdmimAreasByDepth(showAll: boolean) {
		GetAdmimAreasByDepth({depth: 0})
			.then(result => {
				this.setState({
					options: result.areas.map(item => ({
						value: JSON.stringify({
							id: item.id,
							name: item.name
						}),
						label: item.name
					}))
				}, () => {
					if (showAll) {
						this.showAll();
					}
				});
			});
	}
	showAll(level: number = 0, options = this.state.options) {
		const { data } = this.props;
		const areas = data!.admimAreaCode;
		const targetOptions = options.filter(item => JSON.parse(item.value).id === areas[level]);
		const targetOption = targetOptions.length > 0 ? targetOptions[0] : null;
		if (targetOption && level < areas.length - 1) {
			GetAdmimAreasByParentId({parentId: JSON.parse(targetOption.value).id})
				.then(result => {
					const childrenOptions = result.areas.map(item => ({
						value: JSON.stringify({
							id: item.id,
							name: item.name
						}),
						label: item.name
					}));
					targetOption.children = childrenOptions;
					this.showAll(++level, childrenOptions);
					if (level === areas.length - 1) {
						this.setState({
							options: [...this.state.options],
						}, this.initEditFormData);
					}
				});
		} else {
			this.initEditFormData();
		}
	}
	initEditFormData() {
		const { data } = this.props;
		const { admimArea, admimAreaCode } = data!;
		const targetData = {
			...data,
			admimArea: admimArea.map((item, index) => JSON.stringify(
				({
					id: admimAreaCode[index],
					name: item
				})
			))
		};
		this.props.form.setFieldsValue(targetData as AddressMsg);
	}
	handleSubmit() {
		const { form, data } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				const areas = values.admimArea;
				const req = {
					address: {
						contact: values.contact,
						admimArea: areas.map(item => JSON.parse(item).name),
						admimAreaCode: areas.map(item => JSON.parse(item).id),
						street: values.street,
						contactMethod: values.contactMethod,
						remark: values.remark
					}
				} as CreateAddressReq;
				if (this.isEdit) {
					req.address = { ...data, ...req.address };
				}
				const services = this.isEdit ? ModifyAddress : CreateAddress;
				services(req)
					.then(result => {
						message.info(result.result.message);
						setTimeout(() => {
							location.reload();
						}, 500);
					});
			}
		});
	}
	loadData(selectedOptions) {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		const value = JSON.parse(targetOption.value);
		GetAdmimAreasByParentId({parentId: value.id})
			.then(result => {
				targetOption.loading = false;
				targetOption.children = result.areas.map(item => ({
					value: JSON.stringify({
						id: item.id,
						name: item.name
					}),
					label: item.name
				}));
				this.setState({
					options: [...this.state.options],
				});
			});
	}
	onChange = (value, selectedOptions) => {
		this.loadData(selectedOptions);
	}
	render () {
		const {
			form
		} = this.props;
		const {
			options
		} = this.state;
		const { getFieldDecorator } = form;

		return (
			<Form className={styles.createFormWrap}>
				<FormItem label="联系人" hasFeedback {...formItemLayout}>
					{getFieldDecorator("contact", {
						rules: [
							{
								required: true,
								message: "请输入联系人"
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem label="所在地区" hasFeedback {...formItemLayout}>
					{getFieldDecorator("admimArea", {
						rules: [
							{
								required: true,
								message: "请输入所在地区",
							}, {
								validator: (rule, value, cb) => {
									value.length === 3 ? cb() : cb("请输入所在地区");
								}
							}
						]
					})(<Cascader
							options={options}
							loadData={this.loadData.bind(this)}
							onChange={this.onChange.bind(this)}
							changeOnSelect
							allowClear={false} />)}
				</FormItem>
				<FormItem label="街道地区" hasFeedback {...formItemLayout}>
					{getFieldDecorator("street", {
						rules: [
							{
								required: true,
								message: "请输入街道地区"
							}, {
								min: 5
							}, {
								max: 100
							}
						]
					})(<Input.TextArea rows={3} placeholder="至少5个字，最多不超过100个字"/>)}
				</FormItem>
				<FormItem label="联系方式" hasFeedback {...formItemLayout}>
					{getFieldDecorator("contactMethod", {
						rules: [
							{
								required: true,
								message: "请输入联系方式"
							}, {
								pattern: phonePattern,
								message: "请输入合法的手机号码"
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem label="备注" hasFeedback {...formItemLayout}>
					{getFieldDecorator("remark", {
						rules: [
							{
								max: 100
							}
						]
					})(<Input.TextArea rows={3} />)}
				</FormItem>
				<div style={{textAlign: "center"}}>
					<Button
						type="primary"
						onClick={this.handleSubmit.bind(this)}>
						{ this.isEdit ? "保存地址" : "添加地址" }
					</Button>
				</div>
			</Form>
		);
	}
}

export default Form.create<CreateProps>()(Create);
