import React, { useState, useEffect } from "react"
import { Editor } from "react-draft-wysiwyg"
import { convertFromRaw, convertToRaw, EditorState, ContentState } from "draft-js"
import { makeStyles, InputLabel } from "@material-ui/core"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const useStyles = makeStyles({
    textEditor: {
        backgroundColor: "white",
        color: "black",
        border: "thin solid black",
        borderRadius: "5px",
        minHeight: "400px",
        maxHeight: "400px",
    },
})

function MarkdownInput({
    assetId,
    value,
    setValue,
}: {
    assetId: string
    value: any
    setValue: any
}) {
    const classes = useStyles()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        // use an effect since value gets hydrated asynchronously
        // and we don't want to try and parse content until it is ready
        if (value) {
            const editorAsset = value.assets.items.filter((item: any) => item.id === assetId)[0]
            // here for getting the content back from the database
            // we need to parse out the string to an object, and then call convertFromRaw
            const editorContent = JSON.parse(editorAsset.content)
            const contentState = convertFromRaw(editorContent)
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, [])

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
        handleValueChange()
    }

    const handleValueChange = () => {
        let updatedAssetState = value.assets.items.filter((item: any) => item.id === assetId)[0]
        updatedAssetState = {
            ...updatedAssetState,
            // we do this rough conversion using convertToRaw and then stringify it
            // so we can save it to the database for later parsing
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        }
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
            <InputLabel>Markdown</InputLabel>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                editorClassName={classes.textEditor}
            ></Editor>
        </>
    )
}

export default MarkdownInput
