// --- Initial Data Store ---
let students = JSON.parse(localStorage.getItem('cct_students')) || [
    { id: 'CCT-101', name: 'Bibek Sharma', program: 'BSc. CSIT', semester: '3rd Semester', fee: 350000, paid: 250000 },
    { id: 'CCT-102', name: 'Anjali Thapa', program: 'BCA', semester: '1st Semester', fee: 320000, paid: 320000 },
    { id: 'CCT-103', name: 'Rohan Shrestha', program: 'BITM / BIM', semester: '5th Semester', fee: 360000, paid: 180000 },
    { id: 'CCT-104', name: 'Pooja Karki', program: 'BSc. CSIT', semester: '7th Semester', fee: 350000, paid: 350000 },
    { id: 'CCT-105', name: 'Sabin Adhikari', program: 'BCA', semester: '2nd Semester', fee: 320000, paid: 150000 }
];

let faculty = JSON.parse(localStorage.getItem('cct_faculty')) || [
    { name: 'Mr. Dhruba Babu Joshi', role: 'Principal', dept: 'Administration', email: 'principal@chitwancollege.edu.np' },
    { name: 'Dr. Hari Prasad Poudel', role: 'Professor / Head', dept: 'CSIT Department', email: 'hari.poudel@chitwancollege.edu.np' },
    { name: 'Er. Sunita Gurung', role: 'Associate Professor', dept: 'BCA Department', email: 'sunita.gurung@chitwancollege.edu.np' },
    { name: 'Mr. Rajesh Lamichhane', role: 'Lecturer', dept: 'IT Management', email: 'rajesh.l@chitwancollege.edu.np' }
];

let notices = JSON.parse(localStorage.getItem('cct_notices')) || [
    { title: 'BSc. CSIT & BCA 1st Semester Examination Routine', date: '2026-09-28', content: 'Tribhuvan University has published the examination routine for regular and partial examinations. Please check your exam centers.' },
    { title: 'Admission Open for Academic Year 2026/2027', date: '2026-09-25', content: 'Applications are now open for BSc. CSIT, BCA, and BITM/BIM programs. Apply online or visit campus.' },
    { title: 'Guest Lecture on Artificial Intelligence & Machine Learning', date: '2026-09-20', content: 'All CSIT and BCA students are invited to a special seminar in the college auditorium this Friday at 11:00 AM.' }
];

let inquiries = JSON.parse(localStorage.getItem('cct_inquiries')) || [
    { name: 'Kiran Sharma', phone: '9845012345', program: 'BSc. CSIT', date: '2026-09-29' }
];

let programChartInstance = null;
let financeChartInstance = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderPublicNotices();
    renderPublicFaculty();
    renderHeroTicker();
    updateInquiryBadge();
});

// --- Return to Home Handler ---
function returnToHome(event) {
    if (event) event.preventDefault();
    
    // If admin dashboard is open, close it and show public website
    const adminDashboard = document.getElementById('admin-dashboard');
    const publicWebsite = document.getElementById('public-website');
    
    if (adminDashboard && !adminDashboard.classList.contains('hidden')) {
        adminDashboard.classList.add('hidden');
        publicWebsite.classList.remove('hidden');
    }
    
    // Scroll smoothly to top / home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- Public Website Rendering ---
function renderPublicNotices() {
    const container = document.getElementById('public-notice-container');
    if (!container) return;
    container.innerHTML = notices.map(n => `
        <div class="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-lg transition">
            <div class="space-y-3">
                <span class="text-xs text-blue-900 bg-blue-100 font-semibold px-2.5 py-1 rounded"><i class="far fa-calendar-alt mr-1"></i> ${n.date}</span>
                <h3 class="font-bold text-lg text-blue-950">${n.title}</h3>
                <p class="text-slate-600 text-sm leading-relaxed">${n.content}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                <span>Official Circular</span>
                <span class="text-blue-900 font-medium">CCT Chitwan</span>
            </div>
        </div>
    `).join('');
}

function renderHeroTicker() {
    const container = document.getElementById('hero-notice-ticker');
    if (!container) return;
    container.innerHTML = notices.map(n => `
        <div class="bg-white/10 p-3 rounded-lg border border-white/10 text-sm space-y-1">
            <div class="flex justify-between text-xs text-amber-300">
                <span><i class="far fa-calendar-alt mr-1"></i> ${n.date}</span>
                <span>Notice</span>
            </div>
            <p class="font-medium text-white">${n.title}</p>
        </div>
    `).join('');
}

function renderPublicFaculty() {
    const container = document.getElementById('public-faculty-container');
    if (!container) return;
    container.innerHTML = faculty.map(f => `
        <div class="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200 space-y-3 hover:shadow-lg transition">
            <div class="w-20 h-20 bg-blue-900 text-white rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow">
                ${f.name.charAt(3) || f.name.charAt(0)}
            </div>
            <div>
                <h4 class="font-bold text-blue-950 text-lg">${f.name}</h4>
                <p class="text-xs text-amber-600 font-semibold uppercase tracking-wider mt-0.5">${f.role}</p>
                <p class="text-xs text-slate-500 mt-1">${f.dept}</p>
            </div>
            <p class="text-xs text-slate-400 truncate"><i class="fas fa-envelope mr-1"></i> ${f.email}</p>
        </div>
    `).join('');
}

// --- Inquiry Form Submission ---
function openInquiryModal() {
    document.getElementById('inquiry-modal').classList.remove('hidden');
}

function closeInquiryModal() {
    document.getElementById('inquiry-modal').classList.add('hidden');
}

function handleInquirySubmit(event) {
    event.preventDefault();
    const name = document.getElementById('inquiry-name').value;
    const phone = document.getElementById('inquiry-phone').value;
    const program = document.getElementById('inquiry-program').value;
    const date = new Date().toISOString().split('T')[0];

    inquiries.unshift({ name, phone, program, date });
    localStorage.setItem('cct_inquiries', JSON.stringify(inquiries));

    document.getElementById('inquiry-form').reset();
    closeInquiryModal();
    updateInquiryBadge();
    
    alert('Thank you! Your admission inquiry has been submitted successfully and sent to the college administration.');
    
    // If admin is currently logged in, refresh inquiries list
    const adminDashboard = document.getElementById('admin-dashboard');
    if (adminDashboard && !adminDashboard.classList.contains('hidden')) {
        renderInquiriesTable();
    }
}

function updateInquiryBadge() {
    const badge = document.getElementById('admin-inquiry-badge');
    if (badge) {
        badge.innerText = inquiries.length;
    }
}

// --- Admin Login & Navigation ---
function openAdminModal() {
    document.getElementById('admin-login-modal').classList.remove('hidden');
}

function closeAdminModal() {
    document.getElementById('admin-login-modal').classList.add('hidden');
    document.getElementById('login-error-msg').classList.add('hidden');
}

function handleAdminLogin(event) {
    event.preventDefault();
    const user = document.getElementById('admin-user-input').value;
    const pass = document.getElementById('admin-pass-input').value;

    if (user === 'ayush' && pass === 'ayush123') {
        closeAdminModal();
        document.getElementById('public-website').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadAdminDashboard();
    } else {
        document.getElementById('login-error-msg').classList.remove('hidden');
    }
}

function logoutAdmin() {
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('public-website').classList.remove('hidden');
    document.getElementById('admin-user-input').value = '';
    document.getElementById('admin-pass-input').value = '';
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.admin-tab-btn').forEach(el => {
        el.classList.remove('bg-blue-900', 'text-white');
        el.classList.add('text-slate-700', 'hover:bg-slate-100');
    });

    const activeTabContent = document.getElementById(`tab-${tabName}`);
    if (activeTabContent) {
        activeTabContent.classList.remove('hidden');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('bg-blue-900', 'text-white');
        event.currentTarget.classList.remove('text-slate-700', 'hover:bg-slate-100');
    }

    if (tabName === 'overview') updateOverviewStats();
    if (tabName === 'students') renderStudentsTable();
    if (tabName === 'inquiries') renderInquiriesTable();
    if (tabName === 'faculty') renderFacultyTable();
    if (tabName === 'financials') renderFinancialsTable();
    if (tabName === 'notices') renderAdminNotices();
}

// --- Admin Dashboard Functions ---
function loadAdminDashboard() {
    switchAdminTab('overview');
    updateOverviewStats();
    updateInquiryBadge();
}

function updateOverviewStats() {
    const totalStudents = students.length;
    const totalStaff = faculty.length;
    const totalRevenue = students.reduce((sum, s) => sum + Number(s.paid), 0);
    const totalDues = students.reduce((sum, s) => sum + (Number(s.fee) - Number(s.paid)), 0);

    document.getElementById('stat-total-students').innerText = totalStudents;
    document.getElementById('stat-total-staff').innerText = totalStaff;
    document.getElementById('stat-total-revenue').innerText = `Rs. ${totalRevenue.toLocaleString()}`;
    document.getElementById('stat-total-dues').innerText = `Rs. ${totalDues.toLocaleString()}`;

    renderCharts(totalRevenue, totalDues);
}

function renderCharts(revenue, dues) {
    const csitCount = students.filter(s => s.program.includes('CSIT')).length;
    const bcaCount = students.filter(s => s.program === 'BCA').length;
    const bitmCount = students.filter(s => s.program.includes('BITM') || s.program.includes('BIM')).length;

    // Program Chart
    const ctxProg = document.getElementById('programChart').getContext('2d');
    if (programChartInstance) programChartInstance.destroy();
    programChartInstance = new Chart(ctxProg, {
        type: 'doughnut',
        data: {
            labels: ['BSc. CSIT', 'BCA', 'BITM / BIM'],
            datasets: [{
                data: [csitCount, bcaCount, bitmCount],
                backgroundColor: ['#1e3b8a', '#3b82f6', '#f59e0b']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Finance Chart
    const ctxFin = document.getElementById('financeChart').getContext('2d');
    if (financeChartInstance) financeChartInstance.destroy();
    financeChartInstance = new Chart(ctxFin, {
        type: 'bar',
        data: {
            labels: ['Collected Fees', 'Pending Dues'],
            datasets: [{
                label: 'Amount in Rs.',
                data: [revenue, dues],
                backgroundColor: ['#10b981', '#f43f5e']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Students Management
function renderStudentsTable(filterText = '') {
    const tbody = document.getElementById('student-table-body');
    if (!tbody) return;
    const filtered = students.filter(s => s.name.toLowerCase().includes(filterText.toLowerCase()) || s.id.toLowerCase().includes(filterText.toLowerCase()));
    
    tbody.innerHTML = filtered.map(s => {
        const due = Number(s.fee) - Number(s.paid);
        const statusBadge = due <= 0 
            ? '<span class="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded font-semibold">Cleared</span>'
            : '<span class="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded font-semibold">Due: Rs. ' + due.toLocaleString() + '</span>';
        
        return `
            <tr class="hover:bg-slate-50 transition border-b">
                <td class="p-4 font-bold text-blue-900">${s.id}</td>
                <td class="p-4 font-semibold">${s.name}</td>
                <td class="p-4">${s.program}</td>
                <td class="p-4">${s.semester}</td>
                <td class="p-4">${statusBadge}</td>
                <td class="p-4 text-center space-x-2">
                    <button onclick="editStudent('${s.id}')" class="text-blue-600 hover:text-blue-900"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteStudent('${s.id}')" class="text-red-600 hover:text-red-900"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterStudents() {
    const query = document.getElementById('student-search').value;
    renderStudentsTable(query);
}

function openStudentModal() {
    document.getElementById('student-modal-title').innerText = 'Add Student Record';
    document.getElementById('student-form').reset();
    document.getElementById('student-edit-id').value = '';
    document.getElementById('student-modal').classList.remove('hidden');
}

function closeStudentModal() {
    document.getElementById('student-modal').classList.add('hidden');
}

function saveStudent(event) {
    event.preventDefault();
    const editId = document.getElementById('student-edit-id').value;
    const name = document.getElementById('modal-student-name').value;
    const program = document.getElementById('modal-student-program').value;
    const semester = document.getElementById('modal-student-semester').value;
    const fee = Number(document.getElementById('modal-student-fee').value);
    const paid = Number(document.getElementById('modal-student-paid').value);

    if (editId) {
        const student = students.find(s => s.id === editId);
        if (student) {
            student.name = name;
            student.program = program;
            student.semester = semester;
            student.fee = fee;
            student.paid = paid;
        }
    } else {
        const newId = 'CCT-' + (100 + students.length + 1);
        students.unshift({ id: newId, name, program, semester, fee, paid });
    }

    localStorage.setItem('cct_students', JSON.stringify(students));
    closeStudentModal();
    renderStudentsTable();
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    document.getElementById('student-modal-title').innerText = 'Edit Student Record';
    document.getElementById('student-edit-id').value = student.id;
    document.getElementById('modal-student-name').value = student.name;
    document.getElementById('modal-student-program').value = student.program;
    document.getElementById('modal-student-semester').value = student.semester;
    document.getElementById('modal-student-fee').value = student.fee;
    document.getElementById('modal-student-paid').value = student.paid;
    document.getElementById('student-modal').classList.remove('hidden');
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student record?')) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('cct_students', JSON.stringify(students));
        renderStudentsTable();
    }
}

// Inquiries Manager
function renderInquiriesTable() {
    const container = document.getElementById('tab-inquiries');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-lg text-blue-950">Prospective Student Admission Inquiries</h3>
                <span class="bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">${inquiries.length} Total Inquiries</span>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider border-b">
                            <th class="p-4">Applicant Name</th>
                            <th class="p-4">Phone Number</th>
                            <th class="p-4">Preferred Program</th>
                            <th class="p-4">Date Submitted</th>
                            <th class="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y text-sm text-slate-700">
                        ${inquiries.length === 0 ? '<tr><td colspan="5" class="p-6 text-center text-slate-400">No inquiries received yet.</td></tr>' : inquiries.map((inq, idx) => `
                            <tr class="hover:bg-slate-50 transition border-b">
                                <td class="p-4 font-semibold">${inq.name}</td>
                                <td class="p-4"><a href="tel:${inq.phone}" class="text-blue-600 hover:underline"><i class="fas fa-phone-alt mr-1 text-xs"></i> ${inq.phone}</a></td>
                                <td class="p-4"><span class="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded font-semibold">${inq.program}</span></td>
                                <td class="p-4 text-slate-500">${inq.date}</td>
                                <td class="p-4 text-center">
                                    <button onclick="deleteInquiry(${idx})" class="text-red-600 hover:text-red-900" title="Delete Inquiry"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    updateInquiryBadge();
}

function deleteInquiry(index) {
    if (confirm('Delete this inquiry record?')) {
        inquiries.splice(index, 1);
        localStorage.setItem('cct_inquiries', JSON.stringify(inquiries));
        renderInquiriesTable();
    }
}

// Faculty Management
function renderFacultyTable() {
    const tbody = document.getElementById('faculty-table-body');
    if (!tbody) return;
    tbody.innerHTML = faculty.map((f, index) => `
        <tr class="hover:bg-slate-50 transition border-b">
            <td class="p-4 font-semibold">${f.name}</td>
            <td class="p-4"><span class="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded">${f.role}</span></td>
            <td class="p-4">${f.dept}</td>
            <td class="p-4 text-slate-500">${f.email}</td>
            <td class="p-4 text-center">
                <button onclick="deleteFaculty(${index})" class="text-red-600 hover:text-red-900"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function openFacultyModal() {
    document.getElementById('faculty-modal').classList.remove('hidden');
}

function closeFacultyModal() {
    document.getElementById('faculty-modal').classList.add('hidden');
}

function saveFaculty(event) {
    event.preventDefault();
    const name = document.getElementById('modal-faculty-name').value;
    const role = document.getElementById('modal-faculty-role').value;
    const dept = document.getElementById('modal-faculty-dept').value;
    const email = document.getElementById('modal-faculty-email').value;

    faculty.push({ name, role, dept, email });
    localStorage.setItem('cct_faculty', JSON.stringify(faculty));
    closeFacultyModal();
    renderFacultyTable();
    renderPublicFaculty();
}

function deleteFaculty(index) {
    if (confirm('Remove faculty member?')) {
        faculty.splice(index, 1);
        localStorage.setItem('cct_faculty', JSON.stringify(faculty));
        renderFacultyTable();
        renderPublicFaculty();
    }
}

// Financials
function renderFinancialsTable() {
    const tbody = document.getElementById('finance-table-body');
    if (!tbody) return;
    tbody.innerHTML = students.map(s => {
        const due = Number(s.fee) - Number(s.paid);
        return `
            <tr class="hover:bg-slate-50 transition border-b">
                <td class="p-4 font-semibold">${s.name} (${s.id})</td>
                <td class="p-4">${s.program}</td>
                <td class="p-4">Rs. ${Number(s.fee).toLocaleString()}</td>
                <td class="p-4 text-emerald-600 font-semibold">Rs. ${Number(s.paid).toLocaleString()}</td>
                <td class="p-4 text-rose-600 font-semibold">Rs. ${due.toLocaleString()}</td>
                <td class="p-4 text-center">
                    <button onclick="recordPayment('${s.id}')" class="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded transition">Add Payment</button>
                </td>
            </tr>
        `;
    }).join('');
}

function recordPayment(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    const amt = prompt(`Enter payment amount to add for ${student.name} (Rs.):`, '10000');
    if (amt && !isNaN(amt)) {
        student.paid = Number(student.paid) + Number(amt);
        localStorage.setItem('cct_students', JSON.stringify(students));
        renderFinancialsTable();
        alert('Payment recorded successfully!');
    }
}

// Notice Publisher
function handlePublishNotice(event) {
    event.preventDefault();
    const title = document.getElementById('notice-title-input').value;
    const content = document.getElementById('notice-content-input').value;
    const date = new Date().toISOString().split('T')[0];

    notices.unshift({ title, date, content });
    localStorage.setItem('cct_notices', JSON.stringify(notices));

    document.getElementById('notice-title-input').value = '';
    document.getElementById('notice-content-input').value = '';
    renderAdminNotices();
    renderPublicNotices();
    renderHeroTicker();
    alert('Notice published successfully!');
}

function renderAdminNotices() {
    const container = document.getElementById('admin-notice-list');
    if (!container) return;
    container.innerHTML = notices.map((n, index) => `
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-start">
            <div class="space-y-1">
                <span class="text-xs text-slate-400"><i class="far fa-calendar-alt mr-1"></i> ${n.date}</span>
                <h4 class="font-bold text-blue-950">${n.title}</h4>
                <p class="text-sm text-slate-600">${n.content}</p>
            </div>
            <button onclick="deleteNotice(${index})" class="text-red-600 hover:text-red-800 p-2"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function deleteNotice(index) {
    if (confirm('Delete this notice?')) {
        notices.splice(index, 1);
        localStorage.setItem('cct_notices', JSON.stringify(notices));
        renderAdminNotices();
        renderPublicNotices();
        renderHeroTicker();
    }
}