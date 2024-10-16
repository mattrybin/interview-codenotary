package seed

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

func createAccountDocument(account Account) error {
	accountWithoutID := Account{
		AccountName: account.AccountName,
		Email:       account.Email,
		CreatedDate: account.CreatedDate,
		IBAN:        account.IBAN,
		Address:     account.Address,
		Type:        account.Type,
	}

	log.Printf("Creating document for account: %v", accountWithoutID)
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/accounts/document"
	payload, err := json.Marshal(accountWithoutID)
	if err != nil {
		return err
	}

	res, err := utils.MakeRequest("PUT", url, utils.GetAPIKey("accounts"), payload)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create document: %s", res.Status)
	}

	return nil
}

func createTransactionDocument(transaction Transaction, accountId string) error {
	transactionWithoutID := Transaction{
		AccountID:       accountId,
		CreatedDate:     transaction.CreatedDate,
		Amount:          transaction.Amount,
		TransactionType: transaction.TransactionType,
	}

	log.Printf("Creating document for transaction: %v", transactionWithoutID)
	url := "https://vault.immudb.io/ics/api/v1/ledger/default/collection/transactions/document"
	payload, err := json.Marshal(transactionWithoutID)
	if err != nil {
		return err
	}

	res, err := utils.MakeRequest("PUT", url, utils.GetAPIKey("transactions"), payload)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to create document: %s", res.Status)
	}

	return nil
}
