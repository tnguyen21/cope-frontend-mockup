/* "templates" for a given node type that exists from the GraphQL schema.
    we store the assets (with their name and type) as an array that is
    associated for a given node type
    this is so that on node creation we can then generate
    the assets (with their name and type) for that node type
*/

export const TEMPLATES = {
    A_GEM: [
        {
            name: "Title",
            type: "T_OG_TITLE",
        },
        {
            name: "Body",
            type: "T_BODY",
        },
        {
            name: "Video",
            type: "A_VIDEO",
        },
    ],
}
