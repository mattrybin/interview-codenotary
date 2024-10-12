# Makefile

# Set the path to the package.json file
PACKAGE_JSON_PATH = frontend/

# Define the available scripts
.PHONY: build dev lint start typecheck

build:
	npm run --prefix $(PACKAGE_JSON_PATH) build

dev:
	npm run --prefix $(PACKAGE_JSON_PATH) dev

lint:
	npm run --prefix $(PACKAGE_JSON_PATH) lint

start:
	npm run --prefix $(PACKAGE_JSON_PATH) start

typecheck:
	npm run --prefix $(PACKAGE_JSON_PATH) typecheck