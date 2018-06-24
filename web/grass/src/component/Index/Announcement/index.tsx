import * as React from "react";
import * as moment from "moment";
import {
	Button
} from "antd";
import {
	connect
} from "react-redux";
import { QText } from "qtext";
import {
	UserAnnouncementList,
	UserAnnouncementGetResult,
	UserAnnouncementGet,
	UserAnnouncementRead
} from "services/EzSellerService";
import {
	updateNoticeInfo
} from "../../../action/common";
import Popup from "../../popup";
import "./index.scss";
import { getText } from "util/kit";

interface AnnouncementProps {
	dispatch?: any;
}

interface AnnouncementState {
	announcement: UserAnnouncementGetResult | null;
}

@connect()
class Announcement extends React.Component<AnnouncementProps, AnnouncementState> {
	state: AnnouncementState = {
		announcement: null,
	};
	componentWillMount() {
		this.getAnnouncement();
	}
	async getAnnouncement() {
		const announcementId = await UserAnnouncementList(0, 1, {})
			.then(result => {
				if (result.lists && result.lists.length > 0 && !result.lists[0].readStatus) {
					return result.lists[0].announcementId;
				}
			});
		if (announcementId)
			UserAnnouncementGet(announcementId)
				.then(data => this.setState({ announcement: data }));
	}
	updateNoticeInfo() {
		const { dispatch } = this.props;
		dispatch(updateNoticeInfo());
	}
	handleRead() {
		const {
			announcement,
		} = this.state;
		UserAnnouncementRead({announcementId: announcement ? announcement.announcementId : 0})
			.then(() => this.updateNoticeInfo());
		this.setState({ announcement: null });
	}
	render() {
		const {
			announcement,
		} = this.state;

		return (
			<Popup
				visible={Boolean(announcement)}
				style={{width: 980, height: 632, borderRadius: "8px", backgroundColor: "#f8f8f8", marginTop: "30px"}}>
				<div className="AnnouncementPopupWrap">
					<section>
					<div className="detailTitle"> {announcement ? announcement.title : ""} </div>
					<div className="detailTime"> {moment(announcement ? announcement.publishedAt * 1000 : 0).format("YYYY-MM-DD hh:mm:ss")} </div>
					{
						announcement ?
						<QText
							readOnly
							value={ JSON.parse(announcement.content) } />
						:
						null
					}
					</section>
					<footer>
						<Button
							type="primary"
							onClick={() => this.handleRead()}>
							{getText("OK")}
						</Button>
					</footer>
				</div>
			</Popup>
		);
	}
}

export default Announcement;