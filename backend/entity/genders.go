package entity

import "gorm.io/gorm"

type Genders struct {
	gorm.Model
	Gender string

	Student []Students `gorm:"foreignKey:GenderID"`
	Dorms []Dorm `gorm:"foreignKey:GenderID"`
}