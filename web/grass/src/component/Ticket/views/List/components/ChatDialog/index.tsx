import * as React from "react";
import { Button } from "antd";
import { RichTextEditor } from "component/Ticket/components/RichTextEditor";
import { DefaultListRenderer, Message, ListProps } from "./DefaultListRenderer";
const styles = require("./index.scss");

export { Message } from "./DefaultListRenderer";

export interface ChatDialogProps {
	onSend: (content: string) => void;
	messageList: Message[];
	listRenderer?: React.ComponentClass<ListProps>;
	showMessageList?: boolean;
}

export interface ChatDialogState {
	editContent: string;
}

// 聊天对话框
export class ChatDialog extends React.PureComponent<ChatDialogProps, ChatDialogState> {
	static defaultProps: Partial<ChatDialogProps> = {
		listRenderer: DefaultListRenderer,
		showMessageList: true
	};

	constructor(props) {
		super(props);

		this.state = {
			editContent: ""
		};
	}

	onEditContentChange = (editContent: string) => {
		this.setState({
			editContent
		});
	};

	onSend = () => {
		this.setState({
			editContent: ""
		});
		this.props.onSend(this.state.editContent);
	};

	render() {
		const { messageList, listRenderer, showMessageList } = this.props;
		const { editContent } = this.state;

		return (
			<div className={styles.container}>
				{showMessageList && messageList.length > 0
					? React.createElement(listRenderer!, {
							list: messageList
					})
					: null}
				<RichTextEditor value={editContent} onChange={this.onEditContentChange} />
				<div className={styles.send}>
					<Button type="primary" onClick={this.onSend}>
						发送
					</Button>
				</div>
			</div>
		);
	}
}
