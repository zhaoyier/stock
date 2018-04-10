// Code generated by protoc-gen-go. DO NOT EDIT.
// source: market.proto

/*
Package market is a generated protocol buffer package.

It is generated from these files:
	market.proto

It has these top-level messages:
	GetEmployee
*/
package market

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import seller "."

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type GetEmployee struct {
	Employee *seller.Basic `protobuf:"bytes,1,opt,name=employee" json:"employee,omitempty"`
}

func (m *GetEmployee) Reset()                    { *m = GetEmployee{} }
func (m *GetEmployee) String() string            { return proto.CompactTextString(m) }
func (*GetEmployee) ProtoMessage()               {}
func (*GetEmployee) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *GetEmployee) GetEmployee() *seller.Basic {
	if m != nil {
		return m.Employee
	}
	return nil
}

func init() {
	proto.RegisterType((*GetEmployee)(nil), "market.GetEmployee")
}

func init() { proto.RegisterFile("market.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 97 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0xc9, 0x4d, 0x2c, 0xca,
	0x4e, 0x2d, 0xd1, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x83, 0xf0, 0xa4, 0x78, 0x8a, 0x53,
	0x73, 0x72, 0x52, 0x8b, 0x20, 0xa2, 0x4a, 0x16, 0x5c, 0xdc, 0xee, 0xa9, 0x25, 0xae, 0xb9, 0x05,
	0x39, 0xf9, 0x95, 0xa9, 0xa9, 0x42, 0x9a, 0x5c, 0x1c, 0xa9, 0x50, 0xb6, 0x04, 0xa3, 0x02, 0xa3,
	0x06, 0xb7, 0x11, 0xaf, 0x1e, 0x54, 0xbd, 0x53, 0x62, 0x71, 0x66, 0x72, 0x10, 0x5c, 0x3a, 0x89,
	0x0d, 0x6c, 0x80, 0x31, 0x20, 0x00, 0x00, 0xff, 0xff, 0x7d, 0x23, 0x95, 0x25, 0x66, 0x00, 0x00,
	0x00,
}
