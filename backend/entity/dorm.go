package entity

import "gorm.io/gorm"

type Dorm struct {
	gorm.Model
	DormName	string	
	Type		string	

	GenderID	uint	
	Gender		Genders `gorm:"foriegnKey:GenderID"`
	
	Rooms []Room 				`gorm:"foreignKey:DormID"`
	Reservations []Reservation 	`gorm:"foreignKey:DormID"`
}