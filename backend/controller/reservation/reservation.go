package reservation

import (
	"fmt"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /CreateReservation
func CreateReservation(c *gin.Context) {
	var reservation entity.Reservation

	// Bind เข้าตัวแปร reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	db := config.DB()

	// ฟังก์ชันช่วยเพื่อตรวจสอบการมีอยู่ของ Dorm, Room, และ Student
	checkExists := func(table string, id uint) error {
		var count int64
		if err := db.Table(table).Where("id = ?", id).Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return fmt.Errorf("%s not found", table)
		}
		return nil
	}

	// ตรวจสอบ Dorm, Room และ Student
	if err := checkExists("dorms", reservation.DormID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := checkExists("rooms", reservation.RoomID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := checkExists("students", reservation.StudentID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// สร้างการจอง
	if err := db.Create(&reservation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create reservation"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Reservation created successfully", "data": reservation})
}




// DELETE /delete-student/:id
func DeleteReservation(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// PATCH /update-student
func UpdateReservation(c *gin.Context) {
	var reservation entity.Reservation
	id := c.Param("id")

	db := config.DB()
	result := db.First(&reservation, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&reservation)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

func GetReservationsByRoomID(c *gin.Context) {
	roomID := c.Param("roomID")
	db := config.DB()
	var reservations []entity.Reservation
	if err := db.Where("room_id = ?", roomID).Preload("Student").Preload("Dorm").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservations not found"})
		return
	}

	c.JSON(http.StatusOK, reservations)
}

func CheckUserRoom(c *gin.Context) {
	userID := c.Param("userID") // รับ userID จาก URL
	db := config.DB()

	var reservations []entity.Reservation
	if err := db.Where("student_id = ?", userID).Preload("Room").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservations not found"})
		return
	}

	// สร้างผลลัพธ์ที่ต้องการ
	var result []gin.H
	for _, reservation := range reservations {
		result = append(result, gin.H{
			"room_id": reservation.RoomID,
			"room_number": reservation.Room.RoomNumber,
			"dorm_id": reservation.DormID,
		})
	}

	c.JSON(http.StatusOK, result)
}