import React, { useContext, useLayoutEffect } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"

import { CTX } from "../context"
import { Page1, Page2, Page3 } from "../pages"

export const View = () => {
    const { useCursor, $store$ } = useContext(CTX)
    const [ Page, pageCursor ] = useCursor([ K.$$_VIEW ], "View Page")
    const [ loading, loadingCursor ] = useCursor([ K.$$_LOAD ], "View loading")

    useLayoutEffect(
        () => {
            // re-render when loading state changes
            //log("re-rendered Page:", { loading, Page })
            // cleanup

            return () => {
                //log("cleaning up:", { loading, Page })
                pageCursor.release()
                loadingCursor.release()
            }
        },
        [ loading, loadingCursor, Page, pageCursor ]
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
            page2: Page2,
            page3: Page3
        }[Page] || (() => loader)

    const is_home = Page === "home"

    return loading ? (
        loader
    ) : (
        // @ts-ignore
        <RenderPage data={is_home ? getIn(store, [ "data" ]) : getIn(store, store[K.$$_PATH])} />
    )
}
