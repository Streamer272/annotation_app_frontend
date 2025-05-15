export const formatLabel = (text) =>
    text.replace(/([a-z])([A-Z])/g, '$1 $2');

export const groupOptionsFromServerData = (filterResult) => {
    return Object.entries(filterResult).map(([category, items]) => ({
        label: formatLabel(category),
        items: Array.isArray(items)
            ? items.map(item => ({
                label: item,
                value: `${category}.${item}`
            }))
            : []
    }));
};