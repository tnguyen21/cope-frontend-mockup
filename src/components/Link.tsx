import React, { useContext } from "react"
import { registerCMD } from "@-0/spool"
import { cmd_nav, DOMnavigated$ } from "@-0/browser"
import { CTX } from "../context"
import { log } from "../utils/data"

const NAV = registerCMD(cmd_nav)

export const Link = ({ to, children }) => {
    const { run$ } = useContext(CTX)
    const path = `/${to}`
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
