import * as React from "react";
import * as moment from "moment";
import {
	Button,
	DatePicker,
	Input,
	Table
} from "antd";
import {
	connect
} from "react-redux";
import {
	UserShopMailList,
	UserShopMailListFilter,
	UserShopMailListResult,
	UserShopMailRead
} from "services/EzSellerService";
import { redirect } from "util/history";
import CommonWrap from "../commonWrap";
import {
	updateNoticeInfo
} from "../../../action/common";
import {
	getPublishTime
} from "../util";
import "./index.scss";
import { getText, isCN } from "util/kit";

interface MessageProps {
	dispatch: any;
}

interface MessageState {
	offset: number;
	limit: number;
	filter: UserShopMailListFilter;
	data: UserShopMailListResult;
	isLoading: boolean;
}

@connect()
class Message extends React.Component<MessageProps, MessageState> {
	state: MessageState = {
		offset: 0,
		limit: 10,
		filter: {
		},
		data: {
			total: 0,
			lists: []
		},
		isLoading: true
	};
	constructor(props) {
		super(props);

		this.filterTitle = this.filterTitle.bind(this);
		this.filterDate = this.filterDate.bind(this);
	}

	componentDidMount() {
		this.userShopMailList();
	}
	filterTitle(e) {
		const value = e.target.value;
		const filter = this.state.filter;
		filter.content = value;
		this.setState({
			filter
		});
	}
	filterDate(data, dataString) {
		const createdAtFrom = moment(dataString[0]).unix();
		const createdAtTo = moment(dataString[1]).unix() + 86400;
		const filter = this.state.filter;
		filter.createdAtFrom = createdAtFrom;
		filter.createdAtTo = createdAtTo;
		this.setState({
			filter
		});
	}
	updateNoticeInfo() {
		const { dispatch } = this.props;
		dispatch(updateNoticeInfo());
	}
	userShopMailList(offset = this.state.offset) {
		this.setState({ isLoading: true });
		const { limit, filter } = this.state;
		UserShopMailList(offset, limit, filter)
			.then(result => this.setState({ data: result, isLoading: false, offset }));
	}
	readAll() {
		UserShopMailRead({allMark: true})
			.then(result => {
				this.userShopMailList();
				this.updateNoticeInfo();
			});
	}
	readMail(record) {
		UserShopMailRead({mailId: record.mailId})
			.then(() => this.updateNoticeInfo());
		redirect(`/message_detail?createdAt=${record.createdAt}&content=${isCN ? record.content : record.enContent}`);
	}
	render() {
		const {
			data,
			offset,
			limit,
			isLoading
		} = this.state;
		const _self = this;

		const columns = [{
			title: getText("Published Time"),
			dataIndex: "createdAt",
			key: "createdAt",
			width: "20%",
			render: (text, record) => (
				<div>
					{getPublishTime(record.createdAt)}
				</div>
			)
		}, {
			title: getText("Notification Details"),
			dataIndex: "content",
			key: "content",
			width: "70%",
			render(text, record) {
				return <span className="announcementTitleLink" onClick={() => _self.readMail(record)}> { isCN ? text : record.enContent} </span>;
			}
		}, {
			title: getText("status"),
			dataIndex: "readStatus",
			key: "readStatus",
			width: "10%",
			render: text => <a style={{color: text ? "rgba(0,0,0,.45)" : "#1890ff"}}> {text ? getText("Read") : getText("Unread")} </a>
		}];
		const pagination = {
			total: data.total,
			current: (offset / limit) + 1,
			showQuickJumper: true,
			onChange: page => this.setState({ offset: (page - 1) * 10 }, this.userShopMailList)
		};
		return (
			<CommonWrap title={getText("View All Notification")}>
				<div className="searchForm">
					<div>
						<label>
							{getText("Published Time")}:
							<DatePicker.RangePicker
								style={{margin: "0 15px"}}
								onChange={this.filterDate} />
						</label>
						<label>
							{getText("Notification Details")}:
							<Input
								style={{ width: 250, margin: "0 15px" }}
								onChange={this.filterTitle} />
						</label>
						<Button
							type="primary"
							style={{ margin: "0 10px" }}
							onClick={() => this.userShopMailList(0)}>
							{getText("search")}
						</Button>
					</div>
					<Button
						onClick={() => this.readAll()}>
						{getText("Mark All As Read")}
					</Button>
				</div>
				<Table
					loading={isLoading}
					pagination={pagination}
					dataSource={data.lists}
					columns={columns} />
			</CommonWrap>
		);
	}
}

export default Message;