import { json, LoaderFunction } from "@remix-run/node"
import ky from "ky"
import { AccountsTable } from "../flows/account-flow/components/Accounts.table"
import { AccountType } from "../types/account"
import { useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = async () => {
  try {
    const accounts: AccountType[] = await ky.get(`http://localhost:4000/accounts`).json()
    console.log(accounts)
    return json({ accounts })
  } catch (error) {
    console.error("Error fetching accounts:", error)
    throw json({ error: "Error fetching accounts" }, { status: 500 })
  }
}

export default function AccountsList() {
  const { accounts } = useLoaderData<{ accounts: AccountType[] }>()
  return <AccountsTable accounts={accounts} />
}
