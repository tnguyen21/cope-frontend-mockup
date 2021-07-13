//import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"

import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"
import { registerCMD } from "@-0/spool"
import { cmd_inject_head } from "@-0/browser"
import { Auth } from "@aws-amplify/auth"
//import { Chrome } from "../layout"
import { log } from "../utils"
import { node, API } from "cope-client-utils"

// TODO: return types expected for routerCfg
export const routerCfg = async url => {
    const session = await Auth.currentAuthenticatedUser()
    console.log("session triggered:", { session })
    const match = URL2obj(url)
    //const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

    //let { } = URL_QERY

    //limit = parseInt(limit)
    //const path = match[K.URL_PATH]

    const RES = new EquivMap(
        [
            [
                // home page (path = [])
                { ...match, [K.URL_PATH]: [] },
                {
                    [K.URL_DATA]: async () => {
                        const list = await node.list({
                            type: API.NodeType.A_GEM,
                            status: API.NodeStatus.DRAFT,
                        })
                        console.log({ list })
                        return {
                            [K.DOM_HEAD]: {
                                [K.HD_TITL]: "COPE frontend",
                                [K.OG_DESC]: "COPE frontend tinkering",
                                //img_url,
                            },
                            [K.DOM_BODY]: { data: list },
                        }
                    },
                    [K.URL_PAGE]: "home",
                },
            ],
            [
                { ...match, URL_PATH: [ "page1" ] },
                {
                    URL_DATA: async () => {
                        const list = await node.list({
                            owner: "PostConfirmTriggerLambda",
                        })
                        return {
                            DOM_HEAD: {
                                title: "Page 1",
                                og_description: "Description for Open Graph/sharing",
                            },
                            DOM_BODY: { data: list },
                        }
                    },
                    URL_PAGE: "page1",
                },
            ],
        ],
        // TODO: create actual 404 Page
    ).get(match) || { [K.URL_DATA]: () => 404, [K.URL_PAGE]: "test" }

    const data = await RES[K.URL_DATA]()
    const page = RES[K.URL_PAGE]
    log("routed:", { page, data })

    return { [K.URL.DATA]: data, [K.URL.PAGE]: page }
}

//const Page2 = ({ data }) => {
//    return h(
//        "pre",
//        { className: "boobs" },
//        h("h1", null, `PAGE 2:`),
//        JSON.stringify(data, null, 2)
//    )
//}
export const INJECT_HEAD = registerCMD(cmd_inject_head, false)

export const router = {
    [K.CFG_RUTR]: routerCfg,
    [K.RTR_PRFX]: "cope-frontend-mockup/",
    [K.RTR_POST]: INJECT_HEAD,
}
