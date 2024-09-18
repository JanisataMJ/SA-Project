package entity

import (
	"time"

	"gorm.io/gorm"
)

type Announcement struct {
	gorm.Model
	Title   string    `json:"title"`
	Content string    `json:"content"`
	Date    time.Time `json:"date"`
	AdminID uint      `json:"admin_id"`           // บันทึก ID ของผู้ที่สร้าง
	Admin   Admins    `gorm:"foreignKey:AdminID"` // foreign key ของ Admin
}
