# 客户端访问域名规范

[相关Tower](https://tower.im/projects/2223ae6c8c774c81847a7734384dc4f3/todos/5474e7f56bb2414ea046140ddc117c25/#e80a984af161497d900aac68057e6054)

后端通过域名来或者 `国家/语言/客户端` 的信息
**域名建议均使用小写**

| 维度名称  | 1    | 2    | 3    | 4       | 5    | 6    |
| ----- | ---- | ---- | ---- | ------- | ---- | ---- |
| 客户端类型 | mweb | web  | ios  | android |      |      |
| 国家名称  | sg   | au   | id   | th      | kr   |      |
| 语言    | en   | th   | ko   | zh      | id   | ms   |

**不同国家使用的后缀不同**

| 国家   | 域名           |
| ---- | ------------ |
| sg   | .ezbuy.sg    |
| my   | .ezbuy.my    |
| id   | .ezbuy.co.id |
| th   | .ezbuy.co.th |


**组合而成域名信息**

```
<国家>-<语言>-<客户端类型>-api.<国家域名>
```

举例:

ios 在马来使用英文访问的域名为`my-en-ios-api.ezbuy.my`


**业务上,对于国家的判断优先以第一个字段为主,最后api.ezbuy.my不做参考依据**

##### UAT环境(全部国家都是用 65emall.net 后缀)

```
my-en-ios-api.65emall.net
```

国家代码/语言 代码 可以不区分大小写



## DPNS 域名

正式环境
**除域名外的其他均不用修改，包括 SG_android.ashx 继续保留**

```
<国家>-<语言>-<客户端类型>-dpns.<国家域名>
```



UAT环境

```
<国家>-<语言>-<客户端>-dpns.65emall.net
<国家>-<语言>-<客户端>-dpns2.65emall.net
<国家>-<语言>-<客户端>-dpns3.65emall.net
```
