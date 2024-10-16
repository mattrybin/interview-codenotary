import { Outlet, useParams } from "@remix-run/react"

export default function AccountsLayout() {
  const params = useParams()
  const title = params.id ? `Account: ${params.id}` : "Accounts"

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">{title}</h1>
      <Outlet />
    </>
  )
}
