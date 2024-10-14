import { NavLink } from "@remix-run/react"
import { Home, Package2 } from "lucide-react"

const navLinks = [
  {
    path: "/",
    label: "Dashboard",
    icon: Home,
    id: "nav-link-dashboard"
  },
  {
    path: "/accounts",
    label: "Accounts",
    icon: Package2,
    id: "nav-link-accounts"
  }
]

export const Navigation = () => (
  <div className="flex-1">
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navLinks.map(({ path, label, icon: Icon, id }) => (
        <NavLink
          key={id}
          to={path}
          data-testid={id}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              isActive ? "bg-muted text-primary" : "text-muted-foreground"
            }`
          }
          end
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  </div>
)
