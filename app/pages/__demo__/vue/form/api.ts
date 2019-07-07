import { getApis } from '~/request.js';


const list = [
    { key: 'getDetail', url: '/api/vue/demo/form/detail', type: 'get' },
    { key: 'addShop', url: '/api/vue/demo/form/add', type: 'post' },
    { key: 'save', url: '/api/vue/demo/form/save', type: 'post' },
];

export const API = getApis(list).API;
