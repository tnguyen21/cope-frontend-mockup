import React, { useContext } from "react"
import { HURL } from "@-0/browser"
import { CTX } from "../context"
import { log } from "../utils/data"

export const Link = ({ to, children }) => {
    const { run$ } = useContext(CTX)
    const path = `/${to}`
    log({ path })
    return (
        <a
            href={path}
            onClick={e => {
                e.preventDefault()
                run$.next({ ...HURL, args: e })
            }}
        >
            {children}
        </a>
    )
}
