import { AccountsTable } from "../flows/account-flow/components/Accounts.table"

export default function Accounts() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Accounts</h1>
      </div>
      <AccountsTable />
    </>
  )
}
