<script setup lang="ts">
import { computed } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { useThemeStore } from '@/store/modules/theme';
import { $t } from '@/locales';

defineOptions({
  name: 'CardToDayData'
});

interface CardToDayData {
  key: string;
  title: string;
  value: number;
  unit: string;
  color: {
    start: string;
    end: string;
  };
  icon: string;
}

// Mock data: 今日新增店铺、今日新增用户、今日充值次数、今日充值金额、今日投注方案数、今日投注金额、今日中奖方案数、今日中奖金额
const cardData = computed<CardToDayData[]>(() => [
  {
    key: 'newStoresToday',
    title: $t('page.home.newStoresToday'),
    value: 1,
    unit: '',
    color: {
      start: '#9d50bb',
      end: '#6e48aa'
    },
    icon: 'clarity:store-solid'
  },
  {
    key: 'newUsersToday',
    title: $t('page.home.newUsersToday'),
    value: 3,
    unit: '',
    color: {
      start: '#56cdf3',
      end: '#719de3'
    },
    icon: 'mdi:account-group-outline'
  },
  {
    key: 'rechargeCountToday',
    title: $t('page.home.rechargeCountToday'),
    value: 2,
    unit: '',
    color: {
      start: '#fcbc25',
      end: '#f68057'
    },
    icon: 'hugeicons:money-bag-02'
  },
  {
    key: 'rechargeAmountToday',
    title: $t('page.home.rechargeAmountToday'),
    value: 60,
    unit: '',
    color: {
      start: '#fcbc25',
      end: '#f68057'
    },
    icon: 'hugeicons:money-bag-02'
  },
  {
    key: 'betCountToday',
    title: $t('page.home.betCountToday'),
    value: 1556,
    unit: '',
    color: {
      start: '#ff8177',
      end: '#ff867a'
    },
    icon: 'fluent:money-16-regular'
  },
  {
    key: 'betAmountToday',
    title: $t('page.home.betAmountToday'),
    value: 26580,
    unit: '',
    color: {
      start: '#ff8177',
      end: '#ff867a'
    },
    icon: 'fluent:money-16-regular'
  },
  {
    key: 'winningCountToday',
    title: $t('page.home.winningCountToday'),
    value: 68,
    unit: '',
    color: {
      start: '#e91e63',
      end: '#c2185b'
    },
    icon: 'material-symbols:rewarded-ads-outline'
  },
  {
    key: 'winningAmountToday',
    title: $t('page.home.winningAmountToday'),
    value: 3568,
    unit: '',
    color: {
      start: '#e91e63',
      end: '#c2185b'
    },
    icon: 'material-symbols:rewarded-ads-outline'
  }
]);

interface GradientBgProps {
  gradientColor: string;
}

const [DefineGradientBg, GradientBg] = createReusableTemplate<GradientBgProps>();

const themeStore = useThemeStore();

function getGradientColor(color: CardToDayData['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <!-- define component start: GradientBg -->
    <DefineGradientBg v-slot="{ $slots, gradientColor }">
      <div
        class="px-16px pb-4px pt-8px text-white"
        :style="{ backgroundImage: gradientColor, borderRadius: themeStore.themeRadius + 'px' }"
      >
        <component :is="$slots.default" />
      </div>
    </DefineGradientBg>
    <!-- define component end: GradientBg -->

    <NGrid cols="xs:2 s:2 m:4 l:8" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-14px">{{ item.title }}</h3>
          <div class="flex justify-between pt-10px">
            <SvgIcon :icon="item.icon" class="text-24px" />
            <CountTo
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-20px text-white dark:text-dark"
            />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
