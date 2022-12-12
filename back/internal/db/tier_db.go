package db

import (
	"github.com/carlosabdoamaral/valet_solution/common"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
)

func CreateTiers(tiers []*models.CreateTierModel) (err error) {
	var (
		db    = common.Database
		query = `INSERT INTO discount_tier_tb(id_parking_lot, title, discount_value) VALUES ($1, $2, $3);`
	)

	for _, tier := range tiers {
		_, err := db.Exec(query, tier.IdParkingLot, tier.Title, tier.DiscountValue)
		if err != nil {
			return err
		}
	}

	return nil
}

func DeleteTiers(ids []*models.IdModel) (err error) {
	var (
		db    = common.Database
		query = `DELETE FROM discount_tier_tb WHERE id = $1`
	)

	for _, id := range ids {
		_, err := db.Exec(query, id.Id)
		if err != nil {
			return err
		}
	}

	return nil
}
