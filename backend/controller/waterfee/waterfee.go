package waterfee

import (
	"net/http"

	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/config"
	"github.com/gin-gonic/gin"
)

// POST /create-water-fee
func CreateWaterFee(c *gin.Context) {
	var waterFee entity.WaterFee

	if err := c.ShouldBindJSON(&waterFee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&waterFee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "WaterFee created", "data": waterFee})
}

// GET /get-water-fee/:id
func GetWaterFee(c *gin.Context) {
	ID := c.Param("id")
	var waterFee entity.WaterFee

	db := config.DB()
	if err := db.First(&waterFee, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WaterFee not found"})
		return
	}

	c.JSON(http.StatusOK, waterFee)
}

// GET /list-water-fees
func ListWaterFees(c *gin.Context) {
	var waterFees []entity.WaterFee

	db := config.DB()
	if err := db.Find(&waterFees).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, waterFees)
}
