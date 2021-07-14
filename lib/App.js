import React from "react";
import { out$, run$ } from "@-0/spool";
import { INJECT_HEAD, $store$, registerRouterDOM } from "@-0/browser";
import { parse, diff_keys } from "@-0/utils";
import * as K from "@-0/keys";
import { log } from "./utils";
import { Chrome } from "./layout";
import { CTX, useCursor, Pre } from "./context";
import { routerCfg, View } from "./router";
import "./App.less";
const Provider = ({ children, CFG = {} }) => {
    const DefaultView = CFG[K.CFG_VIEW] || Pre;
    const router = CFG[K.CFG_RUTR];
    const knowns = Object.values(K.CFG) || [];
    const prfx = router[K.ROUTER_PRFX] || null;
    const [, others] = diff_keys(knowns, CFG);
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
    const escaped = str => str.replace(escRGX, "\\$&");
    const RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null;
    if (router)
        registerRouterDOM(router);
    else
        throw new Error(`no \`${K.CFG_RUTR}\` found in Provider CFG`);
    $store$.swap(x => (Object.assign(Object.assign({}, CFG), x)));
    log("$store$.deref():", $store$.deref());
    return (<CTX.Provider value={Object.assign({ run$,
            useCursor,
            $store$, parse: () => parse(window.location.href, RGX), DefaultView }, others)}>
            {children}
        </CTX.Provider>);
};
const router = {
    [K.ROUTER.RUTR]: routerCfg,
    [K.ROUTER.PRFX]: "staging/",
    [K.ROUTER.POST]: INJECT_HEAD
};
const App = () => (<Provider CFG={{
        [K.CFG_RUTR]: router
    }}>
        <Chrome>
            <View />
        </Chrome>
    </Provider>);
log("registered Commands:", out$.topics.entries());
log("starting...");
export default App;
