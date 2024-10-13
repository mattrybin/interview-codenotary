package main

import (
	"encoding/json"
	"net/http"
	"os"
	"time"
)

type Account struct {
	ID          string    `json:"id"`
	AccountName string    `json:"accountName"`
	Email       string    `json:"email"`
	CreatedDate time.Time `json:"createdDate"`
	Type        string    `json:"type"`
}

func getAccounts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	data, err := os.ReadFile("seed/accounts.json")
	if err != nil {
		http.Error(w, "Error reading accounts data", http.StatusInternalServerError)
		return
	}

	var accounts []Account
	err = json.Unmarshal(data, &accounts)
	if err != nil {
		http.Error(w, "Error processing accounts data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accounts)
}

type Transaction struct {
	ID              string    `json:"id"`
	CreatedDate     time.Time `json:"createdDate"`
	IBAN            string    `json:"iban"`
	Address         string    `json:"address"`
	Amount          int       `json:"amount"`
	TransactionType string    `json:"transactionType"`
	AccountID       string    `json:"accountId"`
	AccountEmail    string    `json:"accountEmail"`
	AccountName     string    `json:"accountName"`
	AccountType     string    `json:"accountType"`
}

func getTransactions(w http.ResponseWriter, r *http.Request) {
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
