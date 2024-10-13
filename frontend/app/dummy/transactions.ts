import seedrandom from "seedrandom"
import { AccountType } from "../types/account"

export const accounts: AccountType[] = [
  {
    id: "1001",
    accountName: "John Doe",
    email: "john.doe@example.com",
    createdDate: "2024-01-15T10:30:00Z",
    type: "professional"
  },
  {
    id: "1002",
    accountName: "Alice Smith",
    email: "alice.smith@example.com",
    createdDate: "2024-02-20T14:45:00Z",
    type: "normal"
  },
  {
    id: "1003",
    accountName: "Mario Rossi",
    email: "mario.rossi@example.com",
    createdDate: "2024-03-10T09:15:00Z",
    type: "professional"
  },
  {
    id: "1004",
    accountName: "Emma Johnson",
    email: "emma.johnson@example.com",
    createdDate: "2024-04-05T16:20:00Z",
    type: "normal"
  },
  {
    id: "1005",
    accountName: "Hans Schmidt",
    email: "hans.schmidt@example.com",
    createdDate: "2024-05-12T11:00:00Z",
    type: "professional"
  },
  {
    id: "1006",
    accountName: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    createdDate: "2024-06-18T13:30:00Z",
    type: "normal"
  },
  {
    id: "1007",
    accountName: "Luca Bianchi",
    email: "luca.bianchi@example.com",
    createdDate: "2024-07-22T08:45:00Z",
    type: "professional"
  },
  {
    id: "1008",
    accountName: "Anna Müller",
    email: "anna.mueller@example.com",
    createdDate: "2024-08-30T15:10:00Z",
    type: "normal"
  },
  {
    id: "1009",
    accountName: "James Wilson",
    email: "james.wilson@example.com",
    createdDate: "2024-09-14T12:00:00Z",
    type: "professional"
  }
]

const ibanPrefixes = ["DE", "FR", "IT", "GB"]
const cities = ["Berlin", "Paris", "Rome", "London", "Munich", "Venice"]
const streets = [
  "Main St",
  "Rue de Paris",
  "Via Roma",
  "High Street",
  "Hauptstraße",
  "Piazza San Marco"
]

export const generateTransaction = (
  account: (typeof accounts)[0],
  transactionId: number,
  rng: () => number
) => {
  const ibanPrefix = ibanPrefixes[Math.floor(rng() * ibanPrefixes.length)]
  const city = cities[Math.floor(rng() * cities.length)]
  const street = streets[Math.floor(rng() * streets.length)]

  const baseAmount = Math.floor(rng() * 10000) + 100
  const multiplier = rng() < 0.3 ? 10 : 1
  const amount = baseAmount * multiplier

  const type = rng() > 0.5 ? "receiving" : "sending"

  return {
    ...account,
    transactionId,
    iban: `${ibanPrefix}${rng().toString(36).substr(2, 16)}`,
    address: `${Math.floor(rng() * 500) + 1} ${street}, ${city}`,
    amount: parseFloat(amount.toFixed(2)),
    transactionType: type,
    date: new Date(Date.now() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    email: account.email,
    createdDate: account.createdDate,
    accountType: account.type
  }
}

export const generateTransactions = (
  seed: string = "default-seed",
  transactionsPerAccount = 10
) => {
  const rng = seedrandom(seed)
  let id = 1
  return accounts.flatMap((account) =>
    Array.from({ length: transactionsPerAccount }, () => generateTransaction(account, id++, rng))
  )
}

export const getUniqueAccountCount = (transactions: ReturnType<typeof generateTransactions>) => {
  return new Set(transactions.map((t) => t.id)).size
}