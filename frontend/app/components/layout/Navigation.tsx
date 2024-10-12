import { Link } from "@remix-run/react"
import { Badge } from "../ui/badge"
import { Home, HandCoins, Package2, LineChart } from "lucide-react"

const navLinks = [
  {
    path: "/",
    label: "Dashboard",
    icon: Home,
    id: "nav-link-dashboard",
    active: true
  },
  {
    path: "/",
    label: "Transactions",
    icon: HandCoins,
    id: "nav-link-transactions"
  },
  {
    path: "/",
    label: "Accounts",
    icon: Package2,
    id: "nav-link-accounts"
  },
  {
    path: "/",
    label: "Analytics",
    icon: LineChart,
    id: "nav-link-analytics",
    badge: "Coming Soon"
  }
]

export const Navigation = () => (
  <div className="flex-1">
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navLinks.map(({ path, label, icon: Icon, id, active, badge }) => (
        <Link
          key={id}
          to={path}
          data-testid={id}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            active ? "bg-muted text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
          {badge && (
            <Badge
              variant="secondary"
              className="ml-auto"
            >
              {badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  </div>
)
