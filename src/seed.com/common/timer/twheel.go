/**
 * 依据时间轮构造定时器
 */
package timer

import (
	//"container/list"
	"time"
	"fmt"
	"sync"
	"seed.com/common/utils"
)

type Task func(args ...interface{}) error

type TimeWheel struct {
	interval time.Duration
	ticker   *time.Ticker
	cursor 	int	//游标
	slotNum int //槽数
	taskMap sync.Map		//存储回调函数

}

type Options struct {

}

func NewTimer(options *Options) *TimeWheel {
	return &TimeWheel{

	}
}

// 新增定时器
func (tw *TimeWheel) AddTimer(date string) {

	// 计算圈数和槽位

}

// RemoveTimer 移除定时器
func (tw *TimeWheel) RemoveTimer() {

}

// GraceCancel 取消
func (tw *TimeWheel) GraceCancel() {

}

// Start 开始定时器
func (tw *TimeWheel) Start() {
	tw.ticker = time.NewTicker(tw.interval)
	go tw.startTimer()
}

// tickerHandler 开始查找遍历任务并回调执行
func (tw *TimeWheel) tickerHandler() {

}

func (tw *TimeWheel) startTimer() {
	for {
		select {
			case <- tw.ticker.C:
				fmt.Println("===>>ticker:", time.Now().Unix())
		}
	}
}
