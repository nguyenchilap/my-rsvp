/**
 * admin.js
 * Quản lý dữ liệu Firebase (Wishes & RSVPs) với Authentication
 */

// Khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBTBXeChQVJ2FfJJ0OgFSAqlzOuDgG6Q44",
    authDomain: "wedding-boyly.firebaseapp.com",
    projectId: "wedding-boyly",
    storageBucket: "wedding-boyly.firebasestorage.app",
    messagingSenderId: "404195529860",
    appId: "1:404195529860:web:0348db7696b2d9bdd85ed1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

// UI Elements
const loginScreen = document.getElementById('login-screen');
const appContent = document.getElementById('app-content');
const btnGoogleLogin = document.getElementById('btn-google-login');
const btnLogout = document.getElementById('btn-logout');
const adminEmailSpan = document.getElementById('admin-email');
const loginError = document.getElementById('login-error');

const ALLOWED_ADMIN_EMAILS = ["lapnguyen18620@gmail.com"];

// Xử lý trạng thái Auth
auth.onAuthStateChanged((user) => {
    if (user) {
        // Đã đăng nhập
        if (ALLOWED_ADMIN_EMAILS.includes(user.email)) {
            // Là admin hợp lệ
            loginScreen.style.display = 'none';
            appContent.style.display = 'block';
            adminEmailSpan.innerText = user.email;
            fetchData();
        } else {
            // Không phải admin
            auth.signOut().then(() => {
                loginError.innerText = `Email ${user.email} không có quyền truy cập.`;
                loginError.style.display = 'block';
            });
        }
    } else {
        // Chưa đăng nhập
        loginScreen.style.display = 'flex';
        appContent.style.display = 'none';
        adminEmailSpan.innerText = '';
    }
});

// Đăng nhập Google
btnGoogleLogin.addEventListener('click', () => {
    loginError.style.display = 'none';
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        loginError.innerText = error.message;
        loginError.style.display = 'block';
    });
});

// Đăng xuất
btnLogout.addEventListener('click', () => {
    auth.signOut();
});

// Formatter ngày tháng
function formatDateTime(timestamp) {
    if (!timestamp) return "";
    try {
        let date;
        if (typeof timestamp.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }
        return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
        return "";
    }
}

// Lấy dữ liệu và render
async function fetchData() {
    try {
        // Fetch Wishes
        const wishesSnapshot = await db.collection("wishes").orderBy("createdAt", "desc").get();
        let wishesHtml = '';
        let totalWishes = 0;
        
        wishesSnapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            totalWishes++;
            
            const statusBadge = data.approved 
                ? '<span class="badge-success">Đã duyệt</span>' 
                : '<span class="badge-warning">Chưa duyệt</span>';
                
            const toggleBtnClass = data.approved ? "btn-secondary" : "btn-success";
            const toggleBtnText = data.approved ? "Bỏ duyệt" : "Duyệt";
            
            wishesHtml += `
                <tr>
                    <td>${formatDateTime(data.createdAt)}</td>
                    <td class="fw-bold">${data.name || 'Khách mời'}</td>
                    <td>${data.message || ''}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm ${toggleBtnClass} mb-1" onclick="toggleWish('${id}', ${data.approved})">${toggleBtnText}</button>
                        <button class="btn btn-sm btn-danger mb-1" onclick="deleteWish('${id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
        
        if (totalWishes === 0) {
            wishesHtml = '<tr><td colspan="5" class="text-center text-muted">Chưa có lời chúc nào.</td></tr>';
        }
        document.getElementById("wishes-table-body").innerHTML = wishesHtml;
        document.getElementById("stat-wishes").innerText = totalWishes;
        
        // Fetch RSVPs
        const rsvpsSnapshot = await db.collection("rsvps").orderBy("createdAt", "desc").get();
        let rsvpsHtml = '';
        let totalAttendingGroups = 0;
        let totalNotAttending = 0;
        let totalGuests = 0;
        
        rsvpsSnapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            
            if (data.isAttending) {
                totalAttendingGroups++;
                totalGuests += parseInt(data.guestCount || 1, 10);
            } else {
                totalNotAttending++;
            }
            
            const attendBadge = data.isAttending 
                ? '<span class="badge-success">Tham gia</span>' 
                : '<span class="badge-danger">Không tham gia</span>';
                
            rsvpsHtml += `
                <tr>
                    <td>${formatDateTime(data.createdAt)}</td>
                    <td class="fw-bold">${data.name || 'Khách mời'}</td>
                    <td>${attendBadge}</td>
                    <td>${data.isAttending ? parseInt(data.guestCount || 1, 10) : 0}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteRsvp('${id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
        
        if (rsvpsSnapshot.empty) {
            rsvpsHtml = '<tr><td colspan="5" class="text-center text-muted">Chưa có khách xác nhận.</td></tr>';
        }
        
        document.getElementById("rsvps-table-body").innerHTML = rsvpsHtml;
        document.getElementById("stat-attending-groups").innerText = totalAttendingGroups;
        document.getElementById("stat-total-guests").innerText = totalGuests;
        document.getElementById("stat-not-attending").innerText = totalNotAttending;
        
    } catch (error) {
        console.error("Error fetching data:", error);
        
        // Fallback for missing index error
        if (error.message && (error.message.includes("index") || error.message.includes("Index"))) {
            console.log("Thử fetch không có orderBy do lỗi thiếu index...");
            fallbackFetchData();
        } else {
            alert("Lỗi tải dữ liệu: " + error.message);
        }
    }
}

// Fetch fallback không dùng orderBy() nếu thiếu Index trên Firestore
async function fallbackFetchData() {
    try {
        const wishesSnapshot = await db.collection("wishes").get();
        let itemsWishes = [];
        wishesSnapshot.forEach(doc => itemsWishes.push({id: doc.id, ...doc.data()}));
        itemsWishes.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        
        let wishesHtml = '';
        itemsWishes.forEach(data => {
            const statusBadge = data.approved 
                ? '<span class="badge-success">Đã duyệt</span>' 
                : '<span class="badge-warning">Chưa duyệt</span>';
                
            const toggleBtnClass = data.approved ? "btn-secondary" : "btn-success";
            const toggleBtnText = data.approved ? "Bỏ duyệt" : "Duyệt";
            
            wishesHtml += `
                <tr>
                    <td>${formatDateTime(data.createdAt)}</td>
                    <td class="fw-bold">${data.name || 'Khách mời'}</td>
                    <td>${data.message || ''}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm ${toggleBtnClass} mb-1" onclick="toggleWish('${data.id}', ${data.approved})">${toggleBtnText}</button>
                        <button class="btn btn-sm btn-danger mb-1" onclick="deleteWish('${data.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("wishes-table-body").innerHTML = itemsWishes.length ? wishesHtml : '<tr><td colspan="5" class="text-center text-muted">Chưa có lời chúc nào.</td></tr>';
        document.getElementById("stat-wishes").innerText = itemsWishes.length;
        
        const rsvpsSnapshot = await db.collection("rsvps").get();
        let itemsRsvps = [];
        rsvpsSnapshot.forEach(doc => itemsRsvps.push({id: doc.id, ...doc.data()}));
        itemsRsvps.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        
        let rsvpsHtml = '';
        let totalAttendingGroups = 0, totalGuests = 0, totalNotAttending = 0;
        itemsRsvps.forEach(data => {
            if (data.isAttending) {
                totalAttendingGroups++;
                totalGuests += parseInt(data.guestCount || 1, 10);
            } else {
                totalNotAttending++;
            }
            const attendBadge = data.isAttending 
                ? '<span class="badge-success">Tham gia</span>' 
                : '<span class="badge-danger">Không tham gia</span>';
            rsvpsHtml += `
                <tr>
                    <td>${formatDateTime(data.createdAt)}</td>
                    <td class="fw-bold">${data.name || 'Khách mời'}</td>
                    <td>${attendBadge}</td>
                    <td>${data.isAttending ? parseInt(data.guestCount || 1, 10) : 0}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="deleteRsvp('${data.id}')">Xóa</button></td>
                </tr>
            `;
        });
        document.getElementById("rsvps-table-body").innerHTML = itemsRsvps.length ? rsvpsHtml : '<tr><td colspan="5" class="text-center text-muted">Chưa có khách xác nhận.</td></tr>';
        document.getElementById("stat-attending-groups").innerText = totalAttendingGroups;
        document.getElementById("stat-total-guests").innerText = totalGuests;
        document.getElementById("stat-not-attending").innerText = totalNotAttending;
        
    } catch(err) {
        console.error("Lỗi fallback fetch:", err);
    }
}

// Hành động: Cập nhật trạng thái duyệt Lời chúc
window.toggleWish = async function(id, currentStatus) {
    if (confirm(`Bạn có chắc muốn ${currentStatus ? 'BỎ DUYỆT' : 'DUYỆT'} lời chúc này?`)) {
        try {
            await db.collection("wishes").doc(id).update({
                approved: !currentStatus
            });
            fetchData(); // Tải lại bảng
        } catch (error) {
            console.error("Error updating wish:", error);
            alert("Lỗi khi cập nhật trạng thái: " + error.message);
        }
    }
};

// Hành động: Xóa Lời chúc
window.deleteWish = async function(id) {
    if (confirm("Bạn có chắc chắn muốn XÓA vĩnh viễn lời chúc này?")) {
        try {
            await db.collection("wishes").doc(id).delete();
            fetchData();
        } catch (error) {
            console.error("Error deleting wish:", error);
            alert("Lỗi khi xóa: " + error.message);
        }
    }
};

// Hành động: Xóa RSVP
window.deleteRsvp = async function(id) {
    if (confirm("Bạn có chắc chắn muốn XÓA vĩnh viễn xác nhận này?")) {
        try {
            await db.collection("rsvps").doc(id).delete();
            fetchData();
        } catch (error) {
            console.error("Error deleting rsvp:", error);
            alert("Lỗi khi xóa: " + error.message);
        }
    }
};
