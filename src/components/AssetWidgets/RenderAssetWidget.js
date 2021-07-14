import React from "react"
import { MarkdownInput, TextInput } from "."

const AssetTypesToComponentMap = {
    T_OG_TITLE: TextInput,
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
