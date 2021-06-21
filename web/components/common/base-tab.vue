<template>
  <div class="tabs">
    <div>
      <ul class="nav nav-tabs" role="tablist">
        <li v-for="(item, key) in items" :key="key" class="nav-item">
          <a
            class="nav-link"
            :class="{'active': key === activeTab}"
            href="javascript:void(0)"
            role="tab"
            data-toggle="tab"
            @click="clickTab(key)"
          >{{ item.title ? item.title.toLowerCase() : '' }}</a>
        </li>
      </ul>
    </div>

    <!-- Tab panes -->
    <div class="tab-content">
      <div
        v-for="(item, key) in items"
        :key="key"
        role="tabpanel"
        class="tab-pane"
        :class="{'active': key === activeTab}"
      >
        <slot name="newTab" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    clickTab (key) {
      this.activeTab = key
    }
  }
}
</script>
