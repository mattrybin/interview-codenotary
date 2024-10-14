import { Navigation } from "../../components/layout/Navigation"
import { Branding } from "../../components/layout/Branding"
import { GetStartedCard } from "../../components/layout/GetStartedCard"
import {
  MainLayoutContainer,
  RootLayoutContainer,
  SidebarLayoutContainer
} from "../../components/layout/containers"
import { Breadcrumb } from "./Breadcrumb"
import React from "react"

export const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <RootLayoutContainer>
    <SidebarLayoutContainer>
      <div className="flex max-h-screen flex-col gap-2">
        <Branding />
        <Navigation />
        <GetStartedCard />
      </div>
    </SidebarLayoutContainer>
    <MainLayoutContainer>
      <Breadcrumb />
      {children}
    </MainLayoutContainer>
  </RootLayoutContainer>
)
