package app

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mattrybin/interview-codenotary/backend/handlers"
)

func SetupApp() *gin.Engine {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	godotenv.Load()

	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	router.Use(cors.New(config))

	router.GET("/accounts", handlers.GetAccounts)
	router.GET("/accounts/:id/transactions", handlers.GetTransactions)
	router.POST("/accounts/:id/transactions", handlers.CreateTransaction)

	return router
}
