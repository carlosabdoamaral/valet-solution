package main

import (
	"log"

	"github.com/carlosabdoamaral/valet_solution/internal/db"
	"github.com/carlosabdoamaral/valet_solution/internal/services/api/handlers"
	"github.com/carlosabdoamaral/valet_solution/internal/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	err := utils.ReadEnvFile()
	if err != nil {
		log.Fatalln(err.Error())
		return
	}

	err = db.Connect()
	if err != nil {
		log.Fatalln(err.Error())
		return
	}

	router := gin.Default()

	parking := router.Group("/parking")
	parking.POST("/create", handlers.CreateParkingLotHandler)
	parking.POST("/details", handlers.GetParkingLotHandler)
	parking.PUT("/update", handlers.UpdateParkingLotHandler)
	parking.DELETE("/delete", handlers.DeleteParkingLotHandler)

	tier := router.Group("/tier")
	tier.POST("/create", handlers.CreateTiersHandler)
	tier.DELETE("/delete", handlers.DeleteTiersHandler)

	router.Run()
}
