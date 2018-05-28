package dao

import "seed.com/mushroom/proto/stock"

//DBFunds 资金
type DBFunds struct {
	ID     string               `json:"id,omitempty" bson:"_id"`
	Funds  []*stock.DBFundsData `json:"funds,omitempty" bson:"funds"`
	Create int64                `json:"create,omitempty" bson:"create"`
	Update int64                `json:"update,omitempty" bson:"update"`
}
