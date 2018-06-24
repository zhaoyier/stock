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
	UserAnnouncementList,
	UserAnnouncementRead,
	UserAnnouncementListFilter,
	UserAnnouncementListResult,
} from "services/EzSellerService";
import {
	updateNoticeInfo
} from "../../../action/common";
import {
	getPublishTime
} from "../util";
import CommonWrap from "../commonWrap";
import "./index.scss";
import { redirect } from "util/history";
import { getText } from "util/kit";

interface AnnouncementProps {
	dispatch: any;
}

interface AnnouncementstState {
	offset: number;
	limit: number;
	filter: UserAnnouncementListFilter;
	data: UserAnnouncementListResult;
	isLoading: boolean;
}

@connect()
class Announcement extends React.Component<AnnouncementProps, AnnouncementstState> {
	state: AnnouncementstState = {
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
		this.userAnnouncementList();
	}
	filterTitle(e) {
		const value = e.target.value;
		const filter = this.state.filter;
		filter.title = value;
		this.setState({
			filter
		});
	}
	filterDate(data, dataString) {
		const publishedAtFrom = moment(dataString[0]).unix();
		const publishedAtTo = moment(dataString[1]).unix() + 86400;
		const filter = this.state.filter;
		filter.publishedAtFrom = publishedAtFrom;
		filter.publishedAtTo = publishedAtTo;
		this.setState({
			filter
		});
	}
	updateNoticeInfo() {
		const { dispatch } = this.props;
		dispatch(updateNoticeInfo());
	}
	userAnnouncementList(offset = this.state.offset) {
		this.setState({ isLoading: true });
		const { limit, filter } = this.state;
		UserAnnouncementList(offset, limit, filter)
			.then(result => this.setState({data: result, isLoading: false, offset}));
	}
	readAll() {
		UserAnnouncementRead({allMark: true})
			.then(result => {
				this.userAnnouncementList();
				this.updateNoticeInfo();
			});
	}
	readAAnnouncement(announcementId: number) {
		UserAnnouncementRead({announcementId})
			.then(() => this.updateNoticeInfo());
		redirect(`/notice_detail?announcementId=${announcementId}`);
	}
	render() {
		const {
			data,
			isLoading,
			offset,
			limit,
		} = this.state;
		const _self = this;
		const columns = [{
			title: getText("Published Time"),
			dataIndex: "publishedAt",
			key: "publishedAt",
			width: "20%",
			render: (text, record) => (
				<div>
					{getPublishTime(record.publishedAt)}
				</div>
			)
		}, {
			title: getText("Classification"),
			dataIndex: "cataVal",
			key: "cataVal",
			width: "20%",
		}, {
			title: getText("Announcement Subject"),
			dataIndex: "title",
			key: "title",
			width: "50%",
			render(text, record) {
				return <span className="announcementTitleLink" onClick={() => _self.readAAnnouncement(record.announcementId)}> {text} </span>;
			}
		}, {
			title: getText("status"),
			dataIndex: "readStatus",
			key: "readStatus",
			width: "10%",
			render: text => <span style={{color: text ? "rgba(0,0,0,.45)" : "#1890ff"}}> {text ? getText("Read") : getText("Unread")} </span>
		}];
		const pagination = {
			total: data.total,
			current: (offset / limit) + 1,
			showQuickJumper: true,
			onChange: page => this.setState({ offset: (page - 1) * 10 }, this.userAnnouncementList)
		};
		return (
			<CommonWrap title={getText("View All Announcement")}>
				<div className="searchForm">
					<div>
						<label>
							{getText("Published Time")}:
							<DatePicker.RangePicker
								style={{margin: "0 15px"}}
								onChange={this.filterDate} />
						</label>
						<label>
							{getText("Announcement Subject")}:
							<Input
								style={{ width: 250, margin: "0 15px" }}
								onChange={this.filterTitle} />
						</label>
						<Button
							type="primary"
							style={{ margin: "0 10px" }}
							onClick={() => this.userAnnouncementList(0)}>
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
					columns={columns}/>
			</CommonWrap>
		);
	}
}

export default Announcement;