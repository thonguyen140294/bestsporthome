<template>
  <div class="swiper-slide match-item">
    <div class="match-item__slide">
      <div class="match-item__link" :data-key="index" />
      <div class="match-item__top">
        <div class="match-item__team">
          <p class="match-item__info">
            <span class="img-match"><img :src="item.teams[0].flag_thumbnail" :alt="item.teams[0].name"></span>
            <span class="team">{{ item.teams[0].name }}</span>
          </p>
          <p class="match-item__odd">
            <span class="odd-down">{{ item.teams[0].rate }}</span>
            <span>{{ item.teams[0].odds }}</span>
          </p>
        </div>
        <div class="match-item__team">
          <p>
            <span class="img-match"><img :src="item.teams[1].flag_thumbnail" :alt="item.teams[1].name"></span>
            <span class="team">{{ item.teams[1].name }}</span>
          </p>
          <p class="match-item__odd">
            <span class="odd-up">{{ item.teams[1].rate }}</span>
            <span>{{ item.teams[1].odds }}</span>
          </p>
        </div>
      </div>
      <div class="match-item__bot">
        <p class="champion">
          <img v-if="getLogoLeague(item.league_id)" :src="getLogoLeague(item.league_id)" alt="">
          <span>{{ item.league_name_text }}</span>
        </p>
        <p class="time">
          <span class="hour">{{ item.date_time | formatLocalDateTime('HH:mm') }}</span>
          <span class="date">{{ item.date_time | formatLocalDateTime('DD/MM/YYYY') }}</span>
        </p>
        <BaseButton class-name="base-button--bg-gray">CƯỢC NGAY</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~common/base-button'

export default {
  components: {
    BaseButton
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getLogoLeague (id) {
      let srcImage = ''
      switch (id) {
        case '1':
          srcImage = require('~imageAsset/news/logo-budes.svg')
          break
        case '43':
          srcImage = require('~imageAsset/news/logo-laliga.svg')
          break
        case '3':
          srcImage = require('~imageAsset/news/logo-premier-league.svg')
          break
        case '4':
          srcImage = require('~imageAsset/news/logo-series-a.svg')
          break
      }

      return srcImage
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/news/match-item.scss"></style>
