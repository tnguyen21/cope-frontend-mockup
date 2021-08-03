export const genAssetChangeHandler = ({ assetId, value, setValue }) => content => {
    let updatedAssetState = value.assets.items.filter((item: any) => item.id === assetId)[0]
    const newValue = {
        ...value,
        assets: {
            ...value.assets,
            items: value.assets.items.map((item: any) => {
                if (item.id === assetId) {
                    return { ...updatedAssetState, content }
                }
                return item
            }),
        },
    }
    setValue(newValue)
}
