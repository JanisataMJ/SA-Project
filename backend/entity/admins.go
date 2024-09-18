package entity

import "gorm.io/gorm"

type Admins struct {
	gorm.Model
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`

	Repairings          []Repairing          `gorm:"foreignKey:AdminID"`
	DelayedPaymentForms []DelayedPaymentForm `gorm:"foreignKey:AdminID"`
	En_ExitingForms     []En_ExitingForm     `gorm:"foreignKey:AdminID"`
	ResigningForms      []ResigningForm      `gorm:"foreignKey:AdminID"`
	Announcement        []Announcement       `gorm:"foreignKey:AdminID"`
}
