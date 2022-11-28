package models

import "time"

type IdModel struct {
	Id int `json:"id,omitempty"`
}

type ExtractModel struct {
	ParkingLot struct {
		Id               int     `json:"id,omitempty"`
		Name             string  `json:"name,omitempty"`
		Address          string  `json:"address,omitempty"`
		MaxValue         float64 `json:"max_value,omitempty"`
		Interval         float64 `json:"interval,omitempty"`
		PricePerInterval float64 `json:"price_per_interval,omitempty"`
	} `json:"parking_lot,omitempty"`

	Car struct {
		Id           int       `json:"id,omitempty"`
		EntranceAt   time.Time `json:"entrance_at,omitempty"`
		ExitAt       time.Time `json:"exit_at,omitempty"`
		Interval     float64   `json:"time,omitempty"`
		DiscountTier struct {
			Id    int     `json:"id,omitempty"`
			Title string  `json:"title,omitempty"`
			Value float64 `json:"value,omitempty"`
		} `json:"discount_tier,omitempty"`
	} `json:"car,omitempty"`

	Price struct {
		FullValue  float64 `json:"full_value,omitempty"`
		FinalValue float64 `json:"final_value,omitempty"`
	} `json:"price,omitempty"`
}
