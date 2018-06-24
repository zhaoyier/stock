import * as React from "react";
import { Component } from "react";

// component

import BannerEdit from "../custom/bannerEdit";
import ShowCaseEdit from "../custom/showcaseEdit";
import CarouselEdit from "../custom/carouselEdit";

// utility
import { i18nText } from "../../../util/kit";
import { ComponentType } from "../constant";

interface RightPanelProps {
	typeDevice: string;
	updateWorkBench: Function;
	childrenWithProps: any;
	editData: Array<{}> | null;
	editType: string;
}

export default class RightPanel extends Component<RightPanelProps, {}> {
	render() {
		const { childrenWithProps, editType, editData, typeDevice, updateWorkBench } = this.props;
		let EditContent: any = (<div />);
		if (editData) {
			switch (editType) {
				case ComponentType.Banner:
					EditContent = <BannerEdit typeDevice={typeDevice} editData={editData} updateWorkBench={updateWorkBench} />;
					break;
				case ComponentType.Nav:
					EditContent = (<div>{i18nText("Coming soon")}</div>);
					break;
				case ComponentType.ShowCase.One:
				case ComponentType.ShowCase.Two:
				case ComponentType.ShowCase.Three:
				case ComponentType.ShowCase.Four:
					EditContent = <ShowCaseEdit typeDevice={typeDevice} editData={editData} updateWorkBench={updateWorkBench} />;
					break;
				case ComponentType.Carousel:
					EditContent = <CarouselEdit typeDevice={typeDevice} editData={editData} updateWorkBench={updateWorkBench} />;
					break;
				default:
					break;
			}
		}
		return (
			<div>
				{editData ? (
					// 编辑模式
					<div>
						{EditContent}
					</div>
				) : (
						// 添加模式
						<div>
							{childrenWithProps || (
								<p style={{ color: "#CCC", textAlign: "center", fontSize: 20, }}>{i18nText("Work Plantform")}</p>
							)}
						</div>
					)}
			</div>
		);
	}
}