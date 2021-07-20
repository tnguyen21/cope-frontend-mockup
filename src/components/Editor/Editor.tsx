import React, { useState, useEffect } from "react"
import Auth from "@aws-amplify/auth"
import styled from "styled-components"
import { Grid, Card, Button, Select, InputLabel, MenuItem } from "@material-ui/core"
import { node, asset } from "cope-client-utils"
import { NodeType, NodeStatus } from "cope-client-utils/lib/graphql/API"
import AddAssetDialog from "./AddAssetDialog"
import DeleteNodeDialog from "./DeleteNodeDialog"
import DeleteAssetDialog from "./DeleteAssetDialog"
import { RenderAssetWidget } from "../AssetWidgets"
import { DOMnavigated$ } from "@-0/browser"

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
    const [nodeStatus, setNodeStatus] = useState(NodeStatus.DRAFT)
    const [nodeType, setNodeType] = useState(NodeType.A_ARTICLE)
    const [userData, setUserData] = useState<any>()
    const [nodeData, setNodeData] = useState<any>()
    const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false)
    const [deleteAssetDialogOpen, setDeleteAssetDialogOpen] = useState("")
    const [deleteNodeDialogOpen, setDeleteNodeDialogOpen] = useState(false)

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
                    setNodeData({
                        ...res,
                        assets: { ...res.assets, items: res.assets.items.reverse() },
                    })
                    setNodeStatus(res.status)
                    setNodeType(res.type)
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchNodeData()
        // conditionally call this hook every time add asset dialog is opened
        // or closed (i.e. a user has added an asset) to force re-render
    }, [nodeId, addAssetDialogOpen, deleteAssetDialogOpen])

    const onStatusChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeStatus(event.target.value)
    }

    const onNodeTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNodeType(event.target.value)
    }

    const createNode = () => {
        const data = {
            id: null,
            status: nodeStatus,
            type: nodeType,
            createdAt: null,
            // getting user is async operation
            // TODO: disable save draft button until all required info is loaded?
            owner: userData ? userData.email : null,
            updatedAt: null,
        }

        node.create(data)
            .then((res: any) => {
                DOMnavigated$.next({
                    target: { location: { href: `/admin/collections/edit?nodeId=${res.id}` } },
                    currentTarget: document,
                })
            })
            .catch((error: any) => {
                console.error(error)
            })
    }

    const updateNode = () => {
        node.update(nodeData).catch((error: any) => {
            console.error(error)
        })
        for (const i in nodeData.assets.items) {
            const _asset = nodeData.assets.items[i]
            const data = {
                id: _asset.id,
                content: _asset.content,
                createdAt: _asset.createdAt,
                editors: _asset.editors,
                name: _asset.name,
                node_id: _asset.node_id,
                owner: _asset.owner,
                type: _asset.type,
            }

            asset.update(data).catch((error: any) => console.error(error))
        }
    }

    return (
        <Grid container>
            <Grid item md={6}>
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
                            {nodeId ? (
                                <StyledButton variant="contained" onClick={updateNode}>
                                    Update Node
                                </StyledButton>
                            ) : (
                                <StyledButton variant="contained" onClick={createNode}>
                                    Save Node
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
                        </PreviewContent>
                    </Card>
                </Wrapper>
            </Grid>
        </Grid>
    )
}

export default Editor
