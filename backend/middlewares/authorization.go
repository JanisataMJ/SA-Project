package middlewares

import (
	"net/http"
	"strings"

	"dormitory.com/dormitory/services"
	"github.com/gin-gonic/gin"
)

var HashKey = []byte("very-secret")
var BlockKey = []byte("a-lot-secret1234")

// Authorizes เป็นฟังก์ชั่นตรวจเช็ค Token และเก็บข้อมูลใน context
func Authorizes() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No Authorization header provided"})
			return
		}
		extractedToken := strings.Split(clientToken, "Bearer ")
		if len(extractedToken) != 2 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Incorrect Format of Authorization Token"})
			return
		}
		clientToken = strings.TrimSpace(extractedToken[1])
		
		jwtWrapper := services.JwtWrapper{
			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:    "AuthService",
		}
		
		claims, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		// เก็บ studentID, adminID และ Username ใน context
		studentID := claims.StudentID
		adminID := claims.AdminID
		username := claims.Username

		if studentID == "" && adminID == "" && username == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			return
		}

		// Set student_id, admin_id และ username in context
		if studentID != "" {
			c.Set("student_id", studentID)
		}
		if adminID != "" {
			c.Set("admin_id", adminID)
		}
		if username != "" {
			c.Set("username", username)
		}

		c.Next()
	}
}
