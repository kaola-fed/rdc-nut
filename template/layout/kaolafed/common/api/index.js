import { getApis } from '../widget/request';

export const goLogin = () => {
    window.location = `/api/common/doLogin?redirectUrl=${window.location.href}`;
};

const list = [
    {key: 'getUserInfo', url: '/api/common/getUserInfo', type: 'get'},
    {key: 'getMenus', url: '/api/common/getMenus', type: 'get'},
    {key: 'logout', url: '/api/common/logout', type: 'get'},
];

export const API = getApis(list).API;
