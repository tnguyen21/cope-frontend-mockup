import { $store$ } from "@-0/browser"
import { useState, useEffect } from "react"
import { Cursor } from "@thi.ng/atom"
import { log } from "../utils/data"

export const createCursor = atom => (path, uid = `${Date.now()}`) => {
    const [ state, setState ] = useState(null)
    const cursor = new Cursor(atom, path)
    cursor.addWatch(uid, (id, bfr, aft) => {
        log(`${id} cursor triggered`, { state })
        setState(aft)
    })
    return [ state, cursor ]
}

export const useCursor = createCursor($store$)
