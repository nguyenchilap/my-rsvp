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
    
    // Hiển thị nút bật tắt nhạc
    if (musicTrigger) {
        musicTrigger.style.display = 'flex';
    }
    
    // Tự động phát nhạc
    if (audio) {
        audio.play().then(function () {
            const musicIcon = document.getElementById('music-icon');
            if (musicIcon) musicIcon.classList.add('rotating');
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
    
    if (!audio || !icon) return;

    if (audio.paused) {
        audio.play();
        icon.classList.add('rotating');
    } else {
        audio.pause();
        icon.classList.remove('rotating');
    }
}
