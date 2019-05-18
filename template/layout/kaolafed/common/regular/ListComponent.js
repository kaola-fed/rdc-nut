/* ListComopnent */
import { KLNotify, KLModal } from 'nek-ui';
import qs from 'qs';
import _ from '../widget/util';
import BaseComponent from './BaseComponent.js';
import { $request } from '../widget/request';

import nutifyRegular from './nutifyRegular';

const ListComponent = BaseComponent.extend({
    watchedAttr: ['pageNo', 'pageSize'],
    events: {
        updatelist() {
            this.getList();
        }
    },
    config(data) {
        this.defaults({
            total: 1,
            pageNo: 1,
            pageSize: 10,
            condition: {},
            list: [],
            loading: false, // 配合KLTable使用
            urlParser: null
        });

        this.supr(data);

        this.$watch(this.watchedAttr, function(){
            if(this.shouldUpdateList()){
                this.getList();
            }
        });

        // 从url按需取值并赋给conditon
        data.urlParser && this.getUrlParam();
    },
    // @子类修改
    shouldUpdateList() {
        return true;
    },
    getUrlParam() {
        const params = qs.parse(window.location.search.slice(1));
        const { urlParser, condition } = this.data;
        const parsers = _.isArray(urlParser) ? urlParser : Object.keys(urlParser); // 对urlParser的数组或对象书写方式的处理
        const result = Object.keys(params).reduce((i, j) => (parsers.includes(j) ? { // 只处理在urlParser中声明的url参数
            ...i,
            // 若urlParser书写方式为数组，则直接从url取值并赋值；若为对象书写方式，则按声明的类型赋值（数组类型自动按半角逗号分割url的取值）
            [j]: _.isArray(urlParser) ? params[j] : (urlParser[j] === Array ? params[j].split(',') : urlParser[j](params[j]))
        } : {...i}), {});
        _.extend(condition, result);
    },
    getExtraParam() {
        return this.data.condition;
    },
    refresh(condition) {
        const pageNo = this.data.pageNo;
        this.data.pageNo = 1;
        this.data.condition = condition || this.data.condition;
        if(pageNo === 1) {
            this.$emit('updatelist');
        }
    },
    /* 重置表单筛选项 */
    reset() {
        this.$update('condition', {});
    },
    getListParam() {
        const data = this.data;
        const _obj = _.extend({
            pageNo: data.pageNo, // 页码都是从1开始
            pageSize: data.pageSize
        }, this.getExtraParam());
        _.filterParam(_obj);
        return _obj;
    },
    bodyResolver(json) {
        if (json.code != 200) {
            return KLNotify.error(json.message);
        }

        // 兼容haitao返回的data格式
        const result = json.result || json.data || {};
        const list = result.list || [];

        this.data.total = (result.pagination && result.pagination.total) || result.total;
        this.data.list = list;
        this.$update();
    },
    // update loading
    async getList() {
        this.$update('loading', true);
        const option = {
            progress: true,
            data: this.getListParam(),
            type: 'json',
            catchError: true
        };
        if (this.xdrOption) {
            const xdrOpt = this.xdrOption();
            if (xdrOpt.norest) {
                option.norest = true;
            }
            option.method = xdrOpt.method || 'GET';
        }
        try {
            this.data.list = [];
            const json = await $request(this.url || this.data.url, option);
            this.bodyResolver(json);
            this.$update('loading', false);
        } catch (e) {
            KLModal.alert((e && e.message) || '返回异常');
            console.error(e);
            this.$update('loading', false);
        }
    }
});

nutifyRegular(ListComponent);

export default ListComponent;
