<script setup lang="tsx">
import { reactive } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { userGenderRecord } from '@/constants/business';
import { fetchGetUserList } from '@/service/api/user-center';
import { useAppStore } from '@/store/modules/app';
import { defaultTransform, useNaivePaginatedTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import UserOperateModal from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const searchParams: Api.SystemUserCenter.UserSearchParams = reactive({
  current: 1,
  size: 10,
  status: null,
  userName: null,
  userGender: null,
  nickName: null,
  userPhone: null,
  userEmail: null
});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useNaivePaginatedTable({
  api: () => fetchGetUserList(searchParams),
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
      width: 54,
      render: (_, index) => index + 1
    },
    {
      key: 'avatar',
      title: $t('page.userCenter.user.avatar'),
      align: 'center',
      minWidth: 60,
      render: (row, index) => {
        row.avatar = `https://picsum.photos/100/100?random=${index}`; // Mock avatar URL
        return (
          <div class="mx-auto size-40px overflow-hidden rd-1/2">
            <img src={row.avatar} alt="avatar" class="size-full object-cover" />
          </div>
        );
      }
    },
    {
      key: 'userName',
      title: $t('page.userCenter.user.userName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'userGender',
      title: $t('page.userCenter.user.gender'),
      align: 'center',
      minWidth: 50,
      render: row => {
        if (row.gender === null) {
          return null;
        }
        const tagMap: Record<Api.SystemUserCenter.Gender, NaiveUI.ThemeColor> = {
          0: 'info',
          1: 'success',
          2: 'error'
        };
        const label = $t(userGenderRecord[row.gender]);
        return <NTag type={tagMap[row.gender]}>{label}</NTag>;
      }
    },
    {
      key: 'nickName',
      title: $t('page.userCenter.user.nickName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'realName',
      title: $t('page.userCenter.user.realName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'mobile',
      title: $t('page.userCenter.user.mobile'),
      align: 'center',
      width: 120
    },
    {
      key: 'email',
      title: $t('page.userCenter.user.email'),
      align: 'center',
      width: 130
    },
    {
      key: 'serviceBalance',
      title: $t('page.userCenter.user.serviceBalance'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'frozenBalance',
      title: $t('page.userCenter.user.frozenBalance'),
      align: 'center',
      minWidth: 100
    },
    // {
    //   key: 'commissionBalance',
    //   title: $t('page.userCenter.user.commissionBalance'),
    //   align: 'center',
    //   minWidth: 120
    // },
    // {
    //   key: 'frozenCommission',
    //   title: $t('page.userCenter.user.frozenCommission'),
    //   align: 'center',
    //   minWidth: 120
    // },
    {
      key: 'PermissionLevel',
      title: $t('page.userCenter.user.permissionLevel'),
      align: 'center',
      minWidth: 60,
      render: () => (
        <NTag type="warning" size="medium">
          未知
        </NTag>
      )
    },
    {
      key: 'status',
      title: $t('page.userCenter.user.status'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }
        return <StatusTag status={Number(row.status)} size="medium" />;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" class="status-normal" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
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
} = useTableOperate(data, 'id', getData);

async function handleBatchDelete() {
  // request
  onBatchDeleted();
}

function handleDelete(_id: number) {
  // request
  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.userCenter.user.title')"
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
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateModal
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
