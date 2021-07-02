import React from "react";

function Editor({ newNode = false }: { newNode?: boolean }) {
  return <div>{newNode ? "true" : "false"}</div>;
}

export default Editor;
