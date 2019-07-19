import qs from 'qs';
import { $raw } from '../request';

const extend = (o1 = {}, o2 = {}, override) => {
    for (const i in o2) {
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
            uploadUrl: '/api/nos/upload',
            regular: '/api/selectList'
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
                const result = json.result || {};
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
        },
        // 仅限内部和老工程使用，请勿在业务工程使用这种老的写法
        $request(url, options) {
            const {
                headers,
                method = 'get',
                formdata,
            } = options;

            if (!headers) {
                options.headers = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=utf-8'
                };
            }

            if (method.toLowerCase() === 'get') {
                options.params = options.params || options.data;
            } else if (method.toLowerCase() === 'post') {
                if (options.norest) {
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                    options.transformRequest = [data => qs.stringify(data, { arrayFormat: 'repeat' })];
                } else {
                    options.paramsSerializer = (params) => qs.stringify(params);
                }
            }

            if (formdata) {
                options.headers['Content-Type'] = 'multipart/form-data';
            }
            return $raw.request({ url, ...options });
        },
    });
};
