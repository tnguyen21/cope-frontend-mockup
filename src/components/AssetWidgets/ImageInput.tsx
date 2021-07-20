import React from "react"
import { TextField } from "@material-ui/core"

// TODO
// this is a placeholder until uploading files is available
// through the COPE API -- until then we will just use a link
// to the file

function ImageInput({
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
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedAssetState = value.assets.items.filter((item: any) => item.id === assetId)[0]
        updatedAssetState = { ...updatedAssetState, content: event.target.value }
        const newValue = {
            ...value,
            assets: {
                ...value.assets,
                items: value.assets.items.map((item: any) => {
                    if (item.id === assetId) {
                        return updatedAssetState
                    }
                    return item
                }),
            },
        }
        setValue(newValue)
    }

    return (
        <>
            <TextField
                id="standard-basic"
                label={label}
                value={value.assets.items.filter((item: any) => item.id === assetId)[0].content}
                onChange={handleValueChange}
            />
        </>
    )
}

export default ImageInput
