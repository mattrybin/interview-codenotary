import { Navigation } from "../../components/layout/Navigation"
import { Branding } from "../../components/layout/Branding"
import { GetStartedCard } from "../../components/layout/GetStartedCard"
import {
  MainLayoutContainer,
  RootLayoutContainer,
  SidebarLayoutContainer
} from "../../components/layout/containers"

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayoutContainer>
      <SidebarLayoutContainer>
        <div className="flex max-h-screen flex-col gap-2">
          <Branding />
          <Navigation />
          <GetStartedCard />
        </div>
      </SidebarLayoutContainer>
      <MainLayoutContainer>{children}</MainLayoutContainer>
    </RootLayoutContainer>
  )
}
