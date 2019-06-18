const extend = (o1 = {}, o2 = {}, override) => {
    for (let i in o2) {
        if (o1[i] === undefined || override) {
            o1[i] = o2[i];
        }
    }
    return o1;
};

export default (Component) => {
    Component.implement({
        // 下拉列表获取统一接口
        services: {
            uploadUrl: '/sc-workdesk/api/nos/upload',
            regular: '/api/regular/selectList'
        },
        defaults(data) {
            extend(this.data, data);
        },
        rules(rules) {
            extend(this.data, {
                rules
            });
        },
        templates(templates) {
            extend(this.data, {
                templates
            });
        },
        authApis(authApis) {
            extend(this.data, {
                authApis
            });
        },
        onPreview(e) {
            const { file } = e;
            if (file.type === 'pdf') {
                window.open(`http://ms.kaola.com/fe-contract/public/pdf.js/build/generic/web/viewer.html?file=${file.url}`);
            }
        },
        onLoadInterceptor(json) {
            if (json.code == 200) {
                let result = json.result || {};
                return {
                    name: result.name,
                    url: result.url
                };
            }
            return false;
        },
        onSort(e) {
            const condition = this.data.condition;
            condition.sortList = [];

            condition.sortList.push({
                sortType: e.sorting.isAsc ? 'asc' : 'desc', // asc: 升序；desc: 降序
                sortColumn: e.column.sortColumn
            });

            this.getList();
        }
    });
};
