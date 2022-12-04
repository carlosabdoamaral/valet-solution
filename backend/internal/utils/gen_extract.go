package utils

import (
	"math"

	"github.com/carlosabdoamaral/valet_solution/internal/db"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
)

func GenerateExtract(id *models.IdModel) (*models.ExtractModel, error) {
	var (
		res = &models.ExtractModel{}
	)

	car, err := db.GetCarById(id)
	if err != nil {
		return nil, err
	} else {
		res.Car.Id = car.Id
		res.Car.EntranceAt = car.EntranceAt
		res.Car.ExitAt = car.ExitAt
		res.Car.DiscountTier.Id = car.DiscountTier.Id
		res.Car.DiscountTier.Title = car.DiscountTier.Title
		res.Car.DiscountTier.Value = car.DiscountTier.Value
	}

	parkingLot, err := db.GetParkingLot(car.ParkingLot.Id)
	if err != nil {
		return nil, err
	} else {
		res.ParkingLot.Id = parkingLot.Id
		res.ParkingLot.Name = parkingLot.Name
		res.ParkingLot.Address = parkingLot.Address
		res.ParkingLot.MaxValue = parkingLot.MaxValue
		res.ParkingLot.Interval = float64(parkingLot.Interval)
		res.ParkingLot.PricePerInterval = parkingLot.PricePerInterval
	}

	res.Car.Interval = res.Car.ExitAt.Sub(res.Car.EntranceAt).Minutes()
	priceMultiplier := math.Ceil(res.Car.Interval / res.ParkingLot.Interval)
	res.Price.FullValue = res.ParkingLot.PricePerInterval * priceMultiplier

	// Se o valor total for menor que zero
	if res.Price.FullValue <= 0 {
		res.Price.FullValue = 0
		res.Price.FinalValue = 0
		return res, err
	}

	// Se o valor total for maior que o valor máximo
	if res.Price.FullValue >= res.ParkingLot.MaxValue {
		res.Price.FullValue = res.ParkingLot.MaxValue
	}

	res.Price.FinalValue = res.Price.FullValue - res.Car.DiscountTier.Value

	return res, err
}
