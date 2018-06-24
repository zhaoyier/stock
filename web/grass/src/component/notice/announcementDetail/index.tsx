import * as React from "react";
import * as moment from "moment";
import { QText } from "qtext";
import { parse } from "querystring";
import {
	UserAnnouncementGet,
	UserAnnouncementGetResult
} from "services/EzSellerService";
import CommonWrap from "../commonWrap";
import "qtext/dist/main.css";
import "./index.scss";
import { getText } from "util/kit";

interface AnnouncementDetailProps {
}

interface AnnouncementDetailState {
	detail: UserAnnouncementGetResult;
}

class AnnouncementDetail extends React.Component<AnnouncementDetailProps, AnnouncementDetailState> {
	state: AnnouncementDetailState = {
		detail: {
			announcementId: 0,
			cataVal: "",
			title: "",
			content: "",
			publishedAt: 0
		}
	};

	componentDidMount() {
		this.getData();
	}
	getData() {
		const searchObj = parse(location.href.split("?")[1]);
		UserAnnouncementGet(Number(searchObj.announcementId))
				.then(result => this.setState({ detail: result }));
	}
	render() {
		const {
			detail
		} = this.state;
		return (
			<CommonWrap title={getText("Announcement Details")}>
				<div style={{padding: "0 50px"}} className="AnnouncementDetailWrap">
					<div className="detailTitle"> {detail.title} </div>
					<div className="detailTime"> {moment(detail.publishedAt * 1000).format("YYYY-MM-DD HH:mm:ss")} </div>
					<div className="detailContent">
					{
						detail.content !== "" ?
						<QText
							readOnly
							value={ JSON.parse(detail.content) } />
						: null
					}
					</div>
				</div>
			</CommonWrap>
		);
	}
}

export default AnnouncementDetail;