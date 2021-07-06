import React, { useState } from "react";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { EditorState } from "draft-js";
import { Editor as MarkdownEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles, Card, Button, TextField } from "@material-ui/core";

const Wrapper = styled.div`
  margin: 16px;
`;

const EditorHeading = styled.h3`
  margin: 8px 0px;
  font-size: 1.125rem;
`;

const StyledButton = styled(Button)`
  margin: 0px 8px;
`;

const PreviewContent = styled.div`
  padding: 16px 8px;
`;

const PreviewHeading = styled.h2`
  margin: 0;
  font-size: 1.125rem;
`;

const useStyles = makeStyles({
  textEditor: {
    backgroundColor: "white",
    color: "black",
    border: "thin solid black",
    borderRadius: "5px",
    minHeight: "400px",
    maxHeight: "400px",
  },
});

function Editor({ newNode = false }: { newNode?: boolean }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const classes = useStyles();

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  return (
    <SplitPane split="vertical" minSize="25%" defaultSize="50%">
      <Wrapper>
        <EditorHeading>Attribute</EditorHeading>
        <TextField id="standard-basic" label="Example Text Field" />
        <EditorHeading>Attribute</EditorHeading>
        <MarkdownEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorClassName={classes.textEditor}
        ></MarkdownEditor>
        <Wrapper>
          <StyledButton variant="contained">Add Parent</StyledButton>
          <StyledButton variant="contained">Add Sibling</StyledButton>
          <StyledButton variant="contained">Add Child</StyledButton>
          <StyledButton variant="contained">Add Asset</StyledButton>
        </Wrapper>

        <Button variant="contained">Save Draft</Button>
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
