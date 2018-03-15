package utils

// import (
// 	"reflect"
// 	"runtime/debug"
// 	"time"

// 	"edroity.com/server/common/log"
// )

// type CallbackFunc func(t time.Time)

// var selectSet []reflect.SelectCase
// var funcSet []CallbackFunc

// /*
// RegisterTicker registers a ticker that will call fn on a duration of time defined by d's basis
// */
// func RegisterTickerBySecond(d int, fn CallbackFunc) error {
// 	return RegisterTicker(time.Duration(d)*time.Second, fn)
// }

// /*
// RegisterTicker registers a ticker that will call fn on a duration of time defined by d's basis
// */
// func RegisterTicker(d time.Duration, fn CallbackFunc) error {
// 	if d <= 0 {
// 		return log.Error("You can not register ticker with 0 duration!")
// 	}
// 	selectSet = append(selectSet, reflect.SelectCase{
// 		Dir:  reflect.SelectRecv,
// 		Chan: reflect.ValueOf(time.NewTicker(d).C),
// 	})
// 	funcSet = append(funcSet, fn)
// 	log.Trace("selectSet:", selectSet, " funcSet:", funcSet)
// 	return nil
// }

// /*
// Start starts the framework, it blocks
// */
// func Start() error {
// 	defer func() { //reflect.Select may panic
// 		if e := recover(); e != nil {
// 			log.Critical("panic in processor: %s: %s", e, debug.Stack())
// 		}
// 	}()
// 	if len(funcSet) == 0 || len(selectSet) == 0 {
// 		return log.Error("You should register at least one ticker before you call this function!")
// 	}
// 	if len(funcSet) != len(selectSet) {
// 		return log.Error("There is something wrong with internal data.")
// 	}
// 	for {
// 		from, valValue, ok := reflect.Select(selectSet)
// 		if !ok {
// 			log.Critical("the ticker channel is closed.")
// 			continue
// 		}
// 		t := valValue.Interface().(time.Time)
// 		if from >= len(funcSet) {
// 			log.Critical("reflect.Select returned a wired index:", from, " len(funcSet):", len(funcSet),
// 				" len(selectSet):", len(selectSet))
// 			continue //TODO:this unlikely to happen
// 		}
// 		go funcSet[from](t)
// 	}
// 	return nil
// }
