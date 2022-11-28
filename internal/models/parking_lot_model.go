package models

type ParkingLotModel struct {
	Id               int          `json:"id,omitempty"`
	Name             string       `json:"name,omitempty"`
	Address          string       `json:"address,omitempty"`
	MaxCapacity      int          `json:"max_capacity,omitempty"`
	Interval         int          `json:"interval,omitempty"`
	PricePerInterval float64      `json:"price_per_interval,omitempty"`
	Tiers            []*TierModel `json:"tiers,omitempty"`
}

type CreateParkingLotModel struct {
	Name             string            `json:"name,omitempty"`
	Address          string            `json:"address,omitempty"`
	MaxCapacity      int               `json:"max_capacity,omitempty"`
	Interval         int               `json:"interval,omitempty"`
	PricePerInterval float64           `json:"price_per_interval,omitempty"`
	Tiers            []CreateTierModel `json:"tiers,omitempty"`
}
