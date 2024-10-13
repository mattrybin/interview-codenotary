package main

import (
	"log"
	"net/http"
)

func main() {
	log.Fatal(http.ListenAndServe(":4000", NewRouter()))
}

func setContentTypeMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next(w, r)
	}
}

func NewRouter() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/accounts", setContentTypeMiddleware(getAccounts))
	return mux
}
