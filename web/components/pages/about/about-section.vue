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

    <div class="about__content ">
      <div class="about-section__product">
        <Info class-header="p-0">
          <template #header>Sự đa dạng trong sản phẩm</template>
          <template #body>
            <ListGame />
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

export default {
  transition: {
    name: 'about',
    mode: 'out-in'
  },
  components: {
    Info,
    Card,
    ListGame,
    ListProvider
  }
}
</script>
<style lang="scss" src="~scssAsset/pages/about/about-section.scss">
</style>
