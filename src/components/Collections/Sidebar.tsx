import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Card } from "@material-ui/core";

const SidebarCard = styled(Card)`
  max-width: 275px;
  margin-top: 8px;
`;

const SidebarCardContent = styled.div`
  padding: 8px;
`;

const SidebarCardHeading = styled.h2`
  margin: 0;
  font-size: 1.125rem;
`;

const SidebarNavList = styled.ul`
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  overflow: auto;
`;

const SidebarNavLink = styled(NavLink)`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  padding: 8px 0px;
  border-left: 2px solid #fff;
  z-index: -1;
  text-decoration: none;
`;

// TODO
// introspect api and get node types from api?
// build slugs based on names of node enums?
const dummyLinks = [
  { collectionName: "Data Gems", collectionSlug: "datagems" },
  { collectionName: "Webinars", collectionSlug: "webinars" },
  { collectionName: "Courses", collectionSlug: "courses" },
];

function Sidebar() {
  return (
    <SidebarCard variant="outlined">
      <SidebarCardContent>
        <SidebarCardHeading>Collections</SidebarCardHeading>
        <SidebarNavList>
          {dummyLinks.map((dummyLink) => (
            <li key={dummyLink.collectionSlug}>
              <SidebarNavLink to={`/collections/${dummyLink.collectionSlug}`}>
                {dummyLink.collectionName}
              </SidebarNavLink>
            </li>
          ))}
        </SidebarNavList>
      </SidebarCardContent>
    </SidebarCard>
  );
}

export default Sidebar;
