<template>
  <div class="promo-wrap">
    <section v-swiper:aboutUsPromotionSwiper="swiperOption" class="swiper-container promo-section promotion-list__container">
      <div class="promotion-section__wrapper promo swiper-wrapper promo-about-us">
        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/100.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">
                Nạp lần đầu tiên
              </p>
              <p class="promo__number">+ 110 %</p>
              <p class="promo__text">Tối đa <b>10.000.000</b> VND</p>
               <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('welcome')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('welcome')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('welcome')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('welcome')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>

        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/naplandau.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">Nạp lần đầu tiên</p>
              <p class="promo__number">+ 50 %</p>
              <p class="promo__text">Tối đa <b>15.000.000</b> VND</p>
              <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('first_50')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('first_50')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('first_50')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('first_50')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>

        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/20.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">Nạp tiền lần 2</p>
              <p class="promo__number">+ 30 %</p>
              <p class="promo__text">Tối đa <b>10.000.000</b> VND</p>
              <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('promotion')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('promotion')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('promotion')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('promotion')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>

        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/158.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">HOÀN TRẢ VÔ TẬN</p>
              <p class="promo__number">+ 1.25 %</p>
              <p class="promo__text">Thể thao & Thể thao ảo</p>
              <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('commission')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('commission')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('commission')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('commission')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>

        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/napvaothu7.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">Nạp vào thứ 7</p>
              <p class="promo__number">+ 20 %</p>
              <p class="promo__text">Tối đa <b>5.000.000</b> VND</p>
              <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('saturday')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('saturday')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('saturday')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('saturday')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>
        <div class="promo__item swiper-slide">
          <a href="#" class="promo__link" />
          <div class="promo__banner">
            <div class="promo__wrap-img">
              <img :src="require('~imageRoot/components/pages/about/promos/nganhangchinhchu.png')" alt="">
            </div>
            <div class="promo__banner-content">
              <p class="promo__title">THƯỞNG NẠP</p>
              <p class="promo__number">+ 100K</p>
              <p class="promo__text">Ngân hàng chính chủ</p>
              <div class="promo__cta cta-pc">
                <BaseButton @click="selectPromotionPackage('bonus')" class="base-button btn base-button--bg-red btn--type1">CHỌN KM</BaseButton>
                <BaseButton @click="showDetailPackage('bonus')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
              </div>
            </div>
          </div>
          <div class="promo__cta cta-mb">
            <BaseButton @click="selectPromotionPackage('bonus')" class="base-button btn base-button--bg-red btn--type1">CHỌN KHUYẾN MÃI</BaseButton>
            <BaseButton @click="showDetailPackage('bonus')" v-b-modal.modalPackage class="base-button btn base-button--outline-white btn--type2">XEM CHI TIẾT</BaseButton>
          </div>
        </div>
      </div>
      <div slot="pagination" class="swiper-pagination"></div>
      <div v-if="isShowModal" class="package-detail">
        <ModalPackage :currentPackage="currentPackage" @selectPackage="selectPromotionPackage" />
      </div>
    </section>
    <div class="promo__desc">
      <div class="about__content container">
        <Info>
          <template #header>
            Yêu cầu chung
          </template>
          <template #body>
            <p>
              1. Cược hòa, cược chéo kèo, cược hủy hoặc vô hiệu, cược kèo thấp (đối với kèo CN tỷ
              lệ dưới
              0.5; kèo Malay tỉ lệ dưới 0.5; kèo Indo tỉ lệ dưới -2.00; kèo US tỉ lệ dưới -200 và
              kèo Dec
              tỉ lệ dưới 1.50) sẽ không được tính vào tổng tiền đặt cược.
            </p>

            <p>
              2. Nếu khách hàng muốn hủy việc nhận khuyến mãi này trước khi hoàn thành tổng tiền
              cược yêu
              cầu thì tài khoản sẽ được reset về 0 Đ.
            </p>

            <p>
              3. Mọi hành vi gian lận nhằm trục lợi khuyến mãi đều bị nghiêm cấm. Nếu phát hiện vi
              phạm
              toàn bộ tiền nạp, tiền thưởng, tiền thắng của tất cả các tài khoản vi phạm có liên
              quan sẽ
              bị hủy bỏ.
            </p>

            <p>
              4. Trong vòng 30 ngày kể từ khi nhận khuyến mãi, nếu thành viên không đạt đủ số vòng
              cược
              quy định thì toàn bộ tiền gửi, tiền thưởng và tiền thắng cược sẽ được MU9 reset về 0
              Đ.
            </p>

            <p>
              5. Tại mỗi thời điểm Quý khách chỉ được tham gia duy nhất một chương trình khuyến
              mãi. Các
              khuyến mãi trước đó sẽ bị hủy bỏ khi Quý khách chọn khuyến mãi mới.
            </p>

            <p>
              6. Chương trình khuyến mãi nạp tiền chỉ áp dụng cho Sports, Virtual Sports, E-Sports. Không áp
              dụng cho
              các sản phẩm khác như Quick Games, Live Casino, Numbers Game,
              Saba Club, InGame-TechPlay, Table Games, Virtual Games.
            </p>
          </template>
        </Info>
      </div>
    </div>
  </div>
</template>
<script>
import navigationMixin from '@/mixins/navigation'
import Info from '~pages/about/info'
import ModalPackage from '~common/modal-package'
import BaseButton from '~common/base-button'
import { PROMOTION_NEWS } from '~/resources/promotion'

export default {
  components: {
    Info,
    ModalPackage,
    BaseButton
  },
  mixins: [navigationMixin],
  data () {
    return {
      swiperOption: {
        speed: 500,
        slidesPerView: 'auto',
        spaceBetween: 8,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      currentPackage: '',
      isShowModal: false
    }
  },
  computed: {
    getPromotion () {
      return PROMOTION_NEWS
    }
  },
  methods: {
    selectPromotionPackage (type) {
      this.$_navigationMixin_navigate(`/account?tab=deposit&package=${type}`, true, false, true)
    },
    showDetailPackage (promotionPackage) {
      this.currentPackage = promotionPackage
      this.isShowModal = true
    }
  }
}
</script>
<style lang="scss" scoped src="~scssAsset/pages/about/promo-section.scss">
</style>
