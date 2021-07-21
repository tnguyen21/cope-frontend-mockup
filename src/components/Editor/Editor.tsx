import React, { useState, useEffect } from "react"
import Auth from "@aws-amplify/auth"
import styled from "styled-components"
import { Grid, Card, Button, Select, InputLabel, MenuItem } from "@material-ui/core"
import { node, asset } from "cope-client-utils"
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API"
import AddAssetDialog from "./AddAssetDialog"
import DeleteNodeDialog from "./DeleteNodeDialog"
import DeleteAssetDialog from "./DeleteAssetDialog"
import EditorSnackbar from "./EditorSnackbar"
import RenderContentPreview from "../ContentPreview/RenderContentPreview"
import { RenderAssetWidget } from "../AssetWidgets"
import { TEMPLATES } from "../Collections/templates"

const Wrapper = styled.div`
    margin: 24px 8px;
`

const StyledButton = styled(Button)`
    margin: 0px 8px;
`

const PreviewContent = styled.div`
    padding: 16px 8px;
`

const PreviewHeading = styled.h2`
    margin: 0;
    font-size: 1.125rem;
`

function Editor({ nodeId }: { nodeId?: string }) {
    const [userData, setUserData] = useState<any>()
    const [nodeData, setNodeData] = useState<any>()
    const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false)
    const [deleteAssetDialogOpen, setDeleteAssetDialogOpen] = useState("")
    const [deleteNodeDialogOpen, setDeleteNodeDialogOpen] = useState(false)
    const [snackbarState, setSnackbarState] = useState({ open: false, message: "" })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                Auth.currentSession().then(res => setUserData(res.getIdToken().payload))
            } catch (error) {
                console.error(error)
            }
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        const fetchNodeData = async () => {
            try {
                node.read({ id: nodeId }).then((res: any) => {
                    // reverse items here such that oldest assets
                    // are displayed first
                    let sortedItems = res.assets.items
                    if (res.type in TEMPLATES) {
                        sortedItems = res.assets.items.sort((a, b) => a.index - b.index)
                    }
                    setNodeData({
                        ...res,
                        assets: { ...res.assets, items: sortedItems },
                    })
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchNodeData()
        // conditionally call this hook every time add asset dialog is opened
        // or closed (i.e. a user has added an asset) to force re-render
        // this is hacky!!
        // if a user changes node type or status, then adds asset,
        // then it will change back the draft and status back to what they are
        // remotely. need to change functions that add asset/delete assets to
        // change local nodeData object, then update remote accordingly
    }, [nodeId, addAssetDialogOpen, deleteAssetDialogOpen])

    const onStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeData({ ...nodeData, status: event.target.value })
    }

    const onNodeTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeData({ ...nodeData, type: event.target.value })
    }

    const updateNode = () => {
        node.update(nodeData).catch((error: any) => {
            console.error(error)
        })
        nodeData.assets.items.forEach(_asset => {
            asset.update(_asset).catch((error: any) => console.error(error))
        })
        setSnackbarState({ open: true, message: "Node has been updated successfully" })
    }

    return (
        <Grid container>
            <EditorSnackbar
                open={snackbarState.open}
                message={snackbarState.message}
                setSnackbarState={setSnackbarState}
            />
            <Grid item md={6}>
                <Wrapper>
                    <Wrapper>
                        <Wrapper>
                            <InputLabel>Node Type</InputLabel>
                            <Select
                                value={nodeData ? nodeData.type : "H_AUTHOR"}
                                onChange={onNodeTypeChange}
                            >
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
                            <Select
                                value={nodeData ? nodeData.status : "DRAFT"}
                                onChange={onStatusChange}
                            >
                                <MenuItem value={NodeStatus.DRAFT}>Draft</MenuItem>
                                <MenuItem value={NodeStatus.REVIEWED}>Reviewed</MenuItem>
                                <MenuItem value={NodeStatus.PUBLISHED}>Published</MenuItem>
                                <MenuItem value={NodeStatus.EDITED}>Edited</MenuItem>
                                <MenuItem value={NodeStatus.DELETED}>Deleted</MenuItem>
                            </Select>
                        </Wrapper>
                        {nodeData &&
                            nodeData.assets.items.map((asset: any) => (
                                <Wrapper key={asset.id}>
                                    {RenderAssetWidget(asset, nodeData, setNodeData)}
                                    <Button
                                        variant="contained"
                                        onClick={() => setDeleteAssetDialogOpen(asset.id)}
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
                            {nodeId && (
                                <StyledButton
                                    variant="contained"
                                    onClick={() => setAddAssetDialogOpen(true)}
                                >
                                    Add Asset
                                </StyledButton>
                            )}
                        </Wrapper>
                        <Wrapper>
                            {nodeId && (
                                <StyledButton variant="contained" onClick={updateNode}>
                                    Update Node
                                </StyledButton>
                            )}
                            {nodeId && (
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
            </Grid>
            <Grid item md={6}>
                <Wrapper>
                    <Card>
                        <PreviewContent>
                            <PreviewHeading>Content Preview</PreviewHeading>
                            {/* TODO: look into `remark.js` and `draft.js` APIs to
                            be able to parse out content from editor state and
                            convert to necessary HTML/Markdown to create content preview
                        */}
                            {nodeData &&
                                nodeData.assets.items
                                    .filter((asset: any) => asset.content !== "")
                                    .map((asset: any) => (
                                        <Wrapper key={asset.id}>
                                            {RenderContentPreview(asset, {
                                                content: asset.content,
                                            })}
                                        </Wrapper>
                                    ))}
                        </PreviewContent>
                    </Card>
                </Wrapper>
            </Grid>
        </Grid>
    )
}

export default Editor
