import React from "react"
import styled from "styled-components"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { SignInButton, SignOutButton } from "../components/Amplify"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

//import { StyledHeader, StyledNavbar, StyledLink, Logo } from "./style"
import logo from "../assets/us-census-bureau-logo-white.svg"

import { Layout, Menu, Breadcrumb } from "antd"

const { Header: HEADER, Content, Footer } = Layout
const {
    ConfirmSignIn,
    ConfirmSignUp,
    CustomConfirmSignIn,
    ForgotPassword,
    Loading,
    ResetPassword,
    SettingMFA,
    SignIn,
    SignOut,
    SignUp,
    SignedIn,
    SignedOut,
    SigningUp,
    TOTPSetup,
    VerifyContact,
    VerifyingAttributes,
    confirmingSignInCustomFlow,
    confirmingSignUpCustomFlow,
} = AuthState

export const Header = () => (
    <Layout>
        <HEADER style={{ position: "fixed", zIndex: 1, width: "100%", padding: "0 1rem" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ "2" ]}>
                <Menu.Item key="1">
                    <img
                        src={process.env.PUBLIC_URL + "us-census-bureau-logo-white.svg"}
                        alt=""
                        style={{ width: "6rem" }}
                    />
                </Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3" style={{ marginLeft: "auto" }}>
                    {(SignedIn && (
                        <SignOutButton style={{ display: "block", padding: "5rem" }} />
                    )) || <SignInButton style={{ display: "block", padding: "5rem" }} />}
                </Menu.Item>
            </Menu>
        </HEADER>
        <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                Content
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Census Academy</Footer>
    </Layout>
)

//function Header() {
//  return (
//    <StyledHeader>
//      <Container>
//        <Grid justify="space-between" container spacing={3}>
//          <Grid item xs={4} role="banner">
//            <Logo src={logo} alt="United States Census Bureau Logo" />
//          </Grid>
//          {/* TODO search bar logic + styles */}
//          <Grid
//            item
//            xs={8}
//            style={{
//              fontSize: "1.25rem",
//              color: "white",
//              textAlign: "center",
//              borderLeft: "thin solid hsl(213deg 28% 35%)",
//            }}
//          >
//            Search Bar Here
//          </Grid>
//          <StyledNavbar item container xs={12}>
//            <Grid
//              item
//              component="nav"
//              justify="space-between"
//              container
//              role="navigation"
//            >
//              <Grid item component={StyledLink} to="/">
//                Home
//              </Grid>
//              <Grid item component={StyledLink} to="/topics">
//                Topics
//              </Grid>
//              <Grid item component={StyledLink} to="/courses">
//                Courses
//              </Grid>
//              <Grid item component={StyledLink} to="/webinars">
//                Webinars
//              </Grid>
//              <Grid item component={StyledLink} to="/data-gems">
//                Data Gems
//              </Grid>
//              <Grid item component={StyledLink} to="/data-challenges">
//                Data Challenges
//              </Grid>
//              {/* TODO set up user accounts, dashaboard only becomes visible when logged in */}
//              {/* <Grid item>
//                  <Link to="/">Dashboard</Link>
//                </Grid> */}
//              <Grid item component={StyledLink} to="/resources">
//                Resources
//              </Grid>
//              <Grid item component={StyledLink} to="/about">
//                About
//              </Grid>
//            </Grid>
//          </StyledNavbar>
//        </Grid>
//      </Container>
//    </StyledHeader>
//  );
//}

//export function Header() {
//    return (
//        <AppHeader>
//            <AppHeaderContent>
//                <nav>
//                    <AppHeaderNavList>
//                        <li>
//                            <AppHeaderLink to="/collections">Contents</AppHeaderLink>
//                        </li>
//                    </AppHeaderNavList>
//                </nav>
//                <AmplifySignOut />
//            </AppHeaderContent>
//        </AppHeader>
//    )
//}

//export default Header
