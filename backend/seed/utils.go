package seed

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

func readJSONFile[T any](file string) ([]T, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("error getting current working directory: %v", err)
	}

	filePath := filepath.Join(cwd, file)

	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("error reading %s: %v", file, err)
	}

	var result []T
	err = json.Unmarshal(data, &result)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling %s data: %v", file, err)
	}

	return result, nil
}

// ReadAccounts reads the accounts from the JSON file
func ReadAccounts(file string) ([]Account, error) {
	return readJSONFile[Account](file)
}

// ReadTransactions reads the transactions from the JSON file
func ReadTransactions(file string) ([]Transaction, error) {
	return readJSONFile[Transaction](file)
}
