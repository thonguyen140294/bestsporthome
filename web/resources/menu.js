export const menus = {
  clickShow: false,
  menus: [
    {
      title: 'TRANG CHỦ',
      link: '/',
      loginRequired: false,
      label: ''
    },
    {
      title: 'ÁO ĐẤU',
      link: '/ao-dau',
      loginRequired: false,
      label: '',
      subMenuClass: 'header-menu__lode',
      subMenu: [
        {
          title: 'CÂU LẠC BỘ',
          link: '/cau-lac-bo',
          loginRequired: false,
          label: ''
        },
        {
          title: 'QUỐC GIA',
          link: '/lo-de-sieu-toc',
          loginRequired: false,
          label: ''
        },
        {
          title: 'KHÁC',
          link: '/lo-de-sieu-toc',
          loginRequired: false,
          label: ''
        }
      ]
    },
    {
      title: 'PHỤ KIỆN',
      link: '/phu-kien',
      loginRequired: false,
      label: '',
      subMenu: [
        {
          title: 'ÁO KHOÁC',
          link: '/games?type=slots',
          loginRequired: false,
          label: ''
        },
        {
          title: 'ÁO PITCH',
          link: '/games?type=lottery',
          loginRequired: false,
          label: ''
        },
        {
          title: 'GIÀY',
          link: '/games?type=ingame',
          loginRequired: false,
          label: ''
        },
        {
          title: 'GĂNG TAY',
          link: '/games?type=tables',
          loginRequired: false,
          label: ''
        },
        {
          title: 'BALO',
          link: '/games?type=instant',
          loginRequired: false,
          label: ''
        },
        {
          title: 'PHỤ KIỆN KHÁC',
          link: '/games?type=battle',
          loginRequired: false,
          label: ''
        }
      ]
    },
    {
      title: 'IN ÁO',
      link: '/keno',
      loginRequired: false,
      label: '',
      newTab: true
    },
    {
      title: 'ĐẶT ĐỘI',
      link: '/keno',
      loginRequired: false,
      label: '',
      newTab: true
    },
    {
      title: 'PHẢN HỒI',
      link: '/keno',
      loginRequired: false,
      label: '',
      newTab: true
    }
  ]
}
