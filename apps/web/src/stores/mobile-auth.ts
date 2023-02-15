import { MobileAuthInfo, MobileLoginInfo, MobileUserInfo } from '@/typings';
import { promiseTimeout } from '@/utils/misc';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMobileAuthStore = defineStore('mobile-auth', () => {
  const stagedLoginInfo = ref<Partial<MobileLoginInfo>>({
    mobile: '',
    authCode: '',
    isUserAgreementChecked: false,
  });

  const auth = ref<MobileAuthInfo>({
    user: useStorage('hsop_auth_mobile_user', {
      mobile: '13312331233',
      area: '310102',
    }),
  });

  const user = computed(() => auth.value.user);
  const mobile = computed(() => user.value.mobile);
  const area = computed(() => user.value.area);
  const isLoggedIn = computed(() => !!mobile.value);

  const updateUser = (payload: Partial<MobileUserInfo>) => {
    auth.value.user = {
      ...auth.value.user,
      ...payload,
    };
  };

  const {
    data,
    isLoading: isLoginPending,
    loginRequest,
    error: loginError,
  } = useMobileLogin();
  const hasLoginError = computed(() => !!loginError.value);
  const login = async (payload: MobileLoginInfo) => {
    await loginRequest(payload);

    if (data.value) {
      updateUser(data.value);
    }
  };

  const logout = () => {
    auth.value.user = {} as MobileUserInfo;
    loginError.value = '';
  };

  return {
    stagedLoginInfo,
    user,
    mobile,
    area,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,

    updateUser,
    login,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMobileAuthStore, import.meta.hot));
}
