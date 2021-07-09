import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { useParams } from "react-router";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { EditorState } from "draft-js";
import { Card, Button } from "@material-ui/core";
import { node } from "cope-client-utils";
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API";
import { MarkdownInput, SelectInput } from "./InputWidgets";
import { NODE_TYPES, NODE_STATUSES } from "./utils";
import AddAssetDialog from "./AddAssetDialog";
import DeleteNodeDialog from "./DeleteNodeDialog";

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

interface RouteParams {
  nodeId?: string;
}

// TODO: useEffect should be called to populate editor with
// info from an existing node given that newNode is false
function Editor({ newNode = false }: { newNode?: boolean }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [nodeStatus, setNodeStatus] = useState(NodeStatus.DRAFT);
  const [nodeType, setNodeType] = useState(NodeType.A_PAGE);
  const [userData, setUserData] = useState<any>();
  const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false);
  const [deleteNodeDialogOpen, setDeleteNodeDialogOpen] = useState(false);
  const { nodeId } = useParams<RouteParams>();

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
            <SelectInput
              itemsAndValues={NODE_TYPES}
              inputLabel="Node Type"
              selectState={nodeType}
              setSelectState={setNodeType}
            />
          </Wrapper>

          <Wrapper>
            <SelectInput
              itemsAndValues={NODE_STATUSES}
              inputLabel="Node Status"
              selectState={nodeStatus}
              setSelectState={setNodeStatus}
            />
          </Wrapper>

          <Wrapper>
            <MarkdownInput
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          </Wrapper>

          <Wrapper>
            <StyledButton variant="contained">Add Parent</StyledButton>
            <StyledButton variant="contained">Add Sibling</StyledButton>
            <StyledButton variant="contained">Add Child</StyledButton>
            {!newNode && (
              <StyledButton
                variant="contained"
                onClick={() => setAddAssetDialogOpen(true)}
              >
                Add Asset
              </StyledButton>
            )}
          </Wrapper>

          <Wrapper>
            <StyledButton variant="contained" onClick={createNode}>
              Save Node
            </StyledButton>

            {!newNode && (
              <StyledButton
                variant="contained"
                onClick={() => setDeleteNodeDialogOpen(true)}
              >
                Delete Node
              </StyledButton>
            )}
          </Wrapper>

          <AddAssetDialog
            open={addAssetDialogOpen}
            setOpen={setAddAssetDialogOpen}
          />
          <DeleteNodeDialog
            open={deleteNodeDialogOpen}
            setOpen={setDeleteNodeDialogOpen}
            nodeId={nodeId}
          />
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
