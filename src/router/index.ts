import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"

import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"

//import { Chrome } from "../layout"
import { log, JL } from "../utils"
import { node, API } from "cope-client-utils"

import { CTX } from "../context"
//import { ByCampaign, ByTopic, BySender, Home } from "../pages"
//import { LogButton, Filter } from "../components"

//
//                             d8
//  888-~\  e88~-_  888  888 _d88__  e88~~8e   d88~\
//  888    d888   i 888  888  888   d888  88b C888
//  888    8888   | 888  888  888   8888__888  Y88b
//  888    Y888   ' 888  888  888   Y888    ,   888D
//  888     "88_-~  "88_-888  "88_/  "88___/  \_88P
//
//

const sort_by_campaign_id_fn = (a, b) => (a.campaign_id.toUpperCase() < b.campaign_id.toUpperCase() ? -1 : 1)
/**
 *
 * Even if you don't end up using `spule` - you may find the
 * [`@thi.ng/associative`](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
 * library __very handy__ indeed!
 *
 * Value semantics have so many benefits. As a router,
 * here's one.
 *
 * TODO: Graphql Example
 */

export const routerCfg = async url => {
    const match = URL2obj(url)
    const { URL_DOMN, URL_FULL, URL_HASH, URL_PATH, URL_QERY, URL_SUBD } = match

    //let { } = URL_QERY

    //limit = parseInt(limit)
    const path = match[K.URL_PATH]

    log({ match })

    const RES = new EquivMap(
        [
            //
            //  888
            //  888-~88e  e88~-_  888-~88e-~88e  e88~~8e
            //  888  888 d888   i 888  888  888 d888  88b
            //  888  888 8888   | 888  888  888 8888__888
            //  888  888 Y888   ' 888  888  888 Y888    ,
            //  888  888  "88_-~  888  888  888  "88___/
            //
            //

            [
                { ...match, [K.URL_PATH]: [] },
                {
                    [K.URL_DATA]: async () => {
                        const list = await node.list({
                            type: API.NodeType.A_GEM,
                            status: API.NodeStatus.DRAFT
                        })
                        return {
                            [K.DOM_HEAD]: {
                                title: "Subscription Metrics",
                                description: "Subscription Metrics"
                                //img_url,
                            },
                            [K.DOM_BODY]: { data: list }
                        }
                    },
                    [K.URL_PAGE]: "gems"
                }
            ]

            //
            //    d8                      d8
            //  _d88__  e88~~8e   d88~\ _d88__
            //   888   d888  88b C888    888
            //   888   8888__888  Y88b   888
            //   888   Y888    ,   888D  888
            //   "88_/  "88___/  \_88P   "88_/
            //
            //
        ]
    ).get(match) || { [K.URL_DATA]: () => 404, [K.URL_PAGE]: "test" }

    const data = RES[K.URL_DATA]
    const page = RES[K.URL_PAGE]
    //log("routed:", { page, data })

    return { [K.URL.DATA]: await data(), [K.URL.PAGE]: page }
}

//const Page2 = ({ data }) => {
//    return h(
//        "pre",
//        { className: "boobs" },
//        h("h1", null, `PAGE 2:`),
//        JSON.stringify(data, null, 2)
//    )
//}
