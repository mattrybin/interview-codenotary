# Task for Immudb

## How to run without docker

```
cd backend
go mod download
make run
```

```
cd frontend
node -v "should be above 20"
npm install
npm run dev
```

## How to run with docker

```
docker compose up
```

## API Documentation

### Get accounts

```
GET /accounts
```

### Get transactions

```
GET /accounts/{accountId}/transactions
```

### Create transaction

```
POST /accounts/{accountId}/transactions
body:
{
  "amount": 100,
  "transactionType": "sending"
}
```
