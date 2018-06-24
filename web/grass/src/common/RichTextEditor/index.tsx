import * as React from "react";
import { EZEditor } from "ez-editor";
import { GetUploadInfo } from "services/AdminHomepageService";
import { isUAT, ImageUrl } from "util/url";
import "ez-editor/index.css";
import "./index.css";

interface RichEditorProps {
	value: string;
	onChange: (content: string) => void;
	className?: string;
	style?: React.CSSProperties;
}

interface RichEditorState {
	qnToken: string;
	qnURL: string;
}

export class RichTextEditor extends React.PureComponent<RichEditorProps, RichEditorState> {
	constructor(props) {
		super(props);

		this.state = {
			qnToken: "",
			qnURL: ""
		};
	}

	componentDidMount() {
		GetUploadInfo().then(payload => {
			this.setState({
				qnToken: payload.token,
				qnURL: isUAT() ? payload.baseUrl : ImageUrl.CNPro
			});
		});
	}

	render() {
		return <EZEditor {...this.props} qnToken={this.state.qnToken} qnURL={this.state.qnURL} />;
	}
}
