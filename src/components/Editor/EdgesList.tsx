import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { node, edge } from "cope-client-utils"
import { CRUD } from "cope-client-utils/lib/utils"
import { Card, Button } from "@material-ui/core"
import { Link } from ".."
import { collapse } from "cope-client-utils/lib/utils"

const EdgesListCard = styled(Card)`
    margin: 8px 8px;
`

const EdgesListCardHeading = styled(Card)`
    padding: 8px 8px;
    font-size: 1.2em;
    font-weight: 400;
`

const EdgesListCardContent = styled.div`
    padding: 8px;
`

const EdgesListCardText = styled(Link)`
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
`

const EdgesListCardType = styled.div`
    display: inline;
    float: right;
    color: gray;
`

const getConnectedNodes = `
query getConnectedNodes($id: ID!) {
    getNode(id: $id) {
        edges {
            items {
                edge {
                    id
                    type
                    nodes {
                        items {
                            node_id
                        }
                    }
                }
            }
        }
    }
}
`

function EdgesList({ nodeId }: { nodeId: string }) {
    const [linkedNodesList, setLinkedNodesList] = useState<any>([])

    useEffect(() => {
        const crud = async () => {
            node.connections({ id: nodeId })
                .then(res => {
                    console.log("connections")
                    setLinkedNodesList(res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
        crud()
    }, [nodeId])

    const deleteEdge = (edgeId: string) => {
        edge.delete({ id: edgeId }).catch((err: any) => console.error(err))
    }

    return (
        <div>
            <EdgesListCardHeading>Edges</EdgesListCardHeading>
            {linkedNodesList.map((edge, i) => {
                const toNode = edge.node
                return (
                    <div key={i}>
                        <EdgesListCard>
                            <EdgesListCardContent>
                                <EdgesListCardText
                                    href={`admin/collections/edit?nodeId=${toNode.id}`}
                                >
                                    {toNode.id}
                                </EdgesListCardText>
                                <EdgesListCardType>{edge.type}</EdgesListCardType>
                                <Button onClick={() => deleteEdge(edge.id)}>Delete Edge</Button>
                            </EdgesListCardContent>
                        </EdgesListCard>
                    </div>
                )
            })}
        </div>
    )
}

export default EdgesList
