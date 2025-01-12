package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

type Account struct {
	AccountName string           `json:"accountName"`
	CreatedDate string           `json:"createdDate"`
	Email       string           `json:"email"`
	IBAN        string           `json:"iban"`
	Address     string           `json:"address"`
	ID          string           `json:"id"`
	Type        string           `json:"type"`
	VaultMD     vaultMetaAccount `json:"_vault_md"`
}

type vaultMetaAccount struct {
	Creator string `json:"creator"`
	TS      int64  `json:"ts"`
}

type searchResultAccount struct {
	Revisions []struct {
		Document Account `json:"document"`
	} `json:"revisions"`
	Page     int    `json:"page"`
	PerPage  int    `json:"perPage"`
	Total    int    `json:"total"`
	SearchID string `json:"searchId"`
}

func GetAccounts() ([]Account, error) {
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/accounts/documents/search"

	query := map[string]interface{}{
		"page":    1,
		"perPage": 100,
	}

	jsonQuery, err := json.Marshal(query)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal query: %w", err)
	}

	apiKey := utils.GetAPIKey("accounts")

	if apiKey == "" {
		return nil, fmt.Errorf("unknown collection: %s", "accounts")
	}

	res, err := utils.MakeRequest("POST", url, apiKey, jsonQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch documents from collection %s: %s", "accounts", res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var result searchResultAccount
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// Extract documents from the search result
	documents := make([]Account, len(result.Revisions))
	for i, revision := range result.Revisions {
		documents[i] = revision.Document
	}

	return documents, nil
}
