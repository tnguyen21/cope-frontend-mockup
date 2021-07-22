import React, { useContext } from "react"
import { Auth } from "@aws-amplify/auth"
import { Hub } from "@aws-amplify/core"
import { CTX } from "../../context"
import { NAV } from "../../commands"
import { Link } from "../Link"

const signOut = async () => {
    try {
        await Auth.signOut()
        Hub.dispatch("UI Auth", {
            // channel must be 'UI Auth'
            event: "AuthStateChange", // event must be 'AuthStateChange'
            message: "signedout", // message must be 'signedout'
        })
    } catch (error) {
        console.log("error signing out: ", error)
    }
}

//const signIn = async _run$ => {
//    _run$.next()
//}

export const SignInButton = ({ style = {} }) => {
    return (
        <Link to="sign-in" style={style}>
            Sign In
        </Link>
    )
}

export const SignOutButton = ({ style = {} }) => {
    return (
        <button onClick={signOut} style={{ cursor: "pointer", ...style }}>
            Sign out
        </button>
    )
}
