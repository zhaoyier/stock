import * as React from "react";
import { Component } from "react";
import { Row, Col, message, Modal, } from "antd";

import update from "immutability-helper";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { validateViewData } from "../utility/validateViewData";

// API
import {
	GetSellerHomePageAreas,
	PublishSellerHomePageAreas,
	SetSellerHomePageAreasView,
} from "../../../services/ezseller/decorator";

// Component
import Drag from "../partial/drag";
import LeftNav from "../partial/leftNav";
import RightPanel from "../partial/rightPanel";
// import { BaseTemplate } from "../componentTemplate/types";
import {
	BannerTemplate, NavTemplate,
	ShowcaseOne, ShowcaseTwo, ShowcaseThree, ShowcaseFour, CarouselTemplate,
} from "../componentTemplate";
import Header from "../partial/header";

// Utility
import { initDragData } from "../utility/initDragData";
import { ComponentType, DeviceType, TemplateData, defaultTemplate } from "../constant";
const { PC, APP } = DeviceType;
import activeRoute from "../utility/activeRoute";
import { toServerData, toViewData } from "../utility/transformDataToServer";
import accountInfo from "../../../util/accountInfo";
import { i18nText } from "../../../util/kit";
import "../css/index.scss";


interface CustomState {
	drags: {};
	dragIndex: number;
	typeDevice: string;
}

@DragDropContext(HTML5Backend)
export default class Custom extends Component<{}, CustomState> {
	constructor(props) {
		super(props);
		this.moveDrag = this.moveDrag.bind(this);
		this.deleteDrag = this.deleteDrag.bind(this);
		this.editOpen = this.editOpen.bind(this);
		this.editClose = this.editClose.bind(this);
		this.updateWorkBench = this.updateWorkBench.bind(this);
		this.changeDevice = this.changeDevice.bind(this);
		this.submit = this.submit.bind(this);
		this.preview = this.preview.bind(this);
		this.updateMoveDrag = this.updateMoveDrag.bind(this);
		this.state = {
			dragIndex: -1,
			typeDevice: window.sessionStorage.getItem("device") || DeviceType.PC,
			drags: {
				[PC]: [{
					id: 1,
					type: ComponentType.Banner,
					data: [{ img: "", link: "", }],
				}, {
					id: 2,
					type: ComponentType.Nav,
					data: [{ img: "", link: "", }],
				}, {
					id: 3,
					type: ComponentType.ShowCase.One,
					data: [{ img: "", link: "", }],
				}],
				[APP]: [{
					id: 1,
					type: ComponentType.Banner,
					data: [{ img: "", link: "", }],
				}, {
					id: 2,
					type: ComponentType.Nav,
					data: [{ img: "", link: "", }],
				}, {
					id: 3,
					type: ComponentType.ShowCase.One,
					data: [{ img: "", link: "", }],
				}],
			}

		};
	}

	componentDidMount() {
		if (window.sessionStorage.getItem(TemplateData)) {
			// 从模板装修页面来
			const sessionData = window.sessionStorage.getItem(TemplateData) || "{}";
			const renderData = JSON.parse(sessionData);
			const newDevice = Object.keys(renderData)[0];
			const newDrags = update(this.state.drags, { $merge: renderData });

			this.setState({
				typeDevice: newDevice,
				drags: newDrags,
			});
			window.sessionStorage.setItem(TemplateData, "");
		} else {
			// 从自定义装修页面来
			this.getServerShopData();
		}
	}

	getServerShopData() {
		const { drags, typeDevice } = this.state;
		const client: any = typeDevice === PC ? "DecoratorClientTypePCSep" : "DecoratorClientTypeMobileSep";
		GetSellerHomePageAreas({ client })
			.then(res => {
				drags[typeDevice] = toViewData(res.areas);
				this.setState({ drags });
				if (res.areas.length <= 1) {
					drags[typeDevice] = defaultTemplate[0];
					this.setState({ drags });
				}
			});
	}

	updateMoveDrag(hoverIndex, dragElement, tempArr, data) {
		const { drags, typeDevice } = this.state;
		const newDrags = update(this.state.drags[typeDevice], {
			$splice: [[hoverIndex, 0, {
				id: Math.max(...tempArr) + 1,
				type: dragElement.props.modeType,
				data
			}]],
		});
		drags[typeDevice] = newDrags;
		this.setState({ drags });
	}

	moveDrag(dragIndex, hoverIndex, dragElement) {
		const self = this;
		const { drags, typeDevice } = this.state;
		const dragCard = drags[typeDevice][dragIndex];
		const renderData = drags[typeDevice];
		if (dragCard) {
			// sort
			console.log(dragIndex, hoverIndex);
			const newDrags = update(this.state.drags[typeDevice], {
				$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
			});
			drags[typeDevice] = newDrags;
			this.setState({ drags });
		} else {
			// add
			let isExistCarousel = false;
			let showCaseTotal = 0;
			const tempArr: number[] = renderData.map(item => {
				switch (item.type) {
					case ComponentType.Carousel:
						isExistCarousel = true;
						break;
					case ComponentType.ShowCase.One:
					case ComponentType.ShowCase.Two:
					case ComponentType.ShowCase.Three:
					case ComponentType.ShowCase.Four:
						showCaseTotal++;
						break;
				}
				return item.id;
			});
			const showcaseType = [ComponentType.ShowCase.One, ComponentType.ShowCase.Two, ComponentType.ShowCase.Three, ComponentType.ShowCase.Four];
			if (showCaseTotal === 10 && showcaseType.includes(dragElement.props.modeType)) {
				message.error(i18nText("Up to 10 image module can be used"));
				return;
			}
			if (dragElement.props.modeType === ComponentType.Carousel) {
				if (isExistCarousel) {
					message.error(i18nText("Only allow one Banner Carousel"));
					return;
				}
			}
			let data = initDragData(dragElement.props.modeType);
			console.log("add", data, dragElement.props.modeType);
			self.updateMoveDrag(hoverIndex, dragElement, tempArr, data);
		}
	}

	deleteDrag(index, e) {
		// 阻止点击删除按钮触发编辑事件
		e.stopPropagation();
		const { drags, typeDevice, } = this.state;
		if (drags[typeDevice].length === 3) {
			message.warn(i18nText("Please keep at least one draggable module"));
			return;
		}

		const newDrags = update(this.state.drags[typeDevice], { $splice: [[index, 1]] });
		drags[typeDevice] = newDrags;
		this.setState({ drags, dragIndex: -1 });
	}

	editOpen(index) {
		const { dragIndex, drags, typeDevice } = this.state;
		if (dragIndex > -1 && index === dragIndex) {
			this.setState({
				dragIndex: -1
			});
		} else {
			this.setState({
				dragIndex: index,
			});
			const type = drags[typeDevice][index].type;
			activeRoute(type, ComponentType);
		}
	}

	editClose(e) {
		this.setState({
			dragIndex: -1
		});
	}

	updateWorkBench(editData, index = 0) {
		const { drags, dragIndex, typeDevice } = this.state;
		const renderData = drags[typeDevice];
		renderData[dragIndex]["data"] = editData;
		drags[typeDevice] = renderData;
		this.setState({ drags }, this.forceUpdate);
	}

	renderTemplate(type, data) {
		const { typeDevice } = this.state;
		const deviceData = data;
		let template;
		switch (type) {
			case ComponentType.Banner:
				template = <BannerTemplate data={deviceData} typeDevice={typeDevice} />;
				break;
			case ComponentType.Nav:
				template = <NavTemplate data={deviceData} />;
				break;
			case ComponentType.ShowCase.One:
				template = <ShowcaseOne data={deviceData} />;
				break;
			case ComponentType.ShowCase.Two:
				template = <ShowcaseTwo data={deviceData} />;
				break;
			case ComponentType.ShowCase.Three:
				template = <ShowcaseThree data={deviceData} />;
				break;
			case ComponentType.ShowCase.Four:
				template = <ShowcaseFour data={deviceData} />;
				break;
			case ComponentType.Carousel:
				template = <CarouselTemplate data={deviceData} />;
				break;
		}
		return template;
	}

	changeDevice(device) {
		const self = this;
		Modal.confirm({
			title: i18nText("Switching equipment"),
			content: i18nText("This operation will clear all unsaved date, whether to continue ?"),
			onOk() {
				window.sessionStorage.setItem("device", device);
				self.setState({
					typeDevice: device,
					dragIndex: -1
				}, self.getServerShopData);
			}
		});
	}

	submit() {
		const { drags, typeDevice } = this.state;
		const shopName = accountInfo.shop && accountInfo.shop.shopName || "";
		if (!validateViewData(drags[typeDevice])) {
			return;
		}
		const areas: any = toServerData(drags[typeDevice]);
		const sortOptions = [];
		const client: any = typeDevice === PC ? "DecoratorClientTypePCSep" : "DecoratorClientTypeMobileSep";

		Modal.confirm({
			title: i18nText("Confirm publish?"),
			onOk: () => {
				PublishSellerHomePageAreas({
					shopName, areas, sortOptions, client
				}).then(res => {
					if (res.result.code === 0) {
						if (typeDevice === PC) {
							// PC
							Modal.confirm({
								width: 500,
								title: i18nText("Publish Successfully ！"),
								content: i18nText("Publish successfully ！You can choose to stay on the current page or view published page"),
								onOk: () => {
									if (window.location.host.includes("ezseller.ezbuy")) {
										window.open(`//ezbuy.sg/shop/${shopName}`, "_blank");
									} else {
										window.open(`//sg5.65emall.net/shop/${shopName}?preview=true`, "_blank");
									}
								},
								onCancel: () => { },
								okText: i18nText("View published page"),
								cancelText: i18nText("Stay on the current page"),
							});
						} else {
							Modal.info({
								title: i18nText("Publish Successfully ！"),
							});
						}
					}
				});
			}
		})
	}

	preview() {
		const { drags, typeDevice } = this.state;
		if (!validateViewData(drags[typeDevice])) {
			return;
		}
		const areas: any = toServerData(drags[typeDevice]);
		const shopName = accountInfo.shop && accountInfo.shop.shopName || "";
		const sortOptions = [];
		console.log("server data", areas);
		SetSellerHomePageAreasView({
			shopName, areas, sortOptions
		})
			.then(res => {
				if (res.result.code === 0) {
					if (typeDevice === PC) {
						Modal.confirm({
							title: i18nText("Preview successfully"),
							content: i18nText("Preview will link another page ,  confirm go to another page"),
							onOk: () => {
								if (window.location.host.includes("ezseller.ezbuy")) {
									window.open(`//ezbuy.sg/shop/${shopName}?preview=true`, "_blank");
								} else {
									window.open(`//sg5.65emall.net/shop/${shopName}?preview=true`, "_blank");
								}
							},
							onCancel: () => { }
						});
					} else {
						// APP
						Modal.info({
							width: 500,
							title: i18nText("Preview successfully"),
							content: (
								<div>
									{window.location.host.includes("ezseller.ezbuy") ? (
										<iframe style={{ border: "none" }} src={`//m.ezbuy.sg/shop/${shopName}?isPreview=1`} width="375" height="667" />
									) : (
											<iframe style={{ border: "none" }} src={`//m.sg.65emall.net/shop/${shopName}?isPreview=1`} width="375" height="667" />
										)}
								</div>
							)
						});
					}
				}
			});
	}

	render() {
		const { drags, dragIndex, typeDevice, } = this.state;
		const renderData = drags[typeDevice];
		let editData = null;
		let editType = "";
		if (dragIndex > -1) {
			editData = renderData[dragIndex]["data"];
			editType = renderData[dragIndex]["type"];
		}
		const { children } = this.props;
		const childrenWithProps = React.Children.map(children, child => {
			console.log("右侧栏渲染了：", child["type"].name);
			return React.cloneElement(child as any, { typeDevice });
		});
		const imgPlaceholder: any = [];
		if (typeDevice === PC) {
			for (let i = 0; i < 20; i++) {
				imgPlaceholder.push((
					<Col style={{ textAlign: "right" }} key={i} span={6}>
						<img src={require("../image/pc-products.png")} />
					</Col>));
			}
		} else {
			for (let i = 0; i < 8; i++) {
				imgPlaceholder.push((
					<Col key={i} span={12} style={{ textAlign: "center" }}>
						<img src={require("../image/pc-products.png")} />
					</Col>));
			}
		}
		// console.log("render data", drags, renderData);
		return (
			<div>
				<div style={{ background: "#F2F2F2" }} className="clearfix">
					<Row>
						<Col span={3}>
							<LeftNav
								editColse={this.editClose}
							/>
						</Col>
						<Col span={18}>
							<Header changeDevice={this.changeDevice} typeDevice={typeDevice} preview={this.preview} submit={this.submit} />
							<div className={`workbench ${typeDevice === DeviceType.PC ? "pc" : "app"}`}>
								<div className="content">
									{typeDevice === PC && (
										<div style={{ textAlign: "center" }}>
											<img src={require("../image/pc_header.png")} />
										</div>
									)}
									{renderData && renderData.map((card, i) => {
										if (card.type === ComponentType.ShowCase.Four && typeDevice === APP) {
											return;
										}
										return (
											<div key={card.id} className={`drag__content ${(dragIndex > -1 && dragIndex === i) ? "edit__now" : ""}`}>
												<Drag
													key={card.id}
													index={i}
													id={card.id}
													content={this.renderTemplate(card.type, card.data)}
													type={card.type}
													canDelete={true}
													deleteDrag={this.deleteDrag}
													style={{ ...card.style }}
													moveDrag={this.moveDrag}
													editOpen={this.editOpen}
												/>
											</div>
										);
									})}
									{typeDevice === PC ? (
										<Row>
											<Col span={4}>
												<img src={require("../image/leftProducts.png")} alt="" />
											</Col>
											<Col span={20}>
												<Row>
													{imgPlaceholder}
												</Row>
											</Col>
										</Row>
									) : (
											<Row>
												{imgPlaceholder}
											</Row>
										)}
								</div>
							</div>
						</Col>
						<Col span={3}>
							<div className="fixed__container">
								<div className="right__panel">
									<RightPanel
										editType={editType}
										editData={editData}
										childrenWithProps={childrenWithProps}
										updateWorkBench={this.updateWorkBench}
										typeDevice={typeDevice}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
