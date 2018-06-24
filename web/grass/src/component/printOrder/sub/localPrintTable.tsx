import * as React from "react";
import * as Barcode from "react-barcode";
import QRCode from "qrcode.react";
import { Td, Tr, Table } from "../compatiblePrint/index";
import "../style/localPrintTable.scss";

const scissors = require("../image/scissors.png");

interface LocalPrintTableProps {
  pkg: any;
}

class LocalPrintTable extends React.Component<LocalPrintTableProps, {}> {
  render() {
    const { pkg } = this.props;
    const { orderItems } = pkg;
    const fillPkgItems = ["", "", "", "", "", "", "", "", "", ""];

    return (
      <Table
        className="subpage_local"
      >
      {pkg.deliveryStationCode && (
        <div className="watermark">
          {pkg.deliveryStationCode}
        </div>
      )}
        <Tr>
          <Td width={0.85}style={{fontSize: "18px", fontWeight: "bold"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <span>
                <Barcode
                  style={{ margin: 1 }}
                  width={2}
                  height={50}
                  fontSize={16}
                  value={pkg.packageNumber} />
              </span>
              <span>
                <div>0B1P&nbsp; <br/>
                <span style={{fontSize: 35, top: 15, position: "relative"}}>{pkg.localDeliveryMethod}</span>
                </div>
                <div style={{marginTop: 50}} className="username">{pkg.username}</div>
              </span>
            </div>
            <div> Invoice No:   {pkg.subPkgNumbers[0].subPkgNumber} </div>
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
        <Tr style={{fontSize: "18px", fontWeight: "bold"}}>
          <Td width={0.5}>
            {pkg.packageNumber}
          </Td>
          <Td width={0.5}>
            Date of Exportation: {pkg.warehouse.exportDate}
          </Td>
        </Tr>
        <Tr style={{fontSize: "18px", fontWeight: "bold"}}>
          <Td width={0.5}>
            &nbsp;COUNTRY OF ORIGIN: {pkg.warehouse.originCountry}
          </Td>
          <Td width={0.5}>
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
          <Td width={1} style={{height: "30px", lineHeight: "35px", textAlign: "center", backgroundImage: `url(${scissors})`}}>
            Please tear away this portion after packing
          </Td>
        </Tr>
        <Tr>
          <Td width={0.3}>ProductName</Td>
          <Td width={0.2}>SKU ID</Td>
          <Td width={0.3}>SKU Name</Td>
          <Td width={0.1}>QTY</Td>
          <Td width={0.1}>PRICE</Td>
        </Tr>
        {
          fillPkgItems.map((item, index) => {
            const order = orderItems &&  orderItems[index] ? orderItems[index] : null;
            if ( order ) {
              return (
                <Tr>
                  <Td width={0.3} className="limitText">{ order.productName }</Td>
                  <Td width={0.2}>{ order.sellerSkuId }</Td>
                  <Td width={0.3} className="limitText">{ order.skuName }</Td>
                  <Td width={0.1} style={{textAlign: "center"}}>{ order.quantity }</Td>
                  <Td width={0.1} style={{textAlign: "center"}}>{ order.unitPrice }</Td>
                </Tr>
              );
            } else {
              return (
                <Tr>
                  <Td width={0.3}> </Td>
                  <Td width={0.2}> </Td>
                  <Td width={0.3}> </Td>
                  <Td width={0.1}> </Td>
                  <Td width={0.1}> </Td>
                </Tr>
              );
            }
          }
          )
        }
        <Tr>
          <Td width={1} style={{height: "20px", textAlign: "center"}}>
            {
              orderItems && orderItems.length > 10 ? "Please go to the packing list to check more details" : ""
            }
          </Td>
        </Tr>
      </Table>
    );
  }
}

export default LocalPrintTable;
