/**
 * envelope.js
 * Quản lý tương tác trang bìa phong bì và phát/dừng nhạc nền
 */

/**
 * Tương tác mở thiệp mời cưới
 */
function unlockInvitation() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    const mainContent = document.getElementById('mainContent');
    const musicTrigger = document.getElementById('music-trigger');
    const audio = document.getElementById('bg-audio');

    // Thêm class 'opened' để mở phong bì và kích hoạt ảnh trồi lên
    if (envelopeContainer) {
        envelopeContainer.classList.add('opened');
    }

    // Hiển thị nội dung lời mời bên dưới
    if (mainContent) {
        mainContent.classList.add('visible');
    }
    
    // Tự động phát nhạc
    if (audio) {
        audio.play().then(function () {
            const musicIcon = document.getElementById('music-icon');
            const musicTrigger = document.getElementById('music-trigger');
            if (musicIcon) musicIcon.classList.add('playing');
            if (musicTrigger) musicTrigger.classList.add('playing');
        }).catch(function (error) {
            console.log("Trình duyệt chặn phát nhạc tự động. Người dùng cần bấm nút nhạc để bật.");
        });
    }

    // Ẩn dòng chữ hướng dẫn
    const tapHint = document.querySelector('.tap-hint');
    if (tapHint) {
        tapHint.style.display = 'none';
    }

    // Cuộn trang mượt mà xuống phần nội dung bên dưới sau khi ảnh trồi lên hoàn tất (khoảng 1.8 giây)
    if (mainContent) {
        setTimeout(function () {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }, 1800);
    }
}

/**
 * Điều khiển phát/dừng nhạc nền
 */
function toggleMusic() {
    const audio = document.getElementById('bg-audio');
    const icon = document.getElementById('music-icon');
    const trigger = document.getElementById('music-trigger');
    
    if (!audio) return;

    if (audio.paused) {
        audio.play();
        if (icon) icon.classList.add('playing');
        if (trigger) trigger.classList.add('playing');
    } else {
        audio.pause();
        if (icon) icon.classList.remove('playing');
        if (trigger) trigger.classList.remove('playing');
    }
}

// Tự động kích hoạt phát nhạc khi load trang hoặc khi người dùng chạm lần đầu tiên vào màn hình
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('bg-audio');
    const musicIcon = document.getElementById('music-icon');
    const musicTrigger = document.getElementById('music-trigger');

    // Đảm bảo ban đầu luôn hiển thị trạng thái đang phát (không có gạch chéo)
    if (musicIcon) musicIcon.classList.add('playing');
    if (musicTrigger) musicTrigger.classList.add('playing');

    const tryAutoplay = () => {
        if (audio && audio.paused) {
            audio.play().then(() => {
                if (musicIcon) musicIcon.classList.add('playing');
                if (musicTrigger) musicTrigger.classList.add('playing');
                removeListeners();
            }).catch(() => {
                // Trình duyệt chặn, đợi user chạm vào màn hình
            });
        }
    };

    const removeListeners = () => {
        document.removeEventListener('click', tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
    };

    // Thử phát ngay lập tức
    tryAutoplay();

    // Lắng nghe tương tác đầu tiên của người dùng để kích hoạt phát nhạc
    document.addEventListener('click', tryAutoplay);
    document.addEventListener('touchstart', tryAutoplay);
});
