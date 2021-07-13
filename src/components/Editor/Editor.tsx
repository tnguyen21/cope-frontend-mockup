import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Auth from "@aws-amplify/auth";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { Card, Button, Select, InputLabel, MenuItem } from "@material-ui/core";
import { node, asset } from "cope-client-utils";
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API";
import AddAssetDialog from "./AddAssetDialog";
import DeleteNodeDialog from "./DeleteNodeDialog";
import DeleteAssetDialog from "./DeleteAssetDialog";
import { RenderAssetWidget } from "../AssetWidgets";

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
  const [nodeStatus, setNodeStatus] = useState(NodeStatus.DRAFT);
  const [nodeType, setNodeType] = useState(NodeType.A_ARTICLE);
  const [userData, setUserData] = useState<any>();
  const [nodeData, setNodeData] = useState<any>();
  const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false);
  const [deleteAssetDialogOpen, setDeleteAssetDialogOpen] = useState(false);
  const [deleteNodeDialogOpen, setDeleteNodeDialogOpen] = useState(false);
  const { nodeId } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        Auth.currentSession().then((res) =>
          setUserData(res.getIdToken().payload)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNodeData = async () => {
      try {
        node.read({ id: nodeId }).then((res: any) => {
          setNodeData(res);
          setNodeStatus(res.status);
          setNodeType(res.type);
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchNodeData();
    // conditionally call this hook every time add asset dialog is opened
    // or closed (i.e. a user has added an asset) to force re-render
  }, [nodeId, addAssetDialogOpen, deleteAssetDialogOpen]);

  const onStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
    setNodeStatus(event.target.value);
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
      owner: userData ? userData.email : null,
      updatedAt: null,
    };

    node
      .create(data)
      .then((result: any) => {
        console.log(result);
        history.push(`/collections/edit/${result.id}`);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const updateNode = () => {
    node
      .update(nodeData)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
    for (const i in nodeData.assets.items) {
      let _asset = nodeData.assets.items[i];
      let data = {
        id: _asset.id,
        content: _asset.content,
        createdAt: _asset.createdAt,
        editors: _asset.editors,
        name: _asset.name,
        node_id: _asset.node_id,
        owner: _asset.owner,
        type: _asset.type,
      };

      asset
        .update(data)
        .then((result: any) => console.log(result))
        .catch((error: any) => console.error(error));
    }
  };

  return (
    <SplitPane split="vertical" minSize="25%" defaultSize="50%">
      <Wrapper>
        <Wrapper>
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

          {nodeData &&
            nodeData.assets.items.map((asset: any) => (
              <Wrapper>
                {RenderAssetWidget(asset, nodeData, setNodeData)}
                <Button
                  variant="contained"
                  onClick={() => setDeleteAssetDialogOpen(true)}
                >
                  Delete Asset
                </Button>
                <DeleteAssetDialog
                  open={deleteAssetDialogOpen}
                  setOpen={setDeleteAssetDialogOpen}
                  assetId={asset.id}
                />
              </Wrapper>
            ))}

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
            {newNode ? (
              <StyledButton variant="contained" onClick={createNode}>
                Save Node
              </StyledButton>
            ) : (
              <StyledButton variant="contained" onClick={updateNode}>
                Update Node
              </StyledButton>
            )}

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
            nodeId={nodeId}
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
            <div>Content Preview goes here</div>
          </PreviewContent>
        </Card>
      </Wrapper>
    </SplitPane>
  );
}

export default Editor;
