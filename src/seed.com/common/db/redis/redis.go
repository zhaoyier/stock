package redis

import (
	"time"

	"edroity.com/server/common/conf"
	"edroity.com/server/common/log"
	"github.com/garyburd/redigo/redis"
)

const (
	SET          = "SET"
	GET          = "GET"
	HSET         = "HSET"
	HGET         = "HGET"
	HMSET        = "HMSET"
	HMGET        = "HMGET"
	HGETALL      = "HGETALL"
	HLEN         = "HLEN"
	HEXISTS      = "HEXISTS"
	LPUSH        = "LPUSH"
	LREM         = "LREM"
	RPUSH        = "RPUSH"
	LRANGE       = "LRANGE"
	EXPIRE       = "EXPIRE"
	EXISTS       = "EXISTS"
	SETEX        = "SETEX"
	SETNX        = "SETNX"
	DEL          = "DEL"
	HDEL         = "HDEL"
	LLEN         = "LLEN"
	LTRIM        = "LTRIM"
	HINCRBY      = "HINCRBY"
	HINCRBYFLOAT = "HINCRBYFLOAT"
	INCR         = "INCR"
	INCRBY       = "INCRBY"

	EXPIREAT         = "EXPIREAT"
	SADD             = "SADD"
	SMEMBERS         = "SMEMBERS"
	SISMEMBER        = "SISMEMBER"
	SPOP             = "SPOP"
	SCARD            = "SCARD"
	SREM             = "SREM"
	ZADD             = "ZADD"
	ZCOUNT           = "ZCOUNT"
	ZRANGE           = "ZRANGE"
	ZCARD            = "ZCARD"
	ZREM             = "ZREM"
	ZREVRANGEBYSCORE = "ZREVRANGEBYSCORE"
	ZRANGEBYSCORE    = "ZRANGEBYSCORE"
	PING             = "PING"
	ERRORCODE        = -1
	ERRORSTRINGCODE  = "-1"
	OK               = "OK"
	SUCCESS          = 1
	ERRORSTRING      = "NULL"
	NILSTRING        = "nil"
	IDLETIME         = 200
)

var (
	ErrNil = redis.ErrNil
)

var pool *redis.Pool

// 初始化redis pool
func init() {
	pool = &redis.Pool{
		MaxIdle:     conf.ServerConf.RedisConf.MaxIdle,
		MaxActive:   conf.ServerConf.RedisConf.MaxActive,
		IdleTimeout: IDLETIME * time.Second,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial(conf.ServerConf.RedisConf.Network, conf.ServerConf.RedisConf.Address)
			if err != nil {
				log.Error("Dail master redis server error:", err)
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do(PING)
			if err != nil {
				log.Error("redis TestOnBorrow error:", err)
			}
			return err
		},
	}
	log.Infof("redis config: %+v", conf.ServerConf.RedisConf)
}

//设置字符串
func PutStr(key, value string) string {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.String(conn.Do(SET, key, value))
	if err != nil {
		log.Error("redis设置字符串失败,key: "+key+" ,err: ", err)
		return ERRORSTRINGCODE
	}
	return value
}

//获取字符串
func GetStr(key string) string {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.String(conn.Do(GET, key))
	if err != nil {
		log.Error("从redis获取字符串失败,key: "+key+" ,err: ", err)
		return ERRORSTRING
	}
	return value
}

//从左侧push值
func LPush(key string, args ...interface{}) int64 {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.Int64(conn.Do(LPUSH, redis.Args{}.Add(key).Add(args...)...))
	if err != nil {
		log.Error("redis LPush值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return value
}

//从右侧push值
func RPush(key string, args ...interface{}) int64 {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.Int64(conn.Do(RPUSH, redis.Args{}.Add(key).Add(args...)...))
	if err != nil {
		log.Error("redis RPush值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return value
}

//
func LRem(key string, count int64, value interface{}) int64 {
	conn := pool.Get()
	defer conn.Close()
	rply, err := redis.Int64(conn.Do(LREM, redis.Args{}.Add(key).Add(count).Add(value)...))
	if err != nil {
		log.Errorf("redis LRem failed, key: %s, err: %s", key, err.Error())
		return ERRORCODE
	}
	return rply
}

//获取指定的区间的值
func LRange(key string, start int64, end int64) []interface{} {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Values(conn.Do(LRANGE, key, start, end))
	if err != nil {
		log.Error("redis LRange值失败,key: "+key+" ,err: ", err)
		return nil
	}
	return values
}

//设置超时时间
func Expire(key string, seconds int) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(EXPIRE, key, seconds))
	if err != nil {
		log.Error("redis Expire值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return values
}

//设置不存在key的值
func Setnx(key string, value string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(SETNX, key, value))
	if err != nil {
		log.Error("redis Setnx值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return values
}

//设置值并且设置超时时间
func Setex(key string, seconds int, value string) string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.String(conn.Do(SETEX, key, seconds, value))
	if err != nil {
		log.Error("redis Setex失败,key:", key, " err: ", err)
		return ERRORSTRINGCODE
	}
	return values
}

//删除
func Del(key ...interface{}) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(DEL, key...))
	if err != nil {
		log.Error("redis Del失败,key:", key, " err:", err)
		return ERRORCODE
	}
	return values
}

//删除
func DelArrayKeys(keys []string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(DEL, redis.Args{}.AddFlat(keys)...))
	if err != nil {
		log.Error("redis DelArrayKeys失败,key:", keys, " err:", err)
		return ERRORCODE
	}
	return values
}

//删除
func HDel(key string, fields ...interface{}) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(HDEL, redis.Args{}.Add(key).Add(fields...)...))
	if err != nil {
		log.Error("redis HDel失败,key:", key, " err:", err)
		return ERRORCODE
	}
	return values
}

//删除
func HDelArrayFields(key string, fields []string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(HDEL, redis.Args{}.Add(key).AddFlat(fields)...))
	if err != nil {
		log.Error("redis HDel失败,key:", key, " err:", err)
		return ERRORCODE
	}
	return values
}

func HExits(key string, filed string) (exits bool, err error) {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(HEXISTS, redis.Args{}.Add(key).Add(filed)...))
	if err != nil {
		log.Error("redis HExists failed, key: ", key, ", err: ", err)
		return false, err
	}
	return values > 0, nil
}

//指定key的value大小
func LLen(key string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(LLEN, key))
	if err != nil {
		log.Error("redis LLen失败,key:", key, " err: ", err)
		return ERRORCODE
	}
	return values
}

//让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
func LTrim(key string, start int64, end int64) string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.String(conn.Do(LTRIM, key, start, end))
	if err != nil {
		log.Error("redis LTrim失败,key:", key, " err: ", err)
		return ERRORSTRINGCODE
	}
	return values
}

// 设置指定key的里面为field对应的值
func HSet(key string, field string, value string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(HSET, key, field, value))
	if err != nil {
		log.Error("redis HSet失败,key:"+key+", field: "+field+" err: ", err)
		return ERRORCODE
	}
	return values
}

// 获取指定key的里面为field对应的值
func HGetStr(key string, field string) string {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.String(conn.Do(HGET, key, field))
	if err != nil {
		log.Error("redis HGetStr失败,key:"+key+", field: "+field, " err:", err)
		return ERRORSTRING
	}
	return value
}

// 获取指定key的里面为field对应的值
func HMGet(key string, fields ...interface{}) []interface{} {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Values(conn.Do(HMGET, redis.Args{}.Add(key).Add(fields...)...))
	if err != nil {
		log.Error("redis HMGet失败,key:", key, " err:", err)
		return nil
	}
	return values
}

// 获取指定key对应的值
func HGetAll(key string) (map[string]string, error) {
	conn := pool.Get()
	defer conn.Close()
	return redis.StringMap(conn.Do(HGETALL, key))
}

// 获取指定key对应的值
func HGetAllMap(key string) map[string]string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.StringMap(conn.Do(HGETALL, key))
	if err != nil {
		log.Error("redis HGetAllMap失败,key:", key, " err: ", err)
		return nil
	}
	return values
}

// Increments the number stored at key
func HIncrby(key string, field string, count int32) (reply int64, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int64(conn.Do(HINCRBY, key, field, count))
	return reply, err
}

// HIncrbyFloat
func HIncrbyFloat(key string, field string, incrby float64) (reply float64, err error) {
	conn := pool.Get()
	defer conn.Close()
	return redis.Float64(conn.Do(HINCRBYFLOAT, key, field, incrby))
}

// set the key fields values
func HMSet(key string, value map[string]interface{}) string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.String(conn.Do(HMSET, redis.Args{}.Add(key).AddFlat(value)...))
	if err != nil {
		log.Error("redis HMSet失败,key:", key, " value: ", value, " err: ", err)
		return ERRORSTRINGCODE
	}
	return values
}

// set the key fields values
func HMSetStringMap(key string, value map[string]string) string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.String(conn.Do(HMSET, redis.Args{}.Add(key).AddFlat(value)...))
	if err != nil {
		log.Error("redis HMSet失败,key:", key, " err: ", err)
		return ERRORSTRINGCODE
	}
	return values
}

// set the key field value
func HMSetSingle(key string, field string, value string) string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.String(conn.Do(HMSET, key, field, value))
	if err != nil {
		log.Error("redis HMSet失败,key:"+key+", field: "+field+" err: ", err)
		return ERRORSTRINGCODE
	}
	return values
}

// EXPIREAT key timestamp
func ExpireAt(key string, time int64) int {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int(conn.Do(EXPIREAT, key, time))
	if err != nil {
		log.Error("redis EXPIREAT失败,key:", key, " err: ", err)
		return ERRORCODE
	}
	return values
}

// add the map values to key -- ZADD page_rank 9 baidu.com
func ZAdd(key string, score int64, value string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(ZADD, key, score, value))
	if err != nil {
		log.Error("redis ZADD失败,key:", key, " err: ", err)
		return ERRORCODE
	}
	return values
}

// Returns the number of elements in the sorted set at key with a score between min and max.
func ZCount(key, min, max string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(ZCOUNT, key, min, max))
	if err != nil && err != ErrNil { // nil return is not an error
		log.Error("reids ZCOUNT failed, key: ", key, ", err: ", err)
		return ERRORCODE
	}
	return values
}

//获取指定的区间的值
func ZRange(key string, start int64, end int64) []string {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Strings(conn.Do(ZRANGE, key, start, end))
	if err != nil {
		log.Error("redis ZRange值失败,key: "+key+" ,err: ", err)
		return nil
	}
	return values
}

//返回有序集 key 的基数
func ZCard(key string) int64 {
	conn := pool.Get()
	defer conn.Close()
	values, err := redis.Int64(conn.Do(ZCARD, key))
	if err != nil {
		log.Error("redis ZCARD值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return values
}

//移除有序集 key 中的一个成员，不存在的成员将被忽略。
func ZRem(key string, member string) int64 {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.Int64(conn.Do(ZREM, key, member))
	if err != nil {
		log.Error("redis ZREM值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return value
}

//返回有序集 key 中， score 值介于 max 和 min 之间(默认包括等于 max 或 min )的所有的成员
func ZRevRangeByScore(key string, max, min string) (values []string, err error) {
	conn := pool.Get()
	defer conn.Close()
	values, err = redis.Strings(conn.Do(ZREVRANGEBYSCORE, key, max, min))
	if err != nil {
		log.Error("redis ZREVRANGEBYSCORE值失败,key: "+key+" ,err: ", err)
		return values, err
	}
	return values, nil
}

//返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员
func ZRangeByScore(key string, max, min string) (values []string, err error) {
	conn := pool.Get()
	defer conn.Close()
	values, err = redis.Strings(conn.Do(ZRANGEBYSCORE, key, max, min))
	if err != nil {
		log.Error("redis ZRANGEBYSCORE值失败,key: "+key+" ,err: ", err)
		return values, err
	}
	return values, nil
}

//返回哈希表 key 中域的数量
func HLen(key string) int64 {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.Int64(conn.Do(HLEN, key))
	if err != nil {
		log.Error("redis HLEN值失败,key: "+key+" ,err: ", err)
		return ERRORCODE
	}
	return value
}

// 返回conn给timer使用
func GetRedis() redis.Conn {
	conn := pool.Get()
	return conn
}

// HMSetStruct sets the struct to the hash identified by key
func HMSetStruct(key string, s interface{}) (reply string, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.String(conn.Do(HMSET, redis.Args{}.Add(key).AddFlat(s)...))
	if err != nil {
		log.Error("redis HMSet failed,key:", key, " s: ", s, " err: ", err)
		return reply, err
	}
	return reply, nil
}

// SAdd adds the
func SAdd(key string, s string) (reply int, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int(conn.Do(SADD, key, s))
	if err != nil {
		log.Error("redis SADD failed,key:", key, " s: ", s, " err: ", err)
		return reply, err
	}
	return reply, nil
}

func SRem(key string, s string) (reply int, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int(conn.Do(SREM, key, s))
	if err != nil {
		log.Error("redis SREM failed,key:", key, " s: ", s, " err: ", err)
		return reply, err
	}
	return reply, nil
}

func SMembers(key string) (reply []string, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Strings(conn.Do(SMEMBERS, key))
	if err != nil {
		log.Error("redis SMEMBERS failed, key:", key, ", err:", err)
		return nil, err
	}
	return reply, nil
}

func SIsmember(key, s string) (reply int, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int(conn.Do(SISMEMBER, key, s))
	if err != nil {
		log.Error("redis SREM failed,key:", key, " s: ", s, " err: ", err)
		return reply, err
	}
	return reply, nil
}

func SCard(key string) (reply int64, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int64(conn.Do(SCARD, key))
	if err != nil {
		log.Error("redis SCARD failed, key:", key, ", err:", err)
		return ERRORCODE, err
	}
	return reply, nil
}

// 3.0以前的版本不支持 [count] 参数
func SPop(key string) (reply string, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.String(conn.Do(SPOP, key))
	if err != nil {
		log.Error("redis SPOP failed, key:", key, ", err:", err)
		return ERRORSTRING, err
	}
	return reply, nil
}

// Get gets a string value
func Get(key string) (string, error) {
	conn := pool.Get()
	defer conn.Close()
	return redis.String(conn.Do(GET, key))
}

// HGet gets the field value in hashmap
func HGet(key, field string) (string, error) {
	conn := pool.Get()
	defer conn.Close()
	return redis.String(conn.Do(HGET, key, field))
}

// 获取指定key的里面为field对应的值
func HMGetStr(key string, field string) string {
	conn := pool.Get()
	defer conn.Close()
	value, err := redis.String(conn.Do(HGET, key, field))
	if err == redis.ErrNil {
		log.Warn("redis HGetStr失败, key不存在, key:"+key+", field: "+field, " err:", err)
		return NILSTRING
	}
	if err != nil {
		log.Error("redis HGetStr失败,key:"+key+", field: "+field, " err:", err)
		return ERRORSTRING
	}
	return value
}

func Incr(key string) (reply int64, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int64(conn.Do(INCR, key))
	return reply, err
}

// Increments the number stored at key
func Incrby(key string, count int32) (reply int64, err error) {
	conn := pool.Get()
	defer conn.Close()
	reply, err = redis.Int64(conn.Do(INCRBY, key, count))
	return reply, err
}

// Exists returns the count of if key exists
func Exists(key ...interface{}) (int, error) {
	conn := pool.Get()
	defer conn.Close()
	count, err := redis.Int(conn.Do(EXISTS, key...))
	if err != nil {
		log.Error("redis Exists failed, error:", err, " Key:", key)
		return 0, err
	}
	return count, nil
}
