import React from "react"
import { unified } from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import styled from "styled-components"
//import Markdown from "markdown-to-jsx"
import { styles } from "../../themes"

// @ts-ignore
const MarkdownRendered = styled.div(styles)
function RenderMarkdown({ content }: { content: string }) {
    //console.log({ content })
    const parsed = unified().use(parse).use(remark2react, React).processSync(content).result
    return <MarkdownRendered>{parsed}</MarkdownRendered>
}

export default RenderMarkdown
