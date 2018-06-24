import {
	UserTicketListFilter,
	UserTicketList,
	TicketItem,
	UserTicketReplies,
	UserTicketRepliesResp,
	UserTicketReply
} from "services/ezseller/ticket";
import { message } from "antd";
import { Message } from "./components/ChatDialog";
import * as omitEmpty from "omit-empty";
import { observable, configure, action, toJS, computed } from "mobx";
import * as moment from "moment";
import { formatUnixTime } from "util/time";
import accountInfo from "util/accountInfo";
import { checkAPIStatus } from "../../utils";

configure({ enforceActions: true });

type MomentType = moment.Moment | undefined;

interface ConditionMoment {
	createStartMoment: MomentType;
	createEndMoment: MomentType;
	updateStartMoment: MomentType;
	updateEndMoment: MomentType;
	finishStartMoment: MomentType;
	finishEndMoment: MomentType;
}

interface Condition extends UserTicketListFilter, ConditionMoment {}

type PartialCondition = Partial<Condition>;

const initCondition: PartialCondition = {
	ticketId: "",
	orderItemNum: "",
	status: "" as any,
	createStartMoment: moment().subtract(1, "month"),
	createEndMoment: moment(),
	updateStartMoment: undefined,
	updateEndMoment: undefined,
	finishStartMoment: undefined,
	finishEndMoment: undefined
};

function _convertMoment(
	condition: PartialCondition,
	oldKey: keyof ConditionMoment,
	newKey: keyof UserTicketListFilter,
	op: "startOf" | "endOf"
) {
	if (condition[oldKey]) {
		condition[newKey] = condition[oldKey]![op]("day")
			.unix()
			.toString();
		delete condition[oldKey];
	}
}

function convertMomentToString(condition: PartialCondition) {
	_convertMoment(condition, "createStartMoment", "createDateFrom", "startOf");
	_convertMoment(condition, "createEndMoment", "createDateTo", "endOf");
	_convertMoment(condition, "updateStartMoment", "updateDateFrom", "startOf");
	_convertMoment(condition, "updateEndMoment", "updateDateTo", "endOf");
	_convertMoment(condition, "finishStartMoment", "finishDateFrom", "startOf");
	_convertMoment(condition, "finishEndMoment", "finishDateTo", "endOf");
}

const pageLimit = 10;

export class Model {
	@observable condition: PartialCondition = initCondition;
	@observable ticketList: TicketItem[] = [];
	@observable replyModalVisible: boolean = false;
	@observable replyList: Message[] = [];

	private currentReplyTicketID: string = "";
	@observable private offset: number = 0;

	private get reqParams(): UserTicketListFilter {
		const condition = toJS(this.condition) as PartialCondition;
		convertMomentToString(condition);
		return omitEmpty(condition);
	}

	@computed
	get isLastPage(): boolean {
		return this.ticketList.length < pageLimit;
	}

	@computed
	get isFirstPage(): boolean {
		return this.offset === 0;
	}

	@action
	private setTicketList = (list: TicketItem[]) => {
		this.ticketList = observable(list);
	};

	@action
	private setReply = (resp: UserTicketRepliesResp) => {
		this.replyModalVisible = true;
		this.replyList = observable(
			resp.replies.map(item => ({
				name: item.username,
				time: formatUnixTime(item.createDate),
				content: item.replyContext
			}))
		);
	};

	@action
	private addReply = (content: string) => {
		this.replyList = observable([
			...this.replyList,
			{
				content,
				name: accountInfo.username,
				time: moment().format("HH:mm:SS")
			}
		]);
	};

	showReplyModal = (ticketIndex: number) => {
		this.currentReplyTicketID = this.ticketList[ticketIndex].ticketId;
		UserTicketReplies({
			ticketId: this.currentReplyTicketID
		}).then(resp => {
			checkAPIStatus(resp);
			this.setReply(resp);
		});
	};

	sendReply = (msg: string) => {
		UserTicketReply({
			ticketId: this.currentReplyTicketID,
			replyContext: msg
		})
			.then(checkAPIStatus)
			.then(resp => {
				message.success("发送成功");
				this.addReply(msg);
			});
	};

	@action
	hideReplyModal = () => {
		this.replyModalVisible = false;
	};

	@action
	onConditionChange = (condition: PartialCondition) => {
		Object.keys(condition).forEach(k => {
			this.condition[k] = condition[k];
		});
	};

	private _search = () => {
		UserTicketList({
			filter: this.reqParams,
			limit: pageLimit.toString(),
			offset: this.offset.toString()
		}).then(resp => {
			checkAPIStatus(resp);
			this.setTicketList(resp.list);
		});
	};

	@action
	nextPage = () => {
		this.offset += pageLimit;
		this._search();
	};

	@action
	prePage = () => {
		this.offset -= pageLimit;
		this._search();
	};

	@action
	search = () => {
		this.offset = 0;
		this._search();
	};
}
