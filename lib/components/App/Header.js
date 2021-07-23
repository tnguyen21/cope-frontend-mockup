import React from "react"
import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import { AmplifySignOut } from "@aws-amplify/ui-react"
const AppHeader = styled.header`
    position: sticky;
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
const AppHeaderLink = styled(NavLink)`
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
function Header() {
    return (
        <AppHeader>
            <AppHeaderContent>
                <nav>
                    <AppHeaderNavList>
                        <li>
                            <AppHeaderLink to="/collections">Contents</AppHeaderLink>
                        </li>
                    </AppHeaderNavList>
                </nav>
                <AmplifySignOut />
            </AppHeaderContent>
        </AppHeader>
    )
}
export default Header
