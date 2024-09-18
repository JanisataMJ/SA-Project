package announcement

import (
	"net/http"
	"time"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func CreateAnnouncement(c *gin.Context) {
	var announcement entity.Announcement
	if err := c.ShouldBindJSON(&announcement); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ดึง Username จาก context
	username, exists := c.Get("username")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username not found in context"})
		return
	}

	// ค้นหา AdminID จาก Username
var admin entity.Admins
db := config.DB()
if db == nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
    return
}

if err := db.Where("username = ?", username).First(&admin).Error; err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching AdminID from database"})
    return
}

announcement.AdminID = admin.ID
announcement.Date = time.Now()

if err := db.Create(&announcement).Error; err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
}

c.JSON(http.StatusOK, gin.H{"message": "Announcement created successfully"})

}
func UpdateAnnouncement(c *gin.Context) {
	id := c.Param("id")
	var announcement entity.Announcement
	if err := c.ShouldBindJSON(&announcement); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ดึง Username จาก request body หรือ query parameters
	username := c.Query("username") // ใช้ query parameter ในการดึง Username

	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	// ค้นหา AdminID จากฐานข้อมูลโดยใช้ Username
	var admin entity.Admins
	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
		return
	}
	if err := db.Where("username = ?", username).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin not found"})
		return
	}

	announcement.AdminID = admin.ID

	if err := db.Model(&announcement).Where("id = ?", id).Updates(announcement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Announcement updated successfully"})
}
func GetAnnouncements(c *gin.Context) {
	var announcements []entity.Announcement
	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
		return
	}

	if err := db.Preload("Admin").Find(&announcements).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, announcements)
}

func GetAnnouncementByID(c *gin.Context) {
	id := c.Param("id")
	var announcement entity.Announcement
	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
		return
	}

	if err := db.Preload("Admin").First(&announcement, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, announcement)
}

func DeleteAnnouncement(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
		return
	}

	if err := db.Delete(&entity.Announcement{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Announcement deleted successfully"})
}

func GetLatestAnnouncement(c *gin.Context) {
	var announcement entity.Announcement
	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not initialized"})
		return
	}

	if err := db.Preload("Admin").Order("created_at desc").First(&announcement).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, announcement)
}
