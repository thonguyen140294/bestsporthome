export const faqTabs = [
  {
    id: 1,
    text: 'TÀI KHOẢN',
    component: 'Account',
    items: [
      {
        id: 1,
        title: 'Muốn tham gia cá cược tại MU9 thì phải làm sao?',
        desc: `Khi muốn tham gia cá cược tại MU9 Quý khách vui lòng:
        <ul>
        <li>Đăng ký tài khoản tại MU9.</li>
        <li>Chọn NẠP TIỀN.</li>
        <li>Lấy thông tin ngân hàng và thực hiện chuyển khoản.</li>
        <li>Điền đầy đủ thông tin tại mục NẠP TIỀN.</li>
        <li>Hệ thống sẽ tự động cập nhật tiền sau ít phút.</li>
        <li>Khi việc nạp tiền thành công, Quý khách có thể tham gia cá cược tại MU9.</li>
        </ul>
        `
      },
      {
        id: 2,
        title: 'Các thông tin cá nhân của tôi có được bảo mật không?',
        desc: `MU9 cam kết bảo mật tuyệt đối thông tin khách hàng. 
        Không tiết lộ và cung cấp thông tin cho bất kỳ bên thứ ba nào. 
        Chính sách bảo mật này áp dụng cho tất cả các thành viên tham gia tại MU9. 
        Việc cung cấp lại các thông tin cá nhân trong mọi trường hợp sẽ do bộ phận chuyên trách của chúng tôi đảm nhận nhằm đảm bảo các thông tin cá nhân của khách sẽ chỉ được cung cấp duy nhất cho chính khách đó. 
        Mọi trường hợp ủy quyền/thay mặt chúng tôi sẽ từ chối hỗ trợ dưới bất kỳ lý do nào.
        `
      },
      {
        id: 3,
        title: 'Hướng dẫn đăng ký',
        desc: `Để trở thành thành viên của MU9 Quý khách vui lòng thực hiện theo các bước sau:
        <br />
        <br />
        Bước 1: Tại trang chủ MU9 => Nhấp chuột vào nút ĐĂNG KÝ NGAY bên góc phải màn hình.
        <br />
        <br />
        Bước 2: Quý khách điền đầy đủ thông tin vào mục tương ứng
        <ul>
        <li>Tên đăng nhập: Tối thiểu 6 ký tự, viết liền không dấu.</li>
        <li>Mật khẩu: Tối thiểu 6 ký tự, viết liền không dấu. Tất cả ký tự đặc biệt đều có thể dùng, lưu ý từ viết Hoa - thường.</li>
        <li>Xác nhận lại mật khẩu: Nhập lại mật khẩu đã điền như bên trên.</li>
        <li>Số điện thoại: Nhập SĐT của Quý khách đang sử dụng. Vui lòng cung cấp chính xác thông tin để hệ thống hỗ trợ tốt nhất.</li>
        </ul>
        Bước 3: Cuối cùng Quý khách nhấn vào nút ĐĂNG KÝ
        `
      }
    ]
  },
  {
    id: 2,
    text: 'NẠP TIỀN',
    component: 'ReCharge',
    items: [
      {
        id: 1,
        title: 'Nạp rút tiền có tốn phí không?',
        desc: 'MU9 không thu phí dịch vụ của quý khách khi tham gia cược, tất cả đều miễn phí mãi mãi.'
      },
      {
        id: 2,
        title: 'Có bao nhiêu phương thức nạp tiền tại MU9?',
        desc: `MU9 hỗ trợ các phương thức nạp tiền sau:
        <ul>
        <li>Nạp qua ngân hàng: Nạp tiền mặt, chuyển khoản tại trụ ATM, chuyển khoản Internet Banking.</li>
        <li>Nạp qua thẻ cào: Nạp tiền bằng cách mua thẻ cào điện thoại.</li>
        <li>Nạp qua ví điện tử Momo: Chuyển khoản từ ví Momo của Quý khách sang ví Momo của MU9.</li>
        <li>Nạp bằng Paywin: Nạp tiền tự động bằng ngân hàng thông minh.</li>
        </ul>
        `
      },
      {
        id: 3,
        title: 'Nạp Qua Ngân Hàng',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục QUA NGÂN HÀNG và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: Lấy thông tin và chuyển tiền
        <ul>
        <li>PHƯƠNG PHÁP NẠP: Nhấp chọn phương thức chuyển tiền tương ứng mà quý khách sử dụng.</li>
        <li>CHỌN NGÂN HÀNG MU9 ĐỂ CHUYỂN KHOẢN => Nhấp vào ô Chọn Ngân hàng và nhấp chọn Ngân hàng muốn chuyển tiền vào.
        Hệ thống sẽ hiển thị số tài khoản và Chủ tài khoản nhận tiền đại diện của MU9 => Quý khách Copy thông tin và tiến hành chuyển tiền vào tài khoản (Nạp tiền mặt, Chuyển tại trụ ATM, Chuyển khoản online,....)
        </li>
        </ul>
        Bước 2: Điền thông tin vào vị trí tương ứng. 
        Sau khi tiền được chuyển thành công vào tài khoản đại diện MU9. Vui lòng quay lại mục NẠP TIỀN và điền các thông tin tiếp theo hệ thống yêu cầu.
        <ul>
        <li>TẠO PHIẾU NẠP quý khách điền:
        <ul>
        <li>Tên người gửi: Thông tin chủ tài khoản chuyển tiền</li>
        <li>Số tiền: Điền số tiền Quý khách đã chuyển (lưu ý bỏ bớt 3 số 0 khi tạo lệnh. Ví dụ chuyển 500.000 chỉ cần điền 500)</li>
        <li>Mã giao dịch/nội dung/tài khoản chuyển tiền: cung cấp thông tin tương ứng theo phương thức đã sử dụng</li>
        </ul>
        </li>
        <li>CHỌN GÓI KHUYẾN MÃI: Nhấp chọn gói khuyến mãi bạn muốn tham gia
        </li>
        </ul>
        ĐIỀN ĐẦY ĐỦ THÔNG TIN  => TẠO PHIẾU NẠP ĐỂ HOÀN TẤT VÀ CHỜ HỆ THỐNG XỬ LÝ.
        Quý khách có thể kiểm tra quy trình giao dịch tại mục LỊCH SỬ GIAO DỊCH của hệ thống.
        `
      },
      {
        id: 4,
        title: 'Nạp Qua Paywin',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục QUA PAYWIN và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: Điền thông tin
        <ul>
        <li>CHỌN NGÂN HÀNG MU9 ĐỂ CHUYỂN KHOẢN: Chọn ngân hàng tương ứng mà Quý khách có sử dụng dịch vụ internet banking</li>
        <li>TẠO PHIẾU NẠP:
        <ul>
        <li>Số tiền nạp: Điền số tiền Quý khách đã chuyển (lưu ý bỏ bớt 3 số 0 khi tạo lệnh. Ví dụ chuyển 500.000 chỉ cần điền 500)</li>
        </ul>
        </li>
        <li>CHỌN KHUYẾN MÃI: Nhấp chọn gói khuyến mãi bạn muốn tham gia. Quý khách điền đầy đủ thông tin sau đó nhấp chọn TẠO PHIẾU NẠP để sang bước chuyển khoản.</li>
        </ul>
        Bước 2: Xác nhận chuyển khoản.
        <br />
        Hệ thống sẽ liên kết đến tài khoản ngân hàng Quý khách chọn. Vui lòng điền chính xác Tên đăng nhập và Mật khẩu trong thời gian cho phép => Nhập mã xác nhận theo yêu cầu để hoàn tất giao dịch 
        Khi Quý khách nhập đúng thông tin, hệ thống sẽ tự động cập nhật số tiền tương ứng vào tài khoản cược mà không cần lập thêm bất cứ lệnh nạp nào.
        Quý khách có thể kiểm tra quy trình giao dịch tại mục LỊCH SỬ GIAO DỊCH của hệ thống.
        `
      },
      {
        id: 5,
        title: 'Nạp Qua Momo',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục QUA MOMO và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: CHỌN MOMO MU9 ĐỂ CHUYỂN TIỀN: Chọn tài khoản MOMO Quý khách muốn chuyển tiền vào
        Bước 2: TẠO PHIẾU NẠP
        <ul>
        <li>Số điện thoại người gởi: Số điện thoại của Quý khách</li>
        <li>Số tiền nạp: Điền số tiền Quý khách đã chuyển (lưu ý bỏ bớt 3 số 0 khi tạo lệnh. Ví dụ chuyển 500.000 chỉ cần điền 500) 
        </li>
        <li>Mã giao dịch: Nhập mã giao dịch của MOMO gửi cho Quý khách khi Quý khách chuyển tiền thành công</li>
        </ul>
        Bước 3: CHỌN KHUYẾN MÃI: Nhấp chọn gói khuyến mãi bạn muốn tham gia
        <br />
        ĐIỀN ĐẦY ĐỦ THÔNG TIN  => TẠO PHIẾU NẠP ĐỂ HOÀN TẤT VÀ CHỜ HỆ THỐNG XỬ LÝ
        Quý khách có thể kiểm tra quy trình giao dịch tại mục LỊCH SỬ GIAO DỊCH của hệ thống.
        `
      },
      {
        id: 6,
        title: 'Nạp Qua Thẻ Cào',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục QUA THẺ CÀO và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: CHỌN NHÀ MẠNG: Chọn nhà mạng tương ứng thẻ cào đã mua
        <br />
        Bước 2: TẠO PHIẾU NẠP
        <ul>
        <li>Chọn mệnh giá thẻ cào: Vui lòng chọn đúng. Nếu sai hệ thống không chịu trách nhiệm</li>
        <li>Mã thẻ cào: Dãy số sau lớp giấy bạc của thẻ cào</li>
        <li>Số series thẻ cào: Dãy số sau chữ Seri trên thẻ cào</li>
        </ul>
        ĐIỀN ĐẦY ĐỦ THÔNG TIN  => TẠO PHIẾU NẠP ĐỂ HOÀN TẤT, MU9 SẼ TỰ ĐỘNG CẬP NHẬT SỐ TIỀN TƯƠNG ỨNG VÀO TÀI KHOẢN CƯỢC CỦA QUÝ KHÁCH
        <ul>Lưu ý:
        <li>Vui lòng chọn đúng mệnh giá và nhà mạng, nếu nhập sai chúng tôi không chịu trách nhiệm</li>
        <li>Phí gạch thẻ chỉ từ 32% rẻ nhất thị trường (Viettel: 32%, Vinaphone: 33%, Mobiphone: 34%)</li>
        <li>Khuyến mãi 110%, 50%, 30% và 20% không áp dụng khi nạp thẻ cào</li>
        </ul>
        `
      }
    ]
  },
  {
    id: 3,
    text: 'RÚT TIỀN',
    component: 'Withdrawal',
    items: [
      {
        id: 1,
        title: 'Rút tiền có giới hạn không?',
        desc: 'MU9 không giới hạn số tiền rút tối đa, cũng như số lần rút trong ngày.'
      },
      {
        id: 2,
        title: 'Khi muốn rút tiền tôi phải làm gì?',
        desc: `Khi muốn rút tiền Quý khách vui lòng đăng nhập vào trang MU9, chọn mục TÀI KHOẢN. 
        Sau đó chọn RÚT TIỀN và điền đầy đủ các thông tin theo yêu cầu. Hệ thống sẽ tiếp nhận, 
        kiểm tra và xử lý yêu cầu của Quý khách trong vài phút.
        `
      },
      {
        id: 3,
        title: 'MU9 hỗ trợ những ngân hàng nào?',
        desc: 'Với mong muốn đem lại sự tiện lợi, nhanh chóng nhất cho khách hàng của mình, MU9 hỗ trợ giao dịch qua các ngân hàng thông dụng như Vietcombank, Techcombank, Vietinbank, ACB, Sacombank, BIDV, DongABank.'
      },
      {
        id: 4,
        title: 'Rút tiền qua ngân hàng',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục RÚT TIỀN =>Chọn mục QUA NGÂN HÀNG và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: CHỌN NGÂN HÀNG ĐỂ NHẬN TIỀN: Nhấp chọn Ngân hàng Quý khách muốn rút tiền về
        <br />
        Bước 2: TẠO PHIẾU RÚT
        <ul>
        <li>Số tiền rút: Điền số tiền Quý khách muốn rút (Lưu ý cần loại bỏ 3 số 0. Ví dụ rút 500.000 chỉ cần điền 500)</li>
        <li>Số tài khoản: Điền chính xác số tài khoản ngân hàng tương ứng</li>
        <li>Họ và tên người nhận: Sẽ được cố định sau khi quý khách cập nhật thông tin tài khoản</li>
        </ul>
        Quý khách Click chọn TẠO PHIẾU RÚT để hoàn tất và chờ MU9 xử lý trong vài phút. Quý khách có thể truy cập lịch sử giao dịch để kiểm tra lệnh rút của mình.
        `
      },
      {
        id: 5,
        title: 'Rút tiền qua thẻ cào',
        desc: `Đăng nhập tài khoản vào trang MU9 => chọn vào ô NẠP TIỀN ở góc phải Trang chủ => Chọn mục RÚT TIỀN =>Chọn mục QUA THẺ CÀO và thực hiện theo các bước:
        <br />
        <br />
        Bước 1: CHỌN NHÀ MẠNG: Chọn loại thẻ cào mà Quý khách muốn đổi thưởng
        <br />
        Bước 2: TẠO PHIẾU RÚT
        <ul>
        <li>Chọn Mệnh giá thẻ cào: Chọn mệnh giá thẻ cào tương ứng</li>
        <li>Số lượng thẻ: Điền số lượng thẻ Quý khách muốn rút</li>
        </ul>
        Quý khách Click chọn TẠO PHIẾU RÚT để hoàn tất và chờ MU9 xử lý trong vài phút. Thẻ cào sau khi đổi thành công sẽ được trả về lịch sử giao dịch của Quý khách.
        `
      }
    ]
  }
]
