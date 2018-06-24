import * as React from "react";
import * as moment from "moment";
import { parse } from "querystring";
import CommonWrap from "../commonWrap";
import "./index.scss";
import { getText } from "util/kit";

class MessageDetail extends React.Component<{}, {}> {
	render() {
		const searchObj = parse(location.href.split("?")[1]);
		const {
			createdAt = 0,
			content = ""
		} = searchObj;
		return (
			<CommonWrap
				title={getText("Notification Details")}>
				<div style={{padding: "0 30px"}}>
					<div className="msgDetailTime"> {moment(Number(createdAt) * 1000).format("YYYY-MM-DD HH:mm:ss")} </div>
					<div className="msgDetailContent"> {content} </div>
				</div>
			</CommonWrap>
		);
	}
}

export default MessageDetail;