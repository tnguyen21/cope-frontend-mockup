import { API } from "cope-client-utils"

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

// TODO: Add "G" = Geography w/qualifiers ?matching citysdk index.edn? (e.g.,
//  regex : /[_A-Za-z][_0-9A-Za-z]*/
const dict_node_type_category = {
    H: "People",
    //A: "",
    S: "Survey",
    V: "Vintage",
    C: "Collection",
    R: "User",
}

// prettier-ignore
/**
{ R_ACCOUNT: 'User Account',
  H_AUTHOR: 'People Author',
  H_TEAM: 'People Team',
  A_ARTICLE: 'Article',
  A_PAGE: 'Page',
  A_APPLICATION: 'Application',
  A_GEM: 'Gem',
  S_ACS: 'Survey Acs',
  S_DECENNIAL: 'Survey Decennial',
  S_CBP: 'Survey Cbp',
  V_1990: 'Vintage 1990',
  V_2000: 'Vintage 2000',
  V_2010: 'Vintage 2010',
  V_2020: 'Vintage 2020',
  C_SERIES: 'Collection Series',
  C_LIST: 'Collection List' }
 */
export const dict_node_type = Object.values(API.NodeType).reduce((acc, val) => {
    const [ cat, subcat, ...rest ] = val.split("_")
    const category = dict_node_type_category[cat]
    if (cat === "S") return (acc[val] = `${category} ${subcat}`, acc)
    const subcategory = toTitleCase(subcat)
    if (!category) return (acc[val] = `${subcategory}`, acc)
    return (acc[val] = `${category} ${subcategory}`, acc)
}, {})

//dict_node_type //?
