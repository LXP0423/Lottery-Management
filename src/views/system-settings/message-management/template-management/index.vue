<script setup lang="tsx">
import { reactive } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
// import { enableStatusRecord_template } from '@/constants/business';
import { fetchGetTemplateList } from '@/service/api/system-settings';
import { useAppStore } from '@/store/modules/app';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { renderValue } from '@/hooks/common/render';
import { $t } from '@/locales';
import TemplateOperateDrawer from './modules/template-operate-drawer.vue';
import TemplateSearch from './modules/template-search.vue';

const appStore = useAppStore();

const searchParams: Api.MessageManagement.TemplateSearchParams = reactive({
  current: 1,
  size: 10,
  templateCode: null,
  templateName: null,
  templateType: null,
  templateCategory: null,
  isActive: null
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useNaivePaginatedTable({
  api: () => fetchGetTemplateList(searchParams),
  transform: response => defaultTransform(response),
  onPaginationParamsChange: params => {
    searchParams.page = params.page;
    searchParams.pageSize = params.pageSize;
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      maxWidth: 20,
      render: (_, index) => index + 1
    },
    {
      key: 'templateCode',
      title: $t('page.systemSettings.messageManagement.templateManagement.templateCode'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'templateName',
      title: $t('page.systemSettings.messageManagement.templateManagement.templateName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'templateType',
      title: $t('page.systemSettings.messageManagement.templateManagement.templateType'),
      align: 'center',
      minWidth: 75
    },
    {
      key: 'templateCategory',
      title: $t('page.systemSettings.messageManagement.templateManagement.templateCategory'),
      align: 'center',
      minWidth: 75
    },
    {
      key: 'titleTemplate',
      title: $t('page.systemSettings.messageManagement.templateManagement.titleTemplate'),
      align: 'center',
      minWidth: 150
    },
    {
      key: 'contentTemplate',
      title: $t('page.systemSettings.messageManagement.templateManagement.contentTemplate'),
      align: 'center',
      Width: 150,
      render: row => renderValue(row.contentTemplate)
    },
    {
      key: 'variablesDescription',
      title: $t('page.systemSettings.messageManagement.templateManagement.variablesDescription'),
      align: 'center',
      minWidth: 150,
      render: row => renderValue(row.variablesDescription)
    },
    {
      key: 'templateDescription',
      title: $t('page.systemSettings.messageManagement.templateManagement.templateDescription'),
      align: 'center',
      minWidth: 150,
      render: row => renderValue(row.templateDescription)
    },
    {
      key: 'isActive',
      title: $t('page.systemSettings.messageManagement.templateManagement.isActive'),
      align: 'center',
      width: 80,
      render: row => (row.isActive ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no'))
    },
    {
      key: 'isSystem',
      title: $t('page.systemSettings.messageManagement.templateManagement.isSystem'),
      align: 'center',
      width: 80,
      render: row => (row.isSystem ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no'))
    },
    {
      key: 'priority',
      title: $t('page.systemSettings.messageManagement.templateManagement.priority'),
      align: 'center',
      width: 80
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.templateId)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.templateId)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, 'templateId', getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: string) {
  // request
  console.log(id);

  onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <TemplateSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.systemSettings.messageManagement.templateManagement.title')"
      :bordered="false"
      size="small"
      class="card-wrapper sm:flex-1-hidden"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.templateId"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <TemplateOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
