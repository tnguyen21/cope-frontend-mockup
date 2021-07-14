import React from "react"

export const Pre = ({ data }) => {
    const json = JSON.stringify(data, null, 2)
    //log("Pre, json:", json)
    return <pre>{json}</pre>
}
