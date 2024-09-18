package entity

import (

	"time"
	"gorm.io/gorm"
)
type Slip struct {
	gorm.Model
	Path    string `json:"path"`
	Date	time.Time `json:"date"`

	AdminID		uint      `json:"admin_id"`
	Admin		*Admins `gorm:"foreignKey: AdminID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"admin"`

	ExpenseID	uint      `json:"ex_id"`
	Expense		*Expense `gorm:"foreignKey: ExpenseID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`

}
