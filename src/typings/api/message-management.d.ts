declare namespace Api {
  /**
   * namespace SystemUserCenter
   *
   * backend api module: "systemUserCenter"
   */
  namespace MessageManagement {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** 模板 */
    type templateManagement = Common.CommonRecord<{
      /** 模板代码 */
      templateCode: string;
      /** 模板名称 */
      templateName: string;
      /** 模板类型 */
      templateType: string;
      /** 模板分类 */
      templateCategory: string;
      /** 模板标题 */
      titleTemplate: string;
      /** 模板内容 */
      contentTemplate: string;
      /** 模板说明 */
      templateDescription: string;
      /** 变量说明 */
      variablesDescription: string;
      /** 是否启用 */
      isActive: string;
      /** 是否是系统模板 */
      isSystem: string;
      /** 优先级 */
      priority: string;
      /** 触发事件 */
      triggerEvent: string;
      /** 总使用次数 */
      totalUsed: string;
      /** 最后使用时间 */
      lastUsedTime: string;
      /** 创建时间 */
      createTime: string;
      /** 更新时间 */
      updateTime: string;
      /** 创建人 */
      createdBy: string;
      /** 更新人 */
      updatedBy: string;
    }>;

    /** 模板搜索参数 */
    type TemplateSearchParams = CommonType.RecordNullable<
      Pick<
        Api.MessageManagement.templateManagement,
        'templateCode' | 'templateName' | 'templateType' | 'templateCategory' | 'isActive'
      > &
        CommonSearchParams
    >;

    /** 模板集合 */
    type templateList = Common.PaginatingQueryRecord<templateManagement>;
  }
}
