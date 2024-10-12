import { Navigation } from "./Navigation"

describe("<Navigation />", () => {
  beforeEach(() => {
    cy.mount(<Navigation />)
  })

  it("renders all navigation links", () => {
    cy.get('[data-testid="nav-link-dashboard"]').should("be.visible").and("contain", "Dashboard")
    cy.get('[data-testid="nav-link-transactions"]')
      .should("be.visible")
      .and("contain", "Transactions")
    cy.get('[data-testid="nav-link-accounts"]').should("be.visible").and("contain", "Accounts")
    cy.get('[data-testid="nav-link-analytics"]').should("be.visible").and("contain", "Analytics")
  })
})
