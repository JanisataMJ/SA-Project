package dorm

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /dorm/:id
func GetDorm(c *gin.Context) {
	ID := c.Param("id")
	var dorm entity.Dorm

	db := config.DB()
	results := db.Preload("Gender").First(&dorm, ID) 
	//gender คือตารางที่มีความสัมพันธ์แบบ1ต่อหลายกับ user 
	//และตารางuserมีidของgender เป็นFK ภายในตาราง
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if dorm.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, dorm)
}

// GET /dorms
func ListDorms(c *gin.Context) {
	var dorms []entity.Dorm

	db := config.DB()
	results := db.Preload("Gender").Find(&dorms)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, dorms)
}

// PUT /dorm/:id
func UpdateDorm(c *gin.Context) {
	var dorm entity.Dorm

	DormID := c.Param("id")

	db := config.DB()
	result := db.First(&dorm, DormID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&dorm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&dorm)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}