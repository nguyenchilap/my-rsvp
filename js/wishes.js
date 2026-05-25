/**
 * wishes.js
 * Quản lý gửi lời chúc và hiển thị sổ lưu bút
 */

(function () {
    // Lấy instance của firestore đã được khởi tạo bên rsvp.js hoặc tự khởi tạo nếu chưa
    let firestoreDb;
    if (typeof db !== 'undefined') {
        firestoreDb = db;
    } else {
        if (!firebase.apps.length) {
            const firebaseConfig = {
                apiKey: "AIzaSyBTBXeChQVJ2FfJJ0OgFSAqlzOuDgG6Q44",
                authDomain: "wedding-boyly.firebaseapp.com",
                projectId: "wedding-boyly",
                storageBucket: "wedding-boyly.firebasestorage.app",
                messagingSenderId: "404195529860",
                appId: "1:404195529860:web:0348db7696b2d9bdd85ed1"
            };
            firebase.initializeApp(firebaseConfig);
        }
        firestoreDb = firebase.firestore();
    }

    async function handleWishes(event) {
        event.preventDefault();
        event.stopPropagation();

        const nameInput = document.getElementById('wishes-name');
        const messageInput = document.getElementById('wishes-message');
        if (!nameInput || !messageInput) return;

        const name = nameInput.value.trim().substring(0, 100);
        const message = messageInput.value.trim().substring(0, 1000);

        if (!name || !message) return;

        const submitBtn = document.getElementById('wishes-btn-text');
        const originalBtnText = submitBtn ? submitBtn.textContent : "GỬI LỜI CHÚC";

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "ĐANG GỬI...";
        }

        try {
            await firestoreDb.collection("wishes").add({
                name: name,
                message: message,
                approved: false,
                lang: "vi",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Xử lý tiền tố danh xưng giống như rsvp.js
            let prefix = "";
            let displayName = name;
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

            const successText = "Cảm ơn " + (prefix ? prefix + " " : "") + displayName + " đã gửi lời chúc!";
            const successTextEl = document.getElementById('wishes-success-text');
            if (successTextEl) {
                successTextEl.textContent = successText;
            }

            const form = document.getElementById('wishesForm');
            const successMsgBox = document.getElementById('wishes-success-message');

            if (form) form.style.display = 'none';
            if (successMsgBox) successMsgBox.style.display = 'block';

        } catch (error) {
            console.error("Lỗi khi gửi lời chúc:", error);
            alert("Đã xảy ra lỗi khi gửi lời chúc. Vui lòng thử lại!");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    }

    function initWishesForm() {
        const form = document.getElementById('wishesForm');
        if (!form) return;
        form.addEventListener('submit', handleWishes);

        const wishesNameInput = document.getElementById('wishes-name');

        setTimeout(() => {
            if (wishesNameInput && !wishesNameInput.value) {
                if (typeof getGuestInfo === 'function') {
                    const guestInfo = getGuestInfo();
                    if (guestInfo && guestInfo.fullName && guestInfo.fullName !== "Bạn" && guestInfo.fullName !== "Nga") {
                        wishesNameInput.value = guestInfo.fullName;
                    }
                }
            }
        }, 100);

        // Hiển thị tooltip sau khi tải trang một thời gian ngắn
        setTimeout(() => {
            const tooltip = document.getElementById('wishes-tooltip');
            if (tooltip) {
                tooltip.classList.add('show');
                // Tự động xóa class sau khi animation kết thúc (5s animation + buffer)
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 6000);
            }
        }, 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWishesForm);
    } else {
        initWishesForm();
    }

    // Logic tạo trái tim bay
    let heartsInterval = null;

    function startFloatingHearts() {
        const container = document.getElementById('floating-hearts-container');
        if (!container) return;

        heartsInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = ['❤️', '💗', '💓', '💕'][Math.floor(Math.random() * 4)];
            heart.style.left = (Math.random() * 90 + 4) + '%';
            heart.style.fontSize = (Math.random() * 14 + 10) + 'px';

            const duration = Math.random() * 3 + 3; // 3s đến 6s
            heart.style.animationDuration = duration + 's';

            container.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }, 300); // Mỗi 300ms tạo 1 trái tim
    }

    function stopFloatingHearts() {
        if (heartsInterval) {
            clearInterval(heartsInterval);
            heartsInterval = null;
        }
    }

    // Gắn hàm vào window để gọi từ inline onclick
    window.openWishesSheet = async function () {
        const sheet = document.getElementById('wishes-sheet');
        const overlay = document.getElementById('wishes-sheet-overlay');
        const content = document.getElementById('wishes-sheet-content');

        if (sheet && overlay) {
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.style.opacity = '1';
                sheet.style.bottom = '0';
            }, 10);
        }

        startFloatingHearts();

        if (content) {
            content.innerHTML = '<div style="text-align:center; padding:20px; color:#666;">Đang tải...</div>';

            try {
                const snapshot = await firestoreDb.collection("wishes")
                    .where("approved", "==", true)
                    .orderBy("createdAt", "desc")
                    .get();

                if (snapshot.empty) {
                    content.innerHTML = '<div style="text-align:center; padding:20px; color:#666;">Chưa có lời chúc nào.</div>';
                    return;
                }

                let html = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    let timeString = '';
                    if (data.createdAt) {
                        const date = data.createdAt.toDate();
                        timeString = date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                    }
                    html += `
                        <div class="wish-item">
                            <div class="wish-name">${data.name || 'Khách mời'}</div>
                            <div class="wish-message">${data.message || ''}</div>
                            <div class="wish-time">${timeString}</div>
                        </div>
                    `;
                });
                content.innerHTML = html;
            } catch (err) {
                console.error("Lỗi tải lời chúc:", err);
                // Nếu bị lỗi do chưa tạo index orderBy, firestore sẽ trả về lỗi kèm link để tạo index. 
                // Do chúng ta dùng compound query (where + orderBy) nên bắt buộc phải có index.
                // Thử fallback query cơ bản nếu có lỗi index.
                if (err.message && err.message.includes('index')) {
                    console.log("Đang fallback về query cơ bản do thiếu index Firestore...");
                    try {
                        const fallbackSnapshot = await firestoreDb.collection("wishes").get();
                        let items = [];
                        fallbackSnapshot.forEach(doc => {
                            const data = doc.data();
                            if (data.approved === true) {
                                items.push(data);
                            }
                        });

                        items.sort((a, b) => {
                            const tA = a.createdAt ? a.createdAt.toMillis() : 0;
                            const tB = b.createdAt ? b.createdAt.toMillis() : 0;
                            return tB - tA;
                        });

                        if (items.length === 0) {
                            content.innerHTML = '<div style="text-align:center; padding:20px; color:#666;">Chưa có lời chúc nào.</div>';
                            return;
                        }

                        let html = '';
                        items.forEach(data => {
                            let timeString = '';
                            if (data.createdAt) {
                                const date = data.createdAt.toDate();
                                timeString = date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                            }
                            html += `
                                <div class="wish-item">
                                    <div class="wish-name">${data.name || 'Khách mời'}</div>
                                    <div class="wish-message">${data.message || ''}</div>
                                    <div class="wish-time">${timeString}</div>
                                </div>
                            `;
                        });
                        content.innerHTML = html;
                    } catch (fallbackErr) {
                        content.innerHTML = '<div style="text-align:center; padding:20px; color:#f44336;">Không thể tải dữ liệu lời chúc.</div>';
                    }
                } else {
                    content.innerHTML = '<div style="text-align:center; padding:20px; color:#f44336;">Đã xảy ra lỗi khi tải lời chúc.</div>';
                }
            }
        }
    };

    window.closeWishesSheet = function () {
        const sheet = document.getElementById('wishes-sheet');
        const overlay = document.getElementById('wishes-sheet-overlay');

        if (sheet && overlay) {
            sheet.style.bottom = '-100%';
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                stopFloatingHearts();

                // Dọn dẹp trái tim cũ
                const container = document.getElementById('floating-hearts-container');
                if (container) container.innerHTML = '';
            }, 300); // 300ms match with css transition
        }
    };
})();
