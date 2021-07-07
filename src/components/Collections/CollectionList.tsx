import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { node } from "cope-client-utils";

const CollectionListCard = styled(Card)`
  margin: 8px 8px;
`;

const CollectionListCardContent = styled.div`
  padding: 8px;
`;

const CollectionListCardHeading = styled(Link)`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
`;

function CollectionList({ collection }: { collection?: string }) {
  const [nodesList, setNodesList] = useState<any[]>([]);

  let query = {
    status: "DRAFT",
    type: collection?.toUpperCase(),
  };

  useEffect(() => {
    const fetchNodes = async () => {
      node
        .list(query)
        .then((result: any) => {
          setNodesList(result.nodesByStatusType.items);
        })
        .catch((error: any) => console.error(error));
    };
    fetchNodes();
  });

  return (
    <div>
      {nodesList.map((data) => (
        <CollectionListCard>
          <CollectionListCardContent>
            <CollectionListCardHeading to={`/collections/edit/${data.id}`}>
              {data.id}
            </CollectionListCardHeading>
          </CollectionListCardContent>
        </CollectionListCard>
      ))}
    </div>
  );
}

export default CollectionList;
