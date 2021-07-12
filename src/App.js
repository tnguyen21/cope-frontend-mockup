import React, { useEffect } from "react" //useMemo, //useLayoutEffect, //useEffect, //useContext, //createElement,
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

//import { getIn } from "@thi.ng/paths"
//import { isObject } from "@thi.ng/checks"
//import { EquivMap } from "@thi.ng/associative"
//import { Cursor } from "@thi.ng/atom"

//import "regenerator-runtime"
// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()

import { DOMnavigated$ } from "@-0/browser"
import { out$ } from "@-0/spool"
import * as K from "@-0/keys"

import { log } from "./utils"
import { Chrome, View } from "./components"
import { Provider } from "./context"
import { router } from "./router"

// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

const App = () => {
    const [ authState, setAuthState ] = React.useState()
    const [ user, setUser ] = React.useState()

    useEffect(
        () => {
            // PRIORITY: API
            DOMnavigated$.next({
                target        : document,
                currentTarget : document
            })
            return onAuthUIStateChange((nextAuthState, authData) => {
                setAuthState(nextAuthState)
                setUser(authData)
            })
        },
        [ user ]
    )

    return authState === AuthState.SignedIn && user ? (
        <div className="App">
            <Provider
                CFG={{
                    //count: 0,
                    [K.CFG_RUTR]: router /* circular dep!! [K.CFG_ROOT]: root*/
                }}
            >
                <Chrome>
                    <View />
                </Chrome>
            </Provider>
            <AmplifySignOut />
        </div>
    ) : (
        <AmplifyAuthenticator>
            <AmplifySignUp
                slot="sign-up"
                formFields={[
                    { type: "username", placeholder: "john@email.com", required: true, label: "Email Address" },
                    { type: "password", required: true }
                ]}
            />
        </AmplifyAuthenticator>
    )
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
