import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { EditorState } from "draft-js";
import { Editor as MarkdownEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  makeStyles,
  Card,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { node } from "cope-client-utils";
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API";

const Wrapper = styled.div`
  margin: 24px 8px;
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

// TODO: useEffect should be called to populate editor with
// info from an existing node given that newNode is false
function Editor({ newNode = false }: { newNode?: boolean }) {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [nodeStatus, setStatus] = useState(NodeStatus.DRAFT);
  const [nodeType, setNodeType] = useState(NodeType.A_PAGE);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        Auth.currentSession().then((res) =>
          setUserData(res.getIdToken().payload)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const onStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
    setStatus(event.target.value);
  };

  const onNodeTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
    setNodeType(event.target.value);
  };

  const createNode = () => {
    let data = {
      id: null,
      status: nodeStatus,
      type: nodeType,
      createdAt: null,
      // getting user is async operation
      // TODO: disable save draft button until all required info is loaded?
      owner: userData ? userData.email : "",
      updatedAt: null,
    };

    node
      .create(data)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <SplitPane split="vertical" minSize="25%" defaultSize="50%">
      <Wrapper>
        <Wrapper>
          {/* These are hardcoded -- should come up with a way to create these based on enums from GraphQL */}
          <Wrapper>
            <InputLabel>Node Type</InputLabel>
            <Select value={nodeType} onChange={onNodeTypeChange}>
              <MenuItem value={NodeType.H_AUTHOR}>H_AUTHOR</MenuItem>
              <MenuItem value={NodeType.H_TEAM}>H_TEAM</MenuItem>
              <MenuItem value={NodeType.A_ARTICLE}>A_ARTICLE</MenuItem>
              <MenuItem value={NodeType.A_PAGE}>A_PAGE</MenuItem>
              <MenuItem value={NodeType.A_APPLICATION}>A_APPLICATION</MenuItem>
              <MenuItem value={NodeType.A_GEM}>A_GEM</MenuItem>
              <MenuItem value={NodeType.S_ACS}>S_ACS</MenuItem>
              <MenuItem value={NodeType.S_CBP}>S_CBP</MenuItem>
              <MenuItem value={NodeType.V_1990}>V_1990</MenuItem>
              <MenuItem value={NodeType.V_2000}>V_2000</MenuItem>
              <MenuItem value={NodeType.V_2010}>V_2010</MenuItem>
              <MenuItem value={NodeType.V_2020}>V_2020</MenuItem>
              <MenuItem value={NodeType.C_SERIES}>C_SERIES</MenuItem>
              <MenuItem value={NodeType.C_LIST}>C_LIST</MenuItem>
            </Select>
          </Wrapper>

          <Wrapper>
            <InputLabel>Status</InputLabel>
            <Select value={nodeStatus} onChange={onStatusChange}>
              <MenuItem value={NodeStatus.DRAFT}>Draft</MenuItem>
              <MenuItem value={NodeStatus.REVIEWED}>Reviewed</MenuItem>
              <MenuItem value={NodeStatus.PUBLISHED}>Published</MenuItem>
              <MenuItem value={NodeStatus.EDITED}>Edited</MenuItem>
              <MenuItem value={NodeStatus.DELETED}>Deleted</MenuItem>
            </Select>
          </Wrapper>

          <Wrapper>
            <InputLabel>Markdown</InputLabel>
            <MarkdownEditor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorClassName={classes.textEditor}
            ></MarkdownEditor>
          </Wrapper>

          <Wrapper>
            <StyledButton variant="contained">Add Parent</StyledButton>
            <StyledButton variant="contained">Add Sibling</StyledButton>
            <StyledButton variant="contained">Add Child</StyledButton>
            <StyledButton variant="contained">Add Asset</StyledButton>
          </Wrapper>

          <Button variant="contained" onClick={createNode}>
            Save Draft
          </Button>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <Card>
          <PreviewContent>
            <PreviewHeading>Content Preview</PreviewHeading>
            {/* TODO: look into `remark.js` and `draft.js` APIs to 
                be able to parse out content from editor state and 
                convert to necessary HTML/Markdown to create content preview
            */}
            <div>{editorState.getCurrentContent().getPlainText()}</div>
          </PreviewContent>
        </Card>
      </Wrapper>
    </SplitPane>
  );
}

export default Editor;
