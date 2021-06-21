<template>
  <section class="security-section">
    <div class="about__content container">
      <Info>
        <template #body>
          <div>
            <p class="about-info--hl">
              Chính sách bảo mật của MU9 được đặt ra nhằm mục đích bảo vệ quyền lợi và sự an toàn cho Quý khách.
              Với việc đăng ký thành viên trên MU9, quý khách đã đồng ý theo chính sách bảo mật của chúng tôi
            </p>
            <p>
              1. Thông tin Cá Nhân
            </p>
            <p>
              MU9 có quyền thu thập thông tin cá nhân của người chơi bao gồm: tên, email, số điện thoại mà quý khách cung
              cấp khi đăng ký thành viên trên website. Việc thu thập này không áp dụng đối với các khách hàng truy cập
              trang để tham khảo, tìm hiểu. Quý khách hoàn toàn có quyền truy cập xem và chỉnh sửa thông tin cá nhân trên
              MU9 khi có thay đổi.
            </p>
            <p>
              2. Cam Kết Bảo Mật
            </p>
            <p>
              Với công nghệ bảo mật của Thawte SSL 128 BIT, MU9 chắc chắn rằng thông tin của quý khách sẽ được bảo mật
              tuyệt đối. Chúng tôi cam kết không bao giờ để lộ thông tin của quý khách cho bên thứ ba trong bất cứ
              điều kiện nào, cũng như đảm bảo về cơ sở dữ liệu của quý khách luôn được an toàn và không bị đánh mất hay
              lạm dụng. Với quy trình bảo mật chặt chẽ, dữ liệu quý khách hàng khi có yêu cầu cung cấp lại sẽ được kiểm
              soát gắt gao, những trường hợp thay mặt hoặc ủy quyền MU9 sẽ từ chối không hỗ trợ.
            </p>
            <p>
              3. Quyền và Nghĩa vụ của Khách hàng
            </p>
            <p>
              Quý khách hàng hãy tự bảo vệ thông tin của mình bằng cách không đưa thông tin của bản thân, email, mật khẩu,
              số điện thoại đăng ký… cho người khác. MU9 sẽ không chịu trách nhiệm khi quý khách hàng để lộ thông tin của bản
              thân dẫn đến rủi ro và thất thoát.
            </p>
          </div>
        </template>
      </Info>
    </div>
  </section>
</template>
<script>
import Info from '~pages/about/info'

export default {
  components: {
    Info
  }
}
</script>
