const capitalizedPaths = ["accounts", "home", "transactions"]

export const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean)
  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`
    const label = capitalizedPaths.includes(path.toLowerCase())
      ? path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
      : path
    return { href, label }
  })
}
