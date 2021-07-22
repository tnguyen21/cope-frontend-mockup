import React, { useContext } from "react"
import { CTX } from "../context"
import { NAV } from "../commands"

export const Link = ({ to, style = {}, children }) => {
    const { run$ } = useContext(CTX)
    const path = `/${to}`
    //console.log({  })
    return (
        <a
            href={path}
            onClick={e => {
                console.log({ e })
                e.preventDefault()
                run$.next({ ...NAV, args: e })
            }}
            style={style}
        >
            {children}
        </a>
    )
}
