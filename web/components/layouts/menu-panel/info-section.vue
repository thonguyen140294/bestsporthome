<template>
  <div class="info-section">
    <a href="#" class="info-section__info">
      <img :src="require(`~imageAsset/layouts/header/login-user/avatar${currentUser.avatar || 0}.png`)" alt="">
      <p class="">
        <span>{{ currentUserFullName }}</span>
        <b class="info-section__money">{{ globalMainBalance | formatAmountUnit(1) }} Đ</b>
      </p>
    </a>
  </div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/menu-panel/info-section.scss"></style>
