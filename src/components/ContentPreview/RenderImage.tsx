import React from "react"
import styled from "styled-components"
//import Markdown from "markdown-to-jsx"
import { styles } from "../../themes"

// @ts-ignore
function RenderImage({ content, name }) {
    //console.log({ content })
    return <img src={content} alt={name} style={{ width: "100%" }} />
}

export default RenderImage
