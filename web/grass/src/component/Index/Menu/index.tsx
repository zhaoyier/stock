import * as React from "react";
import { Menu, Icon } from "antd";
import { connect } from "react-redux";
import accountInfo from "../../../util/accountInfo";
import { getMenuItems } from "../../../constant/menuData";
import "./index.scss";

const originCode = accountInfo.shop ? accountInfo.shop.originCode : "";

interface MenuProps {
	noticeInfo?: {
		announcementCount: number;
		mailCount: number;
	};
}

interface MenuState {
	activeMenuKey: string;
}

function getAddress(currentPathName, address) {
	if (!/^\/[\w\d-_]+\.html/.test(address)) {
		address = `/#${address}`;
	}
	return address;
}

function checkAddressActive(address) {
	const { pathname, hash } = window.location;
	address = !/^\/[\w\d-_]+\.html/.test(address) ? `/#${address}` : address;
	return address === `${pathname}${hash}`;
}

@connect(state => ({
	noticeInfo: state.common.noticeInfo
}))
class SellerMenu extends React.Component<MenuProps, MenuState> {
	constructor(props) {
		super(props);
		this.initActiveMenuKey = this.initActiveMenuKey.bind(this);
		this.initMenuItems();
	}
	state: MenuState = {
		activeMenuKey: "0"
	};
	menuItems: any;

	componentDidMount() {
		this.initActiveMenuKey();
		window.addEventListener("hashchange", this.initActiveMenuKey, false);
	}
	componentWillReceiveProps() {
		this.initMenuItems();
		// this.initActiveMenuKey();
	}
	initMenuItems() {
		const { announcementCount, mailCount } = this.props.noticeInfo!;
		const MENU_CHILDS = getMenuItems({
			announcementCount,
			mailCount
		});
		this.menuItems = MENU_CHILDS;
	}
	initActiveMenuKey() {
		let activeMenuKey: string = "0";
		const MenusItems = this.menuItems[0].filter(m => m.originCodes.includes(originCode));
		MenusItems.forEach(subItem => {
			if (Reflect.has(subItem, "address")) {
				if (checkAddressActive(subItem.address)) {
					activeMenuKey = subItem.key;
				}
			} else {
				const childs: any[] = subItem.childs || [];
				const CurrentChilds = childs.filter(child => child.originCodes.includes(originCode));
				CurrentChilds.forEach(item => {
					if (checkAddressActive(item.address)) {
						activeMenuKey = item.key;
					}
				});
			}
		});
		this.setState({ activeMenuKey });
	}
	handleClickMenu({ item, key, keyPath }) {
		this.setState({ activeMenuKey: key });
	}
	render() {
		const { activeMenuKey } = this.state;
		const isCN = originCode === "CN";
		const isApproved = accountInfo.shop && accountInfo.shop.isApproved;
		const MenusItems = this.menuItems[0].filter(m => m.originCodes.includes(originCode));
		const defaultOpenKeys = MenusItems.map(
			(subItem, index) =>
				isCN ? (Boolean(subItem.open) ? `SubMenu${index}` : "") : `SubMenu${index}`
		);

		return (
			<Menu
				style={{ borderRight: "none" }}
				className="HomeMenuWrap"
				selectedKeys={[activeMenuKey]}
				defaultOpenKeys={defaultOpenKeys}
				onClick={this.handleClickMenu.bind(this)}
				mode="inline"
			>
				{MenusItems.map((subItem, index) => {
					const childs: any[] = subItem.childs || [];
					const CurrentChilds = childs.filter(child => child.originCodes.includes(originCode));
					const subKey = `SubMenu${index}`;
					if (CurrentChilds.length > 0) {
						return (
							<Menu.SubMenu
								key={subKey}
								title={
									<span>
										<Icon type="laptop" />
										{subItem.names[originCode]}
									</span>
								}
							>
								{CurrentChilds.map(item => (
									<Menu.Item key={item.key} disabled={!isApproved}>
										<a href={`${getAddress(window.location.pathname, item.address)}`}>
											{item.names[originCode]}
										</a>
									</Menu.Item>
								))}
							</Menu.SubMenu>
						);
					}
					return (
						<Menu.Item key={subItem.key} disabled={!isApproved}>
							<a href={`${getAddress(window.location.pathname, subItem.address)}`}>
								<Icon type="laptop" />
								{subItem.names[originCode]}
							</a>
						</Menu.Item>
					);
				})}
			</Menu>
		);
	}
}

export default SellerMenu;
