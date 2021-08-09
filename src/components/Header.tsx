import React from "react"
import styled from "styled-components"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { Link } from "./Link"

const AppHeader = styled.header`
    width: 100%;
    top: 0;
    box-shadow: 0px 1px 3px;
`

const AppHeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 800px;
    max-width: 1440px;
    padding: 0 12px;
    margin: 0 auto;
`

const AppHeaderNavList = styled.ul`
    display: flex;
    margin: 0;
    list-style: none;
`

const AppHeaderLink = styled.li`
  font-size: 1rem;
  display: inline-flex;
  padding: 16px 20px;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
      text-decoration: underline;
    }
  }
`

const LinkStyles = {
    fontSize: "1rem",
    display: "inline-flex",
    padding: "16px 20px",
    alignItems: "center",
    textDecoration: "none",
}

export function Header() {
    return (
        <AppHeader>
            <AppHeaderContent>
                <nav>
                    <AppHeaderNavList>
                        <AppHeaderLink>
                            <Link href="#">Home</Link>
                        </AppHeaderLink>
                        <AppHeaderLink>
                            <Link href="admin/collections">Collections</Link>
                        </AppHeaderLink>
                    </AppHeaderNavList>
                </nav>
                <AmplifySignOut />
            </AppHeaderContent>
        </AppHeader>
    )
}
