import moment from 'moment';
import {KLModal} from 'nek-ui';

export default {
    // 简化版的对象转request参数，_object对象必须只有一级，如{name: 'xxx', age: 18}
    object2query(obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            let value = encodeURIComponent(obj[key]);
            arr.push(`${key}=${value}`);
        }
        return arr.join('&');
    },
    toQueryString(obj) {
        let keys = obj && Object.keys(obj);
        let params;
        if (keys && keys.length > 0) {
            params = keys.map(key => `${key}=${obj[key]}`).join('&');
        }
        return params;
    },
    extend(o1 = {}, o2 = {}, override) {
        for (let i in o2) {
            if (o1[i] === undefined || override) {
                o1[i] = o2[i];
            }
        }
        return o1;
    },
    filterParam(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!obj[key] && obj[key] !== 0 && obj[key] !== false || (this.isArray(obj[key]) && obj[key].length === 0)) {
                    delete obj[key];
                }
            }
        }
    },
    isArray(arr) {
        return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
    },
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
        const r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return r[2];
        }
        return null;
    },
    getBaseUrl() {
        let systemName = window.location.href.match('sc-.+\\/') && window.location.href.match('sc-.+\\/')[0] || '';
        let baseUrl = '';
        // 接口前缀统一处理
        if (systemName) {
            baseUrl = `/${systemName}api`;
        } else {
            // 公共模块
            baseUrl = '/sc-workdesk/menu';
        }
        return baseUrl;
    },
    /**
     * 压缩regular模版
     * @param htmlstr
     * @returns {XML|string}
     * add by xuejimiao 2016/02/25
     */
    compressHtml(htmlstr) {
        //防止nej打包模版后报错
        if (typeof htmlstr !== 'string') {
            return htmlstr;
        }
        htmlstr = htmlstr.replace(/(?:\r\n|\r|\n)/g, '');

        let htmlStrArrs,
            onHTML = false,
            onRegularExpression = false;
        htmlStrArrs = htmlstr.split('');
        return htmlStrArrs.map((item) => {
            if (item === '<') {
                onHTML = true;
            } else if (item === '>') {
                onHTML = false;
                return item;
            } else if (item === '{') {
                onRegularExpression = true;
            } else if (item === '}') {
                onRegularExpression = false;
                return item;
            }

            if (onHTML || onRegularExpression || !/[\n\s]/g.test(item)) {
                return item;
            }
        }).join('');
    },
    download(url) {
        let a = document.createElement('a');
        a.href = url;
        a.download = url;
        a.click();
    },
    addUrlParam(url, key, value) {
        let str = url.split('#')[0];
        if (/\?/g.test(url)) {
            str += `&diw=${value}`;
        } else {
            str += `?${key}=${value}`;
        }
        if (url.split('#')[1]) {
            str += `#${url.split('#')[1]}`;
        }
        return str;
    },
    str2arr(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (value === '' || value === null || value === undefined) {
            return [];
        }
        return String(value).split(',');
    },

    cloneObject(obj) {
        if (!obj) {
            return obj;
        }

        let newObj = obj;
        try {
            newObj = JSON.parse(JSON.stringify(obj));
        } catch(e) {
            console.error('cloneObject错误: 非法的json对象');
        }
        return newObj;
    },
    format(value, type) {
        if(!value){
            return null;
        }

        let newValue = moment(value).isValid();
        if (!newValue) {
            return;
        }
        if (!type) {
            type = 'YYYY-MM-DD';
        }
        return moment(value).format(type);
    },
    // 打开页面
    openUrl(url) {
        let a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.click();
    },
    // 下载成功提示
    downloadSucTips(message = '') {
        new KLModal({
            data: {
                contentTemplate: `<p>${message}</p>
                    导出文件下载中，请稍后到<a href="/app/sc-workdesk/downloadTask" target="_blank">下载任务列表</a>，自行下载查收`
            }
        });
    },
    isEmpty(obj) {
        // eslint-disable-next-line guard-for-in
        for (const name in obj) {
            return false;
        }
        return true;
    }
};
