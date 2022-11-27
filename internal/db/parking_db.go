package db

import (
	"github.com/carlosabdoamaral/valet_solution/common"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
)

func CreateParkingLot(parkingLot *models.CreateParkingLotModel) (err error) {
	var (
		db    = common.Database
		query = `INSERT INTO parking_lot_tb(name, address, max_capacity, interval, price_per_interval) VALUES ($1, $2, $3, $4, $5)`
	)

	_, err = db.Query(query, parkingLot.Name, parkingLot.Address, parkingLot.MaxCapacity, parkingLot.Interval, parkingLot.PricePerInterval)
	if err != nil {
		return err
	}

	return nil
}

func GetParkingLot(id int) (*models.ParkingLotModel, error) {
	var (
		db    = common.Database
		res   = &models.ParkingLotModel{}
		query = `SELECT id, name, address, max_capacity, interval, price_per_interval FROM parking_lot_tb WHERE id = $1;`
	)

	rows, err := db.Query(query, id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		rows.Scan(
			&res.Id,
			&res.Name,
			&res.Address,
			&res.MaxCapacity,
			&res.Interval,
			&res.PricePerInterval,
		)

	}

	return res, err
}

func UpdateParkingLot(parkingLot *models.ParkingLotModel) (err error) {
	var (
		db    = common.Database
		query = `
		UPDATE parking_lot_tb
		SET
			name = $1,
			address = $2,
			max_capacity = $3,
			interval = $4,
			price_per_interval = $5
		WHERE
			id = $6
		;`
	)

	_, err = db.Query(query, parkingLot.Name, parkingLot.Address, parkingLot.MaxCapacity, parkingLot.Interval, parkingLot.PricePerInterval, parkingLot.Id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteParkingLot(id int) (err error) {
	var (
		db    = common.Database
		query = `DELETE FROM parking_lot_tb WHERE id = $1;`
	)

	_, err = db.Query(query, id)
	if err != nil {
		return err
	}

	return nil
}
