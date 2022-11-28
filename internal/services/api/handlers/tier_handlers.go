package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/carlosabdoamaral/valet_solution/internal/db"
	"github.com/carlosabdoamaral/valet_solution/internal/models"
	"github.com/gin-gonic/gin"
)

func CreateTiersHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	tiers := []*models.CreateTierModel{}
	err = json.Unmarshal(body, &tiers)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.CreateTiers(tiers)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, "SUCCESS")
}

func DeleteTiersHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	tiers := []*models.IdModel{}
	err = json.Unmarshal(body, &tiers)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	err = db.DeleteTiers(tiers)
	if err != nil {
		context.IndentedJSON(http.StatusConflict, err.Error())
		return
	}

	context.IndentedJSON(http.StatusCreated, "SUCCESS")
}
