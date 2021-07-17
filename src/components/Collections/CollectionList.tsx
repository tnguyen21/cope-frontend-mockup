import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Card } from "@material-ui/core"
import { node, API } from "cope-client-utils"
import { Link } from ".."

const CollectionListCard = styled(Card)`
    margin: 8px 8px;
`

const CollectionListCardContent = styled.div`
    padding: 8px;
`

const CollectionListCardHeading = styled(Link)`
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
`

const CollectionListCardType = styled.div`
    display: inline;
    float: right;
    color: gray;
`
// collection prop passed in from Collection.tsx
function CollectionList({ collection }: { collection?: string }) {
    const [nodesList, setNodesList] = useState<any[]>([])

    const query = {
        status: API.NodeStatus.DRAFT,
        type: collection?.toUpperCase(),
    }

    useEffect(() => {
        const fetchNodes = async () => {
            node
                //@ts-ignore
                .list(query)
                .then((result: any) => {
                    setNodesList(result)
                })
                .catch((error: any) => console.error(error))
        }
        fetchNodes()
    }, [])

    return (
        <div>
            {nodesList.map((data, i) => (
                <div key={i}>
                    <CollectionListCard>
                        <CollectionListCardContent>
                            {/* to={`/collections/edit/${data.id}` */}
                            <CollectionListCardHeading
                                to={`admin/collections/edit?nodeId=${data.id}`}
                            >
                                {data.id}
                            </CollectionListCardHeading>
                            <CollectionListCardType>{data.type}</CollectionListCardType>
                        </CollectionListCardContent>
                    </CollectionListCard>
                </div>
            ))}
        </div>
    )
}

export default CollectionList
