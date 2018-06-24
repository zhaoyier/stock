import * as React from "react";
import { Component } from "react";
import { Row, Col } from "antd";
import Header from "../../Home/Header";
import "../../loginAndSignUp/css/shopRegister.scss";

interface ContainerProps {
	step: number;
}

class Container extends Component<ContainerProps> {
	render() {
		return (
			<div>
				<div className="container">
					<Header
						lastDay={{
							AddCartCount: 0,
							orderCount: 0,
							paidCount: 0,
							salesAmount: 0
						}
						} />
					<div className="shop__process">
						<Row>
							<Col span={24} ><h4 className="top__title"> 店铺认证 </h4></Col>
							<Col span={24}>
								<div className={`progress__bar step${this.props.step}`}>
									<span className={`step__item ${this.props.step > 0 ? "active" : ""}`}>1. 选择开店类型</span>
									<span className={`step__item ${this.props.step > 1 ? "active" : ""}`}>2. 阅读开店须知</span>
									<span className={`step__item ${this.props.step > 2 ? "active" : ""}`}>3. 填写基础资料</span>
									<span className={`step__item ${this.props.step > 3 ? "active" : ""}`}>4. 审核结果</span>
								</div>
							</Col>
							<Col span={24}> {this.props.children} </Col>
						</Row>
					</div>
				</div>
			</div>
		);
	}
}

export default Container;
