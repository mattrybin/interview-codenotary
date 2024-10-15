package app

import (
	"github.com/gin-gonic/gin"
	"github.com/mattrybin/interview-codenotary/backend/handlers"
)

func SetupApp() *gin.Engine {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()

	router.GET("/accounts", handlers.GetAccounts)
	router.GET("/accounts/:id", handlers.GetAccount)
	router.GET("/accounts/:id/transactions", handlers.GetTransactions)

	return router
}
