import { __awaiter } from "tslib";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { node } from "cope-client-utils";
const CollectionListCard = styled(Card) `
  margin: 8px 8px;
`;
const CollectionListCardContent = styled.div `
  padding: 8px;
`;
const CollectionListCardHeading = styled(Link) `
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
`;
function CollectionList({ collection }) {
    const [nodesList, setNodesList] = useState([]);
    let query = {
        status: "DRAFT",
        type: collection === null || collection === void 0 ? void 0 : collection.toUpperCase(),
    };
    useEffect(() => {
        const fetchNodes = () => __awaiter(this, void 0, void 0, function* () {
            node
                .list(query)
                .then((result) => {
                setNodesList(result.nodesByStatusType.items);
            })
                .catch((error) => console.error(error));
        });
        fetchNodes();
    });
    return (<div>
      {nodesList.map((data) => (<CollectionListCard>
          <CollectionListCardContent>
            <CollectionListCardHeading to={`/collections/edit/${data.id}`}>
              {data.id}
            </CollectionListCardHeading>
          </CollectionListCardContent>
        </CollectionListCard>))}
    </div>);
}
export default CollectionList;
