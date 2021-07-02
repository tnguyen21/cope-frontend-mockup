import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";

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

// query for nodes in node type
const dummyData = [
  {
    title: "Data Gem Title 1",
    slug: "exampleslug1",
  },
  {
    title: "Data Gem Title 2",
    slug: "exampleslug2",
  },
  {
    title: "Data Gem Title 3",
    slug: "exampleslug3",
  },
];

function CollectionList() {
  return (
    <div>
      {dummyData.map((data) => (
        <CollectionListCard>
          <CollectionListCardContent>
            <CollectionListCardHeading to={`/collections/edit/${data.slug}`}>
              {data.title}
            </CollectionListCardHeading>
          </CollectionListCardContent>
        </CollectionListCard>
      ))}
    </div>
  );
}

export default CollectionList;
