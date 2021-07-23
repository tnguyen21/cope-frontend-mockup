import React, { useState, useEffect } from "react"
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { DOMnavigated$ } from "@-0/browser"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { CTX, default_context } from "../context"
import { Breadcrumbs, Header } from "../components"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

<<<<<<< HEAD
//import { StyledHeader, StyledNavbar, StyledLink, Logo } from "./style"
import logo from "../assets/us-census-bureau-logo-white.svg"
import { CensusAcademyFooter } from "./CensusAcademyFooter"

=======
>>>>>>> b8a59514f819a15357ad8275738e1ddd1afebf7d
import { Layout, Menu, Breadcrumb } from "antd"

const { Content, Footer } = Layout
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

<<<<<<< HEAD
export const Chrome = ({ authState }) => (
    <Layout>
        <HEADER style={{ position: "fixed", zIndex: 1, width: "100%", padding: "0 1rem" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">
                    <img
                        src={process.env.PUBLIC_URL + "us-census-bureau-logo-white.svg"}
                        alt=""
                        style={{ width: "6rem" }}
                    />
                </Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3" style={{ marginLeft: "auto" }}>
                    {(authState === SignedIn && <SignOutButton />) || <SignInButton />}
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
        <Footer style={{ backgroundColor: primary_color }}>
            <CensusAcademyFooter />
        </Footer>
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
=======
export const Chrome = ({ children }) => {
    const [ authState, setAuthState ] = useState()
    const [ user, setUser ] = useState()
>>>>>>> b8a59514f819a15357ad8275738e1ddd1afebf7d

    console.log({ authState, user })
    useEffect(
        () => {
            // PRIORITY: API
            console.log("App useEffect Triggered ⚠")
            //DOMnavigated$.next({
            //    target: document,
            //    currentTarget: document,
            //})
            return onAuthUIStateChange((nextAuthState, authData) => {
                //@ts-ignore
                setAuthState(nextAuthState)
                //@ts-ignore
                setUser(authData)
            })
        },
        // authState is a string, so equality checks don't
        // fire arbitrary rerenderings
        [ authState ],
    )

    return (
        <Layout>
            <Header authState={authState} user={user} />
            <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
                <Breadcrumbs />
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <CTX.Provider
                        value={{
                            ...default_context,
                            authState,
                            user,
                        }}
                    >
                        {children}
                    </CTX.Provider>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Census Academy</Footer>
        </Layout>
    )
}
