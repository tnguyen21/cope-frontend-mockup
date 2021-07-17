import React from "react"
import { MarkdownInput, TextInput, ImageInput, VideoInput } from "."

const AssetTypesToComponentMap = {
    // image and video input only take links to existing content
    // (e.g. already uploaded to a server and exposed via s3 or youtube)
    // and not file uploads
    // this is until we can upload files through the COPE API and
    // serve them ourselves

    // selections for which asset type and which asset widget to use
    // is flexible. this just based on my judgement and should spend more
    // time building custom widgets that make more sense for the particular
    // asset type
    A_OG_IMAGE: ImageInput,
    A_OG_VIDEO: VideoInput,
    T_OG_TITLE: TextInput,
    T_OG_DESCRIPTION: MarkdownInput,
    A_IMAGE: ImageInput,
    A_VIDEO: VideoInput,
    T_LEDE: MarkdownInput,
    T_BODY: MarkdownInput,
}

function RenderAssetWidget(asset, nodeData, setNodeData) {
    if (typeof AssetTypesToComponentMap[asset.type] !== "undefined") {
        return React.createElement(AssetTypesToComponentMap[asset.type], {
            label: asset.name,
            assetId: asset.id,
            value: nodeData,
            setValue: setNodeData,
        })
    }
}

export default RenderAssetWidget
