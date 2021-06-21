<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4 feature">
        <div class="feature-inner">
          <div class="feature-icon">
            <img :src="require('~imageAsset/layouts/footer/feature_1.png')" alt="/">
          </div>
          <h2>Thanh toán trực tiếp</h2>
        </div>
      </div>
      <div class="col-sm-4 feature">
        <div class="feature-inner feature-main">
          <div class="feature-icon">
            <img :src="require('~imageAsset/layouts/footer/feature_2.png')" alt="/">
          </div>
          <h2>Sản phẩm chất lượng</h2>
        </div>
      </div>
      <div class="col-sm-4 feature">
        <div class="feature-inner">
          <div class="feature-icon">
            <img :src="require('~imageAsset/layouts/footer/feature_3.png')" alt="/">
          </div>
          <h2>Free ship khi đặt đội</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/footer/license-section.scss">
</style>
