import { getApis } from '@/common/widget/request';

const list = [
    {key: 'exportList', url: '/api/regular/demo/export', type: 'get'},
];

export const API = getApis(list).API;
export const authApis = getApis(list).authApis;