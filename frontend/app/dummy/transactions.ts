import seedrandom from "seedrandom"

export const accounts = [
  {
    accountNumber: "1001",
    accountName: "John Doe"
  },
  {
    accountNumber: "1002",
    accountName: "Alice Smith"
  },
  {
    accountNumber: "1003",
    accountName: "Mario Rossi"
  },
  {
    accountNumber: "1004",
    accountName: "Emma Johnson"
  },
  {
    accountNumber: "1005",
    accountName: "Hans Schmidt"
  },
  {
    accountNumber: "1006",
    accountName: "Sophie Dubois"
  },
  {
    accountNumber: "1007",
    accountName: "Luca Bianchi"
  },
  {
    accountNumber: "1008",
    accountName: "Anna Müller"
  },
  {
    accountNumber: "1009",
    accountName: "James Wilson"
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
  id: number,
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
    id,
    iban: `${ibanPrefix}${rng().toString(36).substr(2, 16)}`,
    address: `${Math.floor(rng() * 500) + 1} ${street}, ${city}`,
    amount: parseFloat(amount.toFixed(2)),
    type,
    date: new Date(Date.now() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000)).toISOString()
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
  return new Set(transactions.map((t) => t.accountNumber)).size
}
