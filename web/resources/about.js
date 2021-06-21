export const bettingSports = [
  {
    name: 'game center',
    list: [
      { text: 'Quick Games' },
      { text: 'Jackpots' },
      { text: 'Slots' },
      { text: 'Bắn Cá' },
      { text: 'Quay Số' },
      { text: 'InGame' },
      { text: 'Instant Games' },
      { text: 'Lô Đề' }
    ]
  },
  {
    name: 'casino',
    list: [
      { text: 'Baccarat' },
      { text: 'Table Games' },
      { text: 'Dragon & Tiger' },
      { text: 'Roulette' },
      { text: 'Blackjack' },
      { text: 'Poker' },
      { text: 'Game Shows' }
    ]
  },
  {
    name: 'betting sports',
    list: [
      { text: 'Betting Sports: bóng đá, bóng chuyền, tennis...' },
      { text: 'Virtual Sports' },
      { text: 'E-Sports' }
    ]
  }
]

export const cardItems = [
  {
    id: 1,
    imgSrc: require('~imageRoot/icons/pocker.svg'),
    title: 'Cá cược, game đa dạng',
    content: `Cá cược thể thao với tỉ lệ cạnh tranh và hấp dẫn nhất, trực tiếp các sự kiện từ tất cả giải đấu hàng đầu.
    Ngoài ra còn có đa dạng các thể loại game như Keno, Casino live, game nổ hũ...
    đưa đến những phút giây giải trí tuyệt vời cho người chơi.`
  },
  {
    id: 2,
    imgSrc: require('~imageRoot/icons/cup.svg'),
    title: 'Uy tín và bảo mật',
    content: `Với hệ thống cá cược uy tín nhất hiện nay cộng thêm độ bảo mật tuyệt đối hàng đầu thế giới,
    MU9 luôn là thương hiệu hàng đầu trong hàng ngũ Nhà cái uy tín.`
  },
  {
    id: 3,
    imgSrc: require('~imageRoot/icons/supporter.svg'),
    title: 'Chăm sóc KH 24/7',
    content: `MU9 luôn sẵn sàng hỗ trợ, giải đáp thắc mắc và giải quyết các vấn đề của quý khách hàng
    một cách nhanh chóng và hiệu quả với thái độ phục vụ thân thiện.
    Với thời gian làm việc xuyên suốt 24/7 bao gồm cả ngày lễ, tết - bất cứ lúc nào,
    chúng tôi sẽ phục vụ một cách tốt nhất, mang tới sự hài lòng cho quý khách!
    `
  }
]

export const listGame = [
  { id: 1, name: 'Live Casino', icon: 'live-casino', link: '/live-casino', mainWallet: false },
  { id: 2, name: 'Sports', icon: 'football', link: '/live-sports', mainWallet: true },
  { id: 3, name: 'Quay Số', icon: 'biilard', link: '/lobby?game=lottery', mainWallet: false },
  { id: 4, name: 'Jackpots', icon: 'jackpot', link: '/lobby?game=jackpots', mainWallet: false },
  { id: 5, name: 'Bắn Cá', icon: 'shooting-fish', link: 'lobby?game=fishing', mainWallet: false },
  { id: 6, name: 'E-Sports', icon: 'e-sport', link: '/esports', mainWallet: true }
]

export const listBanks = [
  { id: 1, img: require('~imageRoot/components/account/bank-list/vcb.svg') },
  { id: 2, img: require('~imageRoot/components/account/bank-list/sacombank.svg') },
  { id: 3, img: require('~imageRoot/components/account/bank-list/acb.svg') },
  { id: 4, img: require('~imageRoot/components/account/bank-list/vietinbank.svg') },
  { id: 5, img: require('~imageRoot/components/account/bank-list/bidv.svg') },
  { id: 6, img: require('~imageRoot/components/account/bank-list/donga.svg') },
  { id: 7, img: require('~imageRoot/components/account/bank-list/techcombank.svg') }
]

export const listMethods = [
  {
    id: 1,
    title: 'Internet banking',
    icon: 'internet',
    link: '/account?tab=deposit&type=banking'
  },
  {
    id: 2,
    title: 'ATM',
    icon: 'atm',
    link: '/account?tab=deposit&type=atm'
  },
  {
    id: 3,
    title: 'Ngân hàng',
    icon: 'banking',
    link: '/account?tab=deposit&type=taiquay'
  },
  {
    id: 4,
    title: 'Paywin',
    icon: 'paywin',
    link: '/account?tab=deposit&type=paywin'
  },
  {
    id: 5,
    title: 'Thẻ cào điện thoại',
    icon: 'card',
    link: '/account?tab=deposit&type=phone_card'
  },
  {
    id: 6,
    title: 'Ví điện tử Momo',
    icon: 'momo',
    link: '/account?tab=deposit&type=momo'
  }
]

export const listProvider = [
  { id: 1, img: require('~imageRoot/components/pages/about/provider/evolution.png') },
  { id: 2, img: require('~imageRoot/components/pages/about/provider/techplayfishing.png') },
  { id: 3, img: require('~imageRoot/components/pages/about/provider/techplayslots.png') },
  { id: 4, img: require('~imageRoot/components/pages/about/provider/cq9.png') }
]
