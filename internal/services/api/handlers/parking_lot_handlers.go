package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/carlosabdoamaral/valet_solution/internal/db"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
	"github.com/gin-gonic/gin"
)

func CreateParkingLotHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	parkingLotModel := &models.CreateParkingLotModel{}
	err = json.Unmarshal(body, &parkingLotModel)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.CreateParkingLot(parkingLotModel)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, "SUCCESS")
}

func GetParkingLotHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	id := &models.IdModel{}
	err = json.Unmarshal(body, &id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	res, err := db.GetParkingLot(id.Id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, res)
}

func UpdateParkingLotHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	parkingLotModel := &models.ParkingLotModel{}
	err = json.Unmarshal(body, &parkingLotModel)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.UpdateParkingLot(parkingLotModel)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusOK, "SUCCESS")
}

func DeleteParkingLotHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	id := &models.IdModel{}
	err = json.Unmarshal(body, &id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.DeleteParkingLot(id.Id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, "SUCCESS")
}
