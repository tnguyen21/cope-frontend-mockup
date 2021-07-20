import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Auth from "@aws-amplify/auth"
import { Card, Button } from "@material-ui/core"
import { node, asset } from "cope-client-utils"
import { NodeStatus } from "cope-client-utils/lib/graphql/API"
import { DOMnavigated$ } from "@-0/browser"
import { NODE_TYPES } from "./utils"
import { TEMPLATES } from "./templates"

const CollectionHeaderCard = styled(Card)`
    margin: 8px 8px 32px;
`

const CollectionHeaderCardContent = styled.div`
    padding: 16px 8px;
`

const SidebarCardHeading = styled.h1`
    display: inline-block;
    margin: 0;
    font-size: 1.125rem;
`
// collection prop passed in from Collection.tsx
function CollectionHeader({ collection }: { collection?: string }) {
    const [userData, setUserData] = useState<any>()

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

    const createNode = () => {
        const data = {
            id: null,
            status: NodeStatus.DRAFT,
            // this is hacky!!
            // enums do not place nicely with strings, so we need to create
            //  a dictionary of NodeTypes, which uses the enums values
            type: NODE_TYPES[collection.toUpperCase()],
            createdAt: null,
            // getting user is async operation
            // TODO: disable save draft button until all required info is loaded?
            owner: userData ? userData.email : null,
            updatedAt: null,
        }

        node.create(data)
            .then((res: any) => {
                if (res.type in TEMPLATES) {
                    TEMPLATES[res.type].forEach(template => {
                        const assetData = {
                            name: template.name,
                            node_id: res.id,
                            type: template.type,
                            content: "",
                        }
                        asset.create(assetData).catch(err => console.error(err))
                    })
                }
                DOMnavigated$.next({
                    target: { location: { href: `/admin/collections/edit?nodeId=${res.id}` } },
                    currentTarget: document,
                })
            })
            .catch((error: any) => {
                console.error(error)
            })
    }

    return (
        <CollectionHeaderCard>
            <CollectionHeaderCardContent>
                <SidebarCardHeading>
                    {collection ? collection.toUpperCase() : "All Nodes"}
                </SidebarCardHeading>
                {collection && (
                    <Button variant="outlined" onClick={createNode}>
                        Create New Draft
                    </Button>
                )}
            </CollectionHeaderCardContent>
        </CollectionHeaderCard>
    )
}

export default CollectionHeader
