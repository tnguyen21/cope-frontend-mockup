import { __awaiter } from "tslib";
import { API, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

const useGQL = ({ query, variables }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let res;
    try {
      res = yield API.graphql({
        query,
        variables,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (e) {
      console.warn("GraphQL CRUD Error:", JSON.stringify(e, null, 4));
    }
    return res;
  });

export default useGQL;
