package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type Account struct {
	ID          string    `json:"id"`
	AccountName string    `json:"accountName"`
	Email       string    `json:"email"`
	CreatedDate time.Time `json:"createdDate"`
	Type        string    `json:"type"`
}

func GetAccounts(c *gin.Context) {
	data, err := os.ReadFile("seed/accounts.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error reading accounts data",
		})
		return
	}

	var accounts []Account
	err = json.Unmarshal(data, &accounts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error processing accounts data",
		})
		return
	}

	c.JSON(http.StatusOK, accounts)
}
