<template>
  <article class="flex h-screen flex-col px-8 pt-[15vh] pb-8">
    <header>
      <h3 class="py-3 text-2xl font-bold">手机快捷登录</h3>
      <p class="text-sm text-medium">未注册过的手机号将自动创建账号</p>
    </header>

    <form class="mt-12" @submit.prevent>
      <BaseTextInput
        name="mobile"
        label="手机号"
        type="text"
        inputmode="numeric"
        maxlength="11"
        pattern="^1\d{10}"
        placeholder="请输入手机号"
      ></BaseTextInput>

      <BaseTextInput
        name="authCode"
        label="验证码"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="6"
        pattern="\d{6}"
        placeholder="请输入验证码"
      >
        <template #append>
          <a
            :class="
              shouldDisableFetchAuthCode ? 'text-slate-400/75' : 'text-primary'
            "
            @click.prevent="handleAuthCodeRequest"
          >
            {{ authCodeButtonText }}
          </a>
        </template>
      </BaseTextInput>

      <div class="mt-16 text-center">
        <van-button
          class="w-11/12"
          type="primary"
          round
          :loading="isSubmitting"
          @click="handleLogin"
        >
          {{ isSubmitting ? '登录中...' : '登录' }}
        </van-button>
      </div>
    </form>

    <footer class="mt-auto flex justify-center text-xs">
      <van-checkbox
        v-model="isUserAgreementChecked"
        :class="checkboxClass"
        icon-size="16px"
        @animationend="handleAnimationEnd"
      >
        <span>
          登录即代表同意
          <a
            class="text-primary"
            @click.prevent="stageAndLeave('mobile-user-agreement')"
          >
            《用户协议》
          </a>
          和
          <a
            class="text-primary"
            @click.prevent="stageAndLeave('mobile-privacy-policy')"
          >
            《隐私政策》
          </a>
        </span>
      </van-checkbox>
    </footer>
  </article>
</template>

<script lang="ts" setup>
import { MobileLoginInfo } from '@/typings';
import { showFailToast, showToast } from 'vant';
import { useForm } from 'vee-validate';
import type { RouteLocationResolved } from 'vue-router/auto';

definePage({
  meta: {
    layout: 'empty',
    requiresAuth: false,
  },
});

const authStore = useMobileAuthStore();

const { values, validateField, isSubmitting, handleSubmit } =
  useForm<MobileLoginInfo>({
    validationSchema: {
      mobile: 'required|mobile',
      authCode: 'required|numeric|max:6',
    },
    initialValues: {
      mobile: authStore.stagedLoginInfo.mobile ?? '',
      authCode: authStore.stagedLoginInfo.authCode ?? '',
    },
  });

authStore.$patch((state) => {
  state.stagedLoginInfo.mobile = '';
  state.stagedLoginInfo.authCode = '';
});

const maxWaitSecs = 10;
const countdown = ref(maxWaitSecs);
const {
  isActive: isCountdownActive,
  pause,
  resume,
} = useIntervalFn(
  () => {
    countdown.value--;
    if (countdown.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false, immediateCallback: true }
);
const authCodeButtonText = computed(() =>
  isCountdownActive.value ? `${countdown.value}s后重新获取` : '获取验证码'
);

const { isLoading: isAuthCodeLoading, execute: fetchAuthCode } = useAuthCode();
const shouldDisableFetchAuthCode = computed(
  () => isAuthCodeLoading.value || isCountdownActive.value
);
const handleAuthCodeRequest = async () => {
  const { valid } = await validateField('mobile');
  if (!valid) {
    return;
  }

  if (shouldDisableFetchAuthCode.value) {
    return;
  }

  countdown.value = maxWaitSecs;
  await fetchAuthCode();
  showToast('验证码已发送');
  resume();
};

const isUserAgreementChecked = ref(
  authStore.stagedLoginInfo.isUserAgreementChecked ?? false
);
const checkboxClass = ref('');
const handleAnimationEnd = () => {
  checkboxClass.value = '';
};

const router = useRouter();
const route = useRoute();

const stageAndLeave = (name: string) => {
  authStore.$patch((state) => {
    state.stagedLoginInfo.mobile = values.mobile;
    state.stagedLoginInfo.authCode = values.authCode;
    state.stagedLoginInfo.isUserAgreementChecked = isUserAgreementChecked.value;
  });

  router.push({
    name,
  } as RouteLocationResolved);
};

const handleLogin = handleSubmit(async (formValues) => {
  if (!isUserAgreementChecked.value) {
    showToast(`请先阅读并同意用户协议和隐私政策`);
    checkboxClass.value = 'animate__animated animate__shakeX';
    return;
  } else {
    checkboxClass.value = '';
  }

  await authStore.login(formValues);

  if (authStore.loginError) {
    showFailToast(authStore.loginError);
  }

  if (authStore.isLoggedIn) {
    const { query } = route;
    router.replace((query.from as string) || '/');
  }
});
</script>
