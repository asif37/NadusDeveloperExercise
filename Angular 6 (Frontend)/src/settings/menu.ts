export const MENU: any = [
  {
    title: 'Main',
    groupTitle: true
  },
  //{
    // title: 'Profile',
    // roleCanView: 'b',
    // routing: '/default-layout/profile',
    // clickAble:true,
    // icon: {
    //   class: 'fa fa-user',
    //   bg: '#ea8080',
    //   color: 'rgba(0,0,0,.87)'
    // },

  ///},
  // {
  //   title: 'ResetPassword',
  //   roleCanView: 'b',
  //   routing: '/default-layout/passwordReset',
  //   clickAble:true,
  //   icon: {
  //     class: 'fa fa-user',
  //     bg: '#ea8080',
  //     color: 'rgba(0,0,0,.87)'
  //   },

  // },
  {
    title: 'Home',
    roleCanView: 'b',
    clickAble:false,
    icon: {
      class: 'fa fa-home',
      bg: '#ea8080',
      color: 'rgba(0,0,0,.87)'
    },
    sub: [
      {
        title: 'Dashboard',
        routing: '/default-layout/dashboard',
        roleCanView: 'b'
      },
      // {
      //   title: 'Assigned Routes',
      //   routing: '/default-layout/assignRoutes',
      //   roleCanView: '2'
      // },

      {
        title: 'Buy Products',
        routing: '/default-layout/vendorsShopping',
        roleCanView: '2'
      },
      {
        title: 'Vendors',
        routing: '/default-layout/machineManagement',
        roleCanView: '1'
      }
    ]
  },
  // {
  //   title: 'Manager',
  //   roleCanView: '1',
  //   clickAble:false,
  //   icon: {
  //     class: 'fa fa-cogs',
  //     bg: '#ea8080',
  //     color: 'rgba(0,0,0,.87)',
  //   },
  //   routing: '/default-layout/manager',
  //   sub: [
      // {
      //   title: 'Routes Management',
      //   routing: '/default-layout/routesManagement',
      //   roleCanView: '1'
      // },
      // {
      //   title: 'Users',
      //   routing: '/default-layout/employeeManagement',
      //   roleCanView: '1'
      // },
  //     {
  //       title: 'Vendors',
  //       routing: '/default-layout/machineManagement',
  //       roleCanView: '1'
  //     }
  //   ]
  // },
  // {
  //   title: 'Reports',
  //   roleCanView: '1',
  //   clickAble:false,
  //   icon: {
  //     class: 'fa fa-cogs',
  //     bg: '#ea8080',
  //     color: 'rgba(0,0,0,.87)',
  //   },
  //   routing: '/default-layout/reports',
  //   sub: [
  //     {
  //       title: 'Machines by City/State',
  //       routing: '/default-layout/reports',
  //       roleCanView: '1'
  //     },
  //     {
  //       title: 'Machines by Terminal',
  //       routing: '/default-layout/report2',
  //       roleCanView: '1'
  //     },
  //     {
  //       title: 'Report 3',
  //       routing: '/default-layout/report3',
  //       roleCanView: '1'
  //     },
  //   ]
  // },
  {
    title: 'Sign Out',
    roleCanView: 'b',
    routing: '/signIn/:logout',
    icon: {
      class: 'icon sli-logout',
      bg: '#ea8080',
      color: 'rgba(0,0,0,.87)'
    },

  },
];
