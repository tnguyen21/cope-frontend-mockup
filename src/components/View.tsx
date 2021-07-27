import React, { useContext, useLayoutEffect, useEffect } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"
import { CTX } from "../context"
import { Page1, Page2, Page3, CollectionsPage, EditorPage } from "../pages"
import { MagicCreationPage } from "../pages"
import {} from "../hooks"

/**
 * TODO: Abstract away
 * // PRIORITY: API
 * @params = {
 *      key: value
 *      page_key_returned_from_equivmap: ActualPageComponent
 * }
 */
export const View = () => {
    const { $store$, useCursor } = useContext(CTX)
    const [page, pageCursor] = useCursor([K.$$_VIEW], "View Page")
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
    }, [loadingCursor, pathCursor, pageCursor, page, loading, path])

    const store = $store$.deref()

    //console.log({ store })

    const loader = (
        <div className="spinner_container">
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )

    const RenderedPage =
        {
            home: Page1,
            page1: Page1,
            page2: Page2,
            page3: Page3,
            "admin/collections": CollectionsPage,
            "admin/collections/edit": EditorPage,
            magic: MagicCreationPage,
        }[page] || (() => loader)

    const is_home = store[K.$$_PATH]?.length === 0

    // prettier-ignore
    return loading ? loader :
        <RenderedPage
            data={
                // @ts-ignore
                is_home ? getIn(store, [ "data" ]) :
                getIn(store, path)
            }
        />
}
