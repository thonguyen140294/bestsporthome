import deposit from '~common/banner-deposit'
import secondDeposit from '~common/banner-second-deposit'
import cash from '~common/banner-cash'
import bannerCasino from '~common/banner-casino'
import bannerBank from '~common/banner-bank'
import bannerJackpot from '~common/banner-jackpot'

export const homeBannerItems = [
  {
    link: '/lobby?game=fishing',
    imgSrc: '/assets/images/components/common/banner-item/fishing.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/fishing-sp.jpg',
    alt: 'Welcome Deposit Banner',
    loginRequired: false,
    newTab: false,
    mainWallet: false,
    isHideShadow: true
  },
  {
    link: '/account?tab=deposit&type=paywin&package=welcome',
    imgSrc: '/assets/images/components/common/banner-item/deposit.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/deposit-sp.jpg',
    alt: 'Welcome Deposit Banner',
    loginRequired: true,
    newTab: false,
    content: deposit,
    mainWallet: true
  },
  {
    link: '/live-sports',
    imgSrc: '/assets/images/components/common/banner-item/sport.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/sport-sp.png',
    alt: 'Sport Banner',
    loginRequired: false,
    newTab: false,
    content: cash,
    mainWallet: true
  },
  {
    link: '/account?tab=deposit&type=paywin&package=promotion',
    imgSrc: '/assets/images/components/common/banner-item/second-deposit.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/second-deposit-sp.jpg',
    alt: 'Second Deposit Banner',
    loginRequired: true,
    newTab: false,
    content: secondDeposit,
    mainWallet: true
  },
  {
    link: '/live-casino',
    imgSrc: '/assets/images/components/common/banner-item/live-casino.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/live-casino-sp.jpg',
    alt: 'Live Casino Banner',
    loginRequired: false,
    newTab: false,
    content: bannerCasino,
    mainWallet: false
  },
  {
    link: '/account?tab=account-info&type=info-bank',
    imgSrc: '/assets/images/components/common/banner-item/bank.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/bank-sp.jpg',
    alt: 'Bank Banner',
    loginRequired: true,
    newTab: false,
    content: bannerBank,
    mainWallet: true
  },
  {
    link: '/lobby?game=jackpots',
    imgSrc: '/assets/images/components/common/banner-item/jackpot.jpg',
    imgSrcMobile: '/assets/images/components/common/banner-item/jackpot-sp.jpg',
    alt: 'Jackpot Banner',
    loginRequired: false,
    newTab: false,
    content: bannerJackpot,
    mainWallet: false
  }
]

export const bannerOptions = {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  on: {
    // link issue https://github.com/nolimits4web/swiper/issues/2629#issuecomment-477655183
    slideChangeTransitionStart () {
      const $wrapperEl = this.$wrapperEl
      const params = this.params
      $wrapperEl.children(('.' + (params.slideClass) + '.' + (params.slideDuplicateClass)))
        .each(function () {
          const idx = this.getAttribute('data-swiper-slide-index')
          this.innerHTML = $wrapperEl
            .children('.' + params.slideClass + '[data-swiper-slide-index="' + idx + '"]:not(.' + params.slideDuplicateClass + ')')
            .html()
        })
    },

    slideChangeTransitionEnd () {
      this.slideToLoop(this.realIndex, 0, false)
    }
  }
}
