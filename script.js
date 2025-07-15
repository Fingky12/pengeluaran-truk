// ==== Supir + Truk: Input Gabungan ====
document.getElementById("formSupirTruk").onsubmit = function (e) {
  e.preventDefault();

  // Ambil Input
  const nama = namaSupir.value.trim();
  const noHP = noHP.value.trim();

  const plat = platTruk.value.trim().toUpperCase();
  const tipe = tipeTruk.value.trim();
  const tahun = parseInt(tahunTruk.value);
  const status = statusTruk.value;

  // ===== Simpan Supir =====
  const supirData = JSON.parse(localStorage.getItem("supir") || "[]");
  supirData.push({ nama, noHP, truk: plat });
  localStorage.setItem("supir", JSON.stringify(supirData));
  tampilSupir();

  // ===== Simpan Truk jika belum ada =====
  const trukData = JSON.parse(localStorage.getItem("truk") || "[]");
  const ada = trukData.find(t => t.plat === plat);
  if (!ada) {
    trukData.push({ plat, tipe, tahun, status });
    localStorage.setItem("truk", JSON.stringify(trukData));
    tampilTruk();
  }

  this.reset();
};

// ==== TAMPIL SUPIR ====
function tampilSupir() {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  const list = document.getElementById("listSupir");
  list.innerHTML = data.map((s, i) => `
    <li>
      <span>${s.nama} - ${s.noHP} - Truk: ${s.truk}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editSupir(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusSupir(${i})">🗑️</button>
      </div>
    </li>`).join("");
}
function editSupir(i) {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  const s = data[i];
  const nama = prompt("Edit Nama Supir:", s.nama);
  const noHP = prompt("Edit No HP:", s.noHP);
  const truk = prompt("Edit Plat Truk:", s.truk);
  if (nama && noHP && truk) {
    data[i] = { nama, noHP, truk };
    localStorage.setItem("supir", JSON.stringify(data));
    tampilSupir();
  }
}
function hapusSupir(i) {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  if (confirm("Yakin hapus supir ini?")) {
    data.splice(i, 1);
    localStorage.setItem("supir", JSON.stringify(data));
    tampilSupir();
  }
}

// ==== TAMPIL TRUK ====
function tampilTruk() {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  const list = document.getElementById("listTruk");
  list.innerHTML = data.map((t, i) => `
    <li>
      <span>${t.plat} - ${t.tipe} - ${t.tahun} - ${t.status}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editTruk(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusTruk(${i})">🗑️</button>
      </div>
    </li>`).join("");
}
function editTruk(i) {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  const t = data[i];
  const plat = prompt("Edit Plat:", t.plat);
  const tipe = prompt("Edit Tipe:", t.tipe);
  const tahun = parseInt(prompt("Edit Tahun:", t.tahun));
  const status = prompt("Edit Status (Aktif/Nonaktif):", t.status);
  if (plat && status) {
    data[i] = { plat, tipe, tahun, status };
    localStorage.setItem("truk", JSON.stringify(data));
    tampilTruk();
  }
}
function hapusTruk(i) {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  if (confirm("Yakin hapus truk ini?")) {
    data.splice(i, 1);
    localStorage.setItem("truk", JSON.stringify(data));
    tampilTruk();
  }
}

// ==== Load Awal ====
tampilSupir();
tampilTruk();


document.getElementById("formBarang").onsubmit = function (e) {
  e.preventDefault();
  const nama = namaBarang.value.trim();
  const jumlah = parseInt(jumlahBarang.value);
  const kategori = kategoriBarang.value.trim();
  const harga = parseInt(hargaBarang.value);
  const tipe = document.querySelector('input[name="tipe"]:checked').value;

  let stok = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const index = stok.findIndex(b => b.nama === nama);

  if (tipe === "masuk") {
    if (index !== -1) {
      stok[index].jumlah += jumlah;
      stok[index].harga = harga; // update harga
      stok[index].kategori = kategori;
    } else {
      stok.push({ nama, jumlah, kategori, harga });
    }
    localStorage.setItem("sparepart", JSON.stringify(stok));

    // simpan log masuk
    const logMasuk = JSON.parse(localStorage.getItem("logMasuk") || "[]");
    logMasuk.push({ waktu: new Date().toLocaleString(), nama, jumlah, kategori, harga });
    localStorage.setItem("logMasuk", JSON.stringify(logMasuk));
    tampilLogMasuk();

  } else if (tipe === "keluar") {
    if (index === -1 || stok[index].jumlah < jumlah) {
      alert("Barang tidak cukup atau tidak ditemukan!");
      return;
    }
    stok[index].jumlah -= jumlah;
    localStorage.setItem("sparepart", JSON.stringify(stok));

    // simpan log keluar
    const logKeluar = JSON.parse(localStorage.getItem("logKeluar") || "[]");
    logKeluar.push({ waktu: new Date().toLocaleString(), nama, jumlah });
    localStorage.setItem("logKeluar", JSON.stringify(logKeluar));
    tampilLogKeluar();
  }

  tampilSparepart();
  loadBarangKeluar?.(); // kalau ada
  this.reset();
};

function tampilSparepart() {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  listSparepart.innerHTML = data.map((b, i) => `
    <li>
      <span>${b.nama} - ${b.kategori} - ${b.jumlah} pcs - Rp${b.harga.toLocaleString()}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editSparepart(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusSparepart(${i})">🗑️</button>
      </div>
    </li>
  `).join("");
}

function hapusSparepart(index) {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  if (confirm("Yakin hapus barang ini?")) {
    data.splice(index, 1);
    localStorage.setItem("sparepart", JSON.stringify(data));
    tampilSparepart();
    loadBarangKeluar(); // update dropdown
  }
}

function editSparepart(index) {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const b = data[index];

  const nama = prompt("Edit Nama Barang:", b.nama);
  const kategori = prompt("Edit Kategori:", b.kategori);
  const harga = parseInt(prompt("Edit Harga:", b.harga));

  if (nama && harga >= 0) {
    data[index] = { ...b, nama, kategori, harga }; // jumlah tetap
    localStorage.setItem("sparepart", JSON.stringify(data));
    tampilSparepart();
    loadBarangKeluar(); // refresh dropdown
  }
}

function loadBarangKeluar() {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  pilihBarangKeluar.innerHTML = data.map(b =>
    `<option value="${b.nama}">${b.nama} (${b.jumlah})</option>`
  ).join("");
}
loadBarangKeluar();

function tampilLogMasuk() {
  const logs = JSON.parse(localStorage.getItem("logMasuk") || "[]");
  logMasuk.innerHTML = logs.map(l =>
    `<li>${l.waktu} - ${l.nama} (${l.jumlah} pcs) - Rp${l.harga.toLocaleString()}</li>`
  ).join("");
}
function tampilLogKeluar() {
  const logs = JSON.parse(localStorage.getItem("logKeluar") || "[]");
  logKeluar.innerHTML = logs.map(l =>
    `<li>${l.waktu} - ${l.nama} (${l.jumlah} pcs)</li>`
  ).join("");
}
tampilLogMasuk();
tampilLogKeluar();

async function exportPDF(tipe) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let title = tipe === "masuk" ? "Riwayat Barang Masuk" : "Riwayat Barang Keluar";
  doc.setFontSize(16);
  doc.text(title, 10, 10);

  let y = 20;
  const data = JSON.parse(localStorage.getItem(tipe === "masuk" ? "logMasuk" : "logKeluar") || "[]");

  data.forEach((item, index) => {
    const text = tipe === "masuk"
      ? `${item.waktu} - ${item.nama} (${item.jumlah} pcs) - Rp${item.harga.toLocaleString()}`
      : `${item.waktu} - ${item.nama} (${item.jumlah} pcs)`;
    doc.text(text, 10, y);
    y += 8;
    if (y > 280) { doc.addPage(); y = 20; }
  });

  doc.save(`${title}.pdf`);
}
