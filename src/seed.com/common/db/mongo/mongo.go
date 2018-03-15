/*
  @@copyright: edroity.com
  @author zhaojianwei at 2017.07.14
  @reference http://godoc.org/gopkg.in/mgo.v2#Bulk.Update
*/
package mongo

import (
	"os"
	"time"

	"gopkg.in/mgo.v2"
	"seed.com/common/conf"
	"seed.com/common/log"
)

var session *mgo.Session

type DBHandler struct {
	Session *mgo.Session
}

type DBCollection struct {
	Session    *mgo.Session
	Collection *mgo.Collection
}

func init() {
	//TODO 解析配置文件
	var err error
	var poolLimit int = conf.ServerConf.MongoConf.PoolLimit
	if poolLimit == 0 {
		poolLimit = 2000
	}

	session, err = mgo.DialWithInfo(&mgo.DialInfo{
		Addrs:     []string{conf.ServerConf.MongoConf.Address},
		Timeout:   5 * time.Second,
		PoolLimit: poolLimit, //TODO 配置数据
	})

	if err != nil {
		log.Error("[init] 数据连接失败:", err)
		os.Exit(1)
	}

	session.SetMode(mgo.Eventual, true)
}

func NewDBHandler() *DBHandler {
	return &DBHandler{Session: session}
}

func NewDBCollection(db, c string) *DBCollection {
	dh := NewDBHandler()
	return &DBCollection{
		Session:    dh.Session,
		Collection: dh.Session.DB(db).C(c),
	}
}

func (dh *DBHandler) Find(db, c string, sql interface{}) *mgo.Query {
	return dh.Session.DB(db).C(c).Find(sql)
}

func (dh *DBHandler) Insert(db, c string, sql ...interface{}) error {
	return dh.Session.DB(db).C(c).Insert(sql)
}

func (dh *DBHandler) Remove(db, c string, sql interface{}) error {
	return dh.Session.DB(db).C(c).Remove(sql)
}

func (dh *DBHandler) RemoveAll(db, c string, sql ...interface{}) (*mgo.ChangeInfo, error) {
	return dh.Session.DB(db).C(c).RemoveAll(sql)
}

func (dh *DBHandler) Update(db, c string, sql ...interface{}) error {
	return dh.Session.DB(db).C(c).Update(sql[0], sql[1])
}

func (dh *DBHandler) EnsureIndex(db, c string, index *mgo.Index) error {
	return dh.Session.DB(db).C(c).EnsureIndex(*index)
}

func (dc *DBCollection) Find(sql interface{}) *mgo.Query {
	return dc.Collection.Find(sql)
}

func (dc *DBCollection) Insert(docs ...interface{}) error {
	return dc.Collection.Insert(docs...)
}

func (dc *DBCollection) Remove(sql interface{}) error {
	return dc.Collection.Remove(sql)
}

func (dc *DBCollection) RemoveAll(sql ...interface{}) (*mgo.ChangeInfo, error) {
	return dc.Collection.RemoveAll(sql)
}

func (dc *DBCollection) Update(sql ...interface{}) error {
	return dc.Collection.Update(sql[0], sql[1])
}

func (dc *DBCollection) UpdateID(id, update interface{}) error {
	return dc.Collection.UpdateId(id, update)
}

func (dc *DBCollection) Upsert(selector interface{}, update interface{}) (*mgo.ChangeInfo, error) {
	return dc.Collection.Upsert(selector, update)
}

func (dc *DBCollection) EnsureIndex(db, c string, index *mgo.Index) error {
	return dc.Collection.EnsureIndex(*index)
}

func (dc *DBCollection) Close() {
	dc.Session.Close()
}

func Shutdown() {
	if session != nil {
		session.Close()
	}
}
