import * as React from "react";
import { Component } from "react";
import { Row, Col, Icon, Modal } from "antd";
import { i18nText } from "../../../util/kit";

interface NavState {
	expand: boolean;
}

interface NavProps {
	editColse: Function;
}

export default class Nav extends Component<NavProps, NavState> {
	constructor(props) {
		super(props);
		this.state = {
			expand: false
		};
		this.toggleExpand = this.toggleExpand.bind(this);
	}

	toggleExpand() {
		const { expand } = this.state;
		this.setState({ expand: !expand });
	}

	toModel() {
		if (window.location.hash.includes("custom")) {
			Modal.confirm({
				title:  i18nText("Warning"),
				content: i18nText("You will get to Page Template! All currently unpublished  data will be lost, confirm continue"),
				onOk() {
					window.location.hash = "#/model";
				},
			});
		}
	}

	render() {
		const { editColse } = this.props;
		const { expand } = this.state;
		let model = false;
		if (window.location.hash.includes("model")) {
			model = true;
		}
		return (
			<div className="left__panel">
				<div onMouseEnter={this.toggleExpand} onMouseLeave={this.toggleExpand} className={`vertical__nav ${model || expand ? "expand" : ""}`}>
					<div className="nav__content">
						{(model || expand) && (
							<div>
								<div className="nav__btn">
									<a onClick={this.toModel} className={`item ${model ? "active" : ""}`} href="javascript: void(0);">
										<div className="img">
											<img className="default" src={require("../image/model.png")} alt=""/>
											<img className="active" src={require("../image/model_hover.png")} alt=""/>
										</div>
										<span>{i18nText("Template")}</span>
									</a>
								</div>
								<div className="nav__btn">
									<a className={`item ${model ? "" : "active"}`} href={`${window.location.pathname}#/custom`}>
										<div className="img">
											<img className="default" src={require("../image/custom.png")} alt=""/>
											<img className="active" src={require("../image/custom_hover.png")} alt=""/>
										</div>
										<span>{i18nText("Builder")}</span>
									</a>
								</div>
							</div>
						)}
					</div>
					{!model && (
						<div className="nav__arrow">
							{expand ? (
								<Icon type="double-left" />
							) : (
									<Icon type="double-right" />
								)}
						</div>
					)}
				</div>

				{!model && (
					<Row className="button__group">
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("banner") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/banner`}>
								<div>
									<img className="default" src={require("../image/banner.png")} alt=""/>
									<img className="active" src={require("../image/banner_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Store Banner")}</span>
							</a>
						</Col>
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("nav") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/nav`}>
								<div>
									<img className="default" src={require("../image/nav.png")} alt=""/>
									<img className="active" src={require("../image/nav_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Navigation")}</span>
							</a>
						</Col>
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("carousel") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/carousel`}>
								<div>
									<img className="default" src={require("../image/carousel.png")} alt=""/>
									<img className="active" src={require("../image/carousel_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Banner Carousel")}</span>
							</a>
						</Col>
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("showcase") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/showcase`}>
								<div>
									<img className="default" src={require("../image/showcase.png")} alt=""/>
									<img className="active" src={require("../image/showcase_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Image")}</span>
							</a>
						</Col>
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("products") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/products`}>
								<div>
									<img className="default" src={require("../image/products.png")} alt=""/>
									<img className="active" src={require("../image/products_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Product")}</span>
							</a>
						</Col>
						<Col span={12}>
							<a onClick={e => editColse(e)} className={`${window.location.hash.includes("categories") ? "active" : ""} item`} href={`${window.location.pathname}#/custom/categories`}>
								<div>
									<img className="default" src={require("../image/categories.png")} alt=""/>
									<img className="active" src={require("../image/categories_hover.png")} alt=""/>
								</div>
								<span className="text">{i18nText("Product Category")}</span>
							</a>
						</Col>
					</Row>
				)}
			</div>
		);
	}
}