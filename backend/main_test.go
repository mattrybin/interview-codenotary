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
			ContainsKey("id").HasValue("id", "1001").
			ContainsKey("accountName").HasValue("accountName", "John Doe").
			ContainsKey("email").HasValue("email", "john.doe@example.com").
			ContainsKey("createdDate").
			ContainsKey("type").HasValue("type", "professional")
	})

	t.Run("MethodNotAllowed", func(t *testing.T) {
		e.POST("/accounts").
			Expect().
			Status(http.StatusMethodNotAllowed)
	})
}
