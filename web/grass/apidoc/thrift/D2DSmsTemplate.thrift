namespace go trpc

struct TTemplate{
	1:required i32 id
	2:required string title
	3:required string content
	4:required string templateType
	5:required string catalogCode
	6:required string operateBy
}


service D2DSmsTemplate{
	list<TTemplate> GetD2DTemplates()

	//增加模版
	string AddTemplate(1:TTemplate template)

	//删除模版
	string DelTemplate(1:i32 id)

	//更新模版
	string UpdateTemplate(1:TTemplate template)
}
