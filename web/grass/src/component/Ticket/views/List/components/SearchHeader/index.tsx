import * as React from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import { FormItem, FormItemProps, FormItemType } from "../FormItem";
import { RangeDate } from "../RangeDate";
import { Model } from "../../model";
import { TICKET_STATUS_LIST } from "../../../../constants";
import { renderRows } from "component/Ticket/utils";

const formItemStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center"
};
const formLabelStyle: React.CSSProperties = {
	textAlign: "right",
	marginRight: 10,
	width: "30%"
};

@inject("model")
@observer
export class SearchHeader extends React.Component<{}, {}> {
	get injected() {
		return (this.props as any).model as Model;
	}

	get formItems() {
		const { condition, onConditionChange } = this.injected;
		const items: FormItemProps[] = [
			{
				itemType: FormItemType.Input,
				label: "工单编号",
				name: "ticketId"
			},
			{
				itemType: FormItemType.Input,
				label: "订单编号",
				name: "orderItemNum"
			},
			{
				itemType: FormItemType.Select,
				label: "工单状态",
				optionList: TICKET_STATUS_LIST,
				name: "status",
				allowClear: true
			},
			{
				label: "创建时间",
				itemType: FormItemType.Custom,
				child: (
					<RangeDate
						startName="createStartMoment"
						endName="createEndMoment"
						startValue={condition.createStartMoment}
						endValue={condition.createEndMoment}
						onChange={onConditionChange}
					/>
				)
			},
			{
				label: "留言更新时间",
				itemType: FormItemType.Custom,
				child: (
					<RangeDate
						startName="updateStartMoment"
						endName="updateEndMoment"
						startValue={condition.updateStartMoment}
						endValue={condition.updateEndMoment}
						onChange={onConditionChange}
					/>
				)
			},
			{
				label: "处理完成时间",
				itemType: FormItemType.Custom,
				child: (
					<RangeDate
						startName="finishStartMoment"
						endName="finishEndMoment"
						startValue={condition.finishStartMoment}
						endValue={condition.finishEndMoment}
						onChange={onConditionChange}
					/>
				)
			}
		];

		return items;
	}

	renderItem = (item: FormItemProps) => {
		const { onConditionChange, condition } = this.injected;
		return (
			<FormItem
				contentWidth={"70%"}
				labelStyle={formLabelStyle}
				style={formItemStyle}
				onChange={onConditionChange}
				value={condition[item.name!]}
				{...item}
			/>
		);
	};

	componentDidMount() {
		this.injected.search();
	}

	render() {
		const { search } = this.injected;

		return (
			<div style={{ margin: 40 }}>
				{renderRows(this.formItems, this.renderItem, "label")}
				<div style={{ marginTop: 20, textAlign: "right" }}>
					<Button type="primary" onClick={search}>
						搜索
					</Button>
				</div>
			</div>
		);
	}
}
