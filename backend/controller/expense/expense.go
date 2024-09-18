package expense

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /get-expense/:id
func GetExpense(c *gin.Context) {
	ID := c.Param("id")
	var rentFee entity.RentFee
	var waterFee entity.WaterFee
	var electricityFee entity.ElectricityFee

	db := config.DB()

	// ดึงข้อมูล RentFee
	if err := db.First(&rentFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "RentFee not found"})
		return
	}

	// ดึงข้อมูล WaterFee
	if err := db.First(&waterFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WaterFee not found"})
		return
	}

	// ดึงข้อมูล ElectricityFee
	if err := db.First(&electricityFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ElectricityFee not found"})
		return
	}
	/*
		// สร้างโครงสร้าง Expense
		expense := entity.Expense{
			RentFee:        rentFee,
			WaterFee:       waterFee,
			ElectricityFee: electricityFee,
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Expense fetched successfully",
			"data":    expense,
		})
	*/
}
