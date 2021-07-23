import React from "react"
import { FormInput } from "../components"
export const Page1 = ({ data = {} }) => {
    console.log("Page1 data:", data)
    return (
        <div>
            <h1>Page 1</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <FormInput />
        </div>
    )
}
