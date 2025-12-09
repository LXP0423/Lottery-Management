import { request } from '../request';

// /** get role list */
// export function fetchGetRoleList(params?: Api.SystemUserCenter.RoleSearchParams) {
//   return request<Api.SystemUserCenter.RoleList>({
//     url: '/systemManage/getRoleList',
//     method: 'get',
//     params
//   });
// }

/**
 * get all roles
 *
 * these roles are all enabled
 */
// export function fetchGetAllRoles() {
//   return request<Api.SystemUserCenter.AllRole[]>({
//     url: '/systemManage/getAllRoles',
//     method: 'get'
//   });
// }

/** get user list */
export function fetchGetTemplateList(params?: Api.MessageManagement.TemplateSearchParams) {
  return request<Api.MessageManagement.templateList>({
    url: '/Messages/templates',
    method: 'get',
    params
  });
}

/** get menu list */
// export function fetchGetMenuList() {
//   return request<Api.SystemUserCenter.MenuList>({
//     url: '/systemManage/getMenuList/v2',
//     method: 'get'
//   });
// }

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
// export function fetchGetMenuTree() {
//   return request<Api.SystemUserCenter.MenuTree[]>({
//     url: '/systemManage/getMenuTree',
//     method: 'get'
//   });
// }
