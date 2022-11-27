package models

import "time"

type CarModel struct {
	Id             int       `json:"id,omitempty"`
	IdParkingLot   int       `json:"id_parking_lot,omitempty"`
	IdDiscountTier int       `json:"id_discount_tier,omitempty"`
	LicensePlate   string    `json:"license_plate,omitempty"`
	DidPaid        bool      `json:"did_paid,omitempty"`
	EntranceAt     time.Time `json:"entrance_at,omitempty"`
	ExitAt         time.Time `json:"exit_at,omitempty"`
}

type CreateCarModel struct {
	IdParkingLot   int       `json:"id_parking_lot,omitempty"`
	IdDiscountTier int       `json:"id_discount_tier,omitempty"`
	LicensePlate   string    `json:"license_plate,omitempty"`
	DidPaid        bool      `json:"did_paid,omitempty"`
	EntranceAt     time.Time `json:"entrance_at,omitempty"`
	ExitAt         time.Time `json:"exit_at,omitempty"`
}
