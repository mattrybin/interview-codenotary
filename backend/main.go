package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type Account struct {
	ID          string    `json:"id"`
	AccountName string    `json:"accountName"`
	Email       string    `json:"email"`
	CreatedDate time.Time `json:"createdDate"`
	Type        string    `json:"type"`
}

var accounts []Account

func main() {
	loadAccounts()
	http.HandleFunc("/accounts", getAccounts)
	log.Println("Server starting on port 4000...")
	log.Fatal(http.ListenAndServe(":4000", nil))
}

func loadAccounts() {
	data, err := ioutil.ReadFile("seed/accounts.json")
	if err != nil {
		log.Fatalf("Error reading accounts.json: %v", err)
	}

	err = json.Unmarshal(data, &accounts)
	if err != nil {
		log.Fatalf("Error unmarshaling accounts data: %v", err)
	}

	log.Printf("Loaded %d accounts", len(accounts))
}

func getAccounts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accounts)
}
