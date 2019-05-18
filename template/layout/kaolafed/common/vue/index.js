import CommonVue from 'sc-common-vue';
import * as API from '../api';

// 初始化
const Common = CommonVue({
    handleRequestError: (result) => {
        if(result.code === 10007) {
            API.doLogin();
        }
    },
    selectUrl: '/api/regular/selectList',
    authUrl: '/api/url/isDisplayLinkUrl',
    setSelectUrlPrefix: () => {
        let href = window.location.href;
        let prefix = '';
        if(/\/dms\//.test(href)){
            prefix = '/api';
        }
        return prefix;
    }
});
export const {
    JSONAPI,
    FORMAPI,
    FORMDATAAPI,
    Util,
    DialogMixin,
    ListMixin,
    SelectMixin,
    ValidateMixin,
    AuthProviderMixin,
    Filters,
    Directives,
    Components
} = Common;

export const getApis = (list) => {
    const API = {};
    const authParams = [];

    list.forEach((item) => {
        let requestAPI = JSONAPI;
        if (!item.type || item.type == 'JSONAPI') {
            requestAPI = JSONAPI;
        } else if (item.type == 'FORMAPI') {
            requestAPI = FORMAPI;
        } else if (item.type == 'FORMDATAAPI') {
            requestAPI = FORMDATAAPI;
        }
        const requestMethod = (item.method || 'get').toLowerCase();
        // get请求需要多一层 params
        if (requestMethod === 'get') {
            API[item.key] = params => requestAPI[requestMethod](item.url, { params });
        } else {
            API[item.key] = params => requestAPI[requestMethod](item.url, params);
        }

        authParams.push({
            urlKey: item.key,
            requestUrl: item.url
        });
    });
    return { API, authParams };
};

