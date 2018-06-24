import * as React from "react";
import * as Barcode from "react-barcode";
import QRCode from "qrcode.react";

import { Td, Tr, Table } from "../compatiblePrint/index";
import "../style/krPrintTable.scss";

interface KrPrintTableProps {
  pkg: any;
}

class KrPrintTable extends React.Component<KrPrintTableProps, {}> {

  render() {
    const { pkg } = this.props;
    const pkgItems = pkg.items;
    const fillPkgItems = ["", "", "", "", "", "", "", "", "", ""];
    return (
      <Table className="subpage_kr">
        {pkg.deliveryStationCode && (
          <div className="watermark">
            {pkg.deliveryStationCode}
          </div>
        )}
        <Tr className="tr_Barcode" style={{ fontSize: "15px", fontWeight: "bold" }}>
          <Td width={0.6}>
            <Barcode
              style={{ margin: 1 }}
              width={1.5}
              height={36}
              fontSize={16}
              value={pkg.packageNumber} />
            <Barcode
              style={{ margin: 1 }}
              width={1.5}
              height={36}
              fontSize={16}
              value={pkg.subPkgNumbers[0].hblNumber} />
          </Td>
          <Td width={0.4}>
            <div style={{ textAlign: "right" }}>
              <div style={{ float: "left", fontSize: 25, textAlign: "left", lineHeight: 1, marginTop: 20 }}>0B1P <br />
                <span style={{fontSize: 35, paddingTop: 10}}>{pkg.localDeliveryMethod}</span>
              </div>
              <div style={{width: "26mm", display: "inline-block"}}>
                <QRCode
                  size={98}
                  value={pkg.subPkgNumbers[0].subPkgNumber}
                />
              </div>
            </div>
            <div style={{ fontSize: 28, lineHeight: 2 }} className="username">{pkg.username}</div>
          </Td>

          {/* <Td width={ 0.2 }>
            </Td> */}
        </Tr>
        <Tr className="tr_Barcode" style={{ fontSize: "15px", fontWeight: "bold" }}>
          <Td width={1}>
            <div>&nbsp; Exportation Date: &nbsp; {pkg.warehouse.exportDate} </div>
            <div>&nbsp; ORIGIN: &nbsp; {pkg.warehouse.originCountry} &nbsp; DESTINATION: &nbsp; {pkg.warehouse.destination}</div>
            <div>&nbsp; Invoice No:   {pkg.subPkgNumbers[0].subPkgNumber}</div>
          </Td>
          {/* <Td width={ 0.4 }>
              <div>&nbsp; HBL No: {pkg.subPkgNumbers[0].hblNumber} </div>
            </Td> */}
        </Tr>
        <Tr className="tr_Detail">
          <Td width={0.4}>
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
          <Td width={0.6}>
            <div>Consignee</div>
            <div> Contact Person: {pkg.receiver.username} </div>
            <div> Add: {pkg.receiver.address} </div>
            <div> ZIP Code: {pkg.receiver.ZIPCode} </div>
            <div> Phone: {pkg.receiver.mobile} </div>
          </Td>
        </Tr>
        <Tr className="tr_Thead">
          <Td width={0.2}> Marks NOS. </Td>
          <Td width={0.1}> NO.OF PKG(S) </Td>
          <Td width={0.2}> FULL DESC OF GOODS </Td>
          <Td width={0.1}> HS CODE </Td>
          <Td width={0.1}> QTY </Td>
          <Td width={0.1}> UNIT TYPE </Td>
          <Td width={0.1}> UNIT VALUE </Td>
          <Td width={0.1}> PRICE </Td>
        </Tr>
        {
          fillPkgItems.map((item, index) => {
            const currentItem = pkgItems[index];
            if (currentItem) {
              return (
                <Tr className="tr_content">
                  <Td width={0.2}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.2}>{currentItem.description}</Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}>{currentItem.qty}</Td>
                  <Td width={0.1}>{currentItem.unitType}</Td>
                  <Td width={0.1}>{currentItem.unitPrice.toFixed(2)}</Td>
                  <Td width={0.1}>{currentItem.total.toFixed(2)}</Td>
                </Tr>
              );
            } else {
              return (
                <Tr className="tr_content">
                  <Td width={0.2}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.2}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}> </Td>
                </Tr>
              );
            }
          })
        }
        <Tr className="tr_content">
          <Td width={0.2}> </Td>
          <Td width={0.1}> </Td>
          <Td width={0.2}> </Td>
          <Td width={0.1}> </Td>
          <Td width={0.3}> Total CIF Value </Td>
          <Td width={0.1}> {pkg.total} </Td>
        </Tr>
        <Tr className="tr_content">
          <Td width={1} style={{ textAlign: "center" }}>
            {
              pkgItems.length >= 10 ? "Please go to the packing list to check more details" : ""
            }
          </Td>
        </Tr>
      </Table>);
  }
}

export default KrPrintTable;
