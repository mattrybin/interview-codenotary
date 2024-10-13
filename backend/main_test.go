package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gavv/httpexpect/v2"
)

func TestAPI(t *testing.T) {
	handler := NewRouter()
	server := httptest.NewServer(handler)
	defer server.Close()

	e := httpexpect.Default(t, server.URL)

	t.Run("GetAccounts", func(t *testing.T) {
		response := e.GET("/accounts").
			Expect().
			Status(http.StatusOK).
			JSON().Array()

		response.NotEmpty()

		response.Value(0).Object().
			ContainsKey("id").
			ContainsKey("accountName").
			ContainsKey("email").
			ContainsKey("createdDate").
			ContainsKey("type")
	})

	t.Run("GetTransactions", func(t *testing.T) {
		response := e.GET("/transactions").
			Expect().
			Status(http.StatusOK).
			JSON().Array()

		response.NotEmpty()

		response.Value(0).Object().
			ContainsKey("id").
			ContainsKey("createdDate").
			ContainsKey("iban").
			ContainsKey("address").
			ContainsKey("amount").
			ContainsKey("transactionType").
			ContainsKey("accountId").
			ContainsKey("accountEmail").
			ContainsKey("accountName").
			ContainsKey("accountType")
	})
}
