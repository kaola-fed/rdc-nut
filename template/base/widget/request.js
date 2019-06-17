/**
 * 通用请求方法
 * @param  url     请求的地址
 * @param  options 请求参数，有data, method, onload, onerror
 * @param  options.data     请求的参数，为对象，可不传，默认为{}
 * @param  options.method   'GET'或'POST'，可不传，默认GET
 * @param  options.onload   请求成功的回调函数
 * @param  options.onerror  请求失败的回调函数，可不传
 * @param  options.mask     是否显示loading遮罩, 默认false
 * @param  options.btn      请求时是否disable按钮, 需要配合KLButton使用，默认false
 */
import { KLLoading } from 'nek-ui';
import util from './util';

const loadingHandler = (options, loading) => {
    const { mask, btn } = options;
    if (loading) {
        mask && KLLoading.show(); // 显示遮罩
        btn && btn.$update('loading', true); // disable按钮
    } else {
        mask && KLLoading.hide();
        btn && btn.$update('loading', false);
    }
};

const errorHandler = (res) => {
    // 并不是所有请求都会被cas拦截，所以还需要加一个登陆校验接口(只有cas系统配置过的才会被拦截)
    // 10000:未登陆;(getUserInfo接口返回)
    // 10007: cas接口拦截返回
    // retcode: 兼容cas
    // if(res && res.code === 10000 || res.code === 10007 || res.retcode === 10007) {
    //     location.href = `/sc-workdesk/api/login?redirect=${encodeURIComponent(window.location.href)}`;
    // } else if (res && res.code === 403) {
    //     location.href = '/app/access/unauthorized';
    // } else{
    //     !catchError && KLModal.alert((res && res.message) || '返回异常');
    //     return Promise.reject(res);
    // }
    return Promise.reject(res);
};

export const $request = async function(url, options={}) {
    let { data, method, norest, formData = false, convert } = options;
    method = method || 'GET';
    data = data || {};

    util.filterParam(data);

    let headers = {};

    // TODO: 检查下这个属性
    // if (formData) {
    //     headers['Content-Type'] = 'multipart/form-data';
    // } else {
    //     headers['X-Requested-With'] = 'XMLHttpRequest';
    //     headers['Content-Type'] = norest ? 'application/x-www-form-urlencoded' : 'application/json';
    // }
    if (!formData) {
        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers.Accept = 'application/json';
        headers['Content-Type'] = norest ? 'application/x-www-form-urlencoded' : 'application/json';
    }

    let reqOpt = {
        method,
        credentials: 'include', // 修复请求不自动带上cookie的问题
        headers
    };

    // 处理请求参数，区分get, post, norest
    method = method.toLowerCase();
    if (method === 'get') {
        url += `?${util.object2query(data)}`;
    } else {
        // 区分是否为formData表单提交
        if(formData) {
            reqOpt.body = data;
        } else {
            norest ? reqOpt.body = util.toQueryString(data) : reqOpt.body = JSON.stringify(data);
        }
    }

    loadingHandler(options, true);
    try {
        const res = await fetch(`${url}`, reqOpt);
        const json = await res.json();

        loadingHandler(options, false);
        if (json.code && json.code >= 200 && json.code < 400) {
            return Promise.resolve(convert ? convert(json) : json);
        }
        return errorHandler(json, options.catchError);

    } catch(err) {
        loadingHandler(options, false);
        return errorHandler(err, options.catchError);
    }
};

export const $get = (url, options={}) => $request(url, options);

export const $post = (url, options={}) => {
    util.extend(options, {method: 'POST'});
    return $request(url, options);
};

export const $form = (url, options={}) => {
    util.extend(options, {method: 'POST', norest: true});
    return $request(url, options);
};

export const getApis = (list) => {
    let API = {};
    let authApis = [];
    const requestMethods = {
        get: $get,
        post: $post,
        form: $form
    };

    list.forEach((item) => {
        const requestMethod = requestMethods[item.type];
        const convert = item.convert;

        API[item.key] = (data, btn, catchError) => requestMethod(item.url, { data, btn, catchError, convert });

        authApis.push({
            urlKey: item.key,
            requestUrl: item.url
        });
    });

    return { API, authApis };
};
