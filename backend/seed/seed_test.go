package seed

import (
	"testing"

	"github.com/joho/godotenv"
)

func TestSeed(t *testing.T) {
	godotenv.Load("../.env")
	// err := Reset()
	// if err != nil {
	// 	t.Fatalf("error resetting: %v", err)
	// }

	// err = Seed()
	// if err != nil {
	// 	t.Fatalf("error seeding: %v", err)
	// }
}
