/*
	describe: similar to antd/Modal
	example: ../Index/Announcement/index.tsx, ../Home/index.tsx
*/

import * as React from "react";
import "./index.scss";
import { CSSProperties } from "react";

interface PopupProps {
	visible: boolean;
	width?: number;
	height?: number;
	className?: string;
	style?: CSSProperties;
}

interface PopupState {
	winWidth: number;
	winHeight: number;
}

class Popup extends React.Component<PopupProps, PopupState> {
	static defaultProps: Partial<PopupProps> = {
		width: 680,
		height: 500,
		className: "",
		style: {}
	};
	state: PopupState = {
		winWidth: window.innerWidth,
		winHeight: window.innerHeight
	};
	popup: HTMLDivElement;

	componentDidMount() {
		this.addResizeListener();
	}
	componentWillUnmount() {
		this.removeResizeListener();
	}
	handleResize() {
		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;
		this.setState({
			winWidth,
			winHeight
		});
	}
	addResizeListener() {
		window.addEventListener("resize", this.handleResize.bind(this));
	}
	removeResizeListener() {
		window.removeEventListener("resize", this.handleResize.bind(this));
	}
	render() {
		const {
			style,
			width,
			height,
			visible,
			children,
			className,
		} = this.props;
		const {
			winWidth,
			winHeight
		} = this.state;

		return (
			<div>
				{
					visible ?
						(
							<div
								className="PopupWrap"
								ref={node => this.popup = node as HTMLDivElement}
								style={{ width: winWidth, height: winHeight }}>
								<div
									className={`PopupMain ${className}`}
									style={{ width, height, ...style }}>
									{children}
								</div>
							</div>
						)
						:
						null

				}
			</div>
		);
	}
}

export default Popup;
