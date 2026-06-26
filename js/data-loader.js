/**
 * data-loader.js
 * Tự động điền dữ liệu động từ constants.js vào HTML DOM khi trang tải xong
 */

document.addEventListener("DOMContentLoaded", function () {
    // Khởi tạo và nạp toàn bộ dữ liệu động từ constants.js
    initWeddingData();
});

/**
 * Lấy chi tiết thông tin khách mời từ URL
 * Hỗ trợ đồng thời cả 2 cách truyền tham số:
 * Cách 1: ?prefix=anh&name=Tuấn (Premium)
 * Cách 2: ?to=Anh+Tuấn (Truyền thống)
 */
function getGuestInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    let prefix = urlParams.get('prefix');
    let name = urlParams.get('name');

    if (prefix || name) {
        prefix = prefix ? prefix.trim() : "";
        name = name ? name.trim() : "";

        // Viết hoa chữ cái đầu của prefix
        let formattedPrefix = prefix;
        if (prefix.length > 0) {
            formattedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
        }

        const fullName = (formattedPrefix + " " + name).trim();
        return {
            prefix: prefix,
            name: name,
            fullName: fullName
        };
    }

    // Tự động phân tách nếu dùng tham số ?to=... cũ
    const toParam = urlParams.get('to');
    if (toParam) {
        const fullName = decodeURIComponent(toParam).trim();
        const words = fullName.split(" ");
        const firstWord = words[0].toLowerCase();
        const validPrefixes = ["anh", "chị", "cô", "bác", "chú", "dì", "ông", "bà", "bạn", "em", "cháu", "bé"];

        let inferredPrefix = "";
        let inferredName = fullName;

        if (firstWord === "gia" && words[1]?.toLowerCase() === "đình" && validPrefixes.includes(words[2]?.toLowerCase())) {
            inferredPrefix = "Gia đình " + words[2].charAt(0).toUpperCase() + words[2].slice(1).toLowerCase();
            inferredName = words.slice(3).join(" ");
        } else if (firstWord === "gia" && words[1]?.toLowerCase() === "đình") {
            inferredPrefix = "Gia đình";
            inferredName = words.slice(2).join(" ");
        } else if (firstWord === "bác" && words[1]?.toLowerCase() === "sĩ") {
            inferredPrefix = "Bác sĩ";
            inferredName = words.slice(2).join(" ");
        } else if (firstWord === "vợ" && words[1]?.toLowerCase() === "chồng" && words[2]?.toLowerCase() === "bác" && words[3]?.toLowerCase() === "sĩ") {
            inferredPrefix = "Vợ chồng Bác sĩ";
            inferredName = words.slice(4).join(" ");
        } else if (firstWord === "vợ" && words[1]?.toLowerCase() === "chồng" && validPrefixes.includes(words[2]?.toLowerCase())) {
            inferredPrefix = "Vợ chồng " + words[2].charAt(0).toUpperCase() + words[2].slice(1).toLowerCase();
            inferredName = words.slice(3).join(" ");
        } else if (validPrefixes.includes(firstWord)) {
            inferredPrefix = words[0];
            inferredName = words.slice(1).join(" ");
        }

        return {
            prefix: inferredPrefix,
            name: inferredName,
            fullName: fullName
        };
    }

    // Mặc định
    return {
        prefix: "Chị",
        name: "Nga",
        fullName: WEDDING_DATA.intro.defaultGuestName
    };
}

/**
 * Xác định danh xưng của hai vợ chồng xưng hô với khách mời dựa trên prefix lấy từ constants.js
 */
function getCouplePronoun(prefix) {
    if (!prefix) {
        return WEDDING_DATA.couplePronounMap ? WEDDING_DATA.couplePronounMap["default"] || "Chúng mình" : "Chúng mình";
    }
    let cleanPrefix = prefix.toLowerCase().trim();

    if (cleanPrefix.startsWith("vợ chồng ")) {
        cleanPrefix = cleanPrefix.replace("vợ chồng ", "").trim();
    } else if (cleanPrefix.startsWith("gia đình ")) {
        cleanPrefix = cleanPrefix.replace("gia đình ", "").trim();
    }

    if (WEDDING_DATA.couplePronounMap && WEDDING_DATA.couplePronounMap[cleanPrefix]) {
        return WEDDING_DATA.couplePronounMap[cleanPrefix];
    }
    return WEDDING_DATA.couplePronounMap ? WEDDING_DATA.couplePronounMap["default"] || "Chúng con" : "Chúng con";
}

/**
 * Nạp dữ liệu động từ constants.js điền vào các thẻ HTML tương ứng.
 */
function initWeddingData() {
    // Cập nhật tiêu đề trang
    document.title = WEDDING_DATA.pageTitle;

    // Lấy thông tin khách mời và danh xưng tương ứng
    const guestInfo = getGuestInfo();
    const guestName = guestInfo.fullName;
    const prefix = guestInfo.prefix;
    const couplePronoun = getCouplePronoun(prefix);

    // Hàm tiện ích thay thế danh xưng của cô dâu chú rể ("Chúng mình" -> "Chúng em"/"Chúng con")
    function replacePronoun(text) {
        if (!text) return text;
        return text
            .replace(/Chúng mình/g, couplePronoun)
            .replace(/chúng mình/g, couplePronoun.toLowerCase())
            .replace(/CHÚNG MÌNH/g, couplePronoun.toUpperCase());
    }

    // Hàm tiện ích thay thế đại từ xưng hô dành cho khách mời (Ví dụ thay thế "Chị"/"chị" mặc định thành prefix tương ứng)
    function replaceGuestPronoun(text) {
        if (!text || !prefix) return text;
        const guestPronoun = prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
        return text
            .replace(/(?<=[\s,!.?“])Chị(?=[\s,!.?”]|$)/g, guestPronoun)
            .replace(/(?<=[\s,!.?“])chị(?=[\s,!.?”]|$)/g, guestPronoun.toLowerCase());
    }

    // Thay thế tên khách mời vào lời ngỏ tâm thư và cập nhật danh xưng dựa vào đại từ
    let cleanPrefix = prefix ? prefix.toLowerCase().trim() : "";
    if (cleanPrefix.startsWith("vợ chồng ")) {
        cleanPrefix = cleanPrefix.replace("vợ chồng ", "").trim();
    } else if (cleanPrefix.startsWith("gia đình ")) {
        cleanPrefix = cleanPrefix.replace("gia đình ", "").trim();
    }

    let quoteTemplate = WEDDING_DATA.quote.defaultContent || "";

    const urlParams = new URLSearchParams(window.location.search);
    const isParentMode = urlParams.get('parent') === '1' || urlParams.get('parent') === 'true';

    if (isParentMode) {
        quoteTemplate = WEDDING_DATA.quote.contentParentMode || quoteTemplate;
    } else if (["anh", "chị", "bác sĩ"].includes(cleanPrefix)) {
        quoteTemplate = WEDDING_DATA.quote.contentAnhChi || quoteTemplate;
    } else if (["em", "bé"].includes(cleanPrefix)) {
        quoteTemplate = WEDDING_DATA.quote.contentEmBe || quoteTemplate;
    } else if (["cô", "bác", "chú", "dì", "cậu", "mợ", "ông", "bà"].includes(cleanPrefix)) {
        quoteTemplate = WEDDING_DATA.quote.contentNguoiLon || quoteTemplate;
    } else if (["bạn"].includes(cleanPrefix)) {
        quoteTemplate = WEDDING_DATA.quote.contentBan || quoteTemplate;
    }

    let displayPrefix = prefix ? (prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()) : "Bạn";
    if (prefix && prefix.toLowerCase().trim().startsWith("vợ chồng")) {
        displayPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
    }

    let quoteContent = quoteTemplate
        .replace(/{fullName}/g, guestName || "Bạn")
        .replace(/{prefix}/g, displayPrefix);

    // Thiết lập các thuộc tính CSS Custom Properties (CSS variables)
    document.documentElement.style.setProperty('--wax-seal-url', `url('${WEDDING_DATA.decorations.waxSeal}')`);
    document.documentElement.style.setProperty('--calendar-heart-url', `url('${WEDDING_DATA.decorations.calendarHeart}')`);
    document.documentElement.style.setProperty('--filmstrip-url', `url('${WEDDING_DATA.gallery.welcomeImg}')`);

    // Thiết lập liên kết nhạc nền
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        bgAudio.src = WEDDING_DATA.audioUrl;
    }

    // --- MAPPING CÁC HÌNH ẢNH TRANG TRÍ ---
    setElementSrc('.bg-flower.top-left-1', WEDDING_DATA.decorations.topLeftFlower);
    setElementSrc('.bg-flower.top-left-2', WEDDING_DATA.decorations.topLeftFlower);
    setElementSrc('.bg-flower.bottom-right', WEDDING_DATA.decorations.bottomRightFlower);
    setElementSrc('#music-icon', WEDDING_DATA.decorations.musicIcon);
    setElementSrc('.sec-intro .divider', WEDDING_DATA.decorations.dividerSvg);
    setElementSrc('#countdown-branch', WEDDING_DATA.decorations.branchIcon);
    setElementSrc('#calendar-top-img', WEDDING_DATA.calendar.topImage);
    setElementSrc('#registry-character-icon', WEDDING_DATA.decorations.characterIcon);
    setElementSrc('.footer-banner img', WEDDING_DATA.decorations.footerBanner);
    setElementSrc('#envelope-card-img', WEDDING_DATA.envelope.envelopeImage);

    // QR Code Hộp Quà Cưới
    const qrBox = document.querySelector('.qr-box');
    if (qrBox) {
        qrBox.style.backgroundImage = `url('${WEDDING_DATA.registry.qrCodeUrl}')`;
    }

    // --- MAPPING NỘI DUNG PHONG BÌ THƯ ---
    setElementText('#envelope-header-left', WEDDING_DATA.envelope.headerLeft);
    setElementText('#envelope-header-center', WEDDING_DATA.envelope.headerCenter);
    setElementText('#envelope-header-right', WEDDING_DATA.envelope.headerRight);
    setElementText('.envelope-title', WEDDING_DATA.envelope.title);
    setElementText('.tap-hint', WEDDING_DATA.envelope.tapHint);
    setElementText('#envelope-pre-guest-text', WEDDING_DATA.envelope.preGuestText);

    // --- MAPPING NỘI DUNG LỜI MỜI CHÍNH ---
    setElementText('.sec-intro .main-head', WEDDING_DATA.intro.mainHead);
    setElementText('.sec-intro .sub-head', WEDDING_DATA.intro.subHead);
    setElementText('#pre-guest-text', WEDDING_DATA.intro.preGuestText);
    setElementText('.guest-name', guestName);
    setElementHtml('#invitation-message', replacePronoun(WEDDING_DATA.intro.invitationMessage));
    setElementText('.time-highlight', WEDDING_DATA.intro.timeHighlight);
    setElementText('.lunar-time', WEDDING_DATA.intro.lunarTime);
    // Xác định địa điểm dựa vào tham số location trên URL, mặc định là 2 (Nhà gái)
    const urlParamsLocation = new URLSearchParams(window.location.search);
    let locationParam = urlParamsLocation.get('location');
    if (!locationParam || !WEDDING_DATA.intro.locations[locationParam]) {
        locationParam = "2";
    }
    const locationData = WEDDING_DATA.intro.locations[locationParam];

    setElementText('.location-title', locationData.title);
    setElementText('.location-name', locationData.name);
    setElementText('.location-address', locationData.address);

    const mapsBtn = document.querySelector('.sec-intro .btn-action');
    if (mapsBtn) {
        mapsBtn.href = locationData.mapsLink;
    }

    // --- MAPPING NỘI DUNG LỜI NGỎ ---
    setElementText('.sec-quote .quote-p', quoteContent);

    // --- MAPPING THÔNG TIN CẶP ĐÔI ---
    setElementSrc('.couple-banner-img', WEDDING_DATA.couple.bannerImg);
    setElementText('.sec-couple .quote-en', WEDDING_DATA.couple.quoteEn);

    // Chú rể
    setElementSrc('#groom-img', WEDDING_DATA.couple.groom.image);
    setElementText('#groom-name', WEDDING_DATA.couple.groom.name);
    setElementText('#groom-role', WEDDING_DATA.couple.groom.role);

    // Cô dâu
    setElementSrc('#bride-img', WEDDING_DATA.couple.bride.image);
    setElementText('#bride-name', WEDDING_DATA.couple.bride.name);
    setElementText('#bride-role', WEDDING_DATA.couple.bride.role);

    // Thơ tình và lời cảm ơn
    setElementHtml('#couple-poem-viet', WEDDING_DATA.couple.poemViet);
    setElementHtml('#couple-poem-eng', WEDDING_DATA.couple.poemEng);
    setElementHtml('#couple-thanks', WEDDING_DATA.couple.familyThanks);

    // --- MAPPING ALBUM MINI ---

    // Điền ảnh cưới trực tiếp vào các khung hình trong filmstrip
    setElementSrc('#gallery-img-1', WEDDING_DATA.gallery.images[0]);
    setElementSrc('#gallery-img-2', WEDDING_DATA.gallery.images[1]);
    setElementSrc('#gallery-img-3', WEDDING_DATA.gallery.images[2]);

    setElementText('#gallery-poem-1', WEDDING_DATA.gallery.poemBox.line1);
    setElementText('#gallery-poem-2', WEDDING_DATA.gallery.poemBox.line2);
    setElementText('#gallery-poem-3', WEDDING_DATA.gallery.poemBox.line3);

    // --- MAPPING SUB GALLERY (BỐ CỤC ĐẶC BIỆT) ---
    // Ảnh chính cho section bố cục đặc biệt
    setElementSrc('#sub-gallery-photo-img', WEDDING_DATA.subGallery.specialPhoto || WEDDING_DATA.gallery.images[0]);
    // 2 Ảnh phụ
    setElementSrc('#sub-gallery-extra-1', WEDDING_DATA.subGallery.extraPhoto1 || WEDDING_DATA.gallery.images[1]);
    setElementSrc('#sub-gallery-extra-2', WEDDING_DATA.subGallery.extraPhoto2 || WEDDING_DATA.gallery.images[2]);
    // Ảnh I LOVE YOU
    setElementSrc('#sub-gallery-love-img', WEDDING_DATA.subGallery.loveImg);

    // --- MAPPING ĐẾM NGƯỢC ---
    setElementHtml('#countdown-title-text', WEDDING_DATA.countdown.title);
    setElementHtml('#countdown-post-text', WEDDING_DATA.countdown.postText);

    // --- MAPPING LỊCH ĐÁM CƯỚI ---
    setElementSrc('#calendar-top-img', WEDDING_DATA.calendar.topImage);
    setElementHtml('#calendar-intro-text', WEDDING_DATA.calendar.introText);
    setElementSrc('#calendar-polaroid-photo', WEDDING_DATA.calendar.photo);
    setElementSrc('#calendar-polaroid-frame', WEDDING_DATA.calendar.polaroidFrame);
    setElementHtml('#calendar-polaroid-text', WEDDING_DATA.calendar.polaroidText);
    setElementHtml('#calendar-quote-text', WEDDING_DATA.calendar.bottomQuote);

    // Highlight ngày đám cưới
    setupCalendarHighlight();

    // --- MAPPING BIỂU MẪU RSVP ---
    setElementText('#rsvp-card-title', WEDDING_DATA.rsvp.title);
    setElementText('#rsvp-label-name', WEDDING_DATA.rsvp.labelName);

    const rsvpNameInput = document.getElementById('rsvp-name');
    if (rsvpNameInput) {
        rsvpNameInput.placeholder = WEDDING_DATA.rsvp.placeholderName;
        if (window.location.search.includes('to=') || window.location.search.includes('name=')) {
            rsvpNameInput.value = guestName;
        }
    }

    setElementText('#rsvp-label-attendance', WEDDING_DATA.rsvp.labelAttendance);
    setElementText('#rsvp-text-yes', WEDDING_DATA.rsvp.optionYes);
    setElementText('#rsvp-text-no', WEDDING_DATA.rsvp.optionNo);
    setElementText('#rsvp-label-count', WEDDING_DATA.rsvp.labelCount);
    setElementText('#rsvp-btn-text', WEDDING_DATA.rsvp.btnSubmit);
    setElementHtml('#rsvp-quote-text', WEDDING_DATA.rsvp.bottomQuote);

    // --- MAPPING HỘP QUÀ CƯỚI ---
    setElementText('#registry-title-text', WEDDING_DATA.registry.title);

    // Ẩn/hiện Hộp Quà Cưới dựa vào tham số qr=1 trên url
    if (urlParams.get('qr') === '1') {
        const secRegistry = document.getElementById('sec-registry');
        if (secRegistry) {
            secRegistry.style.display = '';
        }
    }
}

/**
 * Các hàm hỗ trợ điền nội dung vào DOM
 */
function setElementText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text !== undefined) {
        el.textContent = text;
    }
}

function setElementHtml(selector, html) {
    const el = document.querySelector(selector);
    if (el && html !== undefined) {
        el.innerHTML = html;
    }
}

function setElementSrc(selector, src) {
    const el = document.querySelector(selector);
    if (el && src !== undefined) {
        el.src = src;
    }
}

function setupCalendarHighlight() {
    const targetDay = WEDDING_DATA.calendar.weddingDay;
    const daysInCalendar = document.querySelectorAll('.calendar-grid div:not(.day-header)');

    daysInCalendar.forEach(div => {
        div.classList.remove('wedding-day');
        if (div.textContent.trim() === String(targetDay)) {
            div.classList.add('wedding-day');
        }
    });
}

// --- ANIMATION OBSERVER ---
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.envelope-header, .couple-header-decor, .gallery-header-decor, .extra-text-bar, .sweet-wedding-header, .fade-up, .fade-in, .zoom-in, .fade-in-left, .fade-in-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Chỉ chạy animation 1 lần
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback: nếu trình duyệt không hỗ trợ, hiển thị ngay
        animatedElements.forEach(el => el.classList.add('in-view'));
    }
});
