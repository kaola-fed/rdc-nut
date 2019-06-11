import { getApis } from '../widget/request';

export const goLogin = () => {
    window.location = `/api/common/doLogin?redirectUrl=${window.location.href}`;
};

const list = [
    {key: 'getUserInfo', url: '/api/common/getUserInfo', type: 'get'},
    {key: 'getMenus', url: '/api/common/getMenus', type: 'get'},
    {key: 'getFavorMenus', url: '/api/common/getFavorMenus', type: 'get'},

    {key: 'addFavorMenu', url: '/api/common/addFavorMenu', type: 'post'},
    {key: 'removeFavorMenu', url: '/api/common/removeFavorMenu', type: 'post'},
    {key: 'sortFavorMenus', url: '/api/common/sortFavorMenus', type: 'post'},

    {key: 'logout', url: '/api/common/logout', type: 'get'},
];

export const API = getApis(list).API;
