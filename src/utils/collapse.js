import { isPlainObject, isArray } from "@thi.ng/checks"

export const collapse = (coll, sep = "/", crumbs = [], acc = {}) => {
    //log({ coll })
    coll = coll === null ? {} : coll
    Object.entries(coll).forEach(([key, val]) => {
        isArray(val) || isPlainObject(val)
            ? collapse(val, sep, [...crumbs, key], acc)
            : (acc[[...crumbs, key].join(sep)] = val)
    })
    return acc
}
