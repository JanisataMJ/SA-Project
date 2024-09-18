package main

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/controller/address"
	"dormitory.com/dormitory/controller/admin"
	announcement "dormitory.com/dormitory/controller/announcement"
	"dormitory.com/dormitory/controller/delayedpaymentform"
	"dormitory.com/dormitory/controller/family"
	familystatuses "dormitory.com/dormitory/controller/familyStatuses"
	"dormitory.com/dormitory/controller/genders"
	"dormitory.com/dormitory/controller/guardians"
	"dormitory.com/dormitory/controller/license"
	"dormitory.com/dormitory/controller/other"
	"dormitory.com/dormitory/controller/personal"
	personaldetails "dormitory.com/dormitory/controller/personalDetails"
	"dormitory.com/dormitory/controller/rentfee"
	"dormitory.com/dormitory/controller/repairing"
	////////////////////////////////////////////////////"dormitory.com/dormitory/controller/slip"
	"dormitory.com/dormitory/controller/student"
	//"dormitory.com/dormitory/middlewares"
	"github.com/gin-gonic/gin"

	//-------dorm-room-reservation-------//
	"dormitory.com/dormitory/controller/dorm"
	"dormitory.com/dormitory/controller/room"
	"dormitory.com/dormitory/controller/reservation"
)

const PORT = "8000"

func main() {
	// open connection database
	config.ConnectionDB()
	// Generate databases
	config.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Auth Route
	r.POST("/signin", student.SignInStudent)
	r.POST("/signin-admin", admin.SignInAdmin)
	
	router := r.Group("/")
	{
		//router.Use(middlewares.Authorizes())

		// Student Route
		router.POST("/create-student", student.CreateStudent)
		router.PUT("/update-student/:id", student.UpdateStudent)
		router.GET("/list-student", student.ListStudent)
		router.GET("/get-student/:id", student.GetStudent)
		router.DELETE("/delete-student/:id", student.DeleteStudent)
		// CreatePersonalDetails Route
		router.POST("/create-personal-detail", personaldetails.CreatePersonalDetails)
		// Personal Route
		//router.POST("/create-personal", personal.CreatePersonal)
		router.GET("/get-personal/:id", personal.GetPersonal)
		router.PUT("/update-personal/:id", personal.UpdatePersonal)
		router.GET("/list-personal", personal.ListPersonal)
		// Address Route
		router.GET("/list-address", address.ListAddress)
		router.GET("/get-address/:id", address.GetAddress)
		// Family Route
		router.GET("/list-family", family.ListFamily)
		router.GET("/get-family/:id", family.GetFamily)
		// Other Route
		router.GET("/list-other", other.ListOther)
		router.GET("/get-other/:id", other.GetOther)

		// RentFee Route
		router.POST("/create-rent-fee", rentfee.CreateRentFee)
		router.GET("/get-rent-fee/:id", rentfee.GetRentFee)
		router.GET("/list-rent-fees", rentfee.ListRentFees)
		
		// Repairing Route
		router.POST("/creat-repair", repairing.CreateRepair)
		router.GET("/get-repair/:id", repairing.GetRepair)
		router.GET("/grt-list-repair", repairing.GetListRepairs)
		router.PUT("/update-repair", repairing.UpdateRepair)

		// DelayedPaymentForm Route
		router.POST("/create-delayedpaymentform", delayedpaymentform.DelayedPaymentFormUI)
		router.GET("/list-delayedpaymentform", delayedpaymentform.ListDelayedPaymentForms)
		router.GET("/get-delayedpaymentform/:id", delayedpaymentform.GetDelayedPaymentForm)
		router.PUT("/update-delayedpaymentform/:id", delayedpaymentform.UpdateDelayedPaymentForm)
		// Announcement Routes
		router.POST("/create-announcement", announcement.CreateAnnouncement)
		router.GET("/announcements", announcement.GetAnnouncements)
		router.GET("/announcement/:id", announcement.GetAnnouncementByID)
		router.PUT("/update-announcement/:id", announcement.UpdateAnnouncement)
		router.DELETE("/delete-announcement/:id", announcement.DeleteAnnouncement)
		router.GET("/latest-announcement", announcement.GetLatestAnnouncement)
		// Admin Routes
		router.GET("/GetAllAdmins", admin.GetAllAdmins)
		router.POST("/create-admin", admin.CreateAdmin)
		router.DELETE("/admin/:id", admin.DeleteAdmin)

		//Slip Routes
		/*----------------------------------------------router.POST("/slip", controller.CreateSlip)
		------------------------------------------------router.PATCH("/slip", controller.UpdateSlip)*/
		
		// Dorm
		router.GET("/GetDorm/:id", dorm.GetDorm)
		router.GET("/ListDorms", dorm.ListDorms)
		router.PUT("/UpdateDorm/:id", dorm.UpdateDorm)
		// Room
		router.GET("/GetRoom/:id", room.GetRoom)
		router.GET("/ListRoom", room.ListRoom)
		router.DELETE("/DeleteRoom/:id", room.DeleteRoom)
		router.PUT("/UpdateRoom/:id", room.UpdateRoom)
		router.GET("/rooms/floor/:floor_id/dorm/:dorm_id", room.GetByIdFloor) // Tawun

		// Reservation
		router.POST("/CreateReservation", reservation.CreateReservation)
		router.DELETE("/DeleteReservation/:id", reservation.DeleteReservation)
		router.PUT("/UpdateReservation/:id", reservation.UpdateReservation)
		router.GET("/reservations/room/:roomID", reservation.GetReservationsByRoomID)
		router.GET("/reservations/:room_id/students", student.GetStudentsByRoomID)
		router.GET("/check-user-room/:userID", reservation.CheckUserRoom)
	}

	r.GET("/genders", genders.GetAll)
	r.GET("/familyStatuses", familystatuses.GetAll)
	r.GET("/guardians", guardians.GetAll)
	r.GET("/license", license.GetAll)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	// Run the server
	r.Run("localhost:" + PORT)
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
