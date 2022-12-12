package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"

	"github.com/carlosabdoamaral/valet_solution/common"
)

func Connect() error {
	db, err := sql.Open(common.DB_DRIVER, fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", common.DB_USER, common.DB_PASS, common.DB_NAME))
	if err != nil {
		return err
	}

	common.Database = db
	return nil
}
