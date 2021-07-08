import React from "react"

export const Page1 = ({ data = [] }) => (
    <>
        <div>
            <h1>Page 1</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    </>
)