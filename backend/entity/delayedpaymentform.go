package entity

import (
    "time"
    "gorm.io/gorm"
)

type DelayedPaymentForm struct {
    gorm.Model
    Dorm_Payment		*float64
    Electricly_Bill		*float64
    Water_Bill			*float64
    Because_Of			string
	Due_Date			time.Time
    Status				string

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`
}