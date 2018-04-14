/* eslint import/prefer-default-export: 0 */
export const sizeObj = (obj) => {
    const tam = (internalObj) => {
        let size = 0;
        Object.keys(internalObj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(internalObj, key)) {
                size += 1;
            }
        });
        return size;
    };
    return tam(obj);
};

export const searchStringCreate = (querySearch) => {
    let query = '';
    if (!querySearch) {
        return query;
    }
    Object.keys(querySearch).forEach((e) => {
        if (querySearch) {
            query += `&${e}=${querySearch[e]}`;
        }
    });
    return query;
}

export const updateQueryStringParameter = (uri, key, value) => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, `$1${key}=${value}$2`);
    }
    return `${uri}${separator}${key}=${value}`;
};
