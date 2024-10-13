import { TransactionsTable } from "../flows/transaction-flow/components/Transactions.table"

export default function Transactions() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Transactions</h1>
      </div>
      <TransactionsTable />
    </>
  )
}
