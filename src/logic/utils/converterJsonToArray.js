function converterJsonToArray(json) {
    return Object.keys(json).map(i => JSON.parse(json[Number(i)]));
}

export default converterJsonToArray;