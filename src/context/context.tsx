import React, { createContext } from "react"
import { run$ } from "@-0/spool"
import { $store$ } from "@-0/browser"
import { URL2obj } from "@-0/utils"
import { useCursor } from "../hooks"
import { Pre } from "../components"

export const CTX = createContext({
    run$,
    useCursor,
    $store$,
    parse: URL2obj,
    DefaultView: Pre,
    page: null,
    loading: true,
    path: []
})
