package conf

import (
	"seed.com/common/json"
)

const (
	ConfFile = "./conf/server.json"
)

var ServerConf DBConf

// mysql的数据配置结构体
type MysqlServer struct {
	DriverName     string
	DataSourceName string
	MaxOpenConns   int
	MaxIdleConns   int
}

// redis的数据配置结构体
type RedisServer struct {
	Network   string
	Address   string
	MaxIdle   int
	MaxActive int
}

//mongodb的数据配置结构体
type MongoServer struct {
	Username  string
	Password  string
	Address   string
	Database  string `json:"database"`
	PoolLimit int    `json:"poolLimit"`
	Timeout   int    `json:"timeout"`
}

//mysql的配置结果
type MySqlServer struct {
	DriverName     string //mysql
	DataSourceName string //root:root@tcp(10.24.248.100:3307)/froad_xmall_test?charset=utf8
	MaxOpenConns   int    //2000
	MaxIdleConns   int    //1000
}

type DBConf struct {
	MySqlConf MySqlServer `json:"mysql"`
	MongoConf MongoServer `json:"mongodb"`
	RedisConf RedisServer `json:"redis"`
}

func init() {
	ParseServerConf()
}

//将server 的json config文件转换成json对象
func ParseServerConf() {
	json.Parse(ConfFile, &ServerConf)
}
