package utils

import (
	"bytes"
	"net/http"
	"time"
)

func MakeRequest(method, url, apiKey string, body []byte) (*http.Response, error) {
	// Add a delay of 1000 milliseconds before each request to avoid rate limiting
	time.Sleep(1000 * time.Millisecond)

	req, err := http.NewRequest(method, url, bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}

	req.Header.Add("accept", "application/json")
	req.Header.Add("X-API-Key", apiKey)
	req.Header.Add("Content-Type", "application/json")

	return http.DefaultClient.Do(req)
}
