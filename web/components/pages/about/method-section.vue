<template>
  <section class="method-section">
    <div class="about__content container">
      <Info class-body="sm-center">
        <template #header> Liên kết với các ngân hàng hàng đầu </template>
        <template #body>
          <p class="method-section__target">
            Với phương châm Tiện Lợi - Nhanh Chóng - An Toàn,
          </p>
          <p>
            MU9 liên kết với các ngân hàng với các ngân hàng hàng đầu Việt Nam
            khiến việc Nạp/Rút tiền vào tài khoản dễ dàng, tiện lợi và bảo mật
            tuyệt đối.
          </p>
        </template>
      </Info>
    </div>
    <ListBank class="method-section__list" />
    <div class="about__content container">
      <Info class="method-section__info">
        <template #header>
          Các phương thức thanh toán
        </template>
        <template #body>
          <p class="method-section__common">
            MU9 hỗ trợ khách hàng nạp và rút tiền thông qua nhiều phương thức thanh toán khác nhau. Tất cả phương thức này đều có tốc độ nhanh chóng, tỷ lệ đổi thưởng cao, không qua trung gian giúp thành viên tham gia có thể dễ dàng lựa chọn cho mình phương thức phù hợp và an toàn nhất
          </p>
          <div class="method-section__content">
            <p>
              - Đối với việc nạp tiền qua hệ thống ngân hàng, MU9 đang hỗ trợ những ngân hàng phổ biến như: Vietcombank, BIDV, Đông Á, ACB, Techcombank, Sacombank, Vietinbank. Thành viên có thể lựa chọn hình thức nạp tiền qua Internet Banking, ATM hay gửi tiền mặt tại quầy giao dịch một cách nhanh chóng và thuận tiện.
            </p>
            <p>
              - Nạp tiền qua thẻ cào điện thoại: Nạp tiền qua thẻ cào điện thoại thuận tiện và an toàn. MU9 hỗ trợ những nhà mạng phổ biến như Viettel, Mobifone, VinaPhone với nhiều mệnh giá khác nhau.
            </p>
            <p>
              - Nạp tiền qua ví điện tử Momo: Sử dụng hệ thống trung gian qua ví điện tử Momo giúp thành viên tham gia đặt cược có thể nạp tiền một cách nhanh chóng và thuận tiện hơn bao giờ hết.
            </p>
            <p>
              - Nạp tiền SIÊU NHANH cùng Paywin: Để có thể sử dụng hình thức SIÊU NHANH này, Quý khách hàng cần có tài khoản Internet Banking tại một trong 7 ngân hàng mà MU9 hỗ trợ. Bao gồm: Username, Password và mã OTP được gửi về số điện thoại bạn đã đăng ký với ngân hàng. Với hình thức giao dịch này, lệnh nạp của bạn sẽ được hệ thống tự động duyệt nhanh chóng, an toàn và bảo mật.
            </p>
            <p>
              - Đối với hình thức rút tiền, thành viên có thể lựa chọn hình thức rút tiền qua ngân hàng địa phương. Các ngân hàng hiện MU9 đang hỗ trợ như Vietcombank, BIDV, Đông Á, ACB, Techcombank, Sacombank, Vietinbank sẽ giúp bạn nhanh chóng nhận được khoản tiền thắng cược của mình.
            </p>
            <p>
              - Bên cạnh đó, rút tiền qua hệ thống thẻ cào an toàn tuyệt đối. Thành viên chỉ cần lựa chọn nhà mạng và số tiền muốn quy đổi thành thẻ cào điện thoại, hệ thống sẽ tự động gửi thông báo mã nạp vào tài khoản của quý khách trong khoảng thời gian từ 1 đến 3 phút.
            </p>
          </div>
          <p class="method-section__common">
            Các giao dịch tại MU9 luôn đảm bảo an toàn, nhanh chóng và chính xác nhất thông qua nhiều dòng tiền khác nhau như mua bán online hay kinh doanh trực tuyến. Thành viên có thể yên tâm khi tham gia đặt cược tại MU9 - nhà cái uy tín hàng đầu thế giới hiện nay.
          </p>
        </template>
      </Info>
    </div>
    <div class="about__content container method-section__list">
      <Info class-body="sm-center">
        <template #header>Nạp tiền ngay</template>
        <template #body>
          <listMethod />
        </template>
      </Info>
    </div>
  </section>
</template>
<script>
import Info from '~pages/about/info'
import ListBank from '~pages/about/list-bank'
import listMethod from '~pages/about/list-method'

export default {
  components: {
    Info,
    ListBank,
    listMethod
  }
}
</script>
<style lang="scss" scoped src="~scssAsset/pages/about/method-section.scss">
</style>
