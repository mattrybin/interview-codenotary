package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"
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

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	data, err := os.ReadFile("seed/transactions.json")
	if err != nil {
		http.Error(w, "Error reading transactions data", http.StatusInternalServerError)
		return
	}

	var transactions []Transaction
	err = json.Unmarshal(data, &transactions)
	if err != nil {
		http.Error(w, "Error processing transactions data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}
