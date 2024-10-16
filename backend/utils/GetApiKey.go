package utils

import "os"

func GetAPIKey(collection string) string {
	switch collection {
	case "accounts":
		return os.Getenv("IMMUD_KEY_ACCOUNTS")
	case "transactions":
		return os.Getenv("IMMUD_KEY_TRANSACTIONS")
	default:
		return ""
	}
}
