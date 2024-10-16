package seed

import (
	"fmt"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

func Reset() error {
	baseURL := "https://vault.immudb.io/ics/api/v1/ledger/default"
	collections := []string{"accounts", "transactions"}

	for _, collectionName := range collections {
		apiKey := utils.GetAPIKey(collectionName)
		if apiKey == "" {
			return fmt.Errorf("api key is missing: %s", collectionName)
		}

		exists, err := collectionExists(baseURL, apiKey, collectionName)
		if err != nil {
			return fmt.Errorf("error checking collection: %s", collectionName)
		}

		if !exists {
			fmt.Printf("%s collection does not exist. No need to reset.\n", collectionName)
			continue
		}

		// Delete the collection
		url := fmt.Sprintf("%s/collection/%s", baseURL, collectionName)
		res, err := utils.MakeRequest("DELETE", url, apiKey, nil)
		if err != nil {
			return fmt.Errorf("error deleting collection: %s", collectionName)
		}
		defer res.Body.Close()

		if res.StatusCode != http.StatusOK {
			return fmt.Errorf("failed to reset %s collection: %s", collectionName, res.Status)
		}

		fmt.Printf("%s collection has been successfully reset.\n", collectionName)
	}

	return nil
}
