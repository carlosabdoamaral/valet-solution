package db

import (
	"github.com/carlosabdoamaral/valet_solution/common"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
)

func InsertCarIntoParkingLot(car *models.CreateCarModel) (err error) {
	var (
		db    = common.Database
		query = `
		INSERT INTO car_tb(
			ID_PARKING_LOT,
			ID_DISCOUNT_TIER,
			LICENSE_PLATE,
			ENTRANCE_AT,
			EXIT_AT
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5
		);`
	)

	_, err = db.Query(query, car.IdParkingLot, car.IdDiscountTier, car.LicensePlate, car.EntranceAt, car.ExitAt)
	if err != nil {
		return err
	}

	return nil
}

func GetCarsFromParkingLot(parkingLotId *models.IdModel) ([]*models.CarModel, error) {
	var (
		db    = common.Database
		query = `
		SELECT
			ct.id,
			ct.license_plate,
			ct.did_paid,
			ct.entrance_at,
			ct.exit_at,
			plt.id,
			plt.name,
			dtt.id,
			dtt.title,
			dtt.discount_value
		FROM car_tb ct
		RIGHT JOIN parking_lot_tb plt on ct.id_parking_lot = plt.id
		RIGHT OUTER JOIN discount_tier_tb dtt on dtt.id = ct.id_discount_tier
		WHERE ct.id_parking_lot = $1;`
		res = []*models.CarModel{}
	)

	rows, err := db.Query(query, parkingLotId.Id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		model := &models.CarModel{}
		err = rows.Scan(
			&model.Id,
			&model.LicensePlate,
			&model.DidPaid,
			&model.EntranceAt,
			&model.ExitAt,
			&model.ParkingLot.Id,
			&model.ParkingLot.Name,
			&model.DiscountTier.Id,
			&model.DiscountTier.Title,
			&model.DiscountTier.Value,
		)
		if err != nil {
			return nil, err
		}

		res = append(res, model)
	}

	return res, nil
}

func GetCarById(carId *models.IdModel) (*models.CarModel, error) {
	var (
		db    = common.Database
		query = `
		SELECT
			ct.id,
			ct.license_plate,
			ct.did_paid,
			ct.entrance_at,
			ct.exit_at,
			plt.id,
			plt.name,
			dtt.id,
			dtt.title,
			dtt.discount_value
		FROM car_tb ct
		RIGHT JOIN parking_lot_tb plt on ct.id_parking_lot = plt.id
		RIGHT OUTER JOIN discount_tier_tb dtt on dtt.id = ct.id_discount_tier
		WHERE ct.id = $1;`
		res = &models.CarModel{}
	)

	rows, err := db.Query(query, carId.Id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		model := &models.CarModel{}
		err = rows.Scan(
			&model.Id,
			&model.LicensePlate,
			&model.DidPaid,
			&model.EntranceAt,
			&model.ExitAt,
			&model.ParkingLot.Id,
			&model.ParkingLot.Name,
			&model.DiscountTier.Id,
			&model.DiscountTier.Title,
			&model.DiscountTier.Value,
		)
		if err != nil {
			return nil, err
		}

		res = model
	}

	return res, nil
}

func UpdateCar(car *models.UpdateCarModel) (*models.CarModel, error) {
	var (
		db    = common.Database
		query = `
		UPDATE 
			car_tb
		SET
			id_parking_lot = $1,
			id_discount_tier = $2,
			license_plate = $3,
			did_paid = $4,
			entrance_at = $5,
			exit_at = $6
		WHERE
			id = $7
		`
	)

	_, err := db.Query(
		query,
		car.IdParkingLot,
		car.IdDiscountTier,
		car.LicensePlate,
		car.DidPaid,
		car.EntranceAt,
		car.ExitAt,
		car.Id,
	)
	if err != nil {
		return nil, err
	}

	res, err := GetCarById(&models.IdModel{Id: car.Id})
	if err != nil {
		return nil, err
	}

	return res, nil
}

func RemoveCarFromParkingLot(car *models.RemoveCarFromParkingLotModel) error {
	var (
		db    = common.Database
		query = `
		UPDATE car_tb
		SET did_paid = $1, exit_at = $2
		WHERE id = $3;`
	)

	_, err := db.Exec(query, car.DidPaid, car.ExitAt, car.Id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteCar(carId *models.IdModel) error {
	var (
		db    = common.Database
		query = `
		DELETE FROM car_tb
		WHERE id = $1;`
	)

	_, err := db.Exec(query, carId)
	if err != nil {
		return err
	}

	return nil
}
