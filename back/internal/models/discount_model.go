package models

type DiscountTierModel struct {
	Id            int    `json:"id,omitempty"`
	IdParkingLot  int    `json:"id_parking_lot,omitempty"`
	Title         string `json:"title,omitempty"`
	DiscountValue int    `json:"discount_value,omitempty"`
}

type CreateDiscountTierModel struct {
	IdParkingLot  int    `json:"id_parking_lot,omitempty"`
	Title         string `json:"title,omitempty"`
	DiscountValue int    `json:"discount_value,omitempty"`
}
