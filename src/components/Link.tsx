import React, { useContext } from "react"
import { CTX } from "../context"
import { NAV } from "../commands"

export const Link = ({ href, children }) => {
    const { run$ } = useContext(CTX)
    const path = `/${href}`
    //log({ path })
    return (
        <a
            href={path}
            onClick={e => {
                e.preventDefault()
                run$.next({ ...NAV, args: e })
            }}
        >
            {children}
        </a>
    )
}
