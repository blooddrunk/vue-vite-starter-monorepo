import { RemovableRef } from '@vueuse/shared';

export type LoginInfo = {
  userName: string;
  password: string;
  captcha: string;
};

export type UserInfo = {
  userName: string;
  menuList: string[];
};

export type AuthInfo = {
  user: RemovableRef<UserInfo>;
};

export type MobileLoginInfo = {
  mobile: string;
  authCode: string;
  isUserAgreementChecked?: boolean;
};

export type MobileUserInfo = {
  mobile: string;
  area?: string;
};

export type MobileAuthInfo = {
  user: RemovableRef<MobileUserInfo>;
};
