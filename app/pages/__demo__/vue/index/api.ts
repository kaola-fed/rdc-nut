import { getApis } from '~/widget/request.js';

const list = [
    { key: 'getList', url: '/api/vue/demo/list', type: 'post' },
    { key: 'exportList', url: '/api/vue/demo/export', type: 'post' },
];

export const API = getApis(list).API;
export const authApis = getApis(list).authApis;
