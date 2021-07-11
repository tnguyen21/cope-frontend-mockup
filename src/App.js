import React from "react" //useMemo, //useLayoutEffect, //useEffect, //useContext, //createElement,
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"

//import { getIn } from "@thi.ng/paths"
//import { isObject } from "@thi.ng/checks"
//import { EquivMap } from "@thi.ng/associative"
//import { Cursor } from "@thi.ng/atom"

//import "regenerator-runtime"
// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()

import { out$, registerCMD } from "@-0/spool"
import { cmd_inject_head } from "@-0/browser"
import * as K from "@-0/keys"

import { log } from "./utils"
import { Chrome, View } from "./components"
import { Provider } from "./context"
import { routerCfg } from "./router"

// ⚠ <=> API SURFACE AREA TOO LARGE <=> ⚠ .
// import { button_x } from "./components"
// import { THEME } from "./theme"

//trace$("run$ ->", run$)
//trace$("command$ ->", command$)
//trace$("out$ ->", out$)

//const logger = registerCMD({
//    sub$: "logger",
//    args: ({ x }) => x,
//    work: log,
//})

// default value ({ run$  }) is applied when no Provider is found in the inheritance tree of the component (orphans)

export const INJECT_HEAD = registerCMD(cmd_inject_head)

const App = () => {
    const [ authState, setAuthState ] = React.useState()
    const [ user, setUser ] = React.useState()

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState)
            setUser(authData)
        })
    }, [])

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

const router = {
    [K.CFG_RUTR]: routerCfg,
    [K.RTR_PRFX]: "staging/",
    [K.RTR_POST]: INJECT_HEAD
}

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
