package seed

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

// Document represents the structure of a single document
type Document struct {
	AccountName string    `json:"accountName"`
	CreatedDate string    `json:"createdDate"`
	Email       string    `json:"email"`
	ID          string    `json:"id"`
	Type        string    `json:"type"`
	VaultMD     VaultMeta `json:"_vault_md"`
}

// VaultMeta represents the metadata of a document
type VaultMeta struct {
	Creator string `json:"creator"`
	TS      int64  `json:"ts"`
}

// SearchResult represents the structure of the search response
type SearchResult struct {
	Revisions []struct {
		Document Document `json:"document"`
	} `json:"revisions"`
	Page     int    `json:"page"`
	PerPage  int    `json:"perPage"`
	Total    int    `json:"total"`
	SearchID string `json:"searchId"`
}

// FetchCollection searches for documents inside a collection and returns an array of Documents
func FetchCollection(collection string) ([]Document, error) {
	url := fmt.Sprintf("https://vault.immudb.io/ics/api/v1/ledger/default/collection/%s/documents/search", collection)

	query := map[string]interface{}{
		"page":    1,
		"perPage": 100,
	}

	jsonQuery, err := json.Marshal(query)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal query: %w", err)
	}

	apiKey := utils.GetAPIKey(collection)

	log.Println("Fetching collection", collection, "with key", apiKey)

	if apiKey == "" {
		return nil, fmt.Errorf("unknown collection: %s", collection)
	}

	res, err := utils.MakeRequest("POST", url, apiKey, jsonQuery)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch documents from collection %s: %s", collection, res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var result SearchResult
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// Extract documents from the search result
	documents := make([]Document, len(result.Revisions))
	for i, revision := range result.Revisions {
		documents[i] = revision.Document
	}

	return documents, nil
}
