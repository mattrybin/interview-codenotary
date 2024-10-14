package handlers

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

func GetAccounts(w http.ResponseWriter, r *http.Request) {
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
