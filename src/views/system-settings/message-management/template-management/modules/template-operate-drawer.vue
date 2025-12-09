<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { jsonClone } from '@sa/utils';
// import { enableStatusOptions, userGenderOptions } from '@/constants/business';
// import { fetchGetAllRoles } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'TemplateOperateModal'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.MessageManagement.templateManagement | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.systemSettings.messageManagement.templateManagement.addTemplate'),
    edit: $t('page.systemSettings.messageManagement.templateManagement.editTemplate')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.MessageManagement.templateManagement,
  | 'templateCode'
  | 'templateName'
  | 'templateType'
  | 'templateCategory'
  | 'titleTemplate'
  | 'contentTemplate'
  | 'templateDescription'
  | 'variablesDescription'
  | 'isActive'
  | 'isSystem'
  | 'priority'
  | 'triggerEvent'
  | 'totalUsed'
  | 'lastUsedTime'
  | 'createTime'
  | 'updateTime'
  | 'createdBy'
  | 'updatedBy'
>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    templateCode: '',
    templateName: '',
    templateType: '',
    templateCategory: '',
    titleTemplate: '',
    contentTemplate: '',
    templateDescription: '',
    variablesDescription: '',
    isActive: '',
    isSystem: '',
    priority: '',
    triggerEvent: '',
    totalUsed: '',
    lastUsedTime: '',
    createTime: '',
    updateTime: '',
    createdBy: '',
    updatedBy: ''
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
// const roleOptions = ref<CommonType.Option<string>[]>([]);

// async function getRoleOptions() {
//   const { error, data } = await fetchGetAllRoles();

//   if (!error) {
//     const options = data.map(item => ({
//       label: item.roleName,
//       value: item.roleCode
//     }));

//     // the mock data does not have the roleCode, so fill it
//     // if the real request, remove the following code
//     const userRoleOptions = model.value.userRoles.map(item => ({
//       label: item,
//       value: item
//     }));
//     // end

//     roleOptions.value = [...userRoleOptions, ...options];
//   }
// }

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, jsonClone(props.rowData));
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    // getRoleOptions();
  }
});
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    :style="{ width: '800px', maxWidth: '90vw' }"
    :title="title"
    :bordered="false"
    size="medium"
    :segmented="{
      content: 'soft',
      action: 'soft'
    }"
  >
    <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.templateCode')"
        path="templateCode"
      >
        <NInput
          v-model:value="model.templateCode"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.templateCode')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.templateName')"
        path="templateName"
      >
        <NInput
          v-model:value="model.templateName"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.templateName')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.templateType')"
        path="templateType"
      >
        <NInput
          v-model:value="model.templateType"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.templateType')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.templateCategory')"
        path="templateCategory"
      >
        <NInput
          v-model:value="model.templateCategory"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.templateCategory')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.titleTemplate')"
        path="titleTemplate"
      >
        <NInput
          v-model:value="model.titleTemplate"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.titleTemplate')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.contentTemplate')"
        path="contentTemplate"
      >
        <NInput
          v-model:value="model.contentTemplate"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.contentTemplate')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.templateDescription')"
        path="templateDescription"
      >
        <NInput
          v-model:value="model.templateDescription"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.templateDescription')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.variablesDescription')"
        path="variablesDescription"
      >
        <NInput
          v-model:value="model.variablesDescription"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.variablesDescription')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.isActive')" path="isActive">
        <NInput
          v-model:value="model.isActive"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.isActive')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.isSystem')" path="isSystem">
        <NInput
          v-model:value="model.isSystem"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.isSystem')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.priority')" path="priority">
        <NInput
          v-model:value="model.priority"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.priority')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.triggerEvent')"
        path="triggerEvent"
      >
        <NInput
          v-model:value="model.triggerEvent"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.triggerEvent')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.totalUsed')" path="totalUsed">
        <NInput
          v-model:value="model.totalUsed"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.totalUsed')"
        />
      </NFormItem>
      <NFormItem
        :label="$t('page.systemSettings.messageManagement.templateManagement.lastUsedTime')"
        path="lastUsedTime"
      >
        <NInput
          v-model:value="model.lastUsedTime"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.lastUsedTime')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.createTime')" path="createTime">
        <NInput
          v-model:value="model.createTime"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.createTime')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.updateTime')" path="updateTime">
        <NInput
          v-model:value="model.updateTime"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.updateTime')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.createdBy')" path="createdBy">
        <NInput
          v-model:value="model.createdBy"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.createdBy')"
        />
      </NFormItem>
      <NFormItem :label="$t('page.systemSettings.messageManagement.templateManagement.updatedBy')" path="updatedBy">
        <NInput
          v-model:value="model.updatedBy"
          :placeholder="$t('page.systemSettings.messageManagement.templateManagement.form.updatedBy')"
        />
      </NFormItem>
      <!--
 <NFormItem :label="$t('page.userCenter.userList.userStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
-->
      <!--
 <NFormItem :label="$t('page.userCenter.userList.userRole')" path="roles">
          <NSelect
            v-model:value="model.userRoles"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.userCenter.userList.form.userRole')"
          />
        </NFormItem>
-->
    </NForm>
    <template #action>
      <NSpace :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
