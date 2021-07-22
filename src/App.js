import React, { useEffect, useState } from "react"
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { trace } from "@thi.ng/rstream"
import { DOMnavigated$ } from "@-0/browser"
import { out$, log$ } from "@-0/spool"
//import * as K from "@-0/keys"

import { log } from "./utils"
import { Chrome, View } from "./components"
import { router } from "./router"

// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

log$.subscribe(trace("log$:"))
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
        // authState is a string, so equality checks don't
        // fire arbitrary rerenderings
        [ authState ],
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

    const Ready = () => {
        console.log("user.username:", user?.username)
        return (
            <div className="App">
                <Chrome authState={authState}>
                    <View />
                </Chrome>
            </div>
        )
    }
    // prettier-ignore
    return <Ready/>
    //<AmplifyAuthenticator>
    //    {
    //        !authState || authState === SignedOut || authState === SignIn ? <SignIn />
    //        : authState === SignedIn && user ? <Ready />
    //        : <SignUp />
    //    }
    //</AmplifyAuthenticator>
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
