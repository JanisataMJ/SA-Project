package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	ReservationDate	time.Time	
	
	StudentID	uint      	
	Student   	Students	`gorm:"foriegnKey:studentID;"`

	DormID 		uint	
	Dorm		Dorm  	`gorm:"foriegnKey:DormID"`

	RoomID 		uint	
	Room		Room  	`gorm:"foriegnKey:RoomID"`

	Repairings  			[]Repairing 			`gorm:"foreignKey:ReservationID"`
	DelayedPaymentForms  	[]DelayedPaymentForm 	`gorm:"foreignKey:ReservationID"`
	En_ExitingForms  		[]En_ExitingForm 		`gorm:"foreignKey:ReservationID"`
	ResigningForms  		[]ResigningForm 		`gorm:"foreignKey:ReservationID"`
}