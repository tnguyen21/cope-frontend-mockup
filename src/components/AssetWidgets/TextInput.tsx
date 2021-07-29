import React from "react"
import { TextField } from "@material-ui/core"
import { genAssetChangeHandler } from "./handleValueChange"

function TextInput({
    label,
    assetId,
    value,
    setValue,
}: {
    label: string
    assetId: string
    value: any
    setValue: any
}) {
    const handleChange = genAssetChangeHandler({ assetId, setValue, value})

    return (
        <>
            <TextField
                id="standard-basic"
                label={label}
                value={value.assets.items.filter((item: any) => item.id === assetId)[0].content}
                onChange={e => handleChange(e.target.value)}
            />
        </>
    )
}

export default TextInput
