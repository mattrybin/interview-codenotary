import seedrandom from "https://esm.sh/seedrandom@3.0.5"
import { ensureDir } from "https://deno.land/std@0.192.0/fs/mod.ts"
import { writeJson } from "https://deno.land/std@0.66.0/fs/write_json.ts"

import { z } from "https://esm.sh/zod@3.23.8"

export const accountSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  email: z.string().email(),
  createdDate: z.string().datetime(),
  type: z.enum(["normal", "professional"]),
  iban: z.string(),
  address: z.string()
})

export type AccountType = z.infer<typeof accountSchema>
export const TransactionTypeSchema = z.enum(["receiving", "sending"])

export const TransactionSchema = z.object({
  createdDate: z.string().datetime(),
  amount: z.number(),
  transactionType: TransactionTypeSchema,
  accountId: accountSchema.shape.id
})

export type TransactionType = z.infer<typeof TransactionSchema>

// Define arrays of sample IBANs and addresses
const sampleIbans = [
  "DE89370400440532013000",
  "FR1420041010050500013M02606",
  "GB29NWBK60161331926819",
  "IT60X0542811101000000123456",
  "ES9121000418450200051332",
  "NL91ABNA0417164300",
  "CH9300762011623852957",
  "AT611904300234573201",
  "BE68539007547034",
  "SE4550000000058398257466"
]

const sampleAddresses = [
  "123 Main St, Berlin, Germany",
  "45 Rue de la Paix, Paris, France",
  "78 High Street, London, UK",
  "92 Via Roma, Rome, Italy",
  "567 Hauptstraße, Munich, Germany",
  "34 Calle Mayor, Madrid, Spain",
  "12 Keizersgracht, Amsterdam, Netherlands",
  "89 Bahnhofstrasse, Zurich, Switzerland",
  "23 Ringstraße, Vienna, Austria",
  "56 Avenue Louise, Brussels, Belgium"
]

export const accounts: AccountType[] = [
  {
    id: "1001",
    accountName: "John Doe",
    email: "john.doe@example.com",
    createdDate: "2024-01-15T10:30:00Z",
    type: "professional",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1002",
    accountName: "Alice Smith",
    email: "alice.smith@example.com",
    createdDate: "2024-02-20T14:45:00Z",
    type: "normal",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1003",
    accountName: "Mario Rossi",
    email: "mario.rossi@example.com",
    createdDate: "2024-03-10T09:15:00Z",
    type: "professional",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1004",
    accountName: "Emma Johnson",
    email: "emma.johnson@example.com",
    createdDate: "2024-04-05T16:20:00Z",
    type: "normal",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1005",
    accountName: "Hans Schmidt",
    email: "hans.schmidt@example.com",
    createdDate: "2024-05-12T11:00:00Z",
    type: "professional",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1006",
    accountName: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    createdDate: "2024-06-18T13:30:00Z",
    type: "normal",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1007",
    accountName: "Luca Bianchi",
    email: "luca.bianchi@example.com",
    createdDate: "2024-07-22T08:45:00Z",
    type: "professional",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1008",
    accountName: "Anna Müller",
    email: "anna.mueller@example.com",
    createdDate: "2024-08-30T15:10:00Z",
    type: "normal",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1009",
    accountName: "James Wilson",
    email: "james.wilson@example.com",
    createdDate: "2024-09-14T12:00:00Z",
    type: "professional",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  },
  {
    id: "1010",
    accountName: "Elena Petrova",
    email: "elena.petrova@example.com",
    createdDate: "2024-10-25T10:55:00Z",
    type: "normal",
    iban: sampleIbans[Math.floor(Math.random() * sampleIbans.length)],
    address: sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  }
]

export const generateTransaction = (
  account: (typeof accounts)[0],
  rng: () => number
): TransactionType => {
  const baseAmount = Math.floor(rng() * 10000) + 100
  const multiplier = rng() < 0.3 ? 10 : 1
  const amount = baseAmount * multiplier

  const type = rng() > 0.5 ? "receiving" : "sending"

  const date = new Date(Date.now() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000))
  const createdDate = date.toISOString()

  return {
    createdDate,
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
  return accounts.flatMap((account) =>
    Array.from({ length: transactionsPerAccount }, () => generateTransaction(account, rng))
  )
}

async function writeDataToFiles(accounts: AccountType[], transactions: TransactionType[]) {
  const dataDir = "../backend/data"
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

  console.log(`Generated ${transactions.length} transactions for ${accounts.length} accounts`)
}

if (import.meta.main) {
  main()
}
