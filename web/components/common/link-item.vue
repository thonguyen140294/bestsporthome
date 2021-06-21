<template>
  <a class="link-item" href="javascript:void(0)" @click.prevent="handleClickItem">{{ item.title }}</a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClickItem () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/common/link-item.scss"></style>
