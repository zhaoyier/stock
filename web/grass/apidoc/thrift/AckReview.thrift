namespace go trpc
namespace java com.daigou.sg.webapi.acknowledge
namespace swift TR

service Acknowledge {
    TSaveAcknowledgedResp SaveAcknowledge(1:TSaveAcknowledgeReq saveAcknowledgeReq)
}

struct TSaveAcknowledgeReq {
    1: required list<string> parcelNumber;
    2: required i32 rating;
    3: required string comment;
    4: required list<string> imageUrl;
}

struct TSaveAcknowledgedResp {
	1: required bool result;
	2: optional string msg;
}
