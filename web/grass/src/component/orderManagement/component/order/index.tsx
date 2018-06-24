import * as React from "react";
import { observer } from "mobx-react";
import OrderStore from "../../store/order";
import OrderHeadTabs from "../sub/orderHeadTabs";
import OrderBodyTable from "../sub/orderBodyTable";
import OrderSearchForm from "../sub/orderSearchForm";
import {
	getText
} from "../../../../util/kit";
import {
	NewOrder
} from "services/EzSellerService";
import "./index.scss";

interface OrderProps {
	store: OrderStore;
}

interface OrderState {
	subSelectedRows: Array<NewOrder>;
}

@observer
class Order extends React.Component<OrderProps, OrderState> {
	state: OrderState = {
		subSelectedRows: []
	};
	updateSubSelectedRows(parm: Array<NewOrder>) {
		this.setState({ subSelectedRows: parm });
	}
	render() {
		const { store } = this.props;
		const { subSelectedRows } = this.state;

		return (
			<div>
				<header>
					<h1 className="headH1"> {getText("All orders")} </h1>
					<OrderSearchForm orderStore={store} />
					<OrderHeadTabs
						orderStore={store}
						subSelectedRows={subSelectedRows} />
				</header>
				<section>
					<OrderBodyTable
						orderStore={store}
						subSelectedRows={subSelectedRows}
						updateSubSelectedRows={this.updateSubSelectedRows.bind(this)} />
				</section>
			</div>
		);
	}
}

export default () => <Order store={new OrderStore()} />;
