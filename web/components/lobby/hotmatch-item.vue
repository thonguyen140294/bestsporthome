<template>
  <section>
    <div v-show="isDeviceDesktop" class="hotmatch-item">
      <a href="javascript:void(0);" aria-label="Hotmatch" class="hotmatch-item__link" @click="handleClickHotMatch" />
      <div class="hotmatch-item__wrap-info">
        <div class="hotmatch-item__league">{{ item.league_name_text }}</div>
        <div class="hotmatch-item__time">
          <span class="date">{{ date }}</span>
          <span class="hour">{{ time }} GMT+7</span>
        </div>
      </div>
      <div class="hotmatch-item__content">
        <div class="hotmatch-item__left">
          <div class="hotmatch-item__flag hotmatch-item__flag--red" @click="handleClickHotMatch">
            <div class="flag-img" />
          </div>
          <div class="hotmatch-item__wrap">
            <p class="hotmatch-item__team">{{ item.teams[0].name }}</p>
            <div class="hotmatch-item__odd">
              <span class="odd-down">{{ item.teams[0].rate }}</span>
              <span>{{ item.teams[0].odds }}</span>
            </div>
          </div>
        </div>
        <div class="hotmatch-item__right">
          <div class="hotmatch-item__flag hotmatch-item__flag--yellow" @click="handleClickHotMatch">
            <div class="flag-img" />
          </div>
          <div class="hotmatch-item__wrap">
            <p class="hotmatch-item__team">{{ item.teams[1].name }}</p>
            <div class="hotmatch-item__odd">
              <span>{{ item.teams[1].rate }}</span>
              <span class="odd-up">{{ item.teams[1].odds }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hotmatch-item__wrap-btn">
        <BaseButton class-name="base-button--bg-red base-button--hot-match" :loading-button="false" @click="handleClickHotMatch">CƯỢC NGAY</BaseButton>
      </div>
    </div>
    <div v-show="!isDeviceDesktop" class="hotmatch-item">
      <a href="javascript:void(0);" aria-label="Hotmatch" class="hotmatch-item__link" @click="handleClickHotMatch" />
      <div class="hotmatch-item__content">
        <h4 class="hotmatch-item__league">{{ item.league_name_text }}</h4>
        <div class="hotmatch-item__wrap">
          <div class="hotmatch-item__wrap-team hotmatch-item__left">
            <div class="hotmatch-item__flag hotmatch-item__flag--red" @click="handleClickHotMatch">
              <div class="flag-img" />
            </div>
            <p class="hotmatch-item__team">{{ item.teams[0].name }}</p>
          </div>
          <div class="hotmatch-item__odd">
            <span class="odd-down">{{ item.teams[0].rate }}</span>
            <span>{{ item.teams[0].odds }}</span>
          </div>
        </div>
        <div class="hotmatch-item__wrap">
          <div class="hotmatch-item__wrap-team hotmatch-item__right">
            <div class="hotmatch-item__flag hotmatch-item__flag--yellow" @click="handleClickHotMatch">
              <div class="flag-img" />
            </div>
            <p class="hotmatch-item__team">{{ item.teams[1].name }}</p>
          </div>
          <div class="hotmatch-item__odd">
            <span>{{ item.teams[1].rate }}</span>
            <span class="odd-up">{{ item.teams[1].odds }}</span>
          </div>
        </div>
        <div class="hotmatch-item__wrap hotmatch-item__wrap--bot">
          <div class="hotmatch-item__wrap-team">
            <span class="date">{{ date }}</span>
            <span class="hour">{{ time }} GMT+7</span>
          </div>
          <BaseButton class-name="base-button--bg-red base-button--hot-match" @click="handleClickHotMatch">CƯỢC NGAY</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import BaseButton from '~common/base-button'
import resizeHotmatchMixin from '~/mixins/resize-hotmatch'
import navigateMixin from '~/mixins/navigation'
import IFRAME_GAME_API from '~/api/iframe'

export default {
  components: {
    BaseButton
  },
  mixins: [resizeHotmatchMixin, navigateMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      date: dayjs(this.item.date_time).format('DD-MM-YYYY'),
      time: dayjs(this.item.date_time).format('HH:mm')
    }
  },
  methods: {
    handleClickHotMatch () {
      const url = this.$device.isMobileOrTablet
        ? `${IFRAME_GAME_API.LIVE_SPORTS}&matchId=${this.item.match_id}`
        : '/live-sports?mid=' + this.item.match_id
      this.$_navigationMixin_navigate(
        url,
        false,
        this.$device.isMobileOrTablet,
        true
      )
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/lobby/hotmatch-item.scss"></style>
