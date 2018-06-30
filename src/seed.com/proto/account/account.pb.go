// Code generated by protoc-gen-go. DO NOT EDIT.
// source: account.proto

/*
Package account is a generated protocol buffer package.

It is generated from these files:
	account.proto

It has these top-level messages:
	Result
	AccountLoginReq
	AccountLoginResp
*/
package account

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type Result struct {
	// 状态码
	Code int32 `protobuf:"varint,1,opt,name=code" json:"code,omitempty"`
	// 结果描述
	Message string `protobuf:"bytes,2,opt,name=message" json:"message,omitempty"`
}

func (m *Result) Reset()                    { *m = Result{} }
func (m *Result) String() string            { return proto.CompactTextString(m) }
func (*Result) ProtoMessage()               {}
func (*Result) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *Result) GetCode() int32 {
	if m != nil {
		return m.Code
	}
	return 0
}

func (m *Result) GetMessage() string {
	if m != nil {
		return m.Message
	}
	return ""
}

type AccountLoginReq struct {
	// 账号
	Username string `protobuf:"bytes,1,opt,name=username" json:"username,omitempty"`
	// 密码
	Password string `protobuf:"bytes,2,opt,name=password" json:"password,omitempty"`
	// 验证码
	Captcha string `protobuf:"bytes,3,opt,name=captcha" json:"captcha,omitempty"`
}

func (m *AccountLoginReq) Reset()                    { *m = AccountLoginReq{} }
func (m *AccountLoginReq) String() string            { return proto.CompactTextString(m) }
func (*AccountLoginReq) ProtoMessage()               {}
func (*AccountLoginReq) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *AccountLoginReq) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func (m *AccountLoginReq) GetPassword() string {
	if m != nil {
		return m.Password
	}
	return ""
}

func (m *AccountLoginReq) GetCaptcha() string {
	if m != nil {
		return m.Captcha
	}
	return ""
}

type AccountLoginResp struct {
	// 结果
	Result *Result `protobuf:"bytes,1,opt,name=result" json:"result,omitempty"`
}

func (m *AccountLoginResp) Reset()                    { *m = AccountLoginResp{} }
func (m *AccountLoginResp) String() string            { return proto.CompactTextString(m) }
func (*AccountLoginResp) ProtoMessage()               {}
func (*AccountLoginResp) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *AccountLoginResp) GetResult() *Result {
	if m != nil {
		return m.Result
	}
	return nil
}

func init() {
	proto.RegisterType((*Result)(nil), "account.Result")
	proto.RegisterType((*AccountLoginReq)(nil), "account.AccountLoginReq")
	proto.RegisterType((*AccountLoginResp)(nil), "account.AccountLoginResp")
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for GAccount service

type GAccountClient interface {
	GAccountSigin(ctx context.Context, in *AccountLoginReq, opts ...grpc.CallOption) (*AccountLoginResp, error)
}

type gAccountClient struct {
	cc *grpc.ClientConn
}

func NewGAccountClient(cc *grpc.ClientConn) GAccountClient {
	return &gAccountClient{cc}
}

func (c *gAccountClient) GAccountSigin(ctx context.Context, in *AccountLoginReq, opts ...grpc.CallOption) (*AccountLoginResp, error) {
	out := new(AccountLoginResp)
	err := grpc.Invoke(ctx, "/account.GAccount/GAccountSigin", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for GAccount service

type GAccountServer interface {
	GAccountSigin(context.Context, *AccountLoginReq) (*AccountLoginResp, error)
}

func RegisterGAccountServer(s *grpc.Server, srv GAccountServer) {
	s.RegisterService(&_GAccount_serviceDesc, srv)
}

func _GAccount_GAccountSigin_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AccountLoginReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GAccountServer).GAccountSigin(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/account.GAccount/GAccountSigin",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GAccountServer).GAccountSigin(ctx, req.(*AccountLoginReq))
	}
	return interceptor(ctx, in, info, handler)
}

var _GAccount_serviceDesc = grpc.ServiceDesc{
	ServiceName: "account.GAccount",
	HandlerType: (*GAccountServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GAccountSigin",
			Handler:    _GAccount_GAccountSigin_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "account.proto",
}

func init() { proto.RegisterFile("account.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 215 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x4d, 0x4c, 0x4e, 0xce,
	0x2f, 0xcd, 0x2b, 0xd1, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x87, 0x72, 0x95, 0xcc, 0xb8,
	0xd8, 0x82, 0x52, 0x8b, 0x4b, 0x73, 0x4a, 0x84, 0x84, 0xb8, 0x58, 0x92, 0xf3, 0x53, 0x52, 0x25,
	0x18, 0x15, 0x18, 0x35, 0x58, 0x83, 0xc0, 0x6c, 0x21, 0x09, 0x2e, 0xf6, 0xdc, 0xd4, 0xe2, 0xe2,
	0xc4, 0xf4, 0x54, 0x09, 0x26, 0x05, 0x46, 0x0d, 0xce, 0x20, 0x18, 0x57, 0x29, 0x99, 0x8b, 0xdf,
	0x11, 0x62, 0x84, 0x4f, 0x7e, 0x7a, 0x66, 0x5e, 0x50, 0x6a, 0xa1, 0x90, 0x14, 0x17, 0x47, 0x69,
	0x71, 0x6a, 0x51, 0x5e, 0x62, 0x2e, 0xc4, 0x10, 0xce, 0x20, 0x38, 0x1f, 0x24, 0x57, 0x90, 0x58,
	0x5c, 0x5c, 0x9e, 0x5f, 0x94, 0x02, 0x35, 0x09, 0xce, 0x07, 0x59, 0x92, 0x9c, 0x58, 0x50, 0x92,
	0x9c, 0x91, 0x28, 0xc1, 0x0c, 0xb1, 0x04, 0xca, 0x55, 0xb2, 0xe6, 0x12, 0x40, 0xb5, 0xa4, 0xb8,
	0x40, 0x48, 0x9d, 0x8b, 0xad, 0x08, 0xec, 0x60, 0xb0, 0x1d, 0xdc, 0x46, 0xfc, 0x7a, 0x30, 0x9f,
	0x41, 0xfc, 0x11, 0x04, 0x95, 0x36, 0x0a, 0xe0, 0xe2, 0x70, 0x87, 0xea, 0x16, 0x72, 0xe1, 0xe2,
	0x85, 0xb1, 0x83, 0x33, 0xd3, 0x33, 0xf3, 0x84, 0x24, 0xe0, 0xba, 0xd0, 0x7c, 0x21, 0x25, 0x89,
	0x43, 0xa6, 0xb8, 0x20, 0x89, 0x0d, 0x1c, 0x76, 0xc6, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0xb8,
	0xa5, 0xb3, 0xfc, 0x4c, 0x01, 0x00, 0x00,
}
