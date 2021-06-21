<template>
  <div class="history-item">
    <div v-b-toggle="`collapse-` + id" class="history-item__head">
      <div class="history-item__link">
        <div class="history-item__wrap">
          <p class="type">
            <slot name="title" />
          </p>
          <b class="money">
            <slot name="money" />
          </b>
        </div>
        <div class="history-item__wrap">
          <p class="time">
            <slot name="time" />
          </p>
          <p>
            <slot name="status" />
            <span class="arrow" />
          </p>
        </div>
      </div>
    </div>
    <b-collapse :id="`collapse-` + id">
      <div class="history-item__body">
        <div class="history-item__grid">
          <slot name="content" />
        </div>
        <slot name="note" />
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/account/sp/history-item.scss"></style>
