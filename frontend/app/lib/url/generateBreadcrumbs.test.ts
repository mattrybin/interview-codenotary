import { describe, it, expect } from "vitest"
import { generateBreadcrumbs } from "./generateBreadcrumbs"

describe("generateBreadcrumbs", () => {
  it("should generate correct breadcrumbs with NanoID", () => {
    const pathname = "/users/v1StGXR8_Z5jdHi6B-myT/settings"
    const result = generateBreadcrumbs(pathname)
    expect(result).toEqual([
      { href: "/users", label: "users" },
      { href: "/users/v1StGXR8_Z5jdHi6B-myT", label: "v1StGXR8_Z5jdHi6B-myT" },
      { href: "/users/v1StGXR8_Z5jdHi6B-myT/settings", label: "settings" }
    ])
  })

  it("should handle root path correctly", () => {
    const pathname = "/"
    const result = generateBreadcrumbs(pathname)
    expect(result).toEqual([])
  })

  it("should handle paths with trailing slashes", () => {
    const pathname = "/products/categories/"
    const result = generateBreadcrumbs(pathname)
    expect(result).toEqual([
      { href: "/products", label: "products" },
      { href: "/products/categories", label: "categories" }
    ])
  })

  it("should capitalize preset paths and leave others unchanged", () => {
    const pathname = "/accounts/home/transactions/details/123"
    const result = generateBreadcrumbs(pathname)
    expect(result).toEqual([
      { href: "/accounts", label: "Accounts" },
      { href: "/accounts/home", label: "Home" },
      { href: "/accounts/home/transactions", label: "Transactions" },
      { href: "/accounts/home/transactions/details", label: "details" },
      { href: "/accounts/home/transactions/details/123", label: "123" }
    ])
  })

  it("should handle mixed case in preset paths", () => {
    const pathname = "/ACCOUNTS/HOME/transactions"
    const result = generateBreadcrumbs(pathname)
    expect(result).toEqual([
      { href: "/ACCOUNTS", label: "Accounts" },
      { href: "/ACCOUNTS/HOME", label: "Home" },
      { href: "/ACCOUNTS/HOME/transactions", label: "Transactions" }
    ])
  })
})
