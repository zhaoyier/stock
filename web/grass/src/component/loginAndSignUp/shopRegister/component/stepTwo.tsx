import * as React from "react";
import { Button } from "antd";

import Container from "../container";

const StepTwo = () => (
	<Container step={2}>
		<div style={{ margin: "0 auto", width: 919, border: "solid 2px #eeeeee" }}>
			<iframe width="100%" height="500" src="/asset/ezbuysellerterms.html" frameBorder={0} />
		</div>
		<div className="step__two__button" style={{ textAlign: "center", marginTop: 30 }}>
			<Button className="button">
				<a href="/index.html#/">返回上一步</a>
			</Button>
			<Button className="button" type="primary">
				<a href="/index.html#registerThree">同意协议，下一步</a>
			</Button>
		</div>
	</Container>
);

export default StepTwo;
