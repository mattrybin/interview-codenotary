package seed

import (
	"fmt"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

func createAccountCollection() error {
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/accounts"
	payload := `{
		"idFieldName": "id",
		"fields": [
			{"name": "accountName", "type": "STRING"},
			{"name": "email", "type": "STRING"},
			{"name": "createdDate", "type": "STRING"},
			{"name": "type", "type": "STRING"},
			{"name": "iban", "type": "STRING"},
			{"name": "address", "type": "STRING"}
		]
	}`

	res, err := utils.MakeRequest("PUT", url, utils.GetAPIKey("accounts"), []byte(payload))
	if err != nil {
		return err
	}

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create collection accounts: %s", res.Status)
	}

	fmt.Println("Accounts collection created successfully")
	return nil
}

func createTransactionCollection() error {
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/transactions"
	payload := `{
		"idFieldName": "id",
		"fields": [
			{"name": "createdDate", "type": "STRING"},
			{"name": "amount", "type": "INTEGER"},
			{"name": "transactionType", "type": "STRING"},
			{"name": "accountId", "type": "STRING"}
		]
	}`

	res, err := utils.MakeRequest("PUT", url, utils.GetAPIKey("transactions"), []byte(payload))
	if err != nil {
		return err
	}

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create collection transactions: %s", res.Status)
	}

	fmt.Println("Transactions collection created successfully")
	return nil
}
