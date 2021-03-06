import { __awaiter } from "tslib";
import Auth from "@aws-amplify/auth";
const awsmobile = {
    aws_project_region: "us-east-1",
    aws_cognito_identity_pool_id: "us-east-1:5eb24d32-7dcf-4eec-b2cf-3ccb80538edb",
    aws_cognito_region: "us-east-1",
    aws_user_pools_id: "us-east-1_pDcWh9rz6",
    aws_user_pools_web_client_id: "119jhi81t735520srasmqrjsf5",
    oauth: {},
    aws_cloud_logic_custom: [
        {
            name: "AdminQueries",
            endpoint: "https://nj59fniim5.execute-api.us-east-1.amazonaws.com/dev",
            region: "us-east-1",
        },
    ],
    aws_appsync_graphqlEndpoint: "https://ug3flqmddnbevnzihtnbxfw464.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-pnoc2ogp6fc47oiletkzyoad7e",
    aws_appsync_dangerously_connect_to_http_endpoint_for_testing: true,
    graphql_headers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = (yield Auth.currentSession()).getIdToken().getJwtToken();
            return { Authorization: token };
        }
        catch (e) {
            console.error(e);
            return {};
        }
    }),
};
export default awsmobile;
