import React from "react" //useMemo, //useLayoutEffect, //useEffect, //useContext, //createElement,
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"

//import { getIn } from "@thi.ng/paths"
//import { isObject } from "@thi.ng/checks"
//import { EquivMap } from "@thi.ng/associative"
//import { Cursor } from "@thi.ng/atom"

//import "regenerator-runtime"
// import scrolly from "@mapbox/scroll-restorer"
// scrolly.start()

import { out$ } from "@-0/spool"
import { INJECT_HEAD } from "@-0/browser"
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

//export const root = document.getElementById("root")
const router = {
    [K.RTR.RUTR]: routerCfg,
    [K.RTR_PRFX]: "staging/",
    [K.RTR_POST]: INJECT_HEAD
}

const App = () => (
    <AmplifyAuthenticator>
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
    </AmplifyAuthenticator>
)

log("registered Commands:", out$.topics.entries())

log("starting...")

export default App
