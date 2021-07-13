import React, { useEffect, useState } from "react"
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

import { DOMnavigated$ } from "@-0/browser"
import { out$ } from "@-0/spool"
//import * as K from "@-0/keys"

import { log } from "./utils"
import { Chrome, View } from "./components"
import { router } from "./router"

// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

const App = () => {
    const [ authState, setAuthState ] = useState()
    const [ user, setUser ] = useState()

    console.log({ authState, user })
    useEffect(
        () => {
            // PRIORITY: API
            console.log("App useEffect Triggered ⚠")
            DOMnavigated$.next({
                target        : document,
                currentTarget : document,
            })
            return onAuthUIStateChange((nextAuthState, authData) => {
                setAuthState(nextAuthState)
                setUser(authData)
            })
        },
        [ user ],
    )

    const required_fields = [
        {
            type        : "username",
            placeholder : "john@email.com",
            required    : true,
            label       : "Email Address",
        },
        { type: "password", required: true },
    ]

    const SignIn = () => <AmplifySignIn slot="sign-in" formFields={required_fields} />
    const SignUp = () => <AmplifySignUp slot="sign-up" formFields={required_fields} />

    const SignedIn = () => {
        console.log("user.username:", user.username)
        return (
            <div className="App">
                <Chrome>
                    <View user={user} />
                </Chrome>
            </div>
        )
    }
    // prettier-ignore
    return <AmplifyAuthenticator>
        {
            !authState || authState === AuthState.SignedOut || authState === AuthState.SignIn ? <SignIn />
            : authState === AuthState.SignedIn && user ? <SignedIn /> 
            : <SignUp />
        }
    </AmplifyAuthenticator>
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
