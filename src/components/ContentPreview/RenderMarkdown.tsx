import React from "react"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
//import Markdown from "markdown-to-jsx"

function RenderMarkdown({ content }: { content: string }) {
    //console.log({ content })
    const parsed = unified().use(parse).use(remark2react).processSync(content).result
    return <div>{parsed}</div>
}

export default RenderMarkdown
