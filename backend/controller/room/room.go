package room

import (
	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GET /room/:id  use create map room florr
func GetRoom(c *gin.Context) {
	ID := c.Param("id")
	var room entity.Room

	db := config.DB()
	results := db.Preload("Dorm").Preload("Dorm.Gender").Preload("Dorm.Gender.Student").Preload("Dorm.Gender.Dorms").First(&room, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if room.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, room)
}

func GetByIdFloor(c *gin.Context) {
	floorID := c.Param("floor_id") // รับ floor ID จาก URL parameter
	dormID := c.Param("dorm_id")    // รับ dorm ID จาก URL parameter
	var rooms []entity.Room

	db := config.DB()
	results := db.Preload("Dorm").Preload("Dorm.Gender").Preload("Dorm.Gender.Student").Preload("Dorm.Gender.Dorms").
		Where("floor = ? AND dorm_id = ?", floorID, dormID).Find(&rooms) // กรองห้องที่มี floor และ dorm ID ตรงกัน

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}
	if len(rooms) == 0 {
		c.JSON(http.StatusNoContent, gin.H{}) // ไม่มีห้องที่พบ
		return
	}

	c.JSON(http.StatusOK, rooms) // คืนค่าห้องที่พบ
}

// GET /rooms
func ListRoom(c *gin.Context) {
	var rooms []entity.Room

	db := config.DB()
	results := db.Preload("Dorm").Find(&rooms)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, rooms)
}

// DELETE /rooms/:id
func DeleteRoom(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// แก้ไขให้เป็นการลบจากตาราง rooms
	if tx := db.Delete(&entity.Room{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// PATCH /rooms/:id
func UpdateRoom(c *gin.Context) {
	var room entity.Room

	RoomID := c.Param("id")

	db := config.DB()
	result := db.First(&room, RoomID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room id not found"})
		return
	}

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกการเปลี่ยนแปลงของ room
	result = db.Save(&room)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update room"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
