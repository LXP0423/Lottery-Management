<!-- src/components/custom/StatusTag.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { NTag } from 'naive-ui';
import { $t } from '@/locales';

defineOptions({
  name: 'StatusTag',
  inheritAttrs: false
});

interface Props {
  /** 状态码 (1-5) */
  status?: number;
  /** 状态类型 */
  type?: 'normal' | 'frozen' | 'disabled' | 'locked' | 'inactive' | 'review' | 'vip';
  /** 标签文本 */
  label?: string;
  /** 自定义背景色 */
  bgcolor?: string;
  /** 自定义文字颜色 */
  textColor?: string;
  /** 自定义边框颜色 */
  borderColor?: string;
  /** 标签大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否圆角 */
  round?: boolean;
  /** 图标名称 */
  icon?: string;
  localIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  status: undefined,
  type: undefined,
  label: undefined,
  bgcolor: undefined,
  textColor: undefined,
  borderColor: undefined,
  size: 'medium',
  bordered: true,
  round: false,
  icon: undefined,
  localIcon: undefined
});

// 配置映射 - 使用你提供的 labelKey 路径
const statusConfigMap = {
  1: {
    bgcolor: '#52c41a1a',
    textColor: '#52c41a',
    borderColor: '#52c41a5A',
    labelKey: 'page.userCenter.common.status.normal'
  },
  2: {
    bgcolor: '#0066cc1a',
    textColor: '#0066cc',
    borderColor: '#0066cc5a',
    labelKey: 'page.userCenter.common.status.frozen'
  },
  3: {
    bgcolor: 'rgba(239, 68, 68, 0.1)',
    textColor: '#ef4444',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    labelKey: 'page.userCenter.common.status.disabled'
  },
  4: {
    bgcolor: '#faad141a',
    textColor: '#faad14',
    borderColor: '#faad145a',
    labelKey: 'page.userCenter.common.status.locked'
  },
  5: {
    bgcolor: '#9999991a',
    textColor: '#999999',
    borderColor: '#9999995a',
    labelKey: 'page.userCenter.common.status.inactive'
  }
  // 6: {
  //   bgcolor: '#f0e6ff',
  //   textColor: '#722ed1',
  //   borderColor: '#d3adf7',
  //   labelKey: 'page.userCenter.common.status.review'
  // },
  // 7: {
  //   bgcolor: '#fffbe6',
  //   textColor: '#d4b106',
  //   borderColor: '#ffe58f',
  //   labelKey: 'page.userCenter.common.status.vip'
  // }
} as const;

// 获取配置
const config = computed(() => {
  const key = props.status || props.type || 1;
  return statusConfigMap[key as keyof typeof statusConfigMap] || statusConfigMap[1];
});

// 最终的颜色值（使用自定义值或配置值）
const finalColor = computed(() => props.bgcolor || config.value.bgcolor);
const finalTextColor = computed(() => props.textColor || config.value.textColor);
const finalBorderColor = computed(() => props.borderColor || config.value.borderColor);

// NTag color 属性（对象格式）
const tagColor = computed(() => ({
  color: finalColor.value,
  borderColor: finalBorderColor.value,
  textColor: finalTextColor.value
}));

// 显示文本
const displayLabel = computed(() => {
  if (props.label) return props.label;
  return $t(config.value.labelKey);
});
</script>

<template>
  <!-- 完全使用 NTag 的默认样式 -->
  <NTag :color="tagColor" :bordered="bordered" :round="round" :size="size" v-bind="$attrs">
    <!-- 可选：图标 -->
    <template v-if="icon || localIcon" #icon>
      <SvgIcon :icon="icon" :local-icon="localIcon" class="mr-1" />
    </template>

    {{ displayLabel }}
  </NTag>
</template>
