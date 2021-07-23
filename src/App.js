import React, { useEffect, useState } from "react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { trace } from "@thi.ng/rstream"
import { out$, log$ } from "@-0/spool"

import { log } from "./utils"
import { Chrome, View } from "./components"

// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

//log$.subscribe(trace("log$:"))

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
    return (
        <div className="App">
            <Chrome>
                <View />
            </Chrome>
        </div>
    )
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
