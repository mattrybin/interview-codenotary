import { json, LoaderFunction } from "@remix-run/node"
import ky from "ky"
import { AccountsTable } from "../flows/account-flow/components/Accounts.table"
import { AccountType } from "../types/account"
import { useLoaderData } from "@remix-run/react"
import { backendUrl } from "../env"

export const loader: LoaderFunction = async () => {
  try {
    const accounts: AccountType[] = await ky.get(`${backendUrl}/accounts`).json()
    return json({ accounts })
  } catch (error) {
    console.error("Error fetching accounts:", error)
    throw json({ error: "Error fetching accounts" }, { status: 500 })
  }
}

// Export the loader type
export type AccountsLoaderData = { accounts: AccountType[] }

export default function AccountsList() {
  const { accounts } = useLoaderData<AccountsLoaderData>()
  return <AccountsTable accounts={accounts} />
}
