import React, { useContext, useLayoutEffect, useEffect } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"
import { CTX } from "../context"
import {} from "../hooks"


export const View = () => {
    const { $store$, useCursor } = useContext(CTX)
    const [Page, pageCursor] = useCursor([K.$$_VIEW], "View Page")
    const [loading, loadingCursor] = useCursor([K.$$_LOAD], "View loading")
    const [path, pathCursor] = useCursor([K.$$_PATH], "Route Path")

    useLayoutEffect(() => {
        // re-render when loading state changes
        //console.log("re-rendered Page:", { loading })
        // cleanup
        return () => {
            //log("cleaning up:", { loading, Page })
            loadingCursor.release()
            pathCursor.release()
            pageCursor.release()
        }
    }, [loadingCursor, pathCursor, pageCursor, loading, path, Page])

    const store = $store$.deref()

    //console.log({ store })

    const loader = (
        <div className="spinner_container">
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )

    const is_home = store[K.$$_PATH]?.length === 0

    /* eslint-disable */
    return loading || !Page && loader ||
        <Page
            data={
                // @ts-ignore
                is_home ? getIn(store, [ "data" ]) :
                getIn(store, path)
            }
        />
}
