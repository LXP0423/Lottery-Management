import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { fetchGetUserInfo, fetchLogin } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { SetupStoreId } from '@/enum';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: []
  });

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    recordUserId();

    clearAuthStorage();

    // 移除循环引用
    // token.value = '';
    // Object.assign(userInfo, {
    //   userId: '',
    //   userName: '',
    //   roles: [],
    //   buttons: []
    // });
    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /** Record the user ID of the previous login session Used to compare with the current user ID on next login */
  function recordUserId() {
    if (!userInfo.userId) {
      return;
    }

    // Store current user ID locally for next login comparison
    localStg.set('lastLoginUserId', userInfo.userId);
  }

  /**
   * Check if current login user is different from previous login user If different, clear all tabs
   *
   * @returns {boolean} Whether to clear all tabs
   */
  function checkTabClear(): boolean {
    if (!userInfo.userId) {
      return false;
    }

    const lastLoginUserId = localStg.get('lastLoginUserId');

    // Clear all tabs if current user is different from previous user
    if (!lastLoginUserId || lastLoginUserId !== userInfo.userId) {
      localStg.remove('globalTabs');
      tabStore.clearTabs();

      localStg.remove('lastLoginUserId');
      return true;
    }

    localStg.remove('lastLoginUserId');
    return false;
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading();

    try {
      const { data: loginToken, error } = await fetchLogin(userName, password);

      if (error || !loginToken) {
        // 登录失败处理
        endLoading();

        // 抛出具体错误信息
        const errorMsg = error?.message || '登录失败，请检查用户名和密码';
        throw new Error(errorMsg);
      }

      // 检查 token 是否存在
      if (!loginToken.token) {
        endLoading();
        // 显示错误消息
        window.$message?.error('登录失败：未获取到有效的token');
        resetStore();
        throw new Error('登录失败：未获取到有效的token');
      }

      const pass = await loginByToken(loginToken);

      if (pass) {
        // Check if the tab needs to be cleared
        const isClear = checkTabClear();
        let needRedirect = redirect;

        if (isClear) {
          // If the tab needs to be cleared,it means we don't need to redirect.
          needRedirect = false;
        }
        await redirectFromLogin(needRedirect);

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
          duration: 4500
        });
        console.log('✅ 登录成功，用户信息：', userInfo);
      } else {
        // 获取用户信息失败
        window.$message?.error('获取用户信息失败');
        resetStore();
        throw new Error('获取用户信息失败');
      }
    } catch (error) {
      // 确保在出错时也结束 loading
      endLoading();
      resetStore();
      throw error; // 重新抛出错误，让调用方处理
    }
  }

  // async function login(userName: string, password: string, redirect = true) {
  //   startLoading();

  //   const { data: loginToken, error } = await fetchLogin(userName, password);

  //   if (!error && error !== null) {
  //     const pass = await loginByToken(loginToken);

  //     if (pass) {
  //       // Check if the tab needs to be cleared
  //       const isClear = checkTabClear();
  //       let needRedirect = redirect;

  //       if (isClear) {
  //         // If the tab needs to be cleared,it means we don't need to redirect.
  //         needRedirect = false;
  //       }
  //       await redirectFromLogin(needRedirect);

  //       window.$notification?.success({
  //         title: $t('page.login.common.loginSuccess'),
  //         content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
  //         duration: 4500
  //       });
  //     }
  //   } else {
  //     resetStore();
  //   }

  //   endLoading();
  // }

  // async function loginByToken(loginToken: Api.Auth.LoginToken) {
  //   // 添加空值检查
  //   if (!loginToken || !loginToken.token) {
  //     console.error('Invalid login token:', loginToken);
  //     return false;
  //   }

  //   try {
  //     // 1. stored in the localStorage, the later requests need it in headers
  //     localStg.set('token', loginToken.token);
  //     localStg.set('refreshToken', loginToken.refreshToken);

  //     // 2. get user info
  //     const pass = await getUser();

  //     if (pass) {
  //       token.value = loginToken.token;
  //       return true;
  //     }

  //     return false;
  //   } catch (error) {
  //     console.error('Login by token failed:', error);
  //     // 清理无效的 token
  //     localStg.remove('token');
  //     localStg.remove('refreshToken');
  //     return false;
  //   }
  // }

  // async function loginByToken(loginToken: Api.Auth.LoginToken) {
  //   // 1. stored in the localStorage, the later requests need it in headers
  //   localStg.set('token', loginToken.token);
  //   localStg.set('refreshToken', loginToken.refreshToken);

  //   // 2. get user info
  //   const pass = await getUser();

  //   if (pass) {
  //     token.value = loginToken.token;

  //     return true;
  //   }

  //   return false;
  // }

  // async function getUser() {
  //   try {
  //     const { data: info, error } = await fetchGetUserInfo();

  //     if (error || !info) {
  //       console.error('Get user info failed:', error);
  //       return false;
  //     }

  //     // update store
  //     Object.assign(userInfo, info);
  //     return true;
  //   } catch (error) {
  //     console.error('Get user info error:', error);
  //     return false;
  //   }
  // }

  // async function initUser() {
  //   const hasToken = getToken();

  //   if (hasToken) {
  //     const pass = await getUser();

  //     if (!pass) {
  //       resetStore();
  //     }
  //   }
  // }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // update store
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();

    if (hasToken) {
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo
  };
});
