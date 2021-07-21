import React from "react"
import { Auth } from "@aws-amplify/auth"
import { Hub } from "@aws-amplify/core"

const handleSignOutButtonClick = async () => {
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

export const SignOut = ({ style = {} }) => {
    return (
        <button onClick={handleSignOutButtonClick} style={{ cursor: "pointer", ...style }}>
            Sign out
        </button>
    )
}
