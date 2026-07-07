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
        "thím": "Chúng con",
        "dì": "Chúng con",
        "mợ": "Chúng con",
        "ông": "Chúng con",
        "bà": "Chúng con",
        "em": "Anh chị",
        "bé": "Anh chị",
        "bác sĩ": "Chúng em",
        "default": "Chúng con"
    },

    // ----------------------------------------------------
    // 0. CẤU HÌNH TRANG WEB CHUNG (METADATA & RESOURCES)
    // ----------------------------------------------------
    pageTitle: "Wedding Invitation - Chí Lập & Quế Anh",

    // Nhạc nền (Nhấp mở thiệp sẽ tự động phát bài này)
    audioUrl: "./assets/cam-emcoconyeuanhkhong.mp3",

    // Các hình ảnh trang trí, icon đồ họa của thiệp
    decorations: {
        // Hoa góc trên bên trái
        topLeftFlower: "./assets/flower-1.png",
        // Hoa góc dưới bên phải
        bottomRightFlower: "./assets/flower-2.png",
        // Dải phân cách hoa văn giữa các nội dung
        dividerSvg: "https://assets.cinelove.me/resources/dividers/16cvdln0hsto193fhow8kr.svg",
        // Nút sáp niêm phong phong bì thư ngoài trang bìa
        waxSeal: "./assets/wax-seal.webp",
        // Biểu tượng chiếc đĩa nhạc điều khiển bật/tắt
        musicIcon: "https://assets.cinelove.me/assets/audio-1.png",
        // Cành cây nhỏ trang trí phía dưới đếm ngược
        branchIcon: "https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b298e6ad-dd15-475c-aca4-c3f0850f44fc.png",
        // Hình nhân vật cô dâu chú rể chibi ở phần hộp quà cưới
        characterIcon: "./assets/character.png",
        // Cành lá trang trí footer ở cuối trang
        footerBanner: "./assets/thankyou.png",
        // Hình trái tim đệm dưới ngày cưới trong lịch đám cưới
        calendarHeart: "./assets/calen_heart_1.png"
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

        invitationMessage: "ĐẾN DỰ BUỔI TIỆC CHUNG VUI<br>CÙNG GIA ĐÌNH CHÚNG MÌNH VÀO LÚC",

        // Thời gian cử hành hôn lễ
        timeHighlight: "11 GIỜ 00 | THỨ SÁU | 17.07.2026",
        lunarTime: "(Nhằm ngày 04 tháng 06 năm Bính Ngọ)",

        // Cấu hình các địa điểm tổ chức theo tham số location trên URL (?location=1/2/3)
        locations: {
            "1": {
                title: "HÔN LỄ ĐƯỢC CỬ HÀNH TẠI",
                name: "TƯ GIA NHÀ TRAI",
                address: "410 Chi Lăng, phường Phú Xuân, Thành phố Huế",
                mapsLink: "https://maps.app.goo.gl/wRLd1W5tJzFveaZF8"
            },
            "2": {
                title: "HÔN LỄ ĐƯỢC CỬ HÀNH TẠI",
                name: "TƯ GIA NHÀ GÁI",
                address: "111 Bùi Thị Xuân, phường Thuận Hóa, Thành phố Huế",
                mapsLink: "https://maps.app.goo.gl/oYKAc2EWLEHWHrnM9"
            },
            "3": {
                title: "ĐỊA ĐIỂM TỔ CHỨC TIỆC CƯỚI",
                name: "ASIA PALACE",
                address: "32 Phạm Ngũ Lão, phường Thuận Hóa, Thành phố Huế",
                mapsLink: "https://maps.app.goo.gl/zgKDTsa7vhsgbC1o7"
            }
        }
    },

    // ----------------------------------------------------
    // 3. LỜI NGỎ YÊU THƯƠNG (QUOTE SECTION)
    // ----------------------------------------------------
    quote: {
        contentAnhChi: `“Trân trọng gửi đến {fullName},

Để đánh dấu cột mốc quan trọng nhất trong cuộc đời, chúng em trân trọng gửi lời mời đến {prefix} cùng gia đình đến dự buổi tiệc chung vui và chứng kiến khoảnh khắc hai đứa chính thức về chung một nhà.

Sự hiện diện của {prefix} là niềm vinh hạnh và là món quà tinh thần vô giá dành cho chúng em. Chúng em rất mong được đón tiếp {prefix} trong ngày vui sắp tới.

Trân trọng! ❤️”`,

        contentEmBe: `“Thương gửi {fullName},

Để đánh dấu cột mốc quan trọng nhất trong cuộc đời, anh chị gửi lời mời đến {prefix} cùng gia đình/người thương đến dự buổi tiệc chung vui và chứng kiến khoảnh khắc hai người chính thức về chung một nhà.

Sự hiện diện của {prefix} là niềm vui và là món quà tinh thần vô giá dành cho anh chị. Anh chị rất mong được đón tiếp {prefix} trong ngày vui sắp tới.

Thân mến! ❤️”`,

        contentNguoiLon: `“Kính gửi {fullName},

Để đánh dấu cột mốc quan trọng nhất trong cuộc đời, chúng con trân trọng kính mời {prefix} cùng gia đình đến dự buổi tiệc chung vui và chứng kiến khoảnh khắc hai đứa chính thức về chung một nhà.

Sự hiện diện của {prefix} là niềm vinh hạnh và là lời chúc phúc vô giá dành cho chúng con. Chúng con rất mong được đón tiếp {prefix} trong ngày vui sắp tới.

Chúng con trân trọng kính mời! ❤️”`,

        contentBan: `“Thân gửi {fullName},

Để đánh dấu cột mốc quan trọng nhất trong cuộc đời, chúng mình trân trọng gửi lời mời đến {prefix} cùng gia đình/người thương đến dự buổi tiệc chung vui và chứng kiến khoảnh khắc hai đứa chính thức về chung một nhà.

Sự hiện diện của {prefix} là niềm vinh hạnh và là món quà tinh thần vô giá dành cho chúng mình. Chúng mình rất mong được đón tiếp {prefix} trong ngày vui sắp tới.

Thân mến! ❤️”`,

        // Dành cho mặc định hoặc các trường hợp khác
        defaultContent: `“Thân gửi {fullName},

Trải qua một hành trình dài gắn bó, chúng mình sẽ chính thức bước sang một trang mới của cuộc đời. Vì {prefix} luôn là một người đặc biệt và trân quý, chúng mình mong muốn được chia sẻ niềm vui lớn lao này cùng {prefix}.

Trân trọng kính mời {prefix} cùng người thương đến dự buổi tiệc chung vui cùng gia đình chúng mình. Sự hiện diện và lời chúc phúc của {prefix} chắc chắn sẽ làm cho ngày vui của hai đứa thêm phần trọn vẹn và ý nghĩa.

Rất mong sớm được đón tiếp {prefix}! ❤️”`,

        contentParentMode: `"Kính mời {fullName},

Nhân ngày vui của hai cháu Chí Lập và Quế Anh, gia đình chúng tôi trân trọng gửi thiệp hồng kính mời {prefix} đến dự tiệc cưới chung vui cùng gia đình.

Rất mong {prefix} bớt chút thời gian quý báu đến tham dự. Sự có mặt của {prefix} là niềm vui lớn của gia đình chúng tôi.

Trân trọng kính mời!"`
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
        poemViet: "Loving is hard, but loving is real<br>And when the loving is right then it's beautiful.",
        poemEng: "My heart, the bird of the wilderness has found its sky in your eye.",

        // Lời nhắn cảm ơn chung gửi tới gia đình & bạn bè
        familyThanks: "To Our Family And Friends,<br>Thank You For Celebrating Our Special Day,<br>Supporting Us And Sharing Our Love."
    },

    // ----------------------------------------------------
    // 5. ALBUM MINI (GALLERY SECTION)
    // ----------------------------------------------------
    gallery: {
        // Ảnh lớn đầu mục Album
        welcomeImg: "./assets/welcome-filmstrip.png",

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
        loveImg: "./assets/iloveyou.png"
    },

    // ----------------------------------------------------
    // 6. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN SECTION)
    // ----------------------------------------------------
    countdown: {
        // Câu dẫn dắt lãng mạn phía trên bộ đếm ngược
        title: "Sông thì thào bằng sóng nhỏ, dẫu mai đời cay nghiệt<br>Thì gió rì rào vẫn vòng vo qua sáu vài mười hai nhịp",

        // Ngày giờ tổ chức đám cưới đích xác (định dạng YYYY-MM-DDTHH:mm:ss) để JavaScript tự động đếm ngược
        targetDate: "2026-07-17T11:00:00",

        // Câu dẫn nhỏ bên dưới bộ đếm ngược
        postText: "We treasured our moments<br>even when we're not allowed to<br>I was thinking... theres nothing wrong about you"
    },

    // ----------------------------------------------------
    // 7. LỊCH ĐÁM CƯỚI (CALENDAR SECTION)
    // ----------------------------------------------------
    calendar: {
        // Ảnh chữ "Save The Date"
        topImage: "./assets/savethedate.png",

        // Câu intro phía dưới chữ Save The Date
        introText: "I love you<br>Anh yêu cái cách em khiến anh tỏa sáng",

        // Khung polaroid overlay (Ảnh khung tối màu có phần trong suốt)
        polaroidFrame: "./assets/calendar-frame.png",

        // Ảnh của couple nằm dưới khung polaroid
        photo: "./assets/callendar.JPG",

        // Text ngày tháng nằm ở phần đuôi tối màu của khung polaroid
        polaroidText: "Thứ Sáu, 17/07/2026<br>Âm lịch 04/06 | 11:00 AM",

        // Ngày đám cưới cần làm nổi bật (sẽ được đóng dấu trái tim trên lịch)
        weddingDay: 17,

        // Câu quote thơ lãng mạn phía dưới cùng
        bottomQuote: "Anh yêu cái cách em khiến anh nghĩ<br>rằng ngoài tình yêu của em không có gì thỏa đáng"
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
        bottomQuote: "“And I need you to love me<br>Bad and the ugly”"
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
