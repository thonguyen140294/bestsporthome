<template>
  <section class="game-section">
    <div v-if="tab !== 'all' && tab !== 'allgame'" :ref="tab">
      <div v-if="!items.length">
        <GameNotFound />
      </div>
      <div v-else>
        <div v-if="!lobbyGameSearch">
          <div class="game-section__top">
            <h3 class="game-section__top__title">{{ gameMenu[tab].title }}</h3>
          </div>
          <GameList :items="items" />
        </div>
        <div v-else>
          <GameSearch :games-by-type="items" />
        </div>
      </div>
    </div>
    <div v-else :ref="tab === 'allgame' ? tab : ''">
      <div v-if="!Object.keys(games).length">
        <GameNotFound />
      </div>
      <div v-else>
        <div v-if="!lobbyGameSearch">
          <div v-for="(item, index) in games" :key="index">
            <div class="game-section__top">
              <h3 class="game-section__top__title">{{ gameMenu[index].title }}</h3>
              <nuxt-link :to="gameMenu[index].url" class="game-section__top__link-all">
                Xem tất cả
              </nuxt-link>
            </div>
            <GameList :items="item" :tab="tab" />
            <GameFeature v-if="index === 'slot'" :itemTurnover="itemTurnover" />
          </div>
        </div>
        <div v-else>
          <GameSearch :all-games="games" :tab="tab" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import { lobbyGame } from '@/resources/lobby-game'
import { gameMenu } from '@/resources/game-menu'
import { normalizeDiacriticsString } from '~/helper'
import lobbyGameMixin from '~/mixins/lobby-game'

export default {
  components: {
    GameList: () => import('./game-list'),
    GameNotFound: () => import('./game-not-found'),
    GameSearch: () => import('./game-search'),
    GameFeature: () => import('~lobby/game-feature')
  },
  mixins: [lobbyGameMixin],
  props: {
    lobbyGameFillter: {
      type: Object,
      default: () => {}
    },
    lobbyGameSearch: {
      type: String,
      default: ''
    }
  },
  async fetch () {
    await this.getItemTurnover(lobbyGame, 'gameId', 'game-center')
  },
  data () {
    return {
      lobbyGame,
      gameMenu,
      title: '',
      tab: 'all',
      itemTurnover: null
    }
  },
  computed: {
    items () {
      const queryGame = this.$getRoute(this.$route).query.game
      const games = this.lobbyGame[queryGame]
      if (!this.lobbyGameSearch) {
        if (
          queryGame === 'hotgame' &&
          this.itemTurnover &&
          !this.gameExists(games, this.itemTurnover.gameId)
        ) {
          games.unshift(this.itemTurnover)
        }
        return this.fillterGames(games)
      }
      return this.searchGames(games)
    },
    games () {
      if (!this.lobbyGameSearch) {
        return this.fillterGames(this.lobbyGame)
      }
      return this.searchGames(this.lobbyGame)
    }
  },
  watch: {
    '$route.query.game': {
      handler (value) {
        this.tab = value || 'all'

        this.$nextTick(() => {
          this.goToGameSection(this.tab)
        })
      },
      immediate: true
    }
  },
  methods: {
    fillterGames (listGames) {
      const selectedGameWallet = this.lobbyGameFillter.gameWallet
      const selectedProvider = this.lobbyGameFillter.provider
      if (selectedGameWallet === 'all' && selectedProvider === 'all') {
        return listGames
      }
      let resultFillter = {}
      if (this.tab !== 'all' && this.tab !== 'allgame') {
        resultFillter = listGames.filter(function (game) {
          if (selectedProvider !== 'all' && selectedGameWallet !== 'all') {
            return game.wallet === selectedGameWallet && game.provider === selectedProvider
          }
          return game.wallet === selectedGameWallet || game.provider === selectedProvider
        })
      } else {
        Object.keys(listGames).forEach((item) => {
          const value = listGames[item].filter(function (game) {
            if (selectedProvider !== 'all' && selectedGameWallet !== 'all') {
              return game.wallet === selectedGameWallet && game.provider === selectedProvider
            }
            return game.wallet === selectedGameWallet || game.provider === selectedProvider
          })
          if (value.length > 0) {
            resultFillter[item] = value
          }
        })
      }
      return resultFillter
    },
    searchGames (listGames) {
      let resultSearch = {}
      const searchValue = this.lobbyGameSearch
      if (this.tab !== 'all' && this.tab !== 'allgame') {
        resultSearch = listGames.filter(function (game) {
          return normalizeDiacriticsString(game.title)
            .includes(normalizeDiacriticsString(searchValue))
        })
      } else {
        Object.keys(listGames).forEach((item) => {
          if (item !== 'hotgame') {
            const value = listGames[item].filter(function (game) {
              return normalizeDiacriticsString(game.title)
                .includes(normalizeDiacriticsString(searchValue))
            })
            if (value.length > 0) {
              resultSearch[item] = value
            }
          }
        })
      }
      return resultSearch
    },
    goToGameSection (refName) {
      const element = this.$refs[refName]
      if (element) {
        let delayTime = 1000
        // If scroll's current position is the same with position of tabs, not delay show tab
        if (document.documentElement.scrollTop === element.offsetTop - 220) {
          delayTime = 0
        }
        $([document.documentElement, document.body]).animate({
          scrollTop: element.offsetTop - 220
        }, delayTime)
      }
    },
    gameExists (games, id) {
      return games.some(function (el) {
        return el.gameId === id
      })
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/pages/lobby/game-section.scss"></style>
