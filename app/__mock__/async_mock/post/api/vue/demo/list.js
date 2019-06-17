function genList(params) {
    const list = [];
    for (let i = 0; i < params.pageSize; i++) {
        list.push({
            "id": Math.random(),
            "name": "MuZeFhaFpd",
            "address": "zTj77hY47i",
            "code": "STkwGul7yp",
            "disable": true,
            "createTime": "1552032054662",
            "departmentStr": "is7XgjMpCw",
            "commerceTypeStr": "t4j0xSjEnG",
            "importTypeStr": "f1kGamx1Pj",
            "contractStatusStr": "TVRFd4Rb4N"
        })
    }
    return list;
}

module.exports = function(params) {
    return {
        code: 200,
        result: {
            pagination: {
                total: 1000,
                pageSize: params.pageSize,
                pageNo: params.pageSize
            },
            list: genList(params)
        }
    }
};
