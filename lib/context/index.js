import React, { createContext } from "react";
import { run$ } from "@-0/spool";
import { $store$ } from "@-0/browser";
import { parse } from "@-0/utils";
export const Pre = ({ data }) => {
    const json = JSON.stringify(data, null, 2);
    return <pre>{json}</pre>;
};
export const CTX = createContext({
    run$,
    useCursor,
    $store$,
    parse,
    DefaultView: Pre
});
