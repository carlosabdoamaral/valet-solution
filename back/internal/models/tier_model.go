package models

type TierModel struct {
	Id            int     `json:"id,omitempty"`
	IdParkingLot  int     `json:"id_parking_lot,omitempty"`
	Title         string  `json:"title,omitempty"`
	DiscountValue float64 `json:"discount,omitempty"`
}

type CreateTierModel struct {
	IdParkingLot  int     `json:"id_parking_lot,omitempty"`
	Title         string  `json:"title,omitempty"`
	DiscountValue float64 `json:"discount,omitempty"`
}
