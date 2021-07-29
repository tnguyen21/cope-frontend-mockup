import React, { useEffect, useState } from "react"
import { storeObject, API } from "cope-client-utils"
import { AssetType } from "cope-client-utils/lib/graphql/API"
import { genAssetChangeHandler } from "./handleValueChange"
import RenderImage from "../ContentPreview/RenderImage"
export const FileInput = ({ label, assetId, value, setValue }) => {
    const [ file, setFile ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const { node_id, type, index, name, content } = value.assets.items.filter(
        (item: any) => item.id === assetId,
    )[0]

    const handleChange = genAssetChangeHandler({ assetId, value, setValue })

    useEffect(
        () => {
            handleChange(content)
        },
        [ content ],// eslint-disable-line react-hooks/exhaustive-deps
    )

    const handler = e => {
        e.preventDefault()
        const { target: { value, files } } = e
        setFile(files[0] || value)
        handleChange(content)
    }
    const submitObject = async e => {
        e.preventDefault()
        if (file) {
            try {
                setLoading(true)
                await storeObject({
                    fileForUpload: file,
                    name: name || label,
                    node_id,
                    // may deal with this automatically in the future (using file extension)
                    type,
                    index,
                }).then(payload => {
                    setLoading(false)
                    console.log({ payload })
                    handleChange(payload.content)
                })
            } catch (error) {
                console.warn({ error })
            }
        }
    }
    return (
        <form>
            
            {(!content && (
                <>
                    <input type="file" onChange={handler} />
                    <button style={{ cursor: "pointer" }} type="submit" onClick={submitObject}>
                        { loading ? "loading..." : "UPLOAD" }
                    </button>
                </>
            )) || <RenderImage content={content} name={name }/>}
        </form>
    )
}
