package main

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/gin-gonic/gin"
	"github.com/mattrybin/interview-codenotary/backend/app"
)

func APITester(t *testing.T, handler http.Handler) *httpexpect.Expect {
	return httpexpect.WithConfig(httpexpect.Config{
		Client: &http.Client{
			Transport: httpexpect.NewBinder(handler),
			Jar:       httpexpect.NewCookieJar(),
		},
		Reporter: httpexpect.NewAssertReporter(t),
		Printers: []httpexpect.Printer{
			httpexpect.NewDebugPrinter(t, true),
		},
	})
}

func TestAPI(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := app.SetupApp()

	e := APITester(t, router)

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
			ContainsKey("type").
			ContainsKey("iban").
			ContainsKey("address")
	})

	t.Run("GetTransactions", func(t *testing.T) {
		preResponse := e.GET("/accounts").
			Expect().
			Status(http.StatusOK).
			JSON().Array()
		accountID := preResponse.Value(0).Object().Value("id").String().Raw()
		response := e.GET("/accounts/" + accountID + "/transactions").
			Expect().
			Status(http.StatusOK).
			JSON().Array()

		response.NotEmpty()

		response.Value(0).Object().
			ContainsKey("id").
			ContainsKey("createdDate").
			ContainsKey("amount").
			ContainsKey("transactionType").
			ContainsKey("accountId")
	})
	t.Run("CreateTransaction", func(t *testing.T) {
		preResponse := e.GET("/accounts").
			Expect().
			Status(http.StatusOK).
			JSON().Array()
		accountID := preResponse.Value(0).Object().Value("id").String().Raw()

		payload := map[string]interface{}{
			"amount":          100.0,
			"transactionType": "sending",
		}

		response := e.POST("/accounts/" + accountID + "/transactions").
			WithJSON(payload).
			Expect().
			Status(http.StatusCreated).
			JSON().Object()

		response.Value("message").String().IsEqual("Transaction created successfully")
	})
}
