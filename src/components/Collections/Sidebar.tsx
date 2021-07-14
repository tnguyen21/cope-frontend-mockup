import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Card } from "@material-ui/core"
import { NodeType } from "cope-client-utils/lib/graphql/API"

const SidebarCard = styled(Card)`
    max-width: 275px;
    margin-top: 8px;
`

const SidebarCardContent = styled.div`
    padding: 8px;
`

const SidebarCardHeading = styled.h2`
    margin: 0;
    font-size: 1.125rem;
`

const SidebarNavList = styled.ul`
    margin: 16px 0 0;
    padding: 0;
    list-style: none;
    overflow: auto;
`

const SidebarNavLink = styled(NavLink)`
    display: flex;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    padding: 8px 0px;
    border-left: 2px solid #fff;
    z-index: -1;
    text-decoration: none;
`

function Sidebar() {
    const linksAndSlugs = []
    for (const type in NodeType) {
        //@ts-ignore
        linksAndSlugs.push({
            typeName: type,
            typeSlug: type.toLowerCase(),
        })
    }

    return (
        <SidebarCard variant="outlined">
            <SidebarCardContent>
                <SidebarCardHeading>Collections</SidebarCardHeading>
                <SidebarNavList>
                    {linksAndSlugs.map(type => (
                        <li key={type.typeSlug}>
                            <SidebarNavLink to={`/collections/${type.typeSlug}`}>
                                {type.typeName}
                            </SidebarNavLink>
                        </li>
                    ))}
                </SidebarNavList>
            </SidebarCardContent>
        </SidebarCard>
    )
}

export default Sidebar
