package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mattrybin/interview-codenotary/backend/model"
)

type Transaction struct {
	ID              string    `json:"id"`
	CreatedDate     time.Time `json:"createdDate"`
	IBAN            string    `json:"iban"`
	Address         string    `json:"address"`
	Amount          int       `json:"amount"`
	TransactionType string    `json:"transactionType"`
	AccountID       string    `json:"accountId"`
}

func GetTransactions(c *gin.Context) {
	accountID := c.Param("id")
	if accountID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid account ID",
		})
		return
	}
	transactionsCollection, err := model.GetTransactions(accountID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error reading transactions data",
		})
		return
	}

	c.JSON(http.StatusOK, transactionsCollection)

}

func CreateTransaction(c *gin.Context) {
	accountID := c.Param("id")
	if accountID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid account ID",
		})
		return
	}

	var newTransaction model.NewTransaction
	if err := c.ShouldBindJSON(&newTransaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid transaction data",
		})
		return
	}

	// Set the accountID from the URL parameter
	newTransaction.AccountID = accountID

	err := model.CreateTransaction(newTransaction)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create transaction",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Transaction created successfully",
	})
}
