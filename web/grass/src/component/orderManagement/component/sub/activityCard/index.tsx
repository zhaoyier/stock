import * as React from "react";
import "./index.scss";

interface ActivityCardProps {
	text: string;
}

class ActivityCard extends React.Component<ActivityCardProps, {}> {
	render() {
		const { text } = this.props;

		return (
			<span className="activityCardWrap">
				{text}
			</span>
		);
	}
}

export default ActivityCard;
