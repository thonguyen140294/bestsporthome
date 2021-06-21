<template>
  <section class="about-section">
    <div class="about__content container about-section__target">
      <Info class-body="sm-center">
        <template #header>
          Trở thành thương hiệu dẫn đầu
        </template>
        <template #body>
          <p>
            MU9 là nhà cái bóng đá uy tín hàng đầu Anh Quốc.
            Chúng tôi được cấp giấy phép hoạt động và có chứng nhận quốc tế bởi Isle of Man Gambling Supervision Commission.
            MU9 đã và đang từng bước trở thành THƯƠNG HIỆU DẪN ĐẦU trong ngành cá cược online.
          </p>
          <p>
            Màu sắc thương hiệu của chúng tôi tượng trưng cho sự trung thành và giàu có.
            Với thương hiệu "MU9", chúng tôi đề cao sự công bằng dành cho các thành viên tham gia cá cược.
            Chúng tôi mang sứ mệnh đưa MU9 trở thành công ty cá cược giải trí quy mô lớn trên thế giới.
          </p>
        </template>
      </Info>
      <Card />
    </div>
    <div class="about-section__brand">
      <div class="about-section__left">
        <p class="about-section__img">
          <img :src="require('~imageRoot/components/pages/about/bg_model.png')" alt="">
        </p>
      </div>
      <div class="about__content container about-section__right">
        <Info class="about-section__head" class-header="sm-left">
          <template #header>Khách hàng của chúng tôi</template>
          <template #body>
            <p>
              MU9 có lượng khách hàng hơn <span class="hl-red">1 triệu</span> thành viên trên toàn cầu và
              số lượng khách hàng không ngừng phát triển lớn mạnh, điều này
              dựa trên giá trị thương hiệu được tạo ra từ sự chuyên nghiệp, xuất sắc,
              và công bằng. Cam kết của chúng tôi được đặt ra nhằm mang đến
              và phục vụ những ván cược có giá trị lớn nhất trong ngành cá cược,
              luôn luôn thu hút những ván cược cao và hấp dẫn nhất trên toàn cầu.
            </p>
          </template>
        </Info>
        <p class="about-section__img">
          <img :src="require('~imageRoot/components/pages/about/brand/casino.png')" alt="Casino">
        </p>
      </div>
    </div>

    <div class="about__content container ">
      <div class="about-section__product">
        <Info class-header="p-0 sm-left">
          <template #header>Sự đa dạng trong sản phẩm</template>
          <template #body>
            <ListGame />
          </template>
        </Info>
      </div>

      <BettingSport />
      <div v-if="!this.$device.isMobile" class="about-section__provider">
        <Info class-header="sm-left" class="pt-1 pb-5">
          <template #header>Nhà cung cấp uy tín</template>
          <template #body>
            <ListProvider />
          </template>
        </Info>
      </div>
    </div>
  </section>
</template>
<script>
import ListGame from '~pages/about/list-game'
import ListProvider from '~pages/about/list-provider'
import Info from '~pages/about/info'
import Card from '~pages/about/card'
import BettingSport from '~pages/about/betting-sport'

export default {
  transition: {
    name: 'about',
    mode: 'out-in'
  },
  components: {
    Info,
    Card,
    ListGame,
    BettingSport,
    ListProvider
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/about-section.scss">
</style>
