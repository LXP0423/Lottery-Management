declare namespace Api {
  /**
   * namespace SystemUserCenter
   *
   * backend api module: "systemUserCenter"
   */
  namespace SystemUserCenter {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'page' | 'pageSize'>;

    /**
     * 用户性别
     *
     * - "0": "female"
     * - "1": "male"
     */
    type Gender = '0' | '1' | '2';

    /**
     * 用户状态
     *
     * - "1": "status1"
     * - "2": "frozen"
     * - "3": "disabled"
     * - "4": "locked"
     * - "5": "inactive"
     */
    type Status = '1' | '2' | '3' | '4' | '5';

    /** 用户 */
    type User = Common.CommonRecord<{
      /** 用户名（用于登录的唯一标识） */
      userName: string;
      /** 昵称（用户自定义的显示名称） */
      nickName: string;
      /** 真实姓名 */
      realName: string;
      /** 性别 */
      gender: Gender | null;
      /** 头像URL地址 */
      avatar: string;
      /** 生日  */
      birthday: string;
      /** 电子邮箱 */
      email: string;
      /** 手机号码 */
      mobile: string;
      /** 邮箱是否已验证 */
      emailVerified: string;
      /** 手机是否已验证 */
      mobileVerified: string;
      /** 实名认证状态 */
      realNameVerified: string;
      /** 实名认证时间 */
      realNameVerifiedTime: string;
      /** 账户状态（正常/禁用/锁定等） */
      status: Status | null;
      /** 用户等级 */
      level: string;
      /** 权限级别 */
      permissionLevel: string;
      /** 冻结金额 */
      frozenBalance: string;
      /** 服务余额 */
      serviceBalance: string;
      /** 充值余额 */
      rechargeBalance: string;
      /** 佣金余额 */
      commissionBalance: string;
      /** 冻结佣金 */
      frozenCommission: string;
      /** 已提现佣金 */
      withdrawnCommission: string;
      /** 总佣金 */
      totalCommission: string;
      /** 个人简介 */
      bio: string;
      /** 所在地 */
      location: string;
      /** 个性签名 */
      signature: string;
      /** 登录尝试次数 */
      loginAttempts: string;
      /** 最后登录时间 */
      lastLoginTime: string;
      /** 最后登录IP地址 */
      lastLoginIp: string;
      /** 最后密码修改时间 */
      lastPasswordChange: string;
      /** 账户锁定结束时间 */
      accountLockoutEnd: string;
      /** 是否允许多设备登录 */
      allowMultipleDevices: string;
      /** 账户创建时间 */
      createdTime: string;
      /** 最后更新时间 */
      updatedTime: string;
      /** 最后活跃时间 */
      lastActiveTime: string;
      /** 最后权限更新时间 */
      lastPermissionUpdate: string;
    }>;

    /** 用户搜索参数 */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemUserCenter.User, 'userName' | 'nickName' | 'realName' | 'gender' | 'email' | 'mobile' | 'status'> &
        CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;
  }
}
