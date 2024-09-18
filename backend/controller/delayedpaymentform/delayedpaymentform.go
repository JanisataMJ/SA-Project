package delayedpaymentform

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func DelayedPaymentFormUI(c *gin.Context) {
	var delayedpaymentform entity.DelayedPaymentForm

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&delayedpaymentform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา reservation ด้วย id
	var reservation entity.Reservation
	if err := db.First(&reservation, delayedpaymentform.ReservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	// สร้าง repairing
	d := entity.DelayedPaymentForm{
		Electricly_Bill:	delayedpaymentform.Electricly_Bill,
		Water_Bill:			delayedpaymentform.Water_Bill,
		Because_Of:			delayedpaymentform.Because_Of,
		Due_Date:			delayedpaymentform.Due_Date,
		Status:   			"รอดำเนินการ",
		ReservationID:  	delayedpaymentform.ReservationID,
	}

	// บันทึก
	if err := db.Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": d})
}

// GET /Repairing/:id
func GetDelayedPaymentForm(c *gin.Context) {
	ID := c.Param("id")
	var delayedpaymentform entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").First(&delayedpaymentform, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}

// GET /Repairings
func ListDelayedPaymentForms(c *gin.Context) {
	var delayedpaymentform []entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").Find(&delayedpaymentform).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}


// PATCH /repairings
func UpdateDelayedPaymentForm(c *gin.Context) {
	var delayedpaymentform entity.DelayedPaymentForm
	id := c.Param("id")

	db := config.DB()
	if err := db.First(&delayedpaymentform, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	if err := c.ShouldBindJSON(&delayedpaymentform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	if err := db.Save(&delayedpaymentform).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}