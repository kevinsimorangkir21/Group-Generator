// Fungsi untuk membaca file CSV
async function loadCSV() {
    const response = await fetch('groups.csv');
    const data = await response.text();
    const rows = data.split('\n');
    displayGroups(rows);
}

// Fungsi untuk menampilkan grup dan anggota di halaman
function displayGroups(rows) {
    const groupList = document.getElementById('group-list');
    groupList.innerHTML = ''; // Kosongkan isi sebelumnya jika ada

    rows.forEach((row, index) => {
        if (index === 0) return; // Lewati header

        const columns = row.split(';');
        const groupName = columns[0].trim();
        const members = columns.slice(1).filter(member => member.trim() !== "");

        // Hanya tambahkan grup jika ada anggota
        if (members.length > 0) {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('group');

            const groupTitle = document.createElement('h2');
            groupTitle.textContent = groupName;
            groupDiv.appendChild(groupTitle);

            const memberList = document.createElement('ul');
            memberList.classList.add('member-list');
            members.forEach(member => {
                const listItem = document.createElement('li');
                listItem.textContent = member.trim();
                memberList.appendChild(listItem);
            });

            groupDiv.appendChild(memberList);
            groupList.appendChild(groupDiv);
        }
    });
}

// Panggil fungsi loadCSV saat halaman dimuat
window.onload = loadCSV;

// Fungsi untuk toggle tema
function toggleTheme() {
    const body = document.body;
    const button = document.querySelector('.theme-toggle');

    // Toggle antara dark-mode dan light-mode
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Ubah ikon pada button berdasarkan tema saat ini
    button.textContent = body.classList.contains('light-mode') ? '☾' : '🌞';
}
