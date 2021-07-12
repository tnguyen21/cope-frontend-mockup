import React, { useContext, useLayoutEffect, useEffect, useState } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"
import { CTX } from "../context"
import { Page1, Page2, Page3 } from "../pages"
import {} from "../hooks"

/**
 * TODO: Abstract away
 * @params = {
 *      key: value
 *      page_key_returned_from_equivmap: ActualPageComponent
 * }
 */
export const View = () => {
    const { $store$, useCursor } = useContext(CTX)
    const [ page, pageCursor ] = useCursor([ K.$$_VIEW ], "View Page")
    const [ loading, loadingCursor ] = useCursor([ K.$$_LOAD ], "View loading")
    const [ path, pathCursor ] = useCursor([ K.$$_PATH ], "Route Path")

    useLayoutEffect(
        () => {
            // re-render when loading state changes
            console.log("re-rendered Page:", { loading, page, path })
            console.log("store:", $store$.deref())
            // cleanup
            return () => {
                //log("cleaning up:", { loading, Page })
                loadingCursor.release()
                pathCursor.release()
                pageCursor.release()
            }
        },
        [ page, pageCursor, path, pathCursor, loading, loadingCursor, $store$ ]
    )

    const store = $store$.deref()
    //log({ store })

    const loader = (
        <div className="spinner_container">
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )
    const RenderPage =
        {
            home: Page1,
            page1: Page1,
            page2: Page2,
            page3: Page3
        }[page] || (() => loader)

    const is_home = store[K.$$_PATH].length === 0

    return loading === null ? (
        <div>initializing.. </div>
    ) : loading === true ? (
        loader
    ) : (
        // @ts-ignore
        <RenderPage data={is_home ? getIn(store, [ "data" ]) : getIn(store, path)} />
    )
}
