package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

type Transaction struct {
	ID              string    `json:"id"`
	CreatedDate     time.Time `json:"createdDate"`
	IBAN            string    `json:"iban"`
	Address         string    `json:"address"`
	Amount          int       `json:"amount"`
	TransactionType string    `json:"transactionType"`
	AccountName     string    `json:"accountName"`
	AccountType     string    `json:"accountType"`
	AccountID       string    `json:"accountId"`
	AccountEmail    string    `json:"accountEmail"`
}

func GetTransactions(c *gin.Context) {
	accountID := c.Param("id")
	if accountID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid account ID",
		})
		return
	}

	data, err := os.ReadFile("seed/transactions.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error reading transactions data",
		})
		return
	}

	var allTransactions []Transaction
	err = json.Unmarshal(data, &allTransactions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error processing transactions data",
		})
		return
	}

	// Filter transactions by account ID
	filteredTransactions := []Transaction{}
	for _, transaction := range allTransactions {
		if transaction.AccountID == accountID {
			filteredTransactions = append(filteredTransactions, transaction)
		}
	}

	c.JSON(http.StatusOK, filteredTransactions)
}
