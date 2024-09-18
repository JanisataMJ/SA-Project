package entity

import (
	"time"

	"gorm.io/gorm"
)

type Students struct {
	gorm.Model
	StudentID string    
	Password  string   
	FirstName string    
	LastName  string    
	Birthday  time.Time 
	Year      uint      
	Major     string    

	GenderID uint     
	Gender   *Genders `gorm:"foreignKey: gender_id" json:"gender"`

}
