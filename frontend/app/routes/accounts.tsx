import { Outlet } from "@remix-run/react"

export default function AccountsLayout() {
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">Accounts</h1>
      <Outlet />
    </>
  )
}
