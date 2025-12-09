// src/hooks/common/render.ts
import { h } from 'vue';
import type { VNode } from 'vue';
import { NButton, NTooltip } from 'naive-ui';

export interface RenderVariablesOptions {
  tooltipWidth?: string; // tooltip宽度
  buttonText?: string; // 按钮文本
}

/**
 * 渲染变量描述（统一显示查看详情按钮）
 */
export function renderValue(jsonString: string, options: RenderVariablesOptions = {}): VNode {
  const { tooltipWidth = '350px', buttonText = '查看详情' } = options;

  // Tooltip内容（根据是否是JSON格式化）
  let tooltipContent: VNode;

  try {
    const json = JSON.parse(jsonString);
    // JSON格式：格式化显示键值对
    tooltipContent = h(
      'div',
      {
        style: `max-width: ${tooltipWidth}; white-space: pre-wrap; word-break: break-all;`
      },
      Object.entries(json)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    );
  } catch {
    // 非JSON格式：直接显示原文本
    const originalText = jsonString || '';
    tooltipContent = h(
      'div',
      {
        style: `max-width: ${tooltipWidth}; word-break: break-all; white-space: pre-wrap;`
      },
      originalText
    );
  }

  // 按钮（无论是不是JSON都显示"查看详情"）
  const button = h(
    NButton,
    {
      type: 'primary',
      size: 'small',
      ghost: true
      // 注意：这里不添加onClick
    },
    {
      default: () => buttonText
    }
  );

  // 用Tooltip包裹按钮
  return h(
    NTooltip,
    {},
    {
      default: () => tooltipContent,
      trigger: () => button
    }
  );
}
