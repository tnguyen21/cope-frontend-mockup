import React from "react";
import styled from "styled-components";
import { Card, Button } from "@material-ui/core";

const CollectionHeaderCard = styled(Card)`
  margin: 8px 8px 32px;
`;

const CollectionHeaderCardContent = styled.div`
  padding: 16px 8px;
`;

const SidebarCardHeading = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 1.125rem;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  padding: 2px 12px;
  float: right;
`;

// collection prop passed in from Collection.tsx
function CollectionHeader({ collection }: { collection: string }) {
  return (
    <CollectionHeaderCard>
      <CollectionHeaderCardContent>
        <SidebarCardHeading>Collection Name</SidebarCardHeading>
        <StyledButton color="primary">Add New</StyledButton>
      </CollectionHeaderCardContent>
    </CollectionHeaderCard>
  );
}

export default CollectionHeader;
