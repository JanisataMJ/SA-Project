package entity

import (
    "time"
    "gorm.io/gorm"
)

type ResigningForm struct {
    gorm.Model
	Date			time.Time
    Because_Of		string
	Accommodation	string
    Status			string

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`

}