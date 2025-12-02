<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useLoading } from '@sa/hooks';
import { fetchRegister } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useCaptcha } from '@/hooks/business/captcha';
import { $t } from '@/locales';

defineOptions({
  name: 'Register'
});

const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useNaiveForm();
const { label, isCounting, loading, getCaptcha } = useCaptcha();
const { loading: registerLoading, startLoading, endLoading } = useLoading();

// 添加注册类型状态
const registerType = ref<'mobile' | 'username'>('mobile');

interface FormModel {
  mobile: string;
  username: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const model: FormModel = reactive({
  mobile: '',
  username: '',
  code: '',
  password: '',
  confirmPassword: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  const { formRules, createConfirmPwdRule } = useFormRules();

  // 根据注册类型动态返回验证规则
  const baseRules = {
    password: formRules.pwd,
    confirmPassword: createConfirmPwdRule(model.password)
  };

  if (registerType.value === 'mobile') {
    return {
      ...baseRules,
      mobile: formRules.phone,
      code: formRules.code,
      username: [] // 用户名在手机注册时不需要验证
    };
  }
  return {
    ...baseRules,
    username: formRules.userName || [
      { required: true, message: $t('page.login.common.userNamePlaceholder'), trigger: 'blur' }
    ],
    mobile: [], // 手机在用户名注册时不需要验证
    code: [] // 验证码在用户名注册时不需要验证
  };
});

// 发送验证码方法，添加类型检查
function handleGetCaptcha() {
  if (registerType.value === 'mobile' && model.mobile) {
    getCaptcha(model.mobile);
  } else {
    window.$message?.warning($t('page.login.common.phonePlaceholder'));
  }
}

async function handleSubmit() {
  await validate();

  startLoading();

  try {
    const registerData: {
      password: string;
      mobile?: string;
      username?: string;
      code?: string;
      type: '1' | '2'; // 1: 手机注册, 2: 用户名注册
    } = {
      password: model.password,
      type: registerType.value === 'mobile' ? '1' : '2'
    };

    // 根据注册类型添加不同的字段
    if (registerType.value === 'mobile') {
      registerData.mobile = model.mobile;
      registerData.code = model.code;
    } else {
      registerData.username = model.username;
    }

    const response = await fetchRegister(registerData);
    if (response.response.data.status.toString() === '200') {
      window.$message?.success($t('page.login.register.registerSuccess'));
      // 注册成功后跳转到登录页面
      toggleLoginModule('pwd-login');
    } else {
      // 根据后端返回的错误信息显示具体提示
      window.$message?.error(response.response.data.message || $t('page.login.register.RegistraFailed'));
    }
  } catch {
    window.$message?.error('网络错误，请重试');
  } finally {
    endLoading();
  }
}

// 切换注册类型时重置表单验证
function handleRegisterTypeChange(type: 'mobile' | 'username') {
  registerType.value = type;
  // 重置表单验证状态
  formRef.value?.restoreValidation();

  // 清空不需要的字段;
  if (type === 'mobile') {
    model.username = '';
  } else {
    model.mobile = '';
    model.code = '';
  }
  model.password = '';
  model.confirmPassword = '';
}
</script>

<template>
  <div class="register-container">
    <!-- 注册类型切换 -->
    <div class="register-type-toggle">
      <NButton
        :type="registerType === 'mobile' ? 'primary' : 'default'"
        size="large"
        @click="handleRegisterTypeChange('mobile')"
      >
        {{ $t('page.login.register.phoneRegister') }}
      </NButton>
      <NButton
        :type="registerType === 'username' ? 'primary' : 'default'"
        size="large"
        @click="handleRegisterTypeChange('username')"
      >
        {{ $t('page.login.register.usernameRegister') }}
      </NButton>
    </div>

    <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
      <!-- 用户名注册字段 -->
      <NFormItem v-if="registerType === 'username'" path="username">
        <NInput v-model:value="model.username" :placeholder="$t('page.login.common.userNamePlaceholder')" />
      </NFormItem>

      <!-- 手机注册字段 -->
      <NFormItem v-if="registerType === 'mobile'" path="mobile">
        <NInput v-model:value="model.mobile" :placeholder="$t('page.login.common.phonePlaceholder')" />
      </NFormItem>

      <!-- 验证码字段（仅手机注册显示） -->
      <NFormItem v-if="registerType === 'mobile'" path="code">
        <div class="w-full flex-y-center gap-16px">
          <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
          <NButton size="large" :disabled="isCounting" :loading="loading" @click="handleGetCaptcha">
            {{ label }}
          </NButton>
        </div>
      </NFormItem>

      <!-- 密码字段 -->
      <NFormItem path="password">
        <NInput
          v-model:value="model.password"
          type="password"
          show-password-on="click"
          :placeholder="$t('page.login.common.passwordPlaceholder')"
        />
      </NFormItem>

      <!-- 确认密码字段 -->
      <NFormItem path="confirmPassword">
        <NInput
          v-model:value="model.confirmPassword"
          type="password"
          show-password-on="click"
          :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
        />
      </NFormItem>

      <NSpace vertical :size="18" class="w-full">
        <NButton type="primary" size="large" round block :loading="registerLoading" @click="handleSubmit">
          {{ registerLoading ? $t('page.login.register.registering') : $t('common.confirm') }}
        </NButton>
        <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
          {{ $t('page.login.common.back') }}
        </NButton>
      </NSpace>
    </NForm>
  </div>
</template>

<style scoped>
.register-container {
  width: 100%;
}

.register-type-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.register-type-toggle .n-button {
  flex: 1;
}

.flex-y-center {
  display: flex;
  align-items: center;
}

.gap-16px {
  gap: 16px;
}

.w-full {
  width: 100%;
}
</style>
