import {KLTable} from 'nek-ui';
import _ from './util';

/* 公用过滤器 */
const filter = {
    // 获取字符串长度，mode != 0 时汉字占两个字符
    length(value, mode = 0) {
        if (mode === 0) {
            return value.length;
        }
        // eslint-disable-next-line no-control-regex
        return ((value && value.toString()) || '').replace(/[^\x00-\xff]/g, 'xx').length;
    },
    // 兼容https; 将图片资源的链接http://改为//;
    safeLink(url) {
        if (!url) {
            return '';
        }
        return url.replace(/^http:/i, '');
    },
    // 1/0转换为是否
    yesOrNo(value) {
        if(value === '' || value === null || value === undefined) {
            return '';
        }
        return (+value === 0 || value === false) ? '否' : '是';
    },
    // 1/0转换为是否
    bool2Str(value) {
        if (value === '' || value === null || value === undefined) {
            return '';
        }
        return (value === 0 || value === false) ? '否' : '是';
    },
    returnOriginValue(value) {
        return value;
    },
    delDots: {
        set: (value) => {
            if (!value) {
                return value;
            }
            const pattDot = /[，]/g;
            return value.replace(pattDot, ',').replace(/ /g, '');
        },
        get: value => value
    },
    str2arr: {
        get: value => value,
        set: (value) => {
            if(value === undefined) {
                return [];
            }
            if (Array.isArray(value)) {
                return value;
            }
            if (value === '' || value === null || value === undefined) {
                return [];
            }
            return String(value).split(',');
        }
    },
    // 这个地方不能加第二个参数, 原因是kltable用的话,table传入的第二个参数不是type, 会造成moment报错;
    format: value => _.format(value),
    formatDateTime: {
        set(value) {
            return (value && (!isNaN(+value) && value > 0 || isNaN(+value))) ? new Date(value).getTime() : '';
        },
        get(value) {
            return value ? _.format(value, 'YYYY/MM/DD HH:mm:ss') : null;
        }
    },

    /**
     * string to array without blank
     */
    str2arrNoBlank: {
        get: value => value,
        set: (value) => {
            if (Array.isArray(value)) {
                return value;
            }
            if (value === '' || value === null || value === undefined) {
                return [];
            }
            return String(value).trim().replace(/[ \n\t]+/g, ',').replace(/,+/g, ',').split(',');
        }
    },

    /**
     * 返回yyyy-MM-dd 00:00对应时间戳
     */
    formatDateTimeZero: {
        set(value) {
            return (value && value > 0) ? (new Date(value).getTime() - 8 * 60 * 60 * 1000) : '';
        },
        get(value) {
            return value ? _.format(value, 'YYYY-MM-DD') : null;
        }
    },
    fixed(_data, _len = 2) {
        if(_data === '' || _data === null || typeof _data === 'undefined' || isNaN(_data)) {
            return '';
        }
        if (Number(_len) !== _len) {
            _len = 2;
        }
        return parseFloat(Number(_data).toFixed(_len));
    },
    noDataFormat(value) {
        if (value || value === 0) {
            return value;
        }
        return '--';
    },
    /* 将float的input转化为number格式 */
    toNumber: {
        set(value) {
            return value;
        },
        get(value) {
            return Number(value);

        }
    },
    percent(_data, _len = 2) {
        if(_data === '' || _data === null || typeof _data === 'undefined' || isNaN(_data)) {
            return '';
        }
        const value = parseFloat(Number(_data * 100).toFixed(_len));
        return `${value}%`;
    },
    blankToComma: {
        get(origin) {
            return origin;
        },
        set(value) {
            if(!value && value !== 0){
                return '';
            }
            return value.trim().replace(/[ \n\t]+/g, ',').replace(/,+/g, ',');
        }
    },
    replaceWith: {
        get: value => value,
        set: (value, from = /\s+/g, to = ',') => {
            if (value == null) {
                return value;
            }
            // 将from替换为to，并且将连续的多个to替换为一个
            return `${value}`.trim().replace(from, to).replace(new RegExp(`(${to})+`, 'g'), to);
        }
    },
    currency(_val) {
        if (isNaN(_val) || _val === undefined){
            return '';
        }
        if (_val === 0) {
            return 0;
        }
        const _keep = 2;
        _val = _val/1;
        _val = `${(Math.round(_val * Math.pow(10, _keep)) / Math.pow(10, _keep)).toFixed(_keep)}`; // 保留两位小数
        if(_val > 0) {
            _val = _val.replace(/^(\d+)((\.\d+)?)$/, (v1, v2, v3) => v2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (v3 || (_keep > 0 ? '.00' : '')));
        } else { //负数的时候格式化错误修复
            _val = _val.replace(/(\d{1,3})(?=(?:\d{3})+\.?)/g, '$1,');
        }
        return _val;
    },
    toWUnit(value) {
        if (!value && value !== 0) {
            return '';
        }
        if (value > 10000 || value < -10000) {
            value = value / 10000;
            value = filter.currency(value);
            return `${value}万元`;
        }
        return `${value}元`;

    },
    // 返回yyyy-MM-dd 23:59:59对应时间戳
    formatDateTimeEnding: {
        set(value) {
            let date = null;
            if(value && value > 0) {
                date = new Date(value);
                date.setHours(23);
                date.setMinutes(59);
                date.setSeconds(59);
                date = date.getTime();
            }
            return date;
        },
        get(value) {
            return value ? _.format(value, 'YYYY-MM-DD') : null;
        }
    },
    null2zero(val) {
        return val ? val : 0;
    }
};
KLTable.filter(filter);
export default filter;

