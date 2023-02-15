<template>
  <div
    class="relative flex h-screen bg-primary bg-[radial-gradient(var(--color-primary),var(--color-tertiary))]"
  >
    <div class="hidden flex-grow flex-col items-center justify-center lg:flex">
      <AppLogo size="large"></AppLogo>
      <img
        class="mt-16"
        src="@/assets/images/login.png"
        alt="login background"
      />
    </div>

    <div
      class="flex flex-grow flex-col items-center justify-center bg-[url('~assets/images/login.png')] bg-center bg-no-repeat lg:bg-none"
    >
      <AppLogo size="large" class="mb-20 lg:hidden"></AppLogo>

      <div
        class="w-80 rounded-md bg-white py-6 px-10 shadow 2xl:w-88 2xl:px-14"
      >
        <header>
          <h3
            class="tracking-widiest text-center text-xl font-semibold text-primary"
          >
            用户登录
          </h3>
        </header>

        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="in-out"
        >
          <el-alert
            v-if="loginError"
            class="mt-6"
            :title="loginError"
            type="error"
            effect="dark"
            :closable="false"
          >
          </el-alert>
        </transition>

        <el-form class="mt-6" status-icon size="large" @submit="onSubmit">
          <BaseInput
            name="userName"
            label="用户名"
            :show-label="false"
            required
            placeholder="手机号/账号"
            clearable
          >
            <template #prefix>
              <div class="el-input__icon">
                <IconMdiAccount></IconMdiAccount>
              </div>
            </template>
          </BaseInput>

          <BaseInput
            name="password"
            label="密码"
            :show-label="false"
            required
            placeholder="密码"
            clearable
            type="password"
          >
            <template #prefix>
              <div class="el-input__icon">
                <IconMdiLockOpen></IconMdiLockOpen>
              </div>
            </template>
          </BaseInput>

          <div class="grid grid-cols-3 gap-x-1">
            <div class="col-span-2">
              <BaseInput
                name="captcha"
                label="验证码"
                :show-label="false"
                required
                placeholder="验证码"
                clearable
              >
                <template #prefix>
                  <div class="el-input__icon">
                    <IconMdiImage></IconMdiImage>
                  </div>
                </template>
              </BaseInput>
            </div>

            <div class="h-[38px]">
              <transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
              >
                <div
                  v-if="isCaptchaBroken"
                  class="flex h-full cursor-pointer items-center justify-center text-xs text-yellow-300"
                  @click="fetchCaptcha"
                >
                  加载失败
                </div>
                <img
                  v-else
                  ref="captchaRef"
                  class="cursor-pointer rounded-sm object-contain"
                  :src="captchaUrl"
                  alt="captcha"
                  @click="fetchCaptcha"
                />
              </transition>
            </div>
          </div>

          <el-form-item>
            <el-button
              class="w-full"
              type="primary"
              :disabled="isLoginButtonDisabled"
              :loading="isLoginPending"
              native-type="submit"
            >
              <transition
                enter-active-class="animate__animated animate__heartBeat animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
                @after-enter="handleLoginSuccess"
                @enter-cancelled="handleLoginSuccess"
              >
                <IconMdiCheckCircleOutline
                  v-if="isLoggedIn"
                ></IconMdiCheckCircleOutline>
                <span v-else>{{ loginButtonText }}</span>
              </transition>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoginInfo } from '@/typings';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import type { RouteNamedMap } from 'vue-router/auto/routes';

definePage({
  meta: {
    layout: 'empty',
    requiresAuth: false,
  },
});

const auth = useAuthStore();
const { isLoggedIn, isLoginPending, loginError, hasLoginError } =
  storeToRefs(auth);
const loginButtonText = computed(() =>
  isLoginPending.value ? '登录中...' : '登 录'
);

const clearError = () => {
  loginError.value = '';
};

/** captcha handling */
const getCaptchaUrl = () =>
  `/hjq-prov/api/webend/randowCodeImg?_r=${Date.now()}`;
const isCaptchaBroken = ref(false);
const captchaUrl = ref(getCaptchaUrl());
const captchaRef = ref<HTMLImageElement>();
const fetchCaptcha = () => {
  isCaptchaBroken.value = false;
  captchaUrl.value = getCaptchaUrl();
};
onMounted(() => {
  if (captchaRef.value) {
    captchaRef.value.onload = () => {
      isCaptchaBroken.value = false;
    };

    captchaRef.value.onerror = () => {
      isCaptchaBroken.value = true;
    };
  }
});
watchEffect(() => {
  if (hasLoginError.value) {
    fetchCaptcha();
  }
});
/** form handling*/
const validationSchema = {
  userName: 'required',
  password: 'required',
  captcha: 'required',
};
const { values, meta, isSubmitting, handleSubmit } = useForm<LoginInfo>({
  validationSchema,
  initialValues: {
    userName: '',
    password: '',
    captcha: '',
  },
});
watch(values, () => {
  if (hasLoginError.value) {
    clearError();
  }
});
const invalid = computed(() => !meta.value.valid && meta.value.dirty);
const isLoginButtonDisabled = computed(
  () => invalid.value || isSubmitting.value
);

const { start: startTransitionCounting, stop: stopTransitionCounting } =
  useTimeoutFn(
    () => {
      if (isLoggedIn.value && !isLoginTransitionFinished.value) {
        handleLoginSuccess();
      }
    },
    2000,
    { immediate: false }
  );
const onSubmit = handleSubmit(async (values) => {
  isLoginTransitionFinished.value = false;

  await auth.login(values);

  // in case animationend did not happen, wait a while, then force redirecting
  startTransitionCounting();
});

const router = useRouter();
const route = useRoute();
const isLoginTransitionFinished = ref(false);
const handleLoginSuccess = async () => {
  // in case page has already been redirected
  // should not happen
  if (route.name !== '/sign-in' || isLoginTransitionFinished.value) {
    return;
  }

  isLoginTransitionFinished.value = true;
  stopTransitionCounting();

  const { from, ...rest } = route.query;
  await router.push({
    name: from === '/sign-in' || !from ? '/' : (from as keyof RouteNamedMap),
    query: rest,
  });

  fetchCaptcha();
};
</script>
