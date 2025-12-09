const local: App.I18n.Schema = {
  system: {
    title: 'SSA Admin System',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    }
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeDrawerTitle: 'Theme Configuration',
    tabs: {
      appearance: 'Appearance',
      layout: 'Layout',
      general: 'General',
      preset: 'Preset'
    },
    appearance: {
      themeSchema: {
        title: 'Theme Schema',
        light: 'Light',
        dark: 'Dark',
        auto: 'Follow System'
      },
      grayscale: 'Grayscale',
      colourWeakness: 'Colour Weakness',
      themeColor: {
        title: 'Theme Color',
        primary: 'Primary',
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        followPrimary: 'Follow Primary'
      },
      themeRadius: {
        title: 'Theme Radius'
      },
      recommendColor: 'Apply Recommended Color Algorithm',
      recommendColorDesc: 'The recommended color algorithm refers to',
      preset: {
        title: 'Theme Presets',
        apply: 'Apply',
        applySuccess: 'Preset applied successfully',
        default: {
          name: 'Default Preset',
          desc: 'Default theme preset with balanced settings'
        },
        dark: {
          name: 'Dark Preset',
          desc: 'Dark theme preset for night time usage'
        },
        compact: {
          name: 'Compact Preset',
          desc: 'Compact layout preset for small screens'
        },
        azir: {
          name: "Azir's Preset",
          desc: 'It is a cold and elegant preset that Azir likes'
        }
      }
    },
    layout: {
      layoutMode: {
        title: 'Layout Mode',
        vertical: 'Vertical Mode',
        horizontal: 'Horizontal Mode',
        'vertical-mix': 'Vertical Mix Mode',
        'vertical-hybrid-header-first': 'Left Hybrid Header-First',
        'top-hybrid-sidebar-first': 'Top-Hybrid Sidebar-First',
        'top-hybrid-header-first': 'Top-Hybrid Header-First',
        vertical_detail: 'Vertical menu layout, with the menu on the left and content on the right.',
        'vertical-mix_detail':
          'Vertical mix-menu layout, with the primary menu on the dark left side and the secondary menu on the lighter left side.',
        'vertical-hybrid-header-first_detail':
          'Left hybrid layout, with the primary menu at the top, the secondary menu on the dark left side, and the tertiary menu on the lighter left side.',
        horizontal_detail: 'Horizontal menu layout, with the menu at the top and content below.',
        'top-hybrid-sidebar-first_detail':
          'Top hybrid layout, with the primary menu on the left and the secondary menu at the top.',
        'top-hybrid-header-first_detail':
          'Top hybrid layout, with the primary menu at the top and the secondary menu on the left.'
      },
      tab: {
        title: 'Tab Settings',
        visible: 'Tab Visible',
        cache: 'Tag Bar Info Cache',
        cacheTip: 'One-click to open/close global keepalive',
        height: 'Tab Height',
        mode: {
          title: 'Tab Mode',
          slider: 'Slider',
          chrome: 'Chrome',
          button: 'Button'
        },
        closeByMiddleClick: 'Close Tab by Middle Click',
        closeByMiddleClickTip: 'Enable closing tabs by clicking with the middle mouse button'
      },
      header: {
        title: 'Header Settings',
        height: 'Header Height',
        breadcrumb: {
          visible: 'Breadcrumb Visible',
          showIcon: 'Breadcrumb Icon Visible'
        }
      },
      sider: {
        title: 'Sider Settings',
        inverted: 'Dark Sider',
        width: 'Sider Width',
        collapsedWidth: 'Sider Collapsed Width',
        mixWidth: 'Mix Sider Width',
        mixCollapsedWidth: 'Mix Sider Collapse Width',
        mixChildMenuWidth: 'Mix Child Menu Width'
      },
      footer: {
        title: 'Footer Settings',
        visible: 'Footer Visible',
        fixed: 'Fixed Footer',
        height: 'Footer Height',
        right: 'Right Footer'
      },
      content: {
        title: 'Content Area Settings',
        scrollMode: {
          title: 'Scroll Mode',
          tip: 'The theme scroll only scrolls the main part, the outer scroll can carry the header and footer together',
          wrapper: 'Wrapper',
          content: 'Content'
        },
        page: {
          animate: 'Page Animate',
          mode: {
            title: 'Page Animate Mode',
            fade: 'Fade',
            'fade-slide': 'Slide',
            'fade-bottom': 'Fade Zoom',
            'fade-scale': 'Fade Scale',
            'zoom-fade': 'Zoom Fade',
            'zoom-out': 'Zoom Out',
            none: 'None'
          }
        },
        fixedHeaderAndTab: 'Fixed Header And Tab'
      }
    },
    general: {
      title: 'General Settings',
      watermark: {
        title: 'Watermark Settings',
        visible: 'Watermark Full Screen Visible',
        text: 'Custom Watermark Text',
        enableUserName: 'Enable User Name Watermark',
        enableTime: 'Show Current Time',
        timeFormat: 'Time Format'
      },
      multilingual: {
        title: 'Multilingual Settings',
        visible: 'Display multilingual button'
      },
      globalSearch: {
        title: 'Global Search Settings',
        visible: 'Display GlobalSearch button'
      }
    },
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    'user-center': 'User Center',
    'user-center_user-list': 'User List',
    'user-center_buy-detail': 'Buy Detail',
    'system-settings': 'System Settings',
    'system-settings_message-management': 'Message Management',
    'system-settings_message-management_template-management': 'Template Management',
    'system-settings_message-management_notification-configuration': 'Notification Configuration'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        sendCodeFailed: 'Failed to send verification code, please try again',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        phoneRegister: 'Phone Registration',
        usernameRegister: 'Username Registration',
        registering: 'Registering...',
        registerSuccess: 'Register Success',
        RegistraFailed: 'Registration failed, please try again',
        haveAccount: 'Already have an account? Go to login',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    home: {
      branchDesc:
        'For the convenience of everyone in developing and updating the merge, we have streamlined the code of the main branch, only retaining the homepage menu, and the rest of the content has been moved to the example branch for maintenance. The preview address displays the content of the example branch.',
      greeting: 'Good morning, {userName}, today is another day full of vitality!',
      weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
      projectCount: 'Project Count',
      storeApplication: 'Store Application',
      recharge: 'Recharge',
      commission: 'Commission',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      storeCount: 'Store Count',
      userCount: 'User Count',
      onlineUsers: 'Online Users',
      rechargeAmount: 'Recharge Amount',
      betAmount: 'Bet Amount',
      winningAmount: 'Winning Amount',
      newStoresToday: 'New Stores Today',
      newUsersToday: 'New Users Today',
      rechargeCountToday: 'Recharge Count Today',
      rechargeAmountToday: 'Recharge Amount Today',
      betCountToday: 'Bet Count Today',
      betAmountToday: 'Bet Amount Today',
      winningCountToday: 'Winning Count Today',
      winningAmountToday: 'Winning Amount Today',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    userCenter: {
      common: {
        status: {
          normal: 'Normal',
          frozen: 'Frozen',
          disabled: 'Disabled',
          locked: 'Locked',
          inactive: 'Inactive'
        }
      },
      user: {
        title: 'User List',
        userName: 'User Name',
        nickName: 'Nick Name',
        realName: 'Real Name',
        gender: 'Gender',
        avatar: 'Avatar',
        birthday: 'Birthday',
        email: 'Email',
        mobile: 'Mobile',
        emailVerified: 'Email Verified',
        mobileVerified: 'Mobile Verified',
        realNameVerified: 'Real Name Verified',
        realNameVerifiedTime: 'Real Name Verified Time',
        status: 'Status',
        level: 'Level',
        permissionLevel: 'Permission Level',
        frozenBalance: 'Frozen Virtual Currency',
        serviceBalance: 'Service Balance',
        rechargeBalance: 'Recharge Balance',
        commissionBalance: 'Commission Balance',
        frozenCommission: 'Frozen Commission',
        withdrawnCommission: 'Withdrawn Commission',
        totalCommission: 'Total Commission',
        bio: 'Bio',
        location: 'Location',
        signature: 'Signature',
        loginAttempts: 'Login Attempts',
        lastLoginTime: 'Last Login Time',
        lastLoginIp: 'Last Login IP',
        lastPasswordChange: 'Last Password Change',
        accountLockoutEnd: 'Account Lockout End',
        allowMultipleDevices: 'Allow Multiple Devices',
        createdTime: 'Created Time',
        updatedTime: 'Updated Time',
        lastActiveTime: 'Last Active Time',
        lastPermissionUpdate: 'Last Permission Update',
        form: {
          userName: 'User Name',
          nickName: 'Nick Name',
          realName: 'Real Name',
          gender: 'Gender',
          avatar: 'Avatar',
          email: 'Email',
          mobile: 'Mobile',
          emailVerified: 'Email Verified',
          mobileVerified: 'Mobile Verified',
          realNameVerified: 'Real Name Verified',
          realNameVerifiedTime: 'Real Name Verified Time',
          status: 'Status',
          permissionLevel: 'Permission Level',
          bio: 'Bio',
          location: 'Location',
          signature: 'Signature',
          allowMultipleDevices: 'Allow Multiple Devices'
        },
        addUser: 'Add User',
        editUser: 'Edit User',
        genderName: {
          unknown: 'Unknown',
          male: 'Male',
          female: 'Female'
        }
      }
    },
    systemSettings: {
      messageManagement: {
        common: {
          status: {
            enable: 'Enable',
            disable: 'Disable'
          }
        },
        templateManagement: {
          title: 'Template Management',
          templateCode: 'Template Code',
          templateName: 'Template Name',
          templateType: 'Template Type',
          templateCategory: 'Template Category',
          titleTemplate: 'Template Title',
          contentTemplate: 'Template Content',
          templateDescription: 'Template Description',
          variablesDescription: 'Variables Description',
          isActive: 'Is Active',
          isSystem: 'Is System',
          priority: 'Priority',
          triggerEvent: 'Trigger Event',
          totalUsed: 'Total Used',
          lastUsedTime: 'last used time',
          createTime: 'create time',
          updateTime: 'update time',
          createdBy: 'created by',
          updatedBy: 'updated by',
          form: {
            templateCode: 'Please enter template code',
            templateName: 'Please enter template name',
            templateType: 'Please select template type',
            templateCategory: 'Please select template category',
            titleTemplate: 'Please enter title template',
            contentTemplate: 'Please enter content template',
            templateDescription: 'Please enter template description',
            variablesDescription: 'Please enter variables description',
            isActive: 'Please select is active',
            isSystem: 'Please select is system',
            priority: 'Please enter priority',
            triggerEvent: 'Please enter trigger event',
            totalUsed: 'Please enter total used',
            lastUsedTime: 'Please enter last used time',
            createTime: 'Please enter create time',
            updateTime: 'Please enter update time',
            createdBy: 'Please enter created by',
            updatedBy: 'Please enter updated by'
          },
          addTemplate: 'Add Template',
          editTemplate: 'Edit Template'
        },
        notificationConfiguration: {
          title: 'Notification Configuration'
        }
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
