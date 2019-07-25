import axios from 'axios';
import qs from 'qs';
import { KLModal } from 'nek-ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const variables = require('../../../.cache/rdc.variables.js');

const request = variables && variables.request || {};
const timeout = request.timeout || 0;

const RAWAXIOS = axios.create({
    timeout,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
});

const JSONAXIOS = axios.create({
    timeout,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
    },
    paramsSerializer(params) {
        return qs.stringify(params);
    },
});

const FORMAXIOS = axios.create({
    timeout,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    transformRequest: [data => qs.stringify(data, { arrayFormat: 'repeat' })],
});

const FORMDATAAXIOS = axios.create({
    timeout,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
    },
});

function _responseSuccessInterceptor(response) {
    const { data } = response;
    if (data && data.code >= 200 && data.code < 400) {
        return Promise.resolve(data);
    }

    const err = new Error(`code: ${data.code}; message: ${data.message}; url: ${response.config.url}`);
    err.name = '后端请求错误';

    if (request.handleRequestError) {
        request.handleRequestError(data, err);
    }

    KLModal.alert((data && data.message) || '返回异常');

    return Promise.reject(data);
}

function _responseErrorInterceptor(error) {
    KLModal.alert('请求失败');
    return Promise.reject(error);
}

const responseSuccessInterceptor = request.responseSuccessInterceptor || _responseSuccessInterceptor;
const responseErrorInterceptor = request.responseErrorInterceptor || _responseErrorInterceptor;

RAWAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
JSONAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
FORMAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);
FORMDATAAXIOS.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export const $raw = RAWAXIOS;

// get请求需要多一层 params
export const $get = (url, params, options) => JSONAXIOS.get(url, { ...options, params });

export const $post = (url, params, options) => JSONAXIOS.post(url, params, options);

export const $form = (url, params, options) => FORMAXIOS.post(url, params, options);

export const $formdata = (url, params, options) => FORMDATAAXIOS.post(url, params, options);

export const getApis = (list) => {
    const API = {};
    const authApis = [];
    const requestAPI = {
        get: $get,
        post: $post,
        form: $form,
        formdata: $formdata
    };
    list.forEach((item) => {
        const requestMethod = (item.type || 'get').toLowerCase();

        API[item.key] = (params, options) => requestAPI[requestMethod](item.url, params, options);

        authApis.push({
            urlKey: item.key,
            requestUrl: item.url
        });
    });
    return { API, authApis };
};

