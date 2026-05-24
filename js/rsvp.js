/**
 * rsvp.js
 * Quản lý gửi phản hồi xác nhận tham dự (RSVP Form Submission)
 */

/**
 * Xử lý biểu mẫu RSVP phản hồi của khách hàng
 */
function handleRSVP(event) {
    event.preventDefault();
    const nameInput = document.getElementById('rsvp-name');
    if (!nameInput) return;

    const name = nameInput.value.trim();
    if (!name) return;

    // Lấy thông điệp cảm ơn thành công và chèn tên khách vào biểu thức {name}
    let successMessage = WEDDING_DATA.rsvp.successAlert;
    successMessage = successMessage.replace("{name}", name);

    alert(successMessage);
    
    // Khởi động lại form
    const form = document.getElementById('rsvpForm');
    if (form) form.reset();
}
