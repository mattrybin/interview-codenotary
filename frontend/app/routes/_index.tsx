import { json, type LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { ExampleChart } from "../components/temp/example-chart"
import { AccountType } from "../types/account"
import { TransactionType } from "../types/transaction"

export const loader: LoaderFunction = async () => {
  const accountsResponse = await fetch("http://localhost:4000/accounts")
  const accounts: AccountType[] = await accountsResponse.json()

  const accountsWithTransactions = await Promise.all(
    accounts.map(async (account) => {
      const transactionsResponse = await fetch(
        `http://localhost:4000/accounts/${account.id}/transactions`
      )
      const transactions: TransactionType[] = await transactionsResponse.json()
      return { ...account, transactions }
    })
  )

  return json({
    transactions: accountsWithTransactions.flatMap((account) => account.transactions)
  })
}

export default function Dashboard() {
  const { transactions } = useLoaderData<{ transactions: TransactionType[] }>()

  return (
    <>
      <div className="mt-6 flex flex-1 rounded-lg">
        <div className="flex flex-col items-center gap-1 text-center">
          {transactions.length > 0 ? (
            <ExampleChart transactions={transactions} />
          ) : (
            <div>No transactions</div>
          )}
        </div>
      </div>
    </>
  )
}
