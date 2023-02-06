package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/carlosabdoamaral/valet_solution/internal/db"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
	"github.com/carlosabdoamaral/valet_solution/internal/utils"
	"github.com/gin-gonic/gin"
)

func InsertCarHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	model := &models.CreateCarModel{}
	err = json.Unmarshal(body, &model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.InsertCarIntoParkingLot(model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, "SUCCESS")
}

func GetCarByIdHandler(context *gin.Context) {
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

	res, err := db.GetCarById(id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusOK, res)
}

func GetCarsByParkingLotIdHandler(context *gin.Context) {
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

	res, err := db.GetCarsFromParkingLot(id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, res)
}

func UpdateCarHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	model := &models.UpdateCarModel{}
	err = json.Unmarshal(body, &model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	res, err := db.UpdateCar(model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, res)
}

func RemoveCarFromParkingLotHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	model := &models.RemoveCarFromParkingLotModel{}
	err = json.Unmarshal(body, &model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.RemoveCarFromParkingLot(model)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusOK, "Removed")
}

func DeleteCarHandler(context *gin.Context) {
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

	err = db.DeleteCar(id)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusOK, "Removed")
}

func GenerateExtract(context *gin.Context) {
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

	extract, err := utils.GenerateExtract(id)
	if err != nil {
		context.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	context.IndentedJSON(http.StatusOK, extract)
}
