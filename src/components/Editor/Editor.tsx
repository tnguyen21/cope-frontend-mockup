import React, { useState } from "react";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { EditorState } from "draft-js";
import { Editor as MarkdownEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card } from "@material-ui/core";

const Wrapper = styled.div`
  margin: 8px;
`;

const PreviewContent = styled.div`
  padding: 16px 8px;
`;

const PreviewHeading = styled.h2`
  margin: 0;
  font-size: 1.125rem;
`;

function Editor({ newNode = false }: { newNode?: boolean }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  return (
    <SplitPane split="vertical" minSize="25%" defaultSize="50%">
      <Wrapper>
        <MarkdownEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        ></MarkdownEditor>
      </Wrapper>
      <Wrapper>
        <Card>
          <PreviewContent>
            <PreviewHeading>Content Preview</PreviewHeading>
            <div>{editorState.getCurrentContent().getPlainText()}</div>
          </PreviewContent>
        </Card>
      </Wrapper>
    </SplitPane>
  );
}

export default Editor;
