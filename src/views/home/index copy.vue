<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useEcharts } from '@/hooks/common/echarts';
import { $t } from '@/locales';
import SvgIcon from '@/components/custom/svg-icon.vue';
import CountTo from '@/components/custom/count-to.vue';

defineOptions({
  name: 'HomeDashboard'
});

const appStore = useAppStore();
const authStore = useAuthStore();

// 加载状态
const loading = ref(false);

// 当前时间
const currentTime = ref(new Date());
const greeting = computed(() => {
  const hour = currentTime.value.getHours();
  if (hour < 6) return '深夜好';
  if (hour < 9) return '早安';
  if (hour < 12) return '上午好';
  if (hour < 14) return '午安';
  if (hour < 18) return '下午好';
  return '晚上好';
});

// 实时更新时间
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

// 平台统计数据
const platformStats = ref({
  // 今日实时
  today: {
    sales: 1523400,
    winAmount: 892300,
    newUsers: 2345,
    schemes: 876,
    follows: 3421,
    commission: 45230,
    wins: 245,
    activeUsers: 23450,
    onlineStations: 1023,
    avgBetAmount: 1250,
    successRate: '96.5%',
    totalBets: 56890,
    payoutRatio: '78.2%'
  },
  // 累计数据
  total: {
    users: 128450,
    stations: 1256,
    totalSales: 152340000,
    totalWinAmount: 89230000,
    totalCommission: 4523000,
    totalSchemes: 892300,
    totalFollows: 1284500,
    totalPayout: 119200000,
    avgCommission: 3520
  }
});

// 系统运行状态
const systemStatus = ref([
  { label: '运行时间', value: '99.8%', status: 'success' },
  { label: '响应时间', value: '128ms', status: 'normal' },
  { label: '服务器负载', value: '32%', status: 'normal' },
  { label: '在线用户', value: '8,456', status: 'normal' },
  { label: '数据库', value: '正常', status: 'success' },
  { label: '缓存', value: '正常', status: 'success' },
  { label: 'API服务', value: '正常', status: 'success' },
  { label: '今日QPS', value: '1,245', status: 'normal' }
]);

// 彩种排行相关状态
const lotteryRankingType = ref('sales'); // sales: 销售额, winAmount: 中奖金额
const lotteryTimeRange = ref('day'); // day: 日, week: 周, month: 月, year: 年

// 店铺排行相关状态
const stationRankingType = ref('sales');
const stationTimeRange = ref('day');

// 彩种排行数据
const lotteryRankings = ref({
  day: {
    sales: [
      { id: 1, name: '双色球', value: 1250000, change: '+12.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 980000, change: '+8.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 750000, change: '-3.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 680000, change: '+5.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 520000, change: '+15.3%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '双色球', value: 520000, change: '+18.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 380000, change: '+9.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 280000, change: '-1.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 250000, change: '+7.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 180000, change: '+12.3%', color: '#8b5cf6' }
    ]
  },
  week: {
    sales: [
      { id: 1, name: '双色球', value: 8500000, change: '+15.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 6800000, change: '+11.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 5200000, change: '+2.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 4800000, change: '+8.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 3600000, change: '+18.3%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '双色球', value: 3650000, change: '+22.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 2660000, change: '+14.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 1960000, change: '+3.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 1750000, change: '+12.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 1260000, change: '+18.3%', color: '#8b5cf6' }
    ]
  },
  month: {
    sales: [
      { id: 1, name: '双色球', value: 38500000, change: '+18.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 29800000, change: '+13.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 22500000, change: '+5.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 19800000, change: '+9.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 15600000, change: '+21.3%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '双色球', value: 15820000, change: '+25.5%', color: '#6366f1' },
      { id: 2, name: '大乐透', value: 11960000, change: '+16.2%', color: '#10b981' },
      { id: 3, name: '福彩3D', value: 8820000, change: '+7.2%', color: '#f59e0b' },
      { id: 4, name: '排列三', value: 7875000, change: '+15.7%', color: '#ef4444' },
      { id: 5, name: '七星彩', value: 5670000, change: '+22.3%', color: '#8b5cf6' }
    ]
  }
});

// 店铺排行数据
const stationRankings = ref({
  day: {
    sales: [
      { id: 1, name: '旗舰店001', value: 285000, change: '+18.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 238000, change: '+12.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 195000, change: '+5.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 168000, change: '-2.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 145000, change: '+8.7%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '旗舰店001', value: 118000, change: '+22.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 95200, change: '+15.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 70200, change: '+8.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 58800, change: '-1.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 50750, change: '+12.7%', color: '#8b5cf6' }
    ]
  },
  week: {
    sales: [
      { id: 1, name: '旗舰店001', value: 1995000, change: '+20.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 1666000, change: '+15.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 1365000, change: '+8.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 1176000, change: '+1.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 1015000, change: '+11.7%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '旗舰店001', value: 826000, change: '+25.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 666400, change: '+18.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 491400, change: '+11.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 411600, change: '+3.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 355250, change: '+15.7%', color: '#8b5cf6' }
    ]
  },
  month: {
    sales: [
      { id: 1, name: '旗舰店001', value: 8550000, change: '+22.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 7140000, change: '+17.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 5850000, change: '+10.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 5040000, change: '+4.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 4350000, change: '+13.7%', color: '#8b5cf6' }
    ],
    winAmount: [
      { id: 1, name: '旗舰店001', value: 3540000, change: '+28.5%', color: '#6366f1' },
      { id: 2, name: '体验中心002', value: 2856000, change: '+20.2%', color: '#10b981' },
      { id: 3, name: '专卖店003', value: 2106000, change: '+13.8%', color: '#f59e0b' },
      { id: 4, name: '社区店004', value: 1764000, change: '+7.3%', color: '#ef4444' },
      { id: 5, name: '合作站005', value: 1522500, change: '+18.7%', color: '#8b5cf6' }
    ]
  }
});

// 近期交易动态
const recentTransactions = ref([
  { id: 1, type: 'scheme', user: '彩票大神', amount: 5000, time: '刚刚', status: 'success', detail: '双色球追号方案' },
  { id: 2, type: 'follow', user: '幸运星', amount: 2000, time: '1分钟前', status: 'success', detail: '跟单大乐透' },
  { id: 3, type: 'win', user: '中奖专业户', amount: 52000, time: '3分钟前', status: 'success', detail: '双色球一等奖' },
  { id: 4, type: 'recharge', user: '超级VIP', amount: 100000, time: '5分钟前', status: 'success', detail: '大额充值' },
  {
    id: 5,
    type: 'withdraw',
    user: '金牌代理',
    amount: 30000,
    time: '10分钟前',
    status: 'processing',
    detail: '佣金提现'
  },
  {
    id: 6,
    type: 'scheme',
    user: '分析专家',
    amount: 3800,
    time: '15分钟前',
    status: 'success',
    detail: '排列三精准分析'
  }
]);

// 快捷操作
const quickActions = [
  { title: '用户管理', icon: 'ant-design:user-outlined', path: '/user/manage', color: '#3b82f6', desc: '管理用户账户' },
  {
    title: '方案审核',
    icon: 'ant-design:file-text-outlined',
    path: '/scheme/audit',
    color: '#10b981',
    desc: '审核投注方案'
  },
  {
    title: '站点管理',
    icon: 'ant-design:shop-outlined',
    path: '/station/manage',
    color: '#f59e0b',
    desc: '管理合作站点'
  },
  {
    title: '财务对账',
    icon: 'ant-design:money-collect-outlined',
    path: '/finance/reconciliation',
    color: '#8b5cf6',
    desc: '资金流水对账'
  },
  {
    title: '系统设置',
    icon: 'ant-design:setting-outlined',
    path: '/system/setting',
    color: '#ef4444',
    desc: '系统参数配置'
  },
  {
    title: '数据报表',
    icon: 'ant-design:bar-chart-outlined',
    path: '/report/analysis',
    color: '#06b6d4',
    desc: '查看分析报表'
  }
];

// 销售额趋势图表
const { domRef: salesChartRef } = useEcharts(() => ({
  backgroundColor: 'transparent',
  title: {
    text: '销售额趋势',
    left: 'left',
    textStyle: {
      color: '#334155',
      fontSize: 14,
      fontWeight: 600
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#475569',
      fontSize: 12
    },
    formatter: (params: any[]) => {
      let html = `<div style="font-weight:600;margin-bottom:8px;color:#1e293b;">${params[0].axisValue}</div>`;
      params.forEach(item => {
        const value = item.value.toLocaleString();
        html += `
          <div style="display:flex;align-items:center;margin:6px 0;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${item.color};margin-right:8px;"></span>
            <span style="flex:1;font-size:12px;color:#64748b;">${item.seriesName}</span>
            <span style="font-weight:600;color:#1e293b;">¥${value}</span>
          </div>
        `;
      });
      return html;
    }
  },
  legend: {
    top: 10,
    right: 10,
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      fontSize: 11,
      color: '#64748b'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '3%',
    top: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      fontSize: 11,
      color: '#64748b'
    }
  },
  yAxis: {
    type: 'value',
    name: '万元',
    nameTextStyle: {
      fontSize: 11,
      color: '#94a3b8'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#64748b'
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '销售额',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#3b82f6'
      },
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: '#3b82f6',
        borderColor: '#fff',
        borderWidth: 1
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59, 130, 246, 0.15)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.02)' }
          ]
        }
      },
      data: [45.2, 52.1, 48.7, 55.3, 62.8, 58.4, 65.2]
    }
  ]
}));

// 中奖金额趋势图表
const { domRef: winChartRef } = useEcharts(() => ({
  backgroundColor: 'transparent',
  title: {
    text: '中奖金额趋势',
    left: 'left',
    textStyle: {
      color: '#334155',
      fontSize: 14,
      fontWeight: 600
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#475569',
      fontSize: 12
    },
    formatter: (params: any[]) => {
      let html = `<div style="font-weight:600;margin-bottom:8px;color:#1e293b;">${params[0].axisValue}</div>`;
      params.forEach(item => {
        const value = item.value.toLocaleString();
        html += `
          <div style="display:flex;align-items:center;margin:6px 0;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${item.color};margin-right:8px;"></span>
            <span style="flex:1;font-size:12px;color:#64748b;">${item.seriesName}</span>
            <span style="font-weight:600;color:#1e293b;">¥${value}</span>
          </div>
        `;
      });
      return html;
    }
  },
  legend: {
    top: 10,
    right: 10,
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      fontSize: 11,
      color: '#64748b'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '3%',
    top: '18%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      fontSize: 11,
      color: '#64748b'
    }
  },
  yAxis: {
    type: 'value',
    name: '万元',
    nameTextStyle: {
      fontSize: 11,
      color: '#94a3b8'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#64748b'
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9',
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '中奖金额',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#10b981'
      },
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: '#10b981',
        borderColor: '#fff',
        borderWidth: 1
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(16, 185, 129, 0.15)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.02)' }
          ]
        }
      },
      data: [21.8, 25.1, 23.4, 28.6, 26.9, 30.2, 29.5]
    }
  ]
}));

// 加载数据
async function loadData() {
  loading.value = true;
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 800));
  } catch (error) {
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

// 格式化金额
function formatAmount(amount: number) {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(2)}亿`;
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}万`;
  }
  return amount.toLocaleString();
}

// 获取趋势图标
function getTrendIcon(change: string) {
  return change.startsWith('+') ? 'ant-design:rise-outlined' : 'ant-design:fall-outlined';
}

// 获取趋势颜色
function getTrendColor(change: string) {
  return change.startsWith('+') ? '#10b981' : '#ef4444';
}

// 获取交易类型颜色
function getTransactionColor(type: string) {
  switch (type) {
    case 'scheme':
      return '#3b82f6';
    case 'follow':
      return '#10b981';
    case 'win':
      return '#f59e0b';
    case 'recharge':
      return '#8b5cf6';
    case 'withdraw':
      return '#ef4444';
    default:
      return '#94a3b8';
  }
}

// 获取时间范围标签
function getTimeRangeLabel(range: string) {
  switch (range) {
    case 'day':
      return '今日';
    case 'week':
      return '本周';
    case 'month':
      return '本月';
    default:
      return '今日';
  }
}

// 获取排行类型标签
function getRankingTypeLabel(type: string) {
  return type === 'sales' ? '销售额' : '中奖金额';
}

const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <div class="dashboard-container">
    <!-- 顶部欢迎区域 -->
    <div class="welcome-section">
      <NCard :bordered="false" class="card-wrapper">
        <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
          <NGi span="24 s:24 m:18">
            <div class="flex-y-center">
              <div class="size-72px shrink-0 overflow-hidden rd-1/2">
                <img src="@/assets/imgs/soybean.jpg" class="size-full" />
              </div>
              <div class="pl-12px">
                <h3 class="text-18px font-semibold">{{ greeting }}，{{ authStore.userInfo?.userName || '管理员' }}</h3>
                <p class="text-#999 leading-30px">
                  {{
                    currentTime.toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })
                  }}
                  <span class="ml-12px text-primary font-medium">
                    {{ currentTime.toLocaleTimeString('zh-CN', { hour12: false }) }}
                  </span>
                </p>
              </div>
            </div>
          </NGi>
          <NGi span="24 s:24 m:6">
            <NSpace :size="24" justify="end" :wrap="false">
              <div v-for="(item, index) in systemStatus.slice(0, 4)" :key="index" class="whitespace-nowrap">
                <div class="mb-2px text-12px text-#64748b">{{ item.label }}</div>
                <div
                  class="text-14px font-semibold"
                  :class="[item.status === 'success' ? 'text-green-500' : 'text-#334155']"
                >
                  {{ item.value }}
                </div>
              </div>
            </NSpace>
          </NGi>
        </NGrid>
      </NCard>
    </div>

    <!-- 核心数据指标 -->
    <div class="metrics-section">
      <NCard :bordered="false" class="card-wrapper">
        <NGrid cols="s:1 m:2 l:3" responsive="screen" :x-gap="16" :y-gap="16">
          <NGi>
            <div class="metric-card" style="border-left-color: #3b82f6">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #dbeafe; color: #3b82f6">
                  <SvgIcon icon="ant-design:dollar-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:rise-outlined" class="text-10px text-green-500" />
                  <span class="text-green-500">+12.5%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">今日销售额</div>
              <div class="mb-2 text-24px text-#1e293b font-700">¥{{ formatAmount(platformStats.today.sales) }}</div>
              <div class="text-12px text-#94a3b8">累计：¥{{ formatAmount(platformStats.total.totalSales) }}</div>
            </div>
          </NGi>
          <NGi>
            <div class="metric-card" style="border-left-color: #10b981">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #d1fae5; color: #10b981">
                  <SvgIcon icon="ant-design:trophy-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:rise-outlined" class="text-10px text-green-500" />
                  <span class="text-green-500">+18.5%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">今日中奖金额</div>
              <div class="mb-2 text-24px text-#1e293b font-700">¥{{ formatAmount(platformStats.today.winAmount) }}</div>
              <div class="text-12px text-#94a3b8">累计：¥{{ formatAmount(platformStats.total.totalWinAmount) }}</div>
            </div>
          </NGi>
          <NGi>
            <div class="metric-card" style="border-left-color: #f59e0b">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #fef3c7; color: #f59e0b">
                  <SvgIcon icon="ant-design:user-add-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:rise-outlined" class="text-10px text-green-500" />
                  <span class="text-green-500">+8.2%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">新增用户</div>
              <div class="mb-2 text-24px text-#1e293b font-700">
                {{ platformStats.today.newUsers.toLocaleString() }}
                <span class="ml-1 text-14px text-#94a3b8">人</span>
              </div>
              <div class="text-12px text-#94a3b8">总用户：{{ formatAmount(platformStats.total.users) }}</div>
            </div>
          </NGi>
          <NGi>
            <div class="metric-card" style="border-left-color: #8b5cf6">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #ede9fe; color: #8b5cf6">
                  <SvgIcon icon="ant-design:file-text-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:rise-outlined" class="text-10px text-green-500" />
                  <span class="text-green-500">+15.3%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">今日方案</div>
              <div class="mb-2 text-24px text-#1e293b font-700">
                {{ platformStats.today.schemes.toLocaleString() }}
                <span class="ml-1 text-14px text-#94a3b8">单</span>
              </div>
              <div class="text-12px text-#94a3b8">成功率：{{ platformStats.today.successRate }}</div>
            </div>
          </NGi>
          <NGi>
            <div class="metric-card" style="border-left-color: #06b6d4">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #cffafe; color: #06b6d4">
                  <SvgIcon icon="ant-design:team-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:rise-outlined" class="text-10px text-green-500" />
                  <span class="text-green-500">+5.7%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">活跃用户</div>
              <div class="mb-2 text-24px text-#1e293b font-700">
                {{ formatAmount(platformStats.today.activeUsers) }}
                <span class="ml-1 text-14px text-#94a3b8">人</span>
              </div>
              <div class="text-12px text-#94a3b8">
                在线站点：{{ platformStats.today.onlineStations.toLocaleString() }}家
              </div>
            </div>
          </NGi>
          <NGi>
            <div class="metric-card" style="border-left-color: #ef4444">
              <div class="mb-4 flex items-start justify-between">
                <div class="h-12 w-12 flex-center rd-10" style="background: #fee2e2; color: #ef4444">
                  <SvgIcon icon="ant-design:percentage-outlined" class="text-20px" />
                </div>
                <div class="flex items-center gap-1 rd-12px bg-#f1f5f9 px-2 py-1 text-12px font-500">
                  <SvgIcon icon="ant-design:fall-outlined" class="text-10px text-red-500" />
                  <span class="text-red-500">-3.2%</span>
                </div>
              </div>
              <div class="mb-2 text-13px text-#64748b">今日佣金</div>
              <div class="mb-2 text-24px text-#1e293b font-700">
                ¥{{ formatAmount(platformStats.today.commission) }}
              </div>
              <div class="text-12px text-#94a3b8">累计：¥{{ formatAmount(platformStats.total.totalCommission) }}</div>
            </div>
          </NGi>
        </NGrid>
      </NCard>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
        <NGi span="24 s:24 m:14">
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-14px text-#1e293b font-600">销售额趋势</h3>
              <div class="w-100px">
                <NSelect
                  size="tiny"
                  :options="[
                    { label: '本周', value: 'week' },
                    { label: '本月', value: 'month' },
                    { label: '本年', value: 'year' }
                  ]"
                  default-value="week"
                />
              </div>
            </div>
            <div ref="salesChartRef" class="h-240px"></div>
          </NCard>
        </NGi>
        <NGi span="24 s:24 m:10">
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-14px text-#1e293b font-600">中奖金额趋势</h3>
              <div class="w-100px">
                <NSelect
                  size="tiny"
                  :options="[
                    { label: '本周', value: 'week' },
                    { label: '本月', value: 'month' },
                    { label: '本年', value: 'year' }
                  ]"
                  default-value="week"
                />
              </div>
            </div>
            <div ref="winChartRef" class="h-240px"></div>
          </NCard>
        </NGi>
      </NGrid>
    </div>

    <!-- 排行区域 -->
    <div class="ranking-section">
      <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
        <NGi span="24 s:24 m:14">
          <!-- 彩种排行 -->
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-14px text-#1e293b font-600">彩种排行</h3>
              <div class="flex flex-col items-end gap-2">
                <NTabs v-model:value="lotteryRankingType" type="segment" size="small">
                  <NTab name="sales">销售额</NTab>
                  <NTab name="winAmount">中奖金额</NTab>
                </NTabs>
                <NTabs v-model:value="lotteryTimeRange" type="segment" size="small">
                  <NTab name="day">今日</NTab>
                  <NTab name="week">本周</NTab>
                  <NTab name="month">本月</NTab>
                </NTabs>
              </div>
            </div>
            <div class="ranking-list">
              <div
                v-for="(item, index) in lotteryRankings[lotteryTimeRange][lotteryRankingType]"
                :key="item.id"
                class="ranking-item"
              >
                <div class="rank-number" :class="[`rank-${index + 1}`]">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <div class="mb-1 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="h-10px w-10px rd-1/2" :style="{ backgroundColor: item.color }"></div>
                      <span class="text-14px text-#1e293b font-600">{{ item.name }}</span>
                    </div>
                    <div class="flex items-center gap-1" :style="{ color: getTrendColor(item.change) }">
                      <SvgIcon :icon="getTrendIcon(item.change)" class="text-12px" />
                      <span class="text-12px font-500">{{ item.change }}</span>
                    </div>
                  </div>
                  <div class="text-18px text-#334155 font-700">¥{{ formatAmount(item.value) }}</div>
                </div>
              </div>
            </div>
          </NCard>
        </NGi>
        <NGi span="24 s:24 m:10">
          <!-- 店铺排行 -->
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-14px text-#1e293b font-600">店铺排行</h3>
              <div class="flex flex-col items-end gap-2">
                <NTabs v-model:value="stationRankingType" type="segment" size="small">
                  <NTab name="sales">销售额</NTab>
                  <NTab name="winAmount">中奖金额</NTab>
                </NTabs>
                <NTabs v-model:value="stationTimeRange" type="segment" size="small">
                  <NTab name="day">今日</NTab>
                  <NTab name="week">本周</NTab>
                  <NTab name="month">本月</NTab>
                </NTabs>
              </div>
            </div>
            <div class="ranking-list">
              <div
                v-for="(item, index) in stationRankings[stationTimeRange][stationRankingType]"
                :key="item.id"
                class="ranking-item"
              >
                <div class="rank-number" :class="[`rank-${index + 1}`]">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <div class="mb-1 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="h-10px w-10px rd-1/2" :style="{ backgroundColor: item.color }"></div>
                      <span class="text-14px text-#1e293b font-600">{{ item.name }}</span>
                    </div>
                    <div class="flex items-center gap-1" :style="{ color: getTrendColor(item.change) }">
                      <SvgIcon :icon="getTrendIcon(item.change)" class="text-12px" />
                      <span class="text-12px font-500">{{ item.change }}</span>
                    </div>
                  </div>
                  <div class="text-18px text-#334155 font-700">¥{{ formatAmount(item.value) }}</div>
                </div>
              </div>
            </div>
          </NCard>
        </NGi>
      </NGrid>
    </div>

    <!-- 业务数据区域 -->
    <div class="business-section">
      <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
        <NGi span="24 s:24 m:14">
          <!-- 近期交易动态 -->
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-14px text-#1e293b font-600">近期交易动态</h3>
              <div class="w-100px">
                <NSelect
                  size="tiny"
                  :options="[
                    { label: '今日', value: 'today' },
                    { label: '本周', value: 'week' },
                    { label: '本月', value: 'month' }
                  ]"
                  default-value="today"
                />
              </div>
            </div>
            <div class="transaction-list">
              <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
                <div
                  class="transaction-icon"
                  :style="{
                    backgroundColor: getTransactionColor(transaction.type) + '20',
                    color: getTransactionColor(transaction.type)
                  }"
                >
                  <SvgIcon
                    :icon="
                      transaction.type === 'scheme'
                        ? 'ant-design:edit-outlined'
                        : transaction.type === 'follow'
                          ? 'ant-design:share-alt-outlined'
                          : transaction.type === 'win'
                            ? 'ant-design:trophy-outlined'
                            : transaction.type === 'recharge'
                              ? 'ant-design:money-collect-outlined'
                              : 'ant-design:wallet-outlined'
                    "
                    class="text-20px"
                  />
                </div>
                <div class="flex-1">
                  <div class="mb-1 flex items-center justify-between">
                    <span class="text-14px text-#1e293b font-600">{{ transaction.user }}</span>
                    <span class="text-14px font-600" :style="{ color: getTransactionColor(transaction.type) }">
                      ¥{{ formatAmount(transaction.amount) }}
                    </span>
                  </div>
                  <div class="mb-1 truncate text-13px text-#64748b">{{ transaction.detail }}</div>
                  <div class="flex items-center justify-between">
                    <span class="text-11px text-#94a3b8">{{ transaction.time }}</span>
                    <span class="rd-10px px-2 py-0.5 text-11px font-500" :class="[`status-${transaction.status}`]">
                      {{ transaction.status === 'success' ? '成功' : '处理中' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </NCard>
        </NGi>
        <NGi span="24 s:24 m:10">
          <!-- 快捷操作入口 -->
          <NCard :bordered="false" class="card-wrapper">
            <div class="mb-4">
              <h3 class="text-14px text-#1e293b font-600">快捷操作</h3>
            </div>
            <div class="quick-actions">
              <div v-for="action in quickActions" :key="action.title" class="action-item">
                <div class="action-icon" :style="{ backgroundColor: action.color + '20', color: action.color }">
                  <SvgIcon :icon="action.icon" class="text-20px" />
                </div>
                <div class="flex-1">
                  <div class="mb-1 text-14px text-#1e293b font-600">{{ action.title }}</div>
                  <div class="text-12px text-#64748b">{{ action.desc }}</div>
                </div>
                <div>
                  <SvgIcon icon="ant-design:right-outlined" class="text-16px text-#94a3b8" />
                </div>
              </div>
            </div>
          </NCard>
        </NGi>
      </NGrid>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: calc(100vh - var(--header-height));
}

.welcome-section,
.metrics-section,
.charts-section,
.ranking-section,
.business-section {
  margin-bottom: 16px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border-left-width: 4px;
  border-left-style: solid;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  }
}

.ranking-list {
  .ranking-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    background: #f8fafc;
    transition: all 0.2s;
    border: 1px solid #f1f5f9;

    &:hover {
      background: #f1f5f9;
      border-color: #e2e8f0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .rank-number {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      margin-right: 12px;
      color: white;

      &.rank-1 {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      }

      &.rank-2 {
        background: linear-gradient(135deg, #a3a3a3 0%, #737373 100%);
      }

      &.rank-3 {
        background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
      }

      &.rank-4,
      &.rank-5 {
        background: #e5e7eb;
        color: #6b7280;
      }
    }
  }
}

.transaction-list {
  .transaction-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    background: #f8fafc;
    transition: all 0.2s;
    border: 1px solid #f1f5f9;

    &:hover {
      background: #f1f5f9;
      border-color: #e2e8f0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .transaction-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
  }

  .status-success {
    background: #d1fae5;
    color: #047857;
  }

  .status-processing {
    background: #fef3c7;
    color: #92400e;
  }
}

.quick-actions {
  .action-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    background: #f8fafc;
    transition: all 0.2s;
    border: 1px solid #f1f5f9;
    cursor: pointer;

    &:hover {
      background: #f1f5f9;
      border-color: #e2e8f0;
      transform: translateX(4px);
    }

    &:last-child {
      margin-bottom: 0;
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
  }
}

:deep(.n-card) {
  &.card-wrapper {
    border: 1px solid #f1f5f9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    }
  }
}

:deep(.n-tabs) {
  &.n-tabs--segment-type {
    .n-tabs-nav {
      background: #f8fafc;
      border-radius: 6px;
      padding: 2px;
    }

    .n-tabs-tab {
      padding: 4px 12px;
      font-size: 12px;
    }

    .n-tabs-tab--active {
      background: white;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
