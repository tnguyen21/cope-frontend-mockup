import { CMD_SUB$, CMD_ARGS, CMD_WORK, URL_PATH } from "@-0/keys"
import { registerCMD, run$ } from "@-0/spool"
import { URL2obj } from "@-0/utils"
import { DOMnavigated$ } from "@-0/browser"

export const pushState = ({ key, domEvent }) => {
    const href = key
    const w_href = window.location.href
    const parsed = URL2obj(w_href)
    const w_path = `/${parsed[URL_PATH].join("/")}`
    if (href === w_href || href === w_path) return
    DOMnavigated$.next({
        target: { location: { href } },
        currentTarget: domEvent.currentTarget
    })
    return domEvent
}

export const NAVIGATE = registerCMD({
    [CMD_SUB$]: "NAVIGATE",
    [CMD_ARGS]: ev => ev,
    [CMD_WORK]: pushState
})

// custom navigation function onClick handler
export const navigate = ({ key, domEvent /* item, keyPath, */ }) => {
    //log({ item, key, keyPath, domEvent })
    domEvent.preventDefault()
    run$.next({ ...NAVIGATE, args: { key, domEvent } })
}
