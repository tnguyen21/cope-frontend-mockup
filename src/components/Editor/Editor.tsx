import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { useParams } from "react-router";
import { EditorState } from "draft-js";
import { Editor as MarkdownEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  makeStyles,
  Card,
  FormLabel,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

const Wrapper = styled.div`
  margin: 24px 8px;
`;

const StyledFormLabel = styled(FormLabel)`
  margin: 16px 0px 8px;
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

interface RouteParams {
  collection?: string;
  nodeId?: string;
}

function Editor({ newNode = false }: { newNode?: boolean }) {
  const params = useParams<RouteParams>();
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [status, setStatus] = useState("DRAFT");
  const [nodeType, setNodeType] = useState(params.collection?.toUpperCase());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const onStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const onNodeTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNodeType(event.target.value as string);
  };

  return (
    <SplitPane split="vertical" minSize="25%" defaultSize="50%">
      <Wrapper>
        <Wrapper>
          <FormControl>
            <StyledFormLabel>Node Type</StyledFormLabel>
            <Select value={nodeType} onChange={onNodeTypeChange} disabled>
              <MenuItem value="H_AUTHOR">H_AUTHOR</MenuItem>
              <MenuItem value="H_TEAM">H_TEAM</MenuItem>
              <MenuItem value="A_ARTICLE">A_ARTICLE</MenuItem>
              <MenuItem value="A_PAGE">A_PAGE</MenuItem>
              <MenuItem value="A_APPLICATION">A_APPLICATION</MenuItem>
              <MenuItem value="A_GEM">A_GEM</MenuItem>
              <MenuItem value="S_ACS">S_ACS</MenuItem>
              <MenuItem value="S_CBP">S_CBP</MenuItem>
              <MenuItem value="V_1990">V_1990</MenuItem>
              <MenuItem value="V_2000">V_2000</MenuItem>
              <MenuItem value="V_2010">V_2010</MenuItem>
              <MenuItem value="V_2020">V_2020</MenuItem>
              <MenuItem value="C_SERIES">C_SERIES</MenuItem>
              <MenuItem value="C_LIST">C_LIST</MenuItem>
            </Select>

            <StyledFormLabel>Status</StyledFormLabel>
            <Select value={status} onChange={onStatusChange} disabled>
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="REVIEWED">Reviewed</MenuItem>
              <MenuItem value="PUBLISHED">Published</MenuItem>
              <MenuItem value="EDITED">Edited</MenuItem>
              <MenuItem value="DELETED">Deleted</MenuItem>
            </Select>

            <StyledFormLabel>Markdown</StyledFormLabel>
            <MarkdownEditor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorClassName={classes.textEditor}
            ></MarkdownEditor>
          </FormControl>
          <Wrapper>
            <StyledButton variant="contained">Add Parent</StyledButton>
            <StyledButton variant="contained">Add Sibling</StyledButton>
            <StyledButton variant="contained">Add Child</StyledButton>
            <StyledButton variant="contained">Add Asset</StyledButton>
          </Wrapper>
          <Button variant="contained">Save Draft</Button>
        </Wrapper>
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
