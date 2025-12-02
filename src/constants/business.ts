import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.userCenter.common.status.enable',
  '2': 'page.userCenter.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemUserCenter.UserListGender, App.I18n.I18nKey> = {
  '1': 'page.userCenter.userList.gender.male',
  '2': 'page.userCenter.userList.gender.female'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

// export const enableStatusRecord_template: Record<Api.Common.EnableStatus, string> = {
//   '1': 'page.systemSettings.messageManagement.templateManagement.enableStatus.enable',
//   '2': 'page.systemSettings.messageManagement.templateManagement.enableStatus.disable'
// };
// export const enableStatusOptionss = transformRecordToOption(enableStatusRecord_template);

// export const menuTypeRecord: Record<Api.SystemUserCenter.MenuType, App.I18n.I18nKey> = {
//   '1': 'page.user-center.menu.type.directory',
//   '2': 'page.user-center.menu.type.menu'
// };

// export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

// export const menuIconTypeRecord: Record<Api.SystemUserCenter.IconType, App.I18n.I18nKey> = {
//   '1': 'page.user-center.menu.iconType.iconify',
//   '2': 'page.user-center.menu.iconType.local'
// };

// export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);
