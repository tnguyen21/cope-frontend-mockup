import React, { useState, useEffect } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import { makeStyles, InputLabel } from "@material-ui/core"
import { stateToMarkdown } from "draft-js-export-markdown"
import { stateFromMarkdown } from "draft-js-import-markdown"
import { genAssetChangeHandler } from "./handleValueChange"
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

const customContentStateConverter = contentState => {
    // changes block type of images to 'atomic'
    const newBlockMap = contentState.getBlockMap().map(block => {
        const entityKey = block.getEntityAt(0)
        if (entityKey !== null) {
            const entityBlock = contentState.getEntity(entityKey)
            const entityType = entityBlock.getType()
            switch (entityType) {
                case "IMAGE": {
                    const newBlock = block.merge({
                        type: "atomic",
                        text: "img",
                    })
                    return newBlock
                }
                default:
                    return block
            }
        }
        return block
    })
    const newContentState = contentState.set("blockMap", newBlockMap)
    return newContentState
}

/**
 * FIXME: this is currently rerendered on every action taken
 * on the MarkdownInput component. useEffect might be redundant..
 */
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
        // and we don't want to try and parse content until it exists
        const editorAsset = value?.assets?.items.filter((item: any) => item.id === assetId)[0]
        if (editorAsset.content) {
            // convert image block types to atomic using custom content state converter
            // https://stackoverflow.com/questions/59359445/not-able-to-display-image-in-editor
            const contentState = customContentStateConverter(
                stateFromMarkdown(editorAsset.content)
            )
            setEditorState(EditorState.createWithContent(contentState))
            
        }
    }, [assetId]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = genAssetChangeHandler({ assetId, value, setValue })

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
        handleChange(stateToMarkdown(editorState.getCurrentContent()))
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
