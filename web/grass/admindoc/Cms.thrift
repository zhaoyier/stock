namespace go ezbuy.apidoc.gen.Cms

struct CmsEditSubject{
    1:required string key;
    2:required string name;
    3:required string area;
    4:required string lang;
    5:required string html;
    6:required string path;
    7:required bool isPublish;
    8:optional string ctype;
}

struct CmsProSubject{
    1:required string key;
    2:required string name;
    3:required string area;
    4:required string lang;
    5:required string html;
    6:required string path;
    7:optional string ctype;
}


struct CmsEditResponse{
    1:required i32 total;
    2:required list<CmsEditSubject> subjects;
}

service Cms{
    bool AddCmsEditSubject(1:string key, 2:string name);
    bool FullAddCmsEditSubject(1:string key, 2:string name, 3:string area, 4:string lang, 5:string path, 6:string ctype, 7:string html)
    bool UpdateCmsEditSubject(1:string key, 2:string name, 3:string area, 4:string lang, 5:string path, 6:string ctype);
    bool UpdateCmsEditSubJectHtml(1:string key, 2:string html);
    bool RemoveCmsEditSubject(1:string key);
    CmsEditResponse ShowCmsEditSubject(1:i32 limit, 2:i32 offset,3:string area, 4:string lang, 5:i32 isPublish, 6:string ctype);
    CmsEditSubject GetEditCmsSubject(1:string key);
    CmsProSubject GetProCmsSubject(1:string key);
    map<string,CmsEditSubject> ListCmsEditSubjects(1:list<string> keys);
    map<string,CmsProSubject> ListCmsProSubjects(1:list<string> keys);

    //上传excel
    //UploadCmsSubject()
    //ImportJson()

    bool PublishCmsSubject(1: string key);

    bool RevertVersion(1: string key);

}
