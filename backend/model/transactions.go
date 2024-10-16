package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

type TransactionType string

const (
	TransactionTypeSending   TransactionType = "sending"
	TransactionTypeReceiving TransactionType = "receiving"
)

type Transaction struct {
	ID              string               `json:"id"`
	CreatedDate     string               `json:"createdDate"`
	Amount          float64              `json:"amount"`
	TransactionType TransactionType      `json:"transactionType"`
	AccountID       string               `json:"accountId"`
	VaultMD         vaultMetaTransaction `json:"_vault_md"`
}

type vaultMetaTransaction struct {
	Creator string `json:"creator"`
	TS      int64  `json:"ts"`
}

type searchResultTransaction struct {
	Revisions []struct {
		Document Transaction `json:"document"`
	} `json:"revisions"`
	Page     int    `json:"page"`
	PerPage  int    `json:"perPage"`
	Total    int    `json:"total"`
	SearchID string `json:"searchId"`
}

func GetTransactions(accountId string) ([]Transaction, error) {
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/transactions/documents/search"

	query := map[string]interface{}{
		"page":    1,
		"perPage": 100,
		"query": map[string]interface{}{
			"expressions": []map[string]interface{}{
				{
					"fieldComparisons": []map[string]interface{}{
						{
							"field":    "accountId",
							"operator": "EQ",
							"value":    accountId,
						},
					},
				},
			},
		},
	}

	jsonQuery, err := json.Marshal(query)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal query: %w", err)
	}

	apiKey := utils.GetAPIKey("transactions")

	if apiKey == "" {
		return nil, fmt.Errorf("unknown collection: %s", "transactions")
	}

	res, err := utils.MakeRequest("POST", url, apiKey, jsonQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch documents from collection %s: %s", "transactions", res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var result searchResultTransaction
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// Extract documents from the search result
	documents := make([]Transaction, len(result.Revisions))
	for i, revision := range result.Revisions {
		documents[i] = revision.Document
	}

	return documents, nil
}

type NewTransaction struct {
	CreatedDate     string          `json:"createdDate"`
	Amount          float64         `json:"amount"`
	TransactionType TransactionType `json:"transactionType"`
	AccountID       string          `json:"accountId"`
}

func CreateTransaction(transaction NewTransaction) error {
	transactionDocument := NewTransaction{
		CreatedDate:     time.Now().Format("2006-01-02T15:04:05.000Z"),
		Amount:          transaction.Amount,
		TransactionType: transaction.TransactionType,
		AccountID:       transaction.AccountID,
	}
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/transactions/document"
	payload, err := json.Marshal(transactionDocument)
	if err != nil {
		return fmt.Errorf("failed to marshal transaction document: %w", err)
	}
	res, err := utils.MakeRequest("PUT", url, utils.GetAPIKey("transactions"), payload)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create document: %s", res.Status)
	}

	return nil
}
