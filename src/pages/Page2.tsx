import React from "react"

export const Page2 = ({ data = {} }) => {
    console.log("Page2 data:", data)
    return (
        <div>
            <h1>Page 2</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
