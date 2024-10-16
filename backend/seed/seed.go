package seed

import (
	"fmt"
)

func Seed() error {
	accounts, err := ReadAccounts("../data/accounts.json")
	if err != nil {
		return fmt.Errorf("error reading accounts: %v", err)
	}

	err = createAccountCollection()
	if err != nil {
		return fmt.Errorf("error creating accounts collection: %v", err)
	}

	for _, account := range accounts {
		err = createAccountDocument(account)
		if err != nil {
			return fmt.Errorf("error creating document for account %s: %v", account.AccountName, err)
		}
	}

	// fetch accounts collection with id's
	accountsCollection, err := FetchCollection("accounts")
	if err != nil {
		return fmt.Errorf("error fetching accounts collection: %v", err)
	}

	transactions, err := ReadTransactions("../data/transactions.json")
	if err != nil {
		return fmt.Errorf("error reading transactions: %v", err)
	}

	err = createTransactionCollection()
	if err != nil {
		return fmt.Errorf("error creating transactions collection: %v", err)
	}

	// Group transactions by accountId
	groupedTransactions := make(map[string][]Transaction)
	for _, transaction := range transactions {
		groupedTransactions[transaction.AccountID] = append(groupedTransactions[transaction.AccountID], transaction)
	}

	// Iterate over accounts and create transaction documents
	for index, account := range accountsCollection {
		transactions := groupedTransactions[fmt.Sprintf("100%d", index+1)]
		for _, transaction := range transactions {
			err = createTransactionDocument(transaction, account.ID)
			if err != nil {
				return fmt.Errorf("error creating transaction document: %v", err)
			}
		}
	}

	fmt.Println("Seeding completed successfully")
	return nil
}
