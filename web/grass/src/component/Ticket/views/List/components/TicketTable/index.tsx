import * as React from "react";
import { Link } from "react-router";
import { inject, observer } from "mobx-react";
import { Table, Modal, Button } from "antd";
import { TicketItem, TicketStatus } from "services/ezseller/ticket";
import { Model } from "../../model";
import { ColumnProps } from "antd/lib/table";
import { TICKET_STATUS_LIST } from "../../../../constants";
import { formatUnixTime } from "util/time";
import { ChatDialog } from "../ChatDialog";

class TicketTableInternal extends Table<TicketItem> {}

function renderStatus(status: TicketStatus) {
	const statusItem = TICKET_STATUS_LIST.find(s => s.value === status);
	return statusItem ? statusItem.label : "";
}

@inject("model")
@observer
export class TicketTable extends React.Component<{}, {}> {
	get injected() {
		return (this.props as any).model as Model;
	}

	get columns(): ColumnProps<TicketItem>[] {
		return [
			{
				title: "工单编号",
				dataIndex: "ticketId",
				width: 170
			},
			{
				title: "工单类型",
				dataIndex: "typeName",
				width: 120
			},
			{
				title: "订单编号",
				dataIndex: "orderItemNum",
				width: 180
			},
			{
				title: "工单状态",
				dataIndex: "status",
				render: renderStatus,
				width: 120
			},
			{
				title: "创建时间",
				dataIndex: "createDate",
				render: formatUnixTime,
				width: 170
			},
			{
				title: "留言更新时间",
				dataIndex: "updateDate",
				render: formatUnixTime,
				width: 170
			},
			{
				title: "处理完成时间",
				dataIndex: "finishDate",
				render: formatUnixTime,
				width: 170
			},
			{
				title: "操作",
				render: (_, r, index) => {
					return (
						<div>

							<Link
								to={`/detail/${r.ticketId}`}
								style={{ marginRight: 10 }}
								target="_blank"
							>
								查看详情
							</Link>
							{r.status === TicketStatus.TicketStatusFinished ? null : (
								<a href="javascript:void(0)" onClick={() => this.injected.showReplyModal(index)}>
									回复
								</a>
							)}
						</div>
					);
				}
			}
		];
	}

	onSendReply = (msg: string) => {
		this.injected.sendReply(msg);
	};

	render() {
		const inj = this.injected;
		return (
			<div>
				<div style={{ textAlign: "right", marginRight: 20, marginBottom: 20 }}>
					<Button style={{ marginRight: 10 }} onClick={inj.prePage} disabled={inj.isFirstPage}>
						上一页
					</Button>
					<Button onClick={inj.nextPage} disabled={inj.isLastPage}>
						下一页
					</Button>
				</div>

				<TicketTableInternal
					columns={this.columns}
					dataSource={inj.ticketList}
					rowKey={r => r.ticketId}
					pagination={false}
				/>

				<Modal
					visible={inj.replyModalVisible}
					footer={null}
					title="回复"
					onCancel={inj.hideReplyModal}
				>
					<ChatDialog messageList={inj.replyList} onSend={this.onSendReply} />
				</Modal>
			</div>
		);
	}
}
