import * as React from "react";
import { Component } from "react";
import { Icon } from "antd";

interface CarouselTemplateProps {
	data?: Array<{}>;
}


export default class CarouselTemplate extends Component<CarouselTemplateProps, {}> {
	private carousel;
	private timer;
	constructor(props) {
		super(props);
		this.carousel = "";
		this.timer = null;
	}

	componentDidMount() {
		const carouselContainer = this.carousel;
		const carouselItems = carouselContainer.children;
		let count = -1;
		this.timer = setInterval(function () {
			for (let i = 0; i < carouselItems.length; i++) {
				carouselItems[i].style.opacity = "0";
			}
			count++;
			carouselItems[count].style.opacity = "1";
			if (count === carouselItems.length - 1) {
				count = -1;
			}
		}, 2000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const { data } = this.props;
		return (
			<div className="carousel" >
				<span className="left__arrow">
					<Icon style={{color: "#999"}} type="caret-left" />
				</span>
				<span className="right__arrow">
					<Icon style={{color: "#999"}} type="caret-right" />
				</span>
				<div ref={carousel => this.carousel = carousel}>
					{data && data.map((item, i) => (
						<div key={i}>
							<div style={{ backgroundImage: `url(${item["img"] ? item["img"] : require("../image/default.png")})` }} className="imageBox" />
							<div className="number">{i + 1}</div>
						</div>
					))}
					{data === undefined && (
						<div>
							<div style={{ backgroundImage: `url(${require("../image/default.png")})` }} className="imageBox" />
							<div className="number">1</div>
						</div>
					)}
					{data === undefined && (
						<div>
							<div style={{ backgroundImage: `url(${require("../image/default.png")})` }} className="imageBox" />
							<div className="number">2</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}