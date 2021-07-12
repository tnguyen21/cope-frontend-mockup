import React from "react";
import { SelectInput, MarkdownInput, TextInput } from ".";

const AssetTypesToComponentMap = {
  T_OG_TITLE: TextInput,
  T_BODY: MarkdownInput,
};

function renderer(asset, props) {
  if (typeof AssetTypesToComponentMap[asset.type] !== "undefined") {
    return React.createElement(AssetTypesToComponentMap[asset.type], props);
  }
}

export default renderer;
