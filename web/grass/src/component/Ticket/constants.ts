import { TicketStatus } from "services/ezseller/ticket";

export interface OptionProps {
	label: string;
	value: any;
}

export const TICKET_STATUS_LIST: OptionProps[] = [
	{
		label: "未分配",
		value: TicketStatus.TicketStatusPending
	},
	{
		label: "待回复",
		value: TicketStatus.TicketStatusWaitFor
	},
	{
		label: "已回复",
		value: TicketStatus.TicketStatusReplied
	},
	{
		label: "处理完成",
		value: TicketStatus.TicketStatusFinished
	}
];
