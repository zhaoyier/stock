import * as React from "react";
import * as Barcode from "react-barcode";
import { Td, Tr, Table } from "../compatiblePrint/index";
import "../style/defaultPrintTable.scss";
import QRCode from "qrcode.react";

class DefaultPrintTable extends React.Component<any, {}> {
  render() {
    const { pkg } = this.props;

    return (
      <Table
        className="subpage"
      >
        <Tr>
          <Td width={0.5}>
            <Barcode
              style={{ margin: 1 }}
              width={1.5}
              height={36}
              fontSize={16}
              value={pkg.packageNumber} />
          </Td>
          <Td width={0.35}>
            <p>{pkg.username}</p>
            <p></p>
            <p>0B1P&nbsp;<span style={{ fontSize: 12, fontWeight: "bold" }}>{pkg.localDeliveryMethod}</span></p>
            <p>{pkg.packageNumber}</p>
          </Td>
          <Td width={0.15}>
            <div style={{width: "20mm"}}>
              <QRCode
                size={78}
                value={pkg.subPkgNumbers[0].subPkgNumber}
              />
            </div>
          </Td>
        </Tr>
        <Tr>
          <Td width={0.5}>
            Invoice No:   {pkg.subPkgNumbers[0].subPkgNumber}
          </Td>
          <Td width={0.5}>
            Date of Exportation: {pkg.warehouse.exportDate}
          </Td>
        </Tr>
        <Tr>
          <Td width={0.5}>
            &nbsp;COUNTRY OF ORIGIN: {pkg.warehouse.originCountry}
          </Td>
          <Td width={0.5} style={{ fontSize: "12px", fontWeight: "bold" }}>
            DESTINATION: {pkg.warehouse.destination}
          </Td>
        </Tr>
        <Tr>
          <Td width={0.5}>
            <div>{pkg.sender.provider}</div>
            <div>
              Contact Person: {pkg.sender.username}
            </div>
            <div>
              Add: {pkg.sender.address}
            </div>
            <div>
              ZIP CODE: {pkg.sender.ZIPCode}
            </div>
            <div>
              PHONE: {pkg.sender.mobile}
            </div>
          </Td>
          <Td width={0.5}>
            <div>Consignee</div>
            <div>
              Contact Person: {pkg.receiver.username}
            </div>
            <div>
              Add: {pkg.receiver.address}
            </div>
            <div>
              ZIP Code: {pkg.receiver.ZIPCode}
            </div>
            <div>
              Phone: {pkg.receiver.mobile}
            </div>
          </Td>
        </Tr>
        <Tr>
          <Td width={0.3}> FULL DESC OF GOODS </Td>
          <Td width={0.2}> QTY </Td>
          <Td width={0.2}> UNIT TYPE </Td>
          <Td width={0.2}> UNIT VALUE </Td>
          <Td width={0.1}> TOTAL VALUE </Td>
        </Tr>
        {
          pkg.items.map(item => (
            <Tr>
              <Td width={0.3}>{item.description}</Td>
              <Td width={0.2}>{item.qty}</Td>
              <Td width={0.2} >{item.unitType}</Td>
              <Td width={0.2}>{item.unitPrice.toFixed(2)}</Td>
              <Td width={0.1}>{item.total.toFixed(2)}</Td>
            </Tr>
          ))
        }
        <Tr>
          <Td width={0.3}> </Td>
          <Td width={0.2}> </Td>
          <Td width={0.2}> </Td>
          <Td width={0.2}> Total CIF Value </Td>
          <Td width={0.1}>{pkg.total}</Td>
        </Tr>
      </Table>
    );
  }
}

export default DefaultPrintTable;
