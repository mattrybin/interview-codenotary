import seedrandom from "https://esm.sh/seedrandom@3.0.5"
import { ensureDir } from "https://deno.land/std@0.192.0/fs/mod.ts"
import { writeJson } from "https://deno.land/std@0.66.0/fs/write_json.ts"

import { z } from "https://esm.sh/zod@3.23.8"

export const accountSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  email: z.string().email(),
  createdDate: z.string().datetime(),
  type: z.enum(["normal", "professional"])
})

export type AccountType = z.infer<typeof accountSchema>
export const TransactionTypeSchema = z.enum(["receiving", "sending"])

export const TransactionSchema = z.object({
  id: z.string(),
  createdDate: z.string().datetime(),
  iban: z.string(),
  address: z.string(),
  amount: z.number(),
  transactionType: TransactionTypeSchema,
  accountId: accountSchema.shape.id
})

export type TransactionType = z.infer<typeof TransactionSchema>
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
  id: string,
  rng: () => number
): TransactionType => {
  const ibanPrefix = ibanPrefixes[Math.floor(rng() * ibanPrefixes.length)]
  const city = cities[Math.floor(rng() * cities.length)]
  const street = streets[Math.floor(rng() * streets.length)]

  const baseAmount = Math.floor(rng() * 10000) + 100
  const multiplier = rng() < 0.3 ? 10 : 1
  const amount = baseAmount * multiplier

  const type = rng() > 0.5 ? "receiving" : "sending"

  const date = new Date(Date.now() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000))
  const createdDate = date.toISOString() // Use ISO string format

  return {
    id,
    createdDate,
    iban: `${ibanPrefix}${rng().toString(36).substr(2, 16)}`,
    address: `${Math.floor(rng() * 500) + 1} ${street}, ${city}`,
    amount: parseFloat(amount.toFixed(2)),
    transactionType: type,
    accountId: account.id
  }
}

export const generateTransactions = (
  seed: string = "default-seed",
  transactionsPerAccount = 10
) => {
  const rng = seedrandom(seed)
  let id = 1
  return accounts.flatMap((account) =>
    Array.from({ length: transactionsPerAccount }, () =>
      generateTransaction(account, `${account.id}-${id++}`, rng)
    )
  )
}

export const getUniqueAccountCount = (accounts: AccountType[]) => {
  return new Set(accounts.map((account) => account.id)).size
}

async function writeDataToFiles(accounts: AccountType[], transactions: TransactionType[]) {
  const dataDir = "../backend/seed"
  await ensureDir(dataDir)

  await writeJson(`${dataDir}/accounts.json`, accounts, { spaces: 2 })
  await writeJson(`${dataDir}/transactions.json`, transactions, { spaces: 2 })

  console.log(`Data files have been written to ${dataDir}`)
}

async function main() {
  const seed = "default-seed"
  const transactionsPerAccount = 10
  const transactions = generateTransactions(seed, transactionsPerAccount)

  await writeDataToFiles(accounts, transactions)

  console.log(
    `Generated ${transactions.length} transactions for ${getUniqueAccountCount(accounts)} accounts`
  )
}

// Call the main function
if (import.meta.main) {
  main()
}
