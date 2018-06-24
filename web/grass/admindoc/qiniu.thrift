namespace go featurecollection.trending.trpc.qiniu

struct TParamReply {
	1:required string result
}

struct TUploadReply {
	1:required string token
}

service FeatureCollection {
	string upToken()
	TParamReply GetBaseUrl()
	TUploadReply GetUploadToken()
}
