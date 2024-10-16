package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mattrybin/interview-codenotary/backend/model"
)

type Account struct {
	ID          string    `json:"id"`
	AccountName string    `json:"accountName"`
	Email       string    `json:"email"`
	CreatedDate time.Time `json:"createdDate"`
	Type        string    `json:"type"`
	IBAN        string    `json:"iban"`
	Address     string    `json:"address"`
}

func GetAccounts(c *gin.Context) {
	accountsCollection, err := model.GetAccounts("accounts")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error reading accounts data",
		})
		return
	}

	c.JSON(http.StatusOK, accountsCollection)
}
