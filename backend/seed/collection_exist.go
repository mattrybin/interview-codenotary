package seed

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/mattrybin/interview-codenotary/backend/utils"
)

func collectionExists(baseURL, apiKey, collectionName string) (bool, error) {
	url := baseURL + "/collections"
	res, err := utils.MakeRequest("GET", url, apiKey, nil)
	if err != nil {
		return false, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return false, fmt.Errorf("failed to get collections: %s", res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return false, err
	}

	var collectionsResponse map[string]interface{}
	err = json.Unmarshal(body, &collectionsResponse)
	if err != nil {
		return false, err
	}

	collections, ok := collectionsResponse["collections"].([]interface{})
	if !ok {
		return false, fmt.Errorf("unexpected response format")
	}

	for _, c := range collections {
		if collectionInfo, ok := c.(map[string]interface{}); ok {
			if name, ok := collectionInfo["name"].(string); ok && name == collectionName {
				return true, nil
			}
		}
	}

	return false, nil
}
