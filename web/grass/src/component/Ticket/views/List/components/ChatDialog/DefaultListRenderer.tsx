import * as React from "react";
const styles = require("./index.scss");

export interface Message {
	name: string;
	time: string;
	content: string;
}

export interface ListProps {
	list: Message[];
}

export class DefaultListRenderer extends React.PureComponent<ListProps, {}> {
	messageContainer: HTMLDivElement | null;

	scrollListToBottom = () => {
		if (this.messageContainer && this.messageContainer.scrollTo) {
			this.messageContainer.scrollTo(0, this.messageContainer.scrollHeight);
		}
	};

	componentDidUpdate() {
		this.scrollListToBottom();
	}

	componentDidMount() {
		this.scrollListToBottom();
	}

	render() {
		return (
			<div className={styles.messageList} ref={div => (this.messageContainer = div)}>
				{this.props.list.map((item, index) => {
					const { name, time, content } = item;
					return (
						<div className={styles.messageItem} key={item.name + item.time + index}>
							<div className={styles.messageHeader}>
								<span className={styles.messageTime}>{time}</span>
								<span>{name}</span>
								:
							</div>
							<div
								className={styles.messageContent}
								dangerouslySetInnerHTML={{ __html: content }}
							/>
						</div>
					);
				})}
			</div>
		);
	}
}
