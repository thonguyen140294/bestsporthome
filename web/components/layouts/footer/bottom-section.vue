<template>
  <div class="bottom-section container">
    <div class="row">
      <div class="col-md-3 contact">
        <h4>LIÊN HỆ</h4>
        <div>
          <BIconGeoAltFill />
          <span>84 Tống Phước Phổ, Hải Châu, Đà Nẵng, Việt Nam</span>
        </div>
        <div>
          <BIconTelephoneFill />
          <span>0123456789</span>
        </div>
        <div>
          <BIconMailbox2 />
          <span>bestsporthome@gmail.com</span>
        </div>
      </div>
      <div class="col-md-3">
        <h4>VỀ BESTSPORTHOME</h4>
        <div>
          <ul>
            <li v-for="(item, index) in aboutItems" :key="index">
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-3">
        <h4>CHĂM SÓC KHÁCH HÀNG</h4>
        <div>
          <ul>
            <li v-for="(item, index) in casItems" :key="index">
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-3">
        <h4>NHẬN KHUYẾN MÃI</h4>
        <div>
          <form>
            <div class="newsletter-form">
              <input id="mail" type="email" placeholder="Nhập email của bạn.." name="contact[email]" class="newsletter-input form-control input-lg">
              <button class="btn-newsletter" type="submit">
                <span>Gửi</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconGeoAltFill, BIconTelephoneFill, BIconMailbox2 } from 'bootstrap-vue'
export default {
  components: {
    BIconGeoAltFill, BIconTelephoneFill, BIconMailbox2
  },
  data () {
    return {
      aboutItems: [
        { title: 'Điều khoản và điều kiện', link: '/ve-chung-toi?tab=dieu-khoan-dieu-kien' },
        { title: 'Phương thức thanh toán', link: '/ve-chung-toi?tab=phuong-thuc-thanh-toan' },
        { title: 'Khuyến mãi', link: '/ve-chung-toi?tab=khuyen-mai' },
        { title: 'Câu hỏi thường gặp', link: '/faq' }
      ],
      casItems: [
        { title: 'Ưu đãi khách hàng', link: '/ve-chung-toi?tab=dieu-khoan-dieu-kien' },
        { title: 'Chính sách đổi trả', link: '/ve-chung-toi?tab=chinh-sach-doi-tra' },
        { title: 'Chính sách bảo hành', link: '/ve-chung-toi?tab=phuong-thuc-thanh-toan' },
        { title: 'Hướng dẫn mua hàng', link: '/ve-chung-toi?tab=khuyen-mai' }
      ]
    }
  }
}
</script>

<style scoped lang="scss" src="~scssAsset/layouts/footer/bottom-section.scss">
</style>
