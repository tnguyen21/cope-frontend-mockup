import React, { useState, useEffect } from "react"
import { DOMnavigated$ } from "@-0/browser"
import { Link } from "./Link"
import { primary_color } from "../theme/colors.js"
import { SignInButton, SignOutButton } from "../components"
import { AuthState } from "@aws-amplify/ui-components"
import { Layout, Menu } from "antd"

const { Header: HEADER } = Layout
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

export const Header = ({ authState, user }) => {
    return (
        <HEADER style={{ position: "fixed", zIndex: 1, width: "100%", padding: "0 1rem" }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ "2" ]}>
                <Menu.Item key="1">
                    <img
                        src={process.env.PUBLIC_URL + "us-census-bureau-logo-white.svg"}
                        alt="US Census Bureau logo"
                        style={{ width: "6rem" }}
                    />
                </Menu.Item>
                <Menu.Item key="2" style={{}}>
                    <Link to="page2">Page 2</Link>
                </Menu.Item>
                <Menu.Item key="3" style={{ marginLeft: "auto" }}>
                    {(authState === SignedIn && <SignOutButton />) || <SignInButton />}
                </Menu.Item>
            </Menu>
        </HEADER>
    )
}
