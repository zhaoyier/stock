import * as React from "react";
import * as moment from "moment";
import { message } from "antd";
import { TicketInfo } from "./components/TicketInfo";
import { TextItemProps } from "./components/TextItem";
import {
	TicketItem,
	UserTicketDetail,
	TicketSku,
	UserTicketReplies,
	UserTicketReply
} from "services/ezseller/ticket";
import { formatUnixTime } from "util/time";
import { ChatDialog, Message } from "component/Ticket/views/List/components/ChatDialog";
import accountInfo from "util/accountInfo";
import { checkAPIStatus } from "../../utils";
import { TICKET_STATUS_LIST } from "../../constants";

export function formatPrice(price: string): string {
	return (parseInt(price, 10) / 100).toFixed(2);
}

interface DetailState {
	ticket: TicketItem | null;
	sku: TicketSku | null;
	replyList: Message[];
}

interface DetailProps {
	params: { id: string };
}

export default class Detail extends React.PureComponent<DetailProps, DetailState> {
	id: string = "";
	constructor(props) {
		super(props);

		this.state = {
			ticket: null,
			sku: null,
			replyList: []
		};
	}

	get ticketItems(): TextItemProps[] {
		const { ticket } = this.state;
		if (!ticket) {
			return [];
		}

		const statusItem = TICKET_STATUS_LIST.find(item => item.value === ticket.status);

		return [
			{
				label: "工单编号",
				value: ticket.ticketId
			},
			{
				label: "订单编号",
				value: ticket.orderItemNum
			},
			{
				label: "工单状态",
				value: statusItem ? statusItem.label : ""
			},
			{
				label: "工单类型",
				value: ticket.typeName
			},
			{
				label: "发起时间",
				value: formatUnixTime(ticket.createDate)
			},
			{
				label: "留言更新时间",
				value: formatUnixTime(ticket.updateDate)
			},
			{
				label: "处理完成时间",
				value: formatUnixTime(ticket.finishDate)
			}
		];
	}

	get skuItems(): TextItemProps[] {
		const { sku } = this.state;
		if (!sku) {
			return [];
		}

		return [
			{
				label: "商品名称",
				value: sku.productName
			},
			{
				label: "SKU属性",
				value: sku.skuName
			},
			{
				label: "数量",
				value: sku.qty
			},
			{
				label: "单价",
				value: formatPrice(sku.price)
			},
			{
				label: "问题数量",
				value: sku.errQty
			}
		];
	}

	sendReply = (content: string) => {
		UserTicketReply({
			ticketId: this.id,
			replyContext: content
		})
			.then(checkAPIStatus)
			.then(() => {
				message.success("发送成功");
				this.setState({
					replyList: [
						...this.state.replyList,
						{
							content,
							name: accountInfo.username,
							time: moment().format("HH:mm:SS")
						}
					]
				});
			});
	};

	componentDidMount() {
		const { id } = this.props.params;
		if (id) {
			this.id = id;

			UserTicketDetail({
				ticketId: id
			}).then(resp => {
				checkAPIStatus(resp);
				this.setState({
					ticket: resp.ticket,
					sku: resp.sku
				});
			});

			UserTicketReplies({
				ticketId: id
			}).then(resp => {
				checkAPIStatus(resp);
				this.setState({
					replyList: resp.replies.map(item => ({
						name: item.username,
						time: formatUnixTime(item.createDate),
						content: item.replyContext
					}))
				});
			});
		}
	}

	render() {
		const { replyList } = this.state;
		return (
			<div>
				<TicketInfo title={"工单信息"} items={this.ticketItems} />
				<TicketInfo title={"SKU信息"} items={this.skuItems} />
				<div style={{ width: 800, marginBottom: 40 }}>
					<h2 style={{ margin: "20px 0", fontSize: 20 }}>回复</h2>
					<ChatDialog messageList={replyList} onSend={this.sendReply} />
				</div>
			</div>
		);
	}
}
