import _ from '../widget/util';
import Filter from '../widget/filter';

export default (Component) => {
    Component.implement({
        // 下拉列表获取统一接口
        services: {
            uploadUrl: '/sc-workdesk/api/nos/upload',
            regular: '/api/regular/selectList'
        },
        defaults(data) {
            _.extend(this.data, data);
        },
        rules(rules) {
            _.extend(this.data, {
                rules
            });
        },
        templates(templates) {
            _.extend(this.data, {
                templates
            });
        },
        authApis(authApis) {
            _.extend(this.data, {
                authApis
            });
        },
        _filters(type) {
            if (!Filter[type]) {
                console.error(`'未定义的过滤器:'${type}`);
                return Filter.returnOriginValue;
            }
            return Filter[type].get ? Filter[type].get : Filter[type];
        },
        exportFiles(url, condition) {
            url = `${url}?${_.toQueryString(condition)}`;
            window.open(url);
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
