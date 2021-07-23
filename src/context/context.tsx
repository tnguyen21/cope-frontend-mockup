import { createContext } from "react"
import { run$ } from "@-0/spool"
import { $store$ } from "@-0/browser"
import { URL2obj } from "@-0/utils"
import { useCursor } from "../hooks"
import { Pre } from "../components"

export const default_context = {
    $store$,
    parse: () => URL2obj(window.location.href),
    authState: null,
    user: null,
}

export const CTX = createContext(default_context)
