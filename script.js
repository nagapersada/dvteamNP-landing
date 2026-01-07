// DATABASE MEMBER
const members = {
    'deka': { name: "Deka Sonjaya", photo: "foto-deka.jpg", wa: "6285524444037", rank: 6 },
    'ina': { name: "Ina Garnia", photo: "foto-ina.jpg", wa: "6282295683474", rank: 2 },
    'martin': { name: "Marthyn", photo: "foto-martin.jpg", wa: "6281394675623", rank: 2 },
    'omi': { name: "Tomi Irwandy", photo: "foto-omi.jpg", wa: "6283194535211", rank: 1 },
    'mey': { name: "Siti Meiniwati", photo: "foto-mey.jpg", wa: "628987085958", rank: 1 },
    'dani': { name: "M. Dhani Kurniawan", photo: "foto-dani.jpg", wa:"6281322730596", rank: 0 },
    'yan': { name: "Yana Daryana", photo: "foto-yan.jpg", wa: "6285656791002", rank: 0 },
    'dikdik': { name: "Dikdik Mulyana", photo: "foto-dikdik.jpg", wa: "6285282619898", rank: 0 },
    'pandu': { name: "Pandu Rinata", photo: "foto-pandu.jpg", wa: "6285797817050", rank: 0 },
    'fakhri': { name: "M. Fakhri Rizki", photo: "foto-fakhri.jpg", wa: "6285524444037", rank: 0 },
    'rexi': { name: "Rexi Gustiawan", photo: "foto-rexi.jpg", wa: "6281218878025", rank: 0 },
    'oki': { name: "Oki Hendrawan", photo: "foto-oki.jpg", wa: "6282115586827", rank: 0 },
    'anis': { name: "Anis Abiba", photo: "foto-anis.jpg", wa: "6282129169198", rank: 0 },
    'silma': { name: "Silma Almaida", photo: "foto-silma.jpg", wa: "6283169949205", rank: 1 },
    'zilla': { name: "Fazrilla NQ", photo: "foto-zilla.jpg", wa: "6285723419799", rank: 1 },
    'jey': { name: "Rizal Januar", photo: "foto-jey.jpg", wa: "6282218256166", rank: 4 },
    'albar': { name: "Albar Arnasty", photo: "foto-albar.jpg", wa: "6281222436566", rank: 4 },
    'gilang': { name: "Gilang Giyantine", photo: "foto-gilang.jpg", wa: "6282118989717", rank: 4 },
    'dodi': { name: "Dodi Supriadi", photo: "foto-dodi.jpg", wa: "6289512302702", rank: 2 },
    'rio': { name: "Rio Pangestu", photo: "foto-rio.jpg", wa: "6281214273452", rank: 1 },
    'duco': { name: "Dani Ramdani", photo: "foto-duco.jpg", wa: "6285722833526", rank: 1 },
    'munthe': { name: "Pratama Munthe", photo: "foto-munthe.jpg", wa: "62895340767885", rank: 2 },
    'toni': { name: "Toni", photo: "foto-toni.jpg", wa: "6287734725828", rank: 3 },
    'iyan': { name: "Iyan", photo: "foto-iyan.jpg", wa: "6287882258588", rank: 1 },
    'cmp': { name: "Cecep M. Ramdan", photo: "foto-cmp.jpg", wa: "6285703242966", rank: 0 },
    'patuan': { name: "Patuan", photo: "foto-patuan.jpg", wa: "6289685502860", rank: 1 },
    'rai': { name: "Rai Satria N", photo: "foto-rai.jpg", wa: "6281572449940", rank: 0 },
    'intan': { name: "Intan Kusmawati", photo: "foto-intan.jpg", wa: "6289621957879", rank: 0 },
    'ihsan': { name: "Ihsan Saeful", photo: "foto-ihsan.jpg", wa: "6287779930087", rank: 0 },
    'admin': { name: "DV TEAM NP", photo: "logo.png", wa: "6285524444037", rank: 0 }
};

const defaultData = { name: "DV TEAM NP", photo: "logo.png", wa: "6285524444037", rank: 0 };

// =======================
// 1. LOGIKA MEMBER DATA
// =======================
function loadMemberData() {
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');

    // Toleransi Huruf Besar (DEKA -> deka)
    if (refCode) {
        refCode = refCode.toLowerCase();
        localStorage.setItem('saved_member', refCode);
    } else {
        refCode = localStorage.getItem('saved_member');
    }
    
    let data = members[refCode] || defaultData;

    document.getElementById('member-name').textContent = data.name;
    
    // Rank logic
    const rankContainer = document.getElementById('member-rank');
    if(rankContainer) {
        rankContainer.innerHTML = ''; 
        if (data.rank > 0) {
            let starsHTML = `<span class="vip-label">V.I.P ${data.rank}</span>`;
            for (let i = 0; i < data.rank; i++) starsHTML += '<i class="fas fa-star"></i>';
            rankContainer.innerHTML = starsHTML;
        } else {
            rankContainer.innerHTML = `<span class="vip-label" style="opacity: 0.7;">OFFICIAL MEMBER</span>`;
        }
    }

    // PENTING: Anti Cache Foto (?v=time)
    const imgElement = document.getElementById('member-photo');
    if(imgElement) {
        imgElement.src = data.photo + "?v=" + new Date().getTime();
        imgElement.onerror = function() { if(!this.src.includes('logo.png')) this.src = 'logo.png'; };
    }

    const message = `Halo Kak ${data.name}, saya tertarik info bisnis DV NP.`;
    const ctaWa = document.getElementById('cta-wa');
    if(ctaWa) ctaWa.href = `https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`;
    
    document.title = `${data.name} - Official Partner`;
}

function shareProfile() {
    let refCode = localStorage.getItem('saved_member');
    let shareUrl = window.location.href.split('?')[0]; 
    if(refCode) shareUrl += `?ref=${refCode}`;

    if (navigator.share) {
        navigator.share({ title: 'CardName Profile', text: 'Cek profil bisnis digital saya:', url: shareUrl }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            const toast = document.getElementById("toast");
            toast.className = "toast show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        });
    }
}

// =======================
// 2. LOGIKA JENDELA OPALP
// =======================
const opalpUrl = "https://nagapersada.github.io/OPALPDVTEAM/";

function openOpalp() {
    const modal = document.getElementById('app-modal');
    const iframe = document.getElementById('content-frame');
    iframe.src = opalpUrl; // Load website di sini
    modal.classList.add('active');
}

function closeOpalp() {
    const modal = document.getElementById('app-modal');
    const iframe = document.getElementById('content-frame');
    modal.classList.remove('active');
    setTimeout(() => { iframe.src = ""; }, 300); // Bersihkan agar video stop
}

// Jalankan load data hanya jika bukan di landing page
if (!window.location.pathname.includes('landing.html')) {
    window.onload = loadMemberData;
}
