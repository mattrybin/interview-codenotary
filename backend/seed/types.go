package seed

type Account struct {
	AccountName string `json:"accountName"`
	Email       string `json:"email"`
	CreatedDate string `json:"createdDate"`
	Type        string `json:"type"`
	IBAN        string `json:"iban"`
	Address     string `json:"address"`
}

type Transaction struct {
	CreatedDate     string `json:"createdDate"`
	Amount          int    `json:"amount"`
	TransactionType string `json:"transactionType"`
	AccountID       string `json:"accountId"`
}
