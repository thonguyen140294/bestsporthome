<template>
  <div class="wrapper-account">
    <h3 class="wrapper-account__title">
      {{ title }}
      <span v-if="titleSub">{{ titleSub }}</span>
    </h3>
    <v-component :is="component" v-if="component" class="wrapper-account__content" />
    <template v-else>
      <b-tabs
        class="wrapper-account__tabs"
        :class="{ 'wrapper-account__tabs--nowrap': noWrap }"
        :value="activeTab"
        vertical
        :content-class="contentClass"
        lazy
        @input="$emit('change', $event)"
      >
        <b-tab v-for="item in tabs" :key="item.title" :title-item-class="item.label">
          <template #title>
            <b>
              {{ item.title }}
              <img v-if="item.warning" class="" :src="item.warning" alt="warning">
            </b>
            <p v-if="item.titleSub">{{ item.titleSub }}</p>
          </template>
          <v-component :is="item.component" />
        </b-tab>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import infoPersonalMixin from '~/mixins/account/info-personal'
export default {
  components: {
  },
  mixins: [infoPersonalMixin],
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: Number,
      default: 0
    },
    contentClass: {
      type: String,
      default: ''
    },
    component: {
      type: Object,
      default: () => null
    },
    title: {
      type: String,
      default: ''
    },
    titleSub: {
      type: String,
      default: ''
    },
    noWrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped src="~scssAsset/pages/account/wrapper-account.scss">
</style>
