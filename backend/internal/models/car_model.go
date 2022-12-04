package models

import "time"

type CarModel struct {
	Id           int       `json:"id,omitempty"`
	LicensePlate string    `json:"license_plate,omitempty"`
	DidPaid      bool      `json:"did_paid,omitempty"`
	EntranceAt   time.Time `json:"entrance_at,omitempty"`
	ExitAt       time.Time `json:"exit_at,omitempty"`

	ParkingLot struct {
		Id   int    `json:"id,omitempty"`
		Name string `json:"name,omitempty"`
	} `json:"parking_lot"`

	DiscountTier struct {
		Id    int     `json:"id,omitempty"`
		Title string `json:"title,omitempty"`
		Value float64 `json:"value,omitempty"`
	} `json:"discount_tier"`
}

type CreateCarModel struct {
	IdParkingLot   int       `json:"id_parking_lot,omitempty"`
	IdDiscountTier int       `json:"id_discount_tier,omitempty"`
	LicensePlate   string    `json:"license_plate,omitempty"`
	DidPaid        bool      `json:"did_paid,omitempty"`
	EntranceAt     time.Time `json:"entrance_at,omitempty"`
	ExitAt         time.Time `json:"exit_at,omitempty"`
}

type UpdateCarModel struct {
	Id             int       `json:"id,omitempty"`
	IdParkingLot   int       `json:"id_parking_lot,omitempty"`
	IdDiscountTier int       `json:"id_discount_tier,omitempty"`
	LicensePlate   string    `json:"license_plate,omitempty"`
	DidPaid        bool      `json:"did_paid,omitempty"`
	EntranceAt     time.Time `json:"entrance_at,omitempty"`
	ExitAt         time.Time `json:"exit_at,omitempty"`
}

type RemoveCarFromParkingLotModel struct {
	Id      int       `json:"id,omitempty"`
	DidPaid bool      `json:"did_paid,omitempty"`
	ExitAt  time.Time `json:"exit_at,omitempty"`
}
