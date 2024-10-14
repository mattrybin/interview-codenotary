package main

import (
	"log"

	"github.com/mattrybin/interview-codenotary/backend/app"
)

func main() {
	router := app.SetupApp()

	log.Println("Starting server on port 4000")
	log.Fatal(router.Run(":4000"))
}
