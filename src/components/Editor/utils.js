import { NodeStatus, NodeType, AssetType, EdgeType } from "cope-client-utils/lib/graphql/API"

export const NODE_STATUSES = {
    DRAFT: NodeStatus.DRAFT,
    REVIEWED: NodeStatus.REVIEWED,
    PUBLISHED: NodeStatus.PUBLISHED,
    EDITED: NodeStatus.EDITED,
    DELETED: NodeStatus.DELETED,
}

export const NODE_TYPES = {
    H_AUTHOR: NodeType.H_AUTHOR,
    H_TEAM: NodeType.H_TEAM,
    A_ARTICLE: NodeType.A_ARTICLE,
    A_PAGE: NodeType.A_PAGE,
    A_APPLICATION: NodeType.A_APPLICATION,
    A_GEM: NodeType.A_GEM,
    S_ACS: NodeType.S_ACS,
    S_CBP: NodeType.S_CBP,
    V_1990: NodeType.V_1990,
    V_2000: NodeType.V_2000,
    V_2010: NodeType.V_2010,
    V_2020: NodeType.V_2020,
    C_SERIES: NodeType.C_SERIES,
    C_LIST: NodeType.C_LIST,
}

export const ASSET_TYPES = {
    A_IMAGE: AssetType.A_IMAGE,
    A_OG_IMAGE: AssetType.A_OG_IMAGE,
    A_OG_AUDIO: AssetType.A_OG_AUDIO,
    A_OG_VIDEO: AssetType.A_OG_VIDEO,
    A_VIDEO: AssetType.A_VIDEO,
    A_AUDIO: AssetType.A_AUDIO,
    T_OG_TITLE: AssetType.T_OG_TITLE,
    T_OG_DESCRIPTION: AssetType.T_OG_DESCRIPTION,
    T_OG_TYPE: AssetType.T_OG_TYPE,
    T_LEDE: AssetType.T_LEDE,
    T_BODY: AssetType.T_BODY,
    M_DATA: AssetType.M_DATA,
    M_MAP: AssetType.M_MAP,
    M_VIZ: AssetType.M_VIZ,
    M_API: AssetType.M_API,
    F_PDF: AssetType.F_PDF,
    F_KML: AssetType.F_KML,
    F_SHP: AssetType.F_SHP,
    F_CSV: AssetType.F_CSV,
}

export const EDGE_TYPES = {
    AUTHORED: EdgeType.AUTHORED,
    HAS_NEXT: EdgeType.HAS_NEXT,
    HAS_PREVIOUS: EdgeType.HAS_PREVIOUS,
    HAS_PART: EdgeType.HAS_PART,
    HAS_CHILD: EdgeType.HAS_CHILD,
}
