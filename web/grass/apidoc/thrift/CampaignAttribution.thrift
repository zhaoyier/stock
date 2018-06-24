namespace java com.daigou.sg.webapi.datastatistics
namespace go trpc.statistics 
struct AdAttribution {
    1: required string referrer;        //来源
    2: required Action action;          //产生了什么动作
    3: required string country;         //国家[SG,MY,ID,TH]不区分大小写
    4: optional string username;        //来自那个用户
    5: required i64 timestamp;         //时间戳
}

enum Action {
    Install = 1
    Register = 2
    Login = 3
    Other = 4
}

service CampaignAttribution {
    bool SendAdAttribution(1: AdAttribution attribution)
}
