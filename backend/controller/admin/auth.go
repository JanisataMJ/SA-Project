package admin

import (
	"net/http"
	"strconv" // import strconv for conversion

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AdminAuthen struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Phone     string `json:"phone"`
}

func SignInAdmin(c *gin.Context) {
	var payload AdminAuthen
	var admin entity.Admins
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา admin ด้วย Username ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM admins WHERE username = ?", payload.Username).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบหากไม่พบข้อมูล
	if admin.Username == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบข้อมูลแอดมิน"})
		return
	}
	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	// แปลง admin.ID เป็น string ก่อนส่งไปยัง GenerateToken
	adminIDStr := strconv.Itoa(int(admin.ID))
	signedToken, err := jwtWrapper.GenerateToken("", admin.Username, adminIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": admin.ID})
}

func CreateAdmin(c *gin.Context) {
	var payload AdminAuthen
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่า username นี้มีอยู่แล้วหรือไม่
	var existingAdmin entity.Admins
	if err := config.DB().Where("username = ?", payload.Username).First(&existingAdmin).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	// แฮชรหัสผ่านก่อนบันทึก
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	admin := entity.Admins{
		Username:  payload.Username,
		Password:  string(hashedPassword),
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Phone:     payload.Phone,
	}

	// บันทึก admin ลงในฐานข้อมูล
	if err := config.DB().Create(&admin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลแอดมินรวมถึง ID ที่สร้างขึ้น
	c.JSON(http.StatusOK, admin)
}

func GetAllAdmins(c *gin.Context) {
	var admins []entity.Admins
	if err := config.DB().Find(&admins).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, admins)
}
func DeleteAdmin(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    // ลบแอดมินที่มี ID ตรงกับที่ระบุ
    if err := config.DB().Where("id = ?", id).Delete(&entity.Admins{}).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Admin deleted successfully"})
}