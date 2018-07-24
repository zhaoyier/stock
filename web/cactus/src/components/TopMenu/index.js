import React, {Component} from "react"
import { withRouter } from "react-router-dom"
import { Menu } from "antd"
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

@withRouter
class TopMenu extends Component {
	render() {
		return (
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				style={{height: "100%", borderBottom: 0}}
			>
				<MenuItem>人物</MenuItem>
				<MenuItem>自然</MenuItem>
				<SubMenu title="汽车">
					<MenuItem>轿车</MenuItem>
					<MenuItem>SUV</MenuItem>
				</SubMenu>
			</Menu>

		)
	}
}

export default TopMenu