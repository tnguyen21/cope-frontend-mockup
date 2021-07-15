import React from "react"
import Editor from "../../components/Editor"

interface QueryParams {
    nodeId: string
}

export const EditorPage = ({ data }: { data: QueryParams }) => (
    <div>
        <Editor nodeId={data.nodeId} />
    </div>
)
