import { request } from '../request';

/**
 * Login-by-username
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/users/login',
    method: 'post',
    data: {
      userName,
      password
    }
  });
}

/**
 * Login-by-code
 *
 * @param phone phone
 * @param code code
 */
export function fetchLoginByCode(phone: string, code: string) {
  return request<Api.Auth.LoginToken>({
    url: '/users/loginByCode',
    method: 'post',
    data: {
      phone,
      code
    }
  });
}

/**
 * Register
 *
 * @param data Register data
 */
export function fetchRegister(data: { Mobile?: string; username?: string; password: string; code?: string }) {
  return request<Api.Auth.LoginToken>({
    url: '/users/register',
    method: 'post',
    data
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/users/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

/**
 * Send captcha
 *
 * @param phone Phone number
 */
export function fetchSendCaptcha(phone: string) {
  return request({
    url: '/auth/send-captcha',
    method: 'post',
    data: { phone }
  });
}
