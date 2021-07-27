import React from "react"
import Markdown from "markdown-to-jsx"

function RenderMarkdown({ content }: { content: string }) {
    return <Markdown>{content}</Markdown>
}

export default RenderMarkdown
