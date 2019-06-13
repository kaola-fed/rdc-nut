import BaseComponent from '@@/regular/BaseComponent';
import _ from '@@/widget/util'

import template from './index.html';
import './index.css'

export default BaseComponent.extend({
    template: template,
    config: function(data) {
        this.defaults({
            now: +new Date(),
            account: {}
        });
        this.setErrorMsg();

        this.supr(data);
    },
    validate: function() {
        let account = this.data.account,
            error = '',
            username = account.username && account.username.trim(),
            password = account.password;
        // var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!username) {
            error = 1;
        } else if (!password) {
            error = 2;
        }

        this.$update('error', error);

        return !error;
    },
    submit: function() {
        if (!this.validate()) {
            return;
        }

        let $form = this.$refs.form;
        $form.submit();
    },
    /**
     * 401 - 用户名参数错误 -- 添加用户时出现，忽略
     * 402 - 密码参数错误 -- 添加用户时出现，忽略
     * 403 - 用户访问的客户应用没有注册或已失效 -- 忽略
     * 411 - 该账号不存在或已停用
     * 412 - 该账号不在有效期 -- 都是永久有效期，忽略
     * 413 - 密码错误
     * 414 - 用户无权访问此客户应用 -- 忽略
     * 420 - 登录尝试次数过多
     * 430 - 验证码错误
     * 440 - 将军令认证失败 -- 忽略
     * 450 - 电话密保认证失败 -- 忽略
     * 460 - 参数SHA校验错误 -- 忽略
     * 500 - 系统错误
    */
    setErrorMsg: function(){
        // code 102 验证码错误
        let code = _.getUrlParam('retCode') || _.getUrlParam('code') || '';
        let normalCode = [411, 413, 420, 430, 500, 102];
        if (code && normalCode.indexOf(Number(code)) < 0) {
            code = 500;
        }
        this.$update('error', code);
    },
    _onFocus: function(from) {
        let error = this.data.error;
        if (error == from || (from == 1 && error == 411) || (from == 2 && error == 413)) {
            this.$update('error', '');
        }
        if (error == 420 || error == 500) {
            this.$update('error', '');
        }
    }
});

