import { Link } from "@remix-run/react"
import { HandCoins } from "lucide-react"

export const Branding = () => (
  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    <Link
      to="/"
      className="flex items-center gap-2 font-semibold"
    >
      <HandCoins className="h-6 w-6" />
      <span className="">ImmuBank</span>
    </Link>
  </div>
)
