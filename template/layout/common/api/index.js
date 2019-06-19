import { getApis } from '~/widget/request';

const list = [
    {key: 'getUserInfo', url: '///{api.getUserInfo}///' || '/api/user', type: 'get'},
    {key: 'getMenus', url: '///{api.getMenus}///' || '/api/menus', type: 'get'},
    {key: 'getFavorMenus', url: '///{api.getFavorMenus}///' ||'/api/favorMenus', type: 'get'},
    {key: 'getParentUrl', url: '///{api.getParentUrl}///' ||'/api/menus/parent', type: 'get'},

    {key: 'addFavorMenu', url: '///{api.addFavorMenus}///' || '/api/favorMenus/add', type: 'post'},
    {key: 'removeFavorMenu', url: '///{api.removeFavorMenus}///' || '/api/favorMenus/remove', type: 'post'},
    {key: 'sortFavorMenus', url: '///{api.sortFavorMenus}///' || '/api/favorMenus/sort', type: 'post'},

    {key: 'logout', url: '///{api.logout}///' || '/api/logout', type: 'get'},
];

// eslint-disable-next-line import/prefer-default-export
export const API = getApis(list).API;
