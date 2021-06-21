<template>
  <div class="preferential-package">
    <template v-if="!promotion.plan">
      <div class="preferential-package__header">
        <h4>GÓI ƯU ĐÃI CỦA MU9</h4>
        <span>Bạn chưa tham gia chương trình ưu đãi nào của MU9.</span>
      </div>
      <div class="preferential-package__inner d-block">
        <p class="preferential-package__title">Nạp tiền để nhận ngay ưu đãi hấp dẫn!</p>
        <div v-swiper="options">
          <div class="swiper-wrapper preferential-package__container">
            <div v-for="item in filterPackageVisible" :key="item.id" class="preferential-package__item swiper-slide">
              <nuxt-link :to="getLink(item.id)" class="preferential-package__link" />
              <img :src="require(`~imageAsset/account/preferential-package/package-${item.id}.png`)" :alt="`package-${item.id}`">
              <div class="preferential-package__content">
                <b v-html="item.title" />
                <strong v-html="item.amount" />
                <p v-html="item.description" />
                <button class="btn">CHỌN KHUYẾN MÃI</button>
              </div>
            </div>
          </div>
          <div slot="button-prev" class="swiper-button-prev"><i /></div>
          <div slot="button-next" class="swiper-button-next"><i /></div>
        </div>
      </div>
    </template>
    <template v-else-if="visibleRollingChart">
      <div class="preferential-package__header">
        <h4>KHUYẾN MÃI ĐANG SỬ DỤNG: <b class="preferential-package__header-highlight">{{ titleWelcome }}</b></h4>
      </div>
      <div class="preferential-package__inner">
        <div class="welcome-plan">
          <div class="d-flex justify-content-between align-items-center">
            <div class="welcome-plan__chart">
              <div class="welcome-plan__summary">{{ promotion.multiplier }}<br>vòng</div>
              <div>
                <chart :key="promotion.plan.id" :data="barChartData" :width="200" :height="200" :options="barChartOptions" />
              </div>
            </div>
            <div class="welcome-plan__right">
              <div class="welcome-plan__content">
                <div class="welcome-plan__wrap welcome-plan__wrap--main">
                  <p class="welcome-plan__label">Vòng cược hiện có: <span>{{ promotion.calculated_turnover }}</span></p>
                  <p class="welcome-plan__value">{{ promotion.turnover | formatAmountUnit }} Đ</p>
                </div>
                <div class="welcome-plan__wrap">
                  <p class="welcome-plan__label">Vòng cược cần: <span> {{ promotion.multiplier }}</span></p>
                  <p class="welcome-plan__value">{{ promotion.rolling | formatAmountUnit }} Đ</p>
                </div>
              </div>
              <div class="plan-note pc-show align-item-center justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="icon-warning" />
                  <p>Bạn phải hoàn thành vòng cược để có thể rút tiền</p>
                </div>
                <BaseButton class-name="base-button--cancel pc-show" :is-loading="isLoading" @click="$_promotionMixin_confirm()">HỦY KHUYẾN MÃI</BaseButton>
              </div>
            </div>
          </div>
          <div class="plan-note pc-hide">
            <i class="icon-warning" />
            <p>Bạn phải hoàn thành vòng cược để có thể rút tiền</p>
          </div>
          <div class="welcome-plan__action pc-hide">
            <BaseButton class-name="base-button--cancel" :is-loading="isLoading" @click="$_promotionMixin_confirm()">HỦY KHUYẾN MÃI</BaseButton>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="isCommissionType">
      <div class="preferential-package__header">
        <h4>KHUYẾN MÃI ĐANG SỬ DỤNG: <b class="preferential-package__header-highlight">hoàn trả 1.25% không giới hạn</b></h4>
      </div>
      <div class="preferential-package__inner">
        <div class="commission-plan">
          <div class="commission-plan__content">
            <div v-for="item in commissionInfos" :key="item.title" class="commission-item">
              <p class="commission-item__title">{{ item.title }}</p>
              <div class="commission-item__inner">
                <img :src="require(`~imageRoot/icons/${item.icon}.svg`)">
                <p class="commission-item__amount">{{ item.value | formatAmountUnit(1) }} Đ</p>
              </div>
            </div>
          </div>
          <div class="plan-note">
            <i class="icon-warning" />
            <p>Các trò: Nổ hũ, Trò chơi, Bắn cá, Sòng bài (Casino), Ingame sẽ không được tính hoàn trả.</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import promotionMixin from '~/mixins/promotion'
import chart from '~common/chart'
import BaseButton from '~common/base-button'

export default {
  components: {
    chart,
    BaseButton
  },
  mixins: [promotionMixin],
  data () {
    return {
      barChartOptions: {
        title: {
          text: 'Summary'
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        responsive: true,
        legend: {
          display: false
        },
        cutoutPercentage: 60,
        // eslint-disable-next-line no-mixed-operators
        rotation: (-0.5 * Math.PI) - (215 / 180 * Math.PI),
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              const labels = data.labels
              const index = tooltipItem.index
              return `${labels[index]}: ${dataset.data[index]} ${dataset.label}`
            }
          }
        }
      },
      options: {
        slidesPerView: 'auto',
        freeMode: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }
      }
    }
  },
  computed: {
    ...mapState(['packages']),
    barChartData () {
      const remain = this.promotion.multiplier - this.promotion.calculated_turnover
      return {
        labels: ['Tổng số vòng'],
        datasets: [
          {
            label: 'vòng',
            backgroundColor: ['#FEBC1F', '#4E4F54'],
            data: [this.promotion.calculated_turnover, remain > 0 ? remain : 0]
          }
        ]
      }
    },
    titleWelcome () {
      if (this.promotion.plan) {
        switch (this.promotion.plan.package_id) {
          case this.planType.welcome:
            return '110% tổng nạp lần đầu tiên'
          case this.planType.first_50:
            return '50% tổng nạp lần đầu tiên'
          case this.planType.promotion:
            return '30% nạp lần 2'
          case this.planType.saturday:
            return '20% tổng nạp lần đầu tiên vào thứ 7'
          default:
            return ''
        }
      }
      return ''
    },
    commissionInfos () {
      if (this.isCommissionType) {
        return [
          {
            title: 'Cược hôm nay',
            icon: 'hand_dolar',
            value: this.promotion.total_bet
          },
          {
            title: 'Thưởng hôm qua',
            icon: 'hand_transaction',
            value: this.promotion.yesterday_refund
          },
          {
            title: 'Tổng tiền thưởng',
            icon: 'hand_money',
            value: this.promotion.total_refund
          }
        ]
      }
      return []
    }
  },
  watch: {
    promotion (data) {
      this.setBonusChart(data)
    }
  },
  mounted () {
    this.$_promotionMixin_fetchPlan((data) => {
      this.setBonusChart(data)
    })
  },
  methods: {
    getLink (packageId) {
      let type = 'commission'
      if (packageId === 2) {
        type = 'welcome'
      } else if (packageId === 4) {
        type = 'second'
      } else if (packageId === 6) {
        type = 'promotion'
      }
      return `/account?tab=deposit&type=banking&package=${type}`
    },
    setBonusChart (data) {
      const welcome = data.plan && (data.plan.package_id === this.planType.welcome || data.plan.package_id === this.planType.promotion)
      if (welcome) {
        const remain = this.promotion.multiplier - this.promotion.calculated_turnover
        this.barChartData.datasets[0].data = [this.promotion.calculated_turnover, remain > 0 ? remain : 0]
      }
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/account/preferential-package.scss"></style>
