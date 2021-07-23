import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import awsconfig from "./aws-exports"
import * as K from "@-0/keys"
import { router } from "./router"
import { Provider } from "./components"
import { configureWith } from "cope-client-utils"
import "./theme/App.less"
import { Button } from "antd"
// additional configurations in cope-client-utils provided
// to properly assign ownership to created Nodes/Assets
configureWith(awsconfig)

ReactDOM.render(
    <Provider
        CFG={{
            [K.CFG_RUTR]: router,
        }}
    >
        <App />
    </Provider>,
    document.getElementById("root"),
)
