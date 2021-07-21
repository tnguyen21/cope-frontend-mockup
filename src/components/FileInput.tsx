import React, { useEffect, useState } from "react"
import { storeObject, API } from "cope-client-utils"
import { AssetType } from "cope-client-utils/lib/graphql/API"

// read: https://dev.to/dabit3/graphql-tutorial-how-to-manage-image-file-uploads-downloads-with-aws-appsync-aws-amplify-hga
export const FormInput = () => {
    const [ file, setFile ] = useState(null)
    const [ name, setName ] = useState("a horse with no name")

    const handleChange = e => {
        e.preventDefault()
        const { target: { value, files } } = e
        setFile(files[0] || value)
    }
    const submitObject = async e => {
        e.preventDefault()
        if (file) {
            try {
                await storeObject({
                    fileForUpload: file,
                    name,
                    node_id: "testNode1",
                    // may deal with this automatically in the future (using file extension)
                    type: API.AssetType.A_IMAGE,
                    index: 1,
                })
            } catch (error) {
                console.warn({ error })
            }
        }
    }
    return (
        <form>
            <input type="file" onChange={handleChange} />
            <input type="text" placeholder="asset name" onChange={e => setName(e.target.value)} />
            <button type="submit" onClick={submitObject}>
                upload
            </button>
        </form>
    )
}
