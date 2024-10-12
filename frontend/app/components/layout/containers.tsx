export const RootLayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    {children}
  </div>
)

export const SidebarLayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex max-h-screen flex-col gap-2">{children}</div>
  </div>
)

export const MainLayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
  </div>
)
