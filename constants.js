/**
 * WEDDING_DATA - Hằng số cấu hình thông tin cho Thiệp mời Đám cưới
 * Bạn có thể dễ dàng thay đổi tất cả các đoạn văn bản (texts) và hình ảnh (images) ở đây
 * mà không cần phải can thiệp trực tiếp vào mã nguồn HTML hay JS logic.
 */
const WEDDING_DATA = {
    // ----------------------------------------------------
    // CẤU HÌNH ĐẠI TỪ XƯNG HÔ (PRONOUN MAPPING)
    // Ánh xạ từ prefix của khách sang danh xưng tự xưng của cô dâu chú rể
    // ----------------------------------------------------
    couplePronounMap: {
        "anh": "Chúng em",
        "chị": "Chúng em",
        "bạn": "Chúng mình",
        "cô": "Chúng con",
        "bác": "Chúng con",
        "chú": "Chúng con",
        "dì": "Chúng con",
        "ông": "Chúng con",
        "bà": "Chúng con",
        "default": "Chúng con"
    },

    // ----------------------------------------------------
    // 0. CẤU HÌNH TRANG WEB CHUNG (METADATA & RESOURCES)
    // ----------------------------------------------------
    pageTitle: "Wedding Invitation - Chí Lập & Quế Anh",

    // Nhạc nền (Nhấp mở thiệp sẽ tự động phát bài này)
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

    // Các hình ảnh trang trí, icon đồ họa của thiệp
    decorations: {
        // Hoa góc trên bên trái
        topLeftFlower: "https://assets.cinelove.me/resources/bouquet/gm7mq3ru5s7k4o1dt5ymhp.png",
        // Hoa góc dưới bên phải
        bottomRightFlower: "https://assets.cinelove.me/resources/bouquet/unri8axa4zmlj5408kc4ko.png",
        // Dải phân cách hoa văn giữa các nội dung
        dividerSvg: "https://assets.cinelove.me/resources/dividers/16cvdln0hsto193fhow8kr.svg",
        // Nút sáp niêm phong phong bì thư ngoài trang bìa
        waxSeal: "https://assets.cinelove.me/assets/plugins/wax-seal.webp",
        // Biểu tượng chiếc đĩa nhạc điều khiển bật/tắt
        musicIcon: "https://assets.cinelove.me/assets/audio-1.png",
        // Cành cây nhỏ trang trí phía dưới đếm ngược
        branchIcon: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b298e6ad-dd15-475c-aca4-c3f0850f44fc.png",
        // Hình nhân vật cô dâu chú rể chibi ở phần hộp quà cưới
        characterIcon: "https://assets.cinelove.me/resources/characters/h4py3okq2aoga2u5n94fcq.png",
        // Cành lá trang trí footer ở cuối trang
        footerBanner: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b2369584-b526-46a5-851b-034c9f2e1e0f.png",
        // Hình trái tim đệm dưới ngày cưới trong lịch đám cưới
        calendarHeart: "https://assets.cinelove.me/assets/plugins/calen_heart_1.png"
    },

    // ----------------------------------------------------
    // 1. LỚP PHỦ PHONG BÌ TƯƠNG TÁC (ENVELOPE OVERLAY)
    // ----------------------------------------------------
    envelope: {
        headerLeft: "YOU ARE",
        headerCenter: "THE LOVE OF",
        headerRight: "MY LIFE",
        title: "Save the Date",
        tapHint: "Chạm để mở thiệp",
        preGuestText: "TRÂN TRỌNG KÍNH MỜI",
        envelopeImage: './assets/envelope.JPG'
    },

    // ----------------------------------------------------
    // 2. LỜI MỜI CHÍNH (INTRO SECTION)
    // ----------------------------------------------------
    intro: {
        mainHead: "Save The Date",
        subHead: "Wedding Invitation",
        preGuestText: "TRÂN TRỌNG KÍNH MỜI",

        // Tên khách mời hiển thị mặc định trên thiệp (Nếu không truyền tham số qua URL)
        defaultGuestName: "Chị Nga",

        invitationMessage: "ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG GIA ĐÌNH CHÚNG MÌNH VÀO LÚC",

        // Thời gian cử hành hôn lễ
        timeHighlight: "11 GIỜ 00 | THỨ SÁU | 17.07.2026",
        lunarTime: "(Nhằm ngày 04 tháng 06 năm Bính Ngọ)",

        locationTitle: "HÔN LỄ ĐƯỢC CỬ HÀNH TẠI",
        locationName: "TƯ GIA NHÀ GÁI",
        locationAddress: "111 Bùi Thị Xuân, Thuận Hóa, Thành phố Huế",

        // Đường dẫn Google Maps để khách tìm đường đi
        mapsLink: "https://maps.google.com/?q=111+Bùi+Thị+Xuân,+Thuận+Hóa,+Thành+phố+Huế"
    },

    // ----------------------------------------------------
    // 3. LỜI NGỎ YÊU THƯƠNG (QUOTE SECTION)
    // ----------------------------------------------------
    quote: {
        // Hỗ trợ ký tự xuống dòng thoải mái nhờ cú pháp string literal (dấu nháy huyền ` `)
        content: `“Thân gửi Chị Nga,

Trải qua một hành trình dài gắn bó, chúng mình sẽ chính thức bước sang một trang mới của cuộc đời. Vì Chị luôn là một người đặc biệt và trân quý, chúng mình mong muốn được chia sẻ niềm vui lớn lao này cùng Chị.

Trân trọng kính mời Chị cùng người thương đến dự buổi tiệc chung vui cùng gia đình chúng mình. Sự hiện diện và lời chúc phúc của Chị chắc chắn sẽ làm cho ngày vui của hai đứa thêm phần trọn vẹn và ý nghĩa.

Rất mong sớm được đón tiếp Chị! ❤️”`
    },

    // ----------------------------------------------------
    // 4. THÔNG TIN CẶP ĐÔI (COUPLE SECTION)
    // ----------------------------------------------------
    couple: {
        // Ảnh nền ngang của cặp đôi ở đầu phần giới thiệu
        bannerImg: "./assets/couple-banner.JPG",

        // Châm ngôn tiếng Anh hiển thị dưới ảnh nền ngang
        quoteEn: "I met you on my way back home, I felt in love as sky were gray",

        // Thông tin chú rể
        groom: {
            name: "Chí Lập",
            role: "Groom",
            image: "./assets/groom.JPG"
        },

        // Thông tin cô dâu
        bride: {
            name: "Quế Anh",
            role: "Bride",
            image: "./assets/bride.JPG"
        },

        // Câu thơ/quote lãng mạn (hỗ trợ các thẻ <br> để xuống dòng)
        poemViet: "Em có nghe<br>hương tình duyên mình khi còn đang chớm nở.<br>Thanh xuân mình đầy<br>nhiệt huyết làm cho thiên lý giàn hoa nhuốm đỏ.",
        poemEng: "My heart, the bird of the wilderness has found its sky in your eye.",

        // Lời nhắn cảm ơn chung gửi tới gia đình & bạn bè
        familyThanks: "To Our Family And Friends,<br>Thank You For Celebrating Our Special Day,<br>Supporting Us And Sharing Our Love."
    },

    // ----------------------------------------------------
    // 5. ALBUM MINI (GALLERY SECTION)
    // ----------------------------------------------------
    gallery: {
        // Ảnh lớn đầu mục Album
        welcomeImg: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/2d021cc4-357c-48c9-9e46-81c3730d8c76.png",

        // Danh sách liên kết hình ảnh trong lưới album (grid)
        images: [
            "./assets/gallery-1.JPG",
            "./assets/gallery-2.JPG",
            "./assets/gallery-3.JPG"
        ],

        // Khung chữ chèn dưới phần Album hình ảnh
        poemBox: {
            line1: "I love three things in this world.",
            line2: "Sun, moon and you.",
            line3: "Sun for morning, moon for night, and you forever."
        }
    },

    // ----------------------------------------------------
    // 5.5. SUB GALLERY (BỐ CỤC ẢNH ĐẶC BIỆT)
    // ----------------------------------------------------
    subGallery: {
        // Ảnh chính cho section bố cục đặc biệt (phía dưới gallery filmstrip)
        specialPhoto: "./assets/sub-gallery-1.JPG",

        // 2 Ảnh bổ sung bên dưới
        extraPhoto1: "./assets/sub-gallery-2.JPG",
        extraPhoto2: "./assets/sub-gallery-3.JPG",

        // Ảnh chữ I LOVE YOU
        loveImg: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b298e6ad-dd15-475c-aca4-c3f0850f44fc.png"
    },

    // ----------------------------------------------------
    // 6. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN SECTION)
    // ----------------------------------------------------
    countdown: {
        // Câu dẫn dắt lãng mạn phía trên bộ đếm ngược
        title: "Cả rừng tiếng ve thổi tia nắng lướt qua trên khuôn mặt<br>Hạ cùng đến nghe mỗi hình bóng em thướt tha êm khuôn nhạc",

        // Ngày giờ tổ chức đám cưới đích xác (định dạng YYYY-MM-DDTHH:mm:ss) để JavaScript tự động đếm ngược
        targetDate: "2026-07-17T11:00:00",

        // Câu dẫn nhỏ bên dưới bộ đếm ngược
        postText: "Mong gió xuân dịu dàng với em hơn,<br> Xua tan muộn phiền,<br> Để mọi thứ chỉ còn lại dịu êm."
    },

    // ----------------------------------------------------
    // 7. LỊCH ĐÁM CƯỚI (CALENDAR SECTION)
    // ----------------------------------------------------
    calendar: {
        // Ảnh chữ "Save The Date"
        topImage: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/e89ebd60-3f04-4013-9c11-9103dc96a28a.png",

        // Câu intro phía dưới chữ Save The Date
        introText: "Đi một vòng lớn rồi vẫn gặp anh,<br>Từ đó, thế gian bỗng hóa dịu dàng.",

        // Khung polaroid overlay (Ảnh khung tối màu có phần trong suốt)
        polaroidFrame: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/66d12607-1554-4e57-b216-4f105da70233.png",

        // Ảnh của couple nằm dưới khung polaroid
        photo: "./assets/gallery-1.JPG",

        // Text ngày tháng nằm ở phần đuôi tối màu của khung polaroid
        polaroidText: "Thứ Bảy, 22/05/2050<br>Âm lịch 22/4 | 12:00 PM",

        // Ngày đám cưới cần làm nổi bật (sẽ được đóng dấu trái tim trên lịch)
        weddingDay: 22,

        // Câu quote thơ lãng mạn phía dưới cùng
        bottomQuote: "Hạnh phúc lớn nhất chính là được nắm tay anh,<br>Cùng nhau đi hết cuộc đời lãng mạn này"
    },

    // ----------------------------------------------------
    // 8. BIỂU MẪU XÁC NHẬN THAM DỰ (RSVP FORM)
    // ----------------------------------------------------
    rsvp: {
        title: "Xác nhận tham dự",
        labelName: "Họ và tên",
        placeholderName: "Nhập tên của bạn",
        labelAttendance: "Bạn sẽ tham dự chứ?",
        optionYes: "Có, tôi sẽ tham dự",
        optionNo: "Tôi bận, rất tiếc không thể đến",
        labelCount: "Số lượng người tham dự",
        btnSubmit: "GỬI XÁC NHẬN",

        // Câu thông báo chúc mừng thành công (Sử dụng biểu thức {name} để tự động thay thế bằng tên khách nhập)
        successAlert: "Cảm ơn {name} đã gửi phản hồi xác nhận tham dự đám cưới của Chí Lập & Quế Anh!",

        // Câu quote thơ cuối cùng ở mục RSVP
        bottomQuote: "“Hết lần này đến lần khác, đem chuyện tình riêng khoe với thế gian,<br>Chỉ vì mỗi lần nhìn em, anh lại thấy đó là điều đáng tự hào nhất.”"
    },

    // ----------------------------------------------------
    // 9. HỘP QUÀ CƯỚI (REGISTRY SECTION)
    // ----------------------------------------------------
    registry: {
        title: "Hộp quà cưới",
        // Liên kết ảnh mã QR ngân hàng nhận quà cưới/mừng cưới
        qrCodeUrl: "https://assets.cinelove.me/resources/flowchartIcons/bc7ro23uqhun7ge954163l.png"
    }
};
