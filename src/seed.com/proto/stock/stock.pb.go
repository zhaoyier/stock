// Code generated by protoc-gen-go. DO NOT EDIT.
// source: stock.proto

/*
Package stock is a generated protocol buffer package.

It is generated from these files:
	stock.proto

It has these top-level messages:
	CodeData
	BasicData
	AmountUnit
	Funds
	FundsData
	MainInfo
	DBFunds
	DBFundsData
*/
package stock

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type CodeData struct {
	// 代号
	Id string `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	// 交易所
	Exchange string `protobuf:"bytes,2,opt,name=exchange" json:"exchange,omitempty"`
	// 名称
	Name string `protobuf:"bytes,3,opt,name=name" json:"name,omitempty"`
	// 创建日期
	CreateTime int64 `protobuf:"varint,4,opt,name=createTime" json:"createTime,omitempty"`
}

func (m *CodeData) Reset()                    { *m = CodeData{} }
func (m *CodeData) String() string            { return proto.CompactTextString(m) }
func (*CodeData) ProtoMessage()               {}
func (*CodeData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *CodeData) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *CodeData) GetExchange() string {
	if m != nil {
		return m.Exchange
	}
	return ""
}

func (m *CodeData) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *CodeData) GetCreateTime() int64 {
	if m != nil {
		return m.CreateTime
	}
	return 0
}

type BasicData struct {
	// 代码
	Code string `protobuf:"bytes,1,opt,name=code" json:"code,omitempty"`
	// 类型
	Exchange string `protobuf:"bytes,2,opt,name=exchange" json:"exchange,omitempty"`
	// 日期, eg:20180314
	Date string `protobuf:"bytes,3,opt,name=date" json:"date,omitempty"`
	// 今开
	Opening int32 `protobuf:"varint,4,opt,name=opening" json:"opening,omitempty"`
	// 收盘
	Closing int32 `protobuf:"varint,5,opt,name=closing" json:"closing,omitempty"`
	// 成交量
	Volume int32 `protobuf:"varint,6,opt,name=volume" json:"volume,omitempty"`
	// 最高
	Highest int32 `protobuf:"varint,7,opt,name=highest" json:"highest,omitempty"`
	// 最低
	Lowest int32 `protobuf:"varint,8,opt,name=lowest" json:"lowest,omitempty"`
	// 内盘
	Inside int32 `protobuf:"varint,9,opt,name=inside" json:"inside,omitempty"`
	// 外盘
	Outside int32 `protobuf:"varint,10,opt,name=outside" json:"outside,omitempty"`
	// 换手率
	Turnover int32 `protobuf:"varint,11,opt,name=turnover" json:"turnover,omitempty"`
	// 成交额
	Trading int32 `protobuf:"varint,12,opt,name=trading" json:"trading,omitempty"`
	// 振幅
	Amplitude int32 `protobuf:"varint,13,opt,name=amplitude" json:"amplitude,omitempty"`
	// 委比 单位:%
	Entrust int32 `protobuf:"varint,14,opt,name=entrust" json:"entrust,omitempty"`
	// 量比
	AmountRatio int32 `protobuf:"varint,15,opt,name=amountRatio" json:"amountRatio,omitempty"`
	// 流通市值
	Circulated int32 `protobuf:"varint,16,opt,name=circulated" json:"circulated,omitempty"`
	// 总市值
	Total int32 `protobuf:"varint,17,opt,name=total" json:"total,omitempty"`
	// 市盈率MRQ
	PeRatio int32 `protobuf:"varint,18,opt,name=peRatio" json:"peRatio,omitempty"`
	// 市净率
	PbRatio int32 `protobuf:"varint,19,opt,name=pbRatio" json:"pbRatio,omitempty"`
	// 每股收益
	Income int32 `protobuf:"varint,20,opt,name=income" json:"income,omitempty"`
	// 每股净资产
	Per int32 `protobuf:"varint,21,opt,name=per" json:"per,omitempty"`
	// 总股本
	Equity int32 `protobuf:"varint,22,opt,name=equity" json:"equity,omitempty"`
	// 流通股本
	Flow int32 `protobuf:"varint,23,opt,name=flow" json:"flow,omitempty"`
}

func (m *BasicData) Reset()                    { *m = BasicData{} }
func (m *BasicData) String() string            { return proto.CompactTextString(m) }
func (*BasicData) ProtoMessage()               {}
func (*BasicData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *BasicData) GetCode() string {
	if m != nil {
		return m.Code
	}
	return ""
}

func (m *BasicData) GetExchange() string {
	if m != nil {
		return m.Exchange
	}
	return ""
}

func (m *BasicData) GetDate() string {
	if m != nil {
		return m.Date
	}
	return ""
}

func (m *BasicData) GetOpening() int32 {
	if m != nil {
		return m.Opening
	}
	return 0
}

func (m *BasicData) GetClosing() int32 {
	if m != nil {
		return m.Closing
	}
	return 0
}

func (m *BasicData) GetVolume() int32 {
	if m != nil {
		return m.Volume
	}
	return 0
}

func (m *BasicData) GetHighest() int32 {
	if m != nil {
		return m.Highest
	}
	return 0
}

func (m *BasicData) GetLowest() int32 {
	if m != nil {
		return m.Lowest
	}
	return 0
}

func (m *BasicData) GetInside() int32 {
	if m != nil {
		return m.Inside
	}
	return 0
}

func (m *BasicData) GetOutside() int32 {
	if m != nil {
		return m.Outside
	}
	return 0
}

func (m *BasicData) GetTurnover() int32 {
	if m != nil {
		return m.Turnover
	}
	return 0
}

func (m *BasicData) GetTrading() int32 {
	if m != nil {
		return m.Trading
	}
	return 0
}

func (m *BasicData) GetAmplitude() int32 {
	if m != nil {
		return m.Amplitude
	}
	return 0
}

func (m *BasicData) GetEntrust() int32 {
	if m != nil {
		return m.Entrust
	}
	return 0
}

func (m *BasicData) GetAmountRatio() int32 {
	if m != nil {
		return m.AmountRatio
	}
	return 0
}

func (m *BasicData) GetCirculated() int32 {
	if m != nil {
		return m.Circulated
	}
	return 0
}

func (m *BasicData) GetTotal() int32 {
	if m != nil {
		return m.Total
	}
	return 0
}

func (m *BasicData) GetPeRatio() int32 {
	if m != nil {
		return m.PeRatio
	}
	return 0
}

func (m *BasicData) GetPbRatio() int32 {
	if m != nil {
		return m.PbRatio
	}
	return 0
}

func (m *BasicData) GetIncome() int32 {
	if m != nil {
		return m.Income
	}
	return 0
}

func (m *BasicData) GetPer() int32 {
	if m != nil {
		return m.Per
	}
	return 0
}

func (m *BasicData) GetEquity() int32 {
	if m != nil {
		return m.Equity
	}
	return 0
}

func (m *BasicData) GetFlow() int32 {
	if m != nil {
		return m.Flow
	}
	return 0
}

// 金额和单位
type AmountUnit struct {
	// 数量
	Amount float32 `protobuf:"fixed32,1,opt,name=amount" json:"amount,omitempty"`
	// 单位
	Unit string `protobuf:"bytes,2,opt,name=unit" json:"unit,omitempty"`
}

func (m *AmountUnit) Reset()                    { *m = AmountUnit{} }
func (m *AmountUnit) String() string            { return proto.CompactTextString(m) }
func (*AmountUnit) ProtoMessage()               {}
func (*AmountUnit) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *AmountUnit) GetAmount() float32 {
	if m != nil {
		return m.Amount
	}
	return 0
}

func (m *AmountUnit) GetUnit() string {
	if m != nil {
		return m.Unit
	}
	return ""
}

type Funds struct {
	// 错误码
	ErrorNo int32 `protobuf:"varint,1,opt,name=errorNo" json:"errorNo,omitempty"`
	// 错误描述
	ErrorMsg string `protobuf:"bytes,2,opt,name=errorMsg" json:"errorMsg,omitempty"`
	// 资金信息
	FundsData *FundsData `protobuf:"bytes,3,opt,name=fundsData" json:"fundsData,omitempty"`
}

func (m *Funds) Reset()                    { *m = Funds{} }
func (m *Funds) String() string            { return proto.CompactTextString(m) }
func (*Funds) ProtoMessage()               {}
func (*Funds) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{3} }

func (m *Funds) GetErrorNo() int32 {
	if m != nil {
		return m.ErrorNo
	}
	return 0
}

func (m *Funds) GetErrorMsg() string {
	if m != nil {
		return m.ErrorMsg
	}
	return ""
}

func (m *Funds) GetFundsData() *FundsData {
	if m != nil {
		return m.FundsData
	}
	return nil
}

// 资金数据
type FundsData struct {
	// 流入
	MainInflow int32 `protobuf:"varint,1,opt,name=mainInflow" json:"mainInflow,omitempty"`
	// 流入
	RetailInflow int32 `protobuf:"varint,2,opt,name=retailInflow" json:"retailInflow,omitempty"`
	// 流出
	MainOutflow int32 `protobuf:"varint,3,opt,name=mainOutflow" json:"mainOutflow,omitempty"`
	// 流出
	RetailOutflow int32 `protobuf:"varint,4,opt,name=retailOutflow" json:"retailOutflow,omitempty"`
	// 主力信息
	MainInfo []*MainInfo `protobuf:"bytes,5,rep,name=mainInfo" json:"mainInfo,omitempty"`
}

func (m *FundsData) Reset()                    { *m = FundsData{} }
func (m *FundsData) String() string            { return proto.CompactTextString(m) }
func (*FundsData) ProtoMessage()               {}
func (*FundsData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{4} }

func (m *FundsData) GetMainInflow() int32 {
	if m != nil {
		return m.MainInflow
	}
	return 0
}

func (m *FundsData) GetRetailInflow() int32 {
	if m != nil {
		return m.RetailInflow
	}
	return 0
}

func (m *FundsData) GetMainOutflow() int32 {
	if m != nil {
		return m.MainOutflow
	}
	return 0
}

func (m *FundsData) GetRetailOutflow() int32 {
	if m != nil {
		return m.RetailOutflow
	}
	return 0
}

func (m *FundsData) GetMainInfo() []*MainInfo {
	if m != nil {
		return m.MainInfo
	}
	return nil
}

// 信息
type MainInfo struct {
	// 日期
	Date string `protobuf:"bytes,1,opt,name=date" json:"date,omitempty"`
	// 金额
	Amount int32 `protobuf:"varint,2,opt,name=amount" json:"amount,omitempty"`
}

func (m *MainInfo) Reset()                    { *m = MainInfo{} }
func (m *MainInfo) String() string            { return proto.CompactTextString(m) }
func (*MainInfo) ProtoMessage()               {}
func (*MainInfo) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{5} }

func (m *MainInfo) GetDate() string {
	if m != nil {
		return m.Date
	}
	return ""
}

func (m *MainInfo) GetAmount() int32 {
	if m != nil {
		return m.Amount
	}
	return 0
}

// 数据库储存
type DBFunds struct {
	// 代码
	Id string `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	// 资金信息
	Funds []*DBFundsData `protobuf:"bytes,2,rep,name=funds" json:"funds,omitempty"`
	// 创建时间
	Create int64 `protobuf:"varint,3,opt,name=create" json:"create,omitempty"`
	// 更新日期
	Update int64 `protobuf:"varint,4,opt,name=update" json:"update,omitempty"`
}

func (m *DBFunds) Reset()                    { *m = DBFunds{} }
func (m *DBFunds) String() string            { return proto.CompactTextString(m) }
func (*DBFunds) ProtoMessage()               {}
func (*DBFunds) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{6} }

func (m *DBFunds) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *DBFunds) GetFunds() []*DBFundsData {
	if m != nil {
		return m.Funds
	}
	return nil
}

func (m *DBFunds) GetCreate() int64 {
	if m != nil {
		return m.Create
	}
	return 0
}

func (m *DBFunds) GetUpdate() int64 {
	if m != nil {
		return m.Update
	}
	return 0
}

// 数据库存储数据
type DBFundsData struct {
	// 流入
	Mi int32 `protobuf:"varint,1,opt,name=mi" json:"mi,omitempty"`
	// 流入
	Ri int32 `protobuf:"varint,2,opt,name=ri" json:"ri,omitempty"`
	// 流出
	Mo int32 `protobuf:"varint,3,opt,name=mo" json:"mo,omitempty"`
	// 流出
	Ro int32 `protobuf:"varint,4,opt,name=ro" json:"ro,omitempty"`
	// 日期
	Date string `protobuf:"bytes,5,opt,name=date" json:"date,omitempty"`
}

func (m *DBFundsData) Reset()                    { *m = DBFundsData{} }
func (m *DBFundsData) String() string            { return proto.CompactTextString(m) }
func (*DBFundsData) ProtoMessage()               {}
func (*DBFundsData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{7} }

func (m *DBFundsData) GetMi() int32 {
	if m != nil {
		return m.Mi
	}
	return 0
}

func (m *DBFundsData) GetRi() int32 {
	if m != nil {
		return m.Ri
	}
	return 0
}

func (m *DBFundsData) GetMo() int32 {
	if m != nil {
		return m.Mo
	}
	return 0
}

func (m *DBFundsData) GetRo() int32 {
	if m != nil {
		return m.Ro
	}
	return 0
}

func (m *DBFundsData) GetDate() string {
	if m != nil {
		return m.Date
	}
	return ""
}

func init() {
	proto.RegisterType((*CodeData)(nil), "stock.CodeData")
	proto.RegisterType((*BasicData)(nil), "stock.BasicData")
	proto.RegisterType((*AmountUnit)(nil), "stock.AmountUnit")
	proto.RegisterType((*Funds)(nil), "stock.Funds")
	proto.RegisterType((*FundsData)(nil), "stock.FundsData")
	proto.RegisterType((*MainInfo)(nil), "stock.MainInfo")
	proto.RegisterType((*DBFunds)(nil), "stock.DBFunds")
	proto.RegisterType((*DBFundsData)(nil), "stock.DBFundsData")
}

func init() { proto.RegisterFile("stock.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 633 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x54, 0x4d, 0x6f, 0xd3, 0x4c,
	0x10, 0x56, 0x9c, 0xb8, 0x4d, 0x26, 0xfd, 0x7a, 0xf7, 0x2d, 0x65, 0x85, 0x10, 0x8a, 0x2c, 0x0e,
	0x91, 0x90, 0x7a, 0x28, 0x12, 0xe2, 0x4a, 0xa9, 0x2a, 0x71, 0x28, 0x48, 0x16, 0xfc, 0x80, 0xad,
	0xbd, 0x4d, 0x16, 0x6c, 0x6f, 0x58, 0xaf, 0x5b, 0xf8, 0x7f, 0xdc, 0xf9, 0x4b, 0x68, 0x3e, 0xe2,
	0xb8, 0x5c, 0xb8, 0xcd, 0xf3, 0x3c, 0xf3, 0xec, 0xec, 0xcc, 0x7e, 0xc0, 0xbc, 0x8d, 0xbe, 0xf8,
	0x76, 0xbe, 0x09, 0x3e, 0x7a, 0x95, 0x12, 0xc8, 0xbe, 0xc2, 0xf4, 0xbd, 0x2f, 0xed, 0x95, 0x89,
	0x46, 0x1d, 0x41, 0xe2, 0x4a, 0x3d, 0x5a, 0x8c, 0x96, 0xb3, 0x3c, 0x71, 0xa5, 0x7a, 0x06, 0x53,
	0xfb, 0xa3, 0x58, 0x9b, 0x66, 0x65, 0x75, 0x42, 0x6c, 0x8f, 0x95, 0x82, 0x49, 0x63, 0x6a, 0xab,
	0xc7, 0xc4, 0x53, 0xac, 0x5e, 0x00, 0x14, 0xc1, 0x9a, 0x68, 0x3f, 0xbb, 0xda, 0xea, 0xc9, 0x62,
	0xb4, 0x1c, 0xe7, 0x03, 0x26, 0xfb, 0x3d, 0x81, 0xd9, 0xa5, 0x69, 0x5d, 0x41, 0xd5, 0x14, 0x4c,
	0x0a, 0x5f, 0x5a, 0xa9, 0x47, 0xf1, 0xbf, 0x2a, 0x96, 0x26, 0xf6, 0x15, 0x31, 0x56, 0x1a, 0xf6,
	0xfd, 0xc6, 0x36, 0xae, 0x59, 0x51, 0xb9, 0x34, 0xdf, 0x42, 0x54, 0x8a, 0xca, 0xb7, 0xa8, 0xa4,
	0xac, 0x08, 0x54, 0x67, 0xb0, 0x77, 0xef, 0xab, 0xae, 0xb6, 0x7a, 0x8f, 0x04, 0x41, 0xe8, 0x58,
	0xbb, 0xd5, 0xda, 0xb6, 0x51, 0xef, 0xb3, 0x43, 0x20, 0x3a, 0x2a, 0xff, 0x80, 0xc2, 0x94, 0x1d,
	0x8c, 0x90, 0x77, 0x4d, 0xeb, 0x4a, 0xab, 0x67, 0xcc, 0x33, 0xa2, 0x5d, 0x75, 0x91, 0x04, 0x90,
	0x5d, 0x31, 0xc4, 0xfe, 0x62, 0x17, 0x1a, 0x7f, 0x6f, 0x83, 0x9e, 0x93, 0xd4, 0x63, 0x74, 0xc5,
	0x60, 0x4a, 0xdc, 0xf1, 0x01, 0xbb, 0x04, 0xaa, 0xe7, 0x30, 0x33, 0xf5, 0xa6, 0x72, 0xb1, 0x2b,
	0xad, 0x3e, 0x24, 0x6d, 0x47, 0xa0, 0xcf, 0x36, 0x31, 0x74, 0x6d, 0xd4, 0x47, 0xec, 0x13, 0xa8,
	0x16, 0x30, 0x37, 0xb5, 0xef, 0x9a, 0x98, 0x9b, 0xe8, 0xbc, 0x3e, 0x26, 0x75, 0x48, 0xd1, 0x89,
	0xb9, 0x50, 0x74, 0x95, 0x89, 0xb6, 0xd4, 0x27, 0x94, 0x30, 0x60, 0xd4, 0x29, 0xa4, 0xd1, 0x47,
	0x53, 0xe9, 0xff, 0x48, 0x62, 0x80, 0x15, 0x37, 0x96, 0xd7, 0x54, 0x5c, 0x51, 0x20, 0x29, 0xb7,
	0xac, 0xfc, 0x2f, 0x0a, 0x43, 0x9e, 0x55, 0xe1, 0x6b, 0xab, 0x4f, 0xb7, 0xb3, 0x42, 0xa4, 0x4e,
	0x60, 0xbc, 0xb1, 0x41, 0x3f, 0x21, 0x12, 0x43, 0xcc, 0xb4, 0xdf, 0x3b, 0x17, 0x7f, 0xea, 0x33,
	0xce, 0x64, 0x84, 0xe7, 0x7f, 0x57, 0xf9, 0x07, 0xfd, 0x94, 0x58, 0x8a, 0xb3, 0xb7, 0x00, 0xef,
	0xa8, 0x9d, 0x2f, 0x8d, 0xa3, 0xf3, 0xe0, 0xe6, 0xe8, 0x4e, 0x25, 0xb9, 0x20, 0x74, 0x76, 0x8d,
	0x8b, 0x72, 0xa3, 0x28, 0xce, 0x6a, 0x48, 0xaf, 0xbb, 0xa6, 0x6c, 0x69, 0x7c, 0x21, 0xf8, 0xf0,
	0xd1, 0x93, 0x0b, 0xc7, 0xc7, 0x90, 0x2e, 0x23, 0x86, 0x37, 0xed, 0xaa, 0xbf, 0x8c, 0x82, 0xd5,
	0x39, 0xcc, 0xee, 0xd0, 0x8e, 0x37, 0x99, 0x6e, 0xe4, 0xfc, 0xe2, 0xe4, 0x9c, 0x9f, 0xd7, 0xf5,
	0x96, 0xcf, 0x77, 0x29, 0xd9, 0xaf, 0x11, 0xcc, 0x7a, 0x01, 0xc7, 0x5e, 0x1b, 0xd7, 0x7c, 0x68,
	0xa8, 0x21, 0x2e, 0x3b, 0x60, 0x54, 0x06, 0x07, 0xc1, 0x46, 0xe3, 0x2a, 0xc9, 0x48, 0x28, 0xe3,
	0x11, 0x87, 0x87, 0x8b, 0x8e, 0x4f, 0x5d, 0xa4, 0x94, 0x31, 0x1f, 0xee, 0x80, 0x52, 0x2f, 0xe1,
	0x90, 0x1d, 0xdb, 0x1c, 0x7e, 0x22, 0x8f, 0x49, 0xf5, 0x0a, 0xa6, 0x52, 0xd9, 0xeb, 0x74, 0x31,
	0x5e, 0xce, 0x2f, 0x8e, 0xa5, 0x91, 0x1b, 0xa1, 0xf3, 0x3e, 0x21, 0x7b, 0x03, 0xd3, 0x2d, 0xdb,
	0xbf, 0xc7, 0xd1, 0xe0, 0x3d, 0xee, 0x4e, 0x80, 0xb7, 0x2c, 0x28, 0x6b, 0x61, 0xff, 0xea, 0x92,
	0xe7, 0xfd, 0xf7, 0x27, 0xb3, 0x84, 0x94, 0xc6, 0xa4, 0x13, 0x2a, 0xae, 0xa4, 0xb8, 0xa4, 0xd3,
	0x1c, 0x39, 0x01, 0x17, 0xe7, 0xcf, 0x84, 0x9a, 0x1d, 0xe7, 0x82, 0x90, 0xef, 0x36, 0xb4, 0x15,
	0xfe, 0x72, 0x04, 0x65, 0x06, 0xe6, 0x83, 0x55, 0xb0, 0x70, 0xed, 0x64, 0xd8, 0x49, 0xed, 0x10,
	0x07, 0x27, 0xfb, 0x4c, 0x02, 0xe1, 0xda, 0xcb, 0x1c, 0x93, 0xda, 0x93, 0xee, 0x65, 0x66, 0x49,
	0xd8, 0xf5, 0x9b, 0xee, 0xfa, 0xbd, 0xdd, 0xa3, 0xbf, 0xf4, 0xf5, 0x9f, 0x00, 0x00, 0x00, 0xff,
	0xff, 0x75, 0xdd, 0xb9, 0x61, 0x5a, 0x05, 0x00, 0x00,
}
