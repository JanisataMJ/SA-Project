package student

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type (
	StudentAuthen struct {
		StudentID string `json:"student_id"`
		Password  string `json:"password"`
	}
)

func SignInStudent(c *gin.Context) {
	var payload		StudentAuthen
	var student		entity.Students
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา student ด้วย StudentID ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM students WHERE student_id = ?", payload.StudentID).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา dorm ด้วย StudentID ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM students WHERE student_id = ?", payload.StudentID).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบหากไม่พบข้อมูล
	if student.StudentID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลนักศึกษา"})
		return
	}
	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	// ส่งพารามิเตอร์ทั้งหมดให้กับ GenerateToken
	signedToken, err := jwtWrapper.GenerateToken(payload.StudentID, "", "")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": student.ID})
}

func GetStudentDetails(c *gin.Context) {
	var studentID string
	var result struct {
		FirstName  string
		LastName   string
		RoomNumber uint
		DormID     uint
	}

	// รับค่า student_id จาก request
	if err := c.ShouldBindQuery(&studentID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Query เพื่อเชื่อมข้อมูลจากหลายตาราง
	err := config.DB().Raw(`
		SELECT 
			s.first_name, 
			s.last_name, 
			r.room_number, 
			d.id AS dorm_id
		FROM students s
		JOIN reservations rv ON s.id = rv.student_id
		JOIN rooms r ON rv.room_id = r.id
		JOIN dorms d ON r.dorm_id = d.id
		WHERE s.student_id = ?
	`, studentID).Scan(&result).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบข้อมูล"})
		return
	}

	// ส่งข้อมูลกลับไปที่ frontend
	c.JSON(http.StatusOK, gin.H{
		"first_name":  result.FirstName,
		"last_name":   result.LastName,
		"room_number": result.RoomNumber,
		"dorm_id":     result.DormID,
	})
}
