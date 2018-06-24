import * as React from "react";
import { observer } from "mobx-react";
import { Form, Input, DatePicker, Button, Select, Row, Col, AutoComplete, LocaleProvider } from "antd";
import zh from "antd/lib/locale-provider/zh_CN";
import { WrappedFormUtils } from "antd/lib/form/Form";
import {
	UserOrderListNewFilter,
	UserSearchProductAnalytics,
} from "../../../../../services/EzSellerService";
import OrderStore from "../../../store/order";
import {
	getOriginCode,
	getText
} from "../../../../../util/kit";
import "./index.scss";
import {
	defaultFormat,
	formItemLayout,
	orderWarehouseItems
} from "../../../common/constant";
import {
	getUnixTime
} from "../../../common/util";

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

interface FormProps {
	form: WrappedFormUtils;
}

interface OrderSearchFormProps {
	orderStore: OrderStore;
}

interface OrderSearchFormState {
	productNameItems: Array<string>;
}

@observer
class OrderSearchForm extends React.Component<OrderSearchFormProps & FormProps, OrderSearchFormState> {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	state: OrderSearchFormState = {
		productNameItems: []
	};

	// componentDidMount() {
	//     this.initFormData();
	// }
	// initFormData() {
	//     const { setFieldsValue } = this.props.form;
	//     const formData = {
	//         paymentTime: getDefaultRangePicker(),
	//     };
	//     setFieldsValue(formData);
	// }
	userSearchProductAnalytics(keyword: string) {
		const filter = {
			keyword
		};
		UserSearchProductAnalytics(filter)
			.then(result => this.setState({ productNameItems: result.items ? result.items.map(item => item.productName) : [] }));
	}
	handleSubmit() {
		const { orderStore, form } = this.props;
		const { setFilterData, filterData } = orderStore;
		form.validateFields((err, values) => {
			if (err) { }
			else {
				const currentFilter: UserOrderListNewFilter = {
					orderNum: values.orderNum,
					paymentTimeStart: values.paymentTime && values.paymentTime.length > 0 ? getUnixTime(values.paymentTime[0]) : undefined,
					paymentTimeEnd: values.paymentTime && values.paymentTime.length > 0 ? getUnixTime(values.paymentTime[1]) : undefined,
					warehouse: values.warehouse,
					productName: values.productName,
					productUrl: values.productUrl,
					sellerSkuId: values.sellerSkuId,
					deliveryTimeStart: values.deliveryTime && values.deliveryTime.length > 0 ? getUnixTime(values.deliveryTime[0]) : undefined,
					deliveryTimeEnd: values.deliveryTime && values.deliveryTime.length > 0 ? getUnixTime(values.deliveryTime[1]) : undefined,
					billDateStart: values.settlingTime && values.settlingTime.length > 0 ? getUnixTime(values.settlingTime[0]) : undefined,
					billDateEnd: values.settlingTime && values.settlingTime.length > 0 ? getUnixTime(values.settlingTime[1]) : undefined,
					trackingNum: values.trackingNum
				};
				const filter = Object.assign({}, filterData.filter, currentFilter);
				setFilterData({ filter });
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { productNameItems } = this.state;

		return (
			<LocaleProvider locale={zh}>
			<Form className="orderSearchForm">
				<Row>
					<Col span={7}>
						<FormItem {...formItemLayout} label={getText("order_number")}>
							{getFieldDecorator("orderNum")(
								<Input placeholder={getText("order_number")} />
							)}
						</FormItem>
					</Col>
					<Col span={10}>
						<FormItem {...formItemLayout} label={getText("Payment time")}>
							{getFieldDecorator("paymentTime")(
								<RangePicker showTime format={defaultFormat} />
							)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem {...formItemLayout} label={getText("Product name")}>
							{getFieldDecorator("productName")(
								<AutoComplete
									dataSource={productNameItems}
									onSearch={val => this.userSearchProductAnalytics(val)}>
									<Input placeholder={getText("Product name")} />
								</AutoComplete>
							)}
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span={7}>
						<FormItem {...formItemLayout} label={getText("Product links")}>
							{getFieldDecorator("productUrl")(
								<Input placeholder={getText("Product links")} />
							)}
						</FormItem>
					</Col>
					<Col span={10}>
						<FormItem {...formItemLayout} label={getText("Delivery time")}>
							{getFieldDecorator("deliveryTime")(
								<RangePicker showTime format={defaultFormat} />
							)}
						</FormItem>
					</Col>
					{
						getOriginCode() !== "US" ?
							<Col span={7}>
								<FormItem {...formItemLayout} label={getText("Transit")}>
									{getFieldDecorator("warehouse")(
										<Select placeholder={getText("Transfer warehouses")}>
											{
												orderWarehouseItems.map((item, index) =>
													<Option value={item.val}> {item.label} </Option>
												)
											}
										</Select>
									)}
								</FormItem>
							</Col> :
							<Col span={7}>
								<FormItem {...formItemLayout} label={getText("Waybill")}>
									{getFieldDecorator("trackingNum")(
										<Input placeholder={getText("Waybill number")} />
									)}
								</FormItem>
							</Col>
					}
				</Row>
				<Row>
					<Col span={7}>
						<FormItem {...formItemLayout} label={getText("sku_id")}>
							{getFieldDecorator("sellerSkuId")(
								<Input placeholder={getText("sku_id")} />
							)}
						</FormItem>
					</Col>
					<Col span={10}>
						<FormItem {...formItemLayout} label={getText("Order Payable Date")}>
							{getFieldDecorator("settlingTime")(
								<RangePicker showTime format={defaultFormat} />
							)}
						</FormItem>
					</Col>
					{
						getOriginCode() === "CN" &&
						<Col span={7}>
							<FormItem {...formItemLayout} label={getText("Waybill")}>
								{getFieldDecorator("trackingNum")(
									<Input placeholder={getText("Waybill number")} />
								)}
							</FormItem>
						</Col>
					}
				</Row>
				<Row>
					<Col offset={19} span={5}>
						<Button
							type="primary"
							icon="search"
							className="searchBtn"
							onClick={this.handleSubmit}>
							{getText("Search Orders")}
						</Button>
					</Col>
				</Row>
			</Form>
			</LocaleProvider>
		);
	}
}

const OrderSearchFormContainer = Form.create<OrderSearchFormProps>()(OrderSearchForm);

export default OrderSearchFormContainer;
