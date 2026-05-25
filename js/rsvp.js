/**
 * rsvp.js
 * Quản lý gửi phản hồi xác nhận tham dự (RSVP Form Submission)
 * Dùng Firebase Compat SDK (không phải ES module) để tương thích file:// và mọi môi trường
 */

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBTBXeChQVJ2FfJJ0OgFSAqlzOuDgG6Q44",
    authDomain: "wedding-boyly.firebaseapp.com",
    projectId: "wedding-boyly",
    storageBucket: "wedding-boyly.firebasestorage.app",
    messagingSenderId: "404195529860",
    appId: "1:404195529860:web:0348db7696b2d9bdd85ed1"
};

// Khởi tạo Firebase & Firestore (Compat SDK, dùng qua window.firebase)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

/**
 * Xử lý biểu mẫu RSVP phản hồi của khách hàng và lưu trữ vào Firestore
 */
async function handleRSVP(event) {
    event.preventDefault();
    event.stopPropagation();

    const nameInput = document.getElementById('rsvp-name');
    if (!nameInput) return;

    // Chuẩn hóa và cắt ngắn tên theo giới hạn rule Firestore (max 100)
    const name = nameInput.value.trim().substring(0, 100);
    if (!name) return;

    // Lấy trạng thái tham dự
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
    const isAttending = attendanceRadio ? (attendanceRadio.value === 'yes') : true;

    // Lấy số lượng người tham dự (Nếu không đi thì mặc định 0)
    const guestCountSelect = document.getElementById('rsvp-count');
    const guestCount = isAttending ? (guestCountSelect ? parseInt(guestCountSelect.value, 10) : 1) : 0;

    // Trạng thái Loading trên nút bấm gửi
    const submitBtn = document.getElementById('rsvp-btn-text');
    const originalBtnText = submitBtn ? submitBtn.textContent : "GỬI XÁC NHẬN";

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "ĐANG GỬI...";
    }

    try {
        // Gửi dữ liệu chính xác theo cấu trúc và Security Rules của Firestore
        await db.collection("rsvps").add({
            name: name,
            isAttending: isAttending,
            guestCount: guestCount,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Xử lý tiền tố danh xưng từ tên nhập vào hoặc URL
        let prefix = "";
        let displayName = nameInput.value.trim();
        const words = displayName.split(" ");
        const firstWord = words[0].toLowerCase();
        const validPrefixes = ["anh", "chị", "cô", "bác", "chú", "dì", "ông", "bà", "bạn", "em", "cháu", "bé"];

        if (firstWord === "gia" && words[1] && words[1].toLowerCase() === "đình") {
            prefix = "Gia đình";
            displayName = words.slice(2).join(" ");
        } else if (firstWord === "vợ" && words[1] && words[1].toLowerCase() === "chồng" && words[2] && validPrefixes.includes(words[2].toLowerCase())) {
            prefix = "Vợ chồng " + words[2].charAt(0).toUpperCase() + words[2].slice(1).toLowerCase();
            displayName = words.slice(3).join(" ");
        } else if (validPrefixes.includes(firstWord)) {
            prefix = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
            displayName = words.slice(1).join(" ");
        } else if (typeof getGuestInfo === 'function') {
            const urlInfo = getGuestInfo();
            if (urlInfo && urlInfo.prefix) {
                prefix = urlInfo.prefix.charAt(0).toUpperCase() + urlInfo.prefix.slice(1).toLowerCase();
            }
        }

        const successText = "Cảm ơn " + (prefix ? prefix + " " : "") + displayName + " đã xác nhận!";

        // Ẩn form, hiển thị giao diện thành công (không reload, không alert)
        const form = document.getElementById('rsvpForm');
        const successMsgBox = document.getElementById('rsvp-success-message');
        const successTextEl = document.getElementById('rsvp-success-text');

        if (successTextEl) successTextEl.textContent = successText;

        if (form) form.style.display = 'none';
        if (successMsgBox) successMsgBox.style.display = 'block';

    } catch (error) {
        console.error("Lỗi khi gửi xác nhận tham dự:", error);
        alert("Đã xảy ra lỗi khi gửi xác nhận. Vui lòng thử lại!");
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
}

/**
 * Khởi tạo Form RSVP, gán sự kiện lắng nghe
 */
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    // Gán sự kiện submit - chặn hành vi mặc định (GET reload)
    form.addEventListener('submit', handleRSVP);

    // Ẩn/hiện mượt mà phần chọn số lượng người khi chọn không tham dự
    const attendanceRadios = form.querySelectorAll('input[name="attendance"]');
    const guestCountGroup = document.getElementById('guest-count-group');

    function toggleGuestCountVisibility() {
        const selected = form.querySelector('input[name="attendance"]:checked');
        if (selected && selected.value === 'no') {
            guestCountGroup.classList.add('hidden');
        } else {
            guestCountGroup.classList.remove('hidden');
        }
    }

    attendanceRadios.forEach(function(radio) {
        radio.addEventListener('change', toggleGuestCountVisibility);
    });

    toggleGuestCountVisibility();
}

// Khởi chạy khi DOM sẵn sàng
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRSVPForm);
} else {
    initRSVPForm();
}
