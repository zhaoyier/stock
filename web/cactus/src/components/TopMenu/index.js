import React, {Component} from "react"
import { withRouter } from "react-router-dom"
import { Menu } from "antd"
import menuConfig from '@/config/menu'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

@withRouter
class TopMenu extends Component {
	state={
		keys:[]
	}
	selectKey = () =>{
			let keys = []
			keys.push(this.props.history.location.pathname)
			this.setState({keys:keys})
	}
	componentWillMount(){
			this.selectKey()
	}
	onSelect = ({key}) =>{
			this.props.history.push(key)
	}
	componentWillReceiveProps (nextProps){
			if (this.props.location.pathname != nextProps.location.pathname) {
					this.selectKey()
			}
	}

	render() {
		return (
			// <Menu
			// 	mode="horizontal"
			// 	defaultSelectedKeys={['2']}
			// 	style={{height: "100%", borderBottom: 0, background: "#CFCFCF"}}
			// >
			// 	<MenuItem>人物</MenuItem>
			// 	<MenuItem>自然</MenuItem>
			// 	<SubMenu title="汽车">
			// 		<MenuItem>轿车</MenuItem>
			// 		<MenuItem>SUV</MenuItem>
			// 	</SubMenu>
			// </Menu>
			<Menu
				mode="horizontal"
				style={{height: "100%", borderBottom: 0, background: "#CFCFCF"}}
				onSelect={this.onSelect}
				selectedKeys={this.state.keys}
			>
					{menuConfig.map((item,i)=>
							item.list && item.list.length > 0 ?
									<SubMenu key={item.key} title={<span><span className={'font icon-' +item.icon}></span><span>{item.title}</span></span>}>
											{item.list.map((listItem,ii)=>
													<Menu.Item key={item.key+listItem.key}>
															<span>{listItem.title}</span>
													</Menu.Item>
											)}
									</SubMenu>
									:
									<Menu.Item key={item.key}>
											<span className={'font icon-' +item.icon}></span>
											<span>{item.title}</span>
									</Menu.Item>
					)}
			</Menu>

		)
	}
}

export default TopMenu