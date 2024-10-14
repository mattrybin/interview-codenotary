package app

import (
	"github.com/gin-gonic/gin"
	"github.com/mattrybin/interview-codenotary/backend/handlers"
)

func SetupApp() *gin.Engine {
	router := gin.Default()

	router.GET("/accounts", handlers.GetAccounts)
	router.GET("/transactions/:id", handlers.GetTransactions)

	return router
}
