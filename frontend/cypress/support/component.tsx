/* eslint-disable @typescript-eslint/no-namespace */
import { mount } from "cypress/react18"
import "../../app/tailwind.css"
import { MemoryRouter, Routes, Route } from "react-router-dom"

Cypress.Commands.add("mount", (component, options = {}) => {
  return mount(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={component}
        />
      </Routes>
    </MemoryRouter>,
    options
  )
})
