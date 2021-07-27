import React from "react"
import YouTube from "react-youtube"

function RenderVideo({ content }: { content: string }) {
    const options = {
        height: "auto",
        width: "auto",
    }

    const videoId = content.split("/").pop()

    return <YouTube videoId={videoId} opts={options} />
}

export default RenderVideo
