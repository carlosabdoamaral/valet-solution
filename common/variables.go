package common

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

var (
	MOCK_MODE          = false
	IS_RUNNING_LOCALLY = false
)

var (
	API_PORT = 8080
	Router   = &gin.Engine{}
)

var (
	Database  = &sql.DB{}
	DB_USER   = ""
	DB_PASS   = ""
	DB_HOST   = ""
	DB_NAME   = ""
	DB_PORT   = ""
	DB_SSL    = ""
	DB_URL    = ""
	DB_DRIVER = "postgres"
)
