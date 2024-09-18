package entity

import "gorm.io/gorm"

type RentFee struct {
	gorm.Model
	Amount float64 `json:"amount"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		*Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`
	
	// 1 RentFee เป็นเจ้าของได้หลาย Expenses
	//Expenses []Expense `gorm:"foreignKey:RentFeeID"`
}