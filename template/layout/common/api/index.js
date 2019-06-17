import { getApis } from '~/widget/request';

const list = [
    {key: 'getUserInfo', url: '///{api.getUserInfo}///' || '/api/common/getUserInfo', type: 'get'},
    {key: 'getMenus', url: '///{api.getMenus}///' || '/api/common/getMenus', type: 'get'},
    {key: 'getFavorMenus', url: '///{api.getFavorMenus}///' ||'/api/common/getFavorMenus', type: 'get'},

    {key: 'addFavorMenu', url: '///{api.addFavorMenu}///' || '/api/common/addFavorMenu', type: 'post'},
    {key: 'removeFavorMenu', url: '///{api.removeFavorMenu}///' || '/api/common/removeFavorMenu', type: 'post'},
    {key: 'sortFavorMenus', url: '///{api.sortFavorMenus}///' || '/api/common/sortFavorMenus', type: 'post'},

    {key: 'logout', url: '///{api.logout}///' || '/api/common/logout', type: 'get'},
];

// eslint-disable-next-line import/prefer-default-export
export const API = getApis(list).API;
