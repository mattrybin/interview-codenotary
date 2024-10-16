import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import ky from "ky"
import { TransactionsTable } from "../flows/transaction-flow/components/Transactions.table"
import { TransactionType } from "../types/transaction"
import { backendUrl } from "../env"

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  try {
    const transactions: TransactionType[] = await ky
      .get(`${backendUrl}/accounts/${id}/transactions`)
      .json()
    return json({ transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    throw json({ error: "Error fetching transactions" }, { status: 500 })
  }
}

export default function AccountDetails() {
  const { transactions } = useLoaderData<{ transactions: TransactionType[] }>()

  return (
    <div>
      <TransactionsTable transactions={transactions} />
    </div>
  )
}
