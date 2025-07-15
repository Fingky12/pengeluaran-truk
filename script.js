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

// ==== Form Sparepart ====
document.getElementById("formSparepart").onsubmit = function (e) {
  e.preventDefault();

  const nama = namaSparepart.value.trim();
  const kategori = kategoriSparepart.value.trim();
  const stok = parseInt(jumlahSparepart.value);
  const harga = parseInt(hargaSparepart.value);

  if (!nama || !kategori || !stok || !harga) return;

  let data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const index = data.findIndex(b => b.nama === nama);

  if (index !== -1) {
    // Update stok jika sparepart sudah ada
    data[index].stok += stok;
    data[index].harga = harga;
    data[index].kategori = kategori;
  } else {
    // Tambah baru
    data.push({ nama, kategori, stok, harga });
  }

  localStorage.setItem("sparepart", JSON.stringify(data));
  tampilSparepart();
  this.reset();
};

// ==== Tampil Sparepart ====
function tampilSparepart() {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const list = document.getElementById("listSparepart");
  list.innerHTML = data.map((b, i) => `
    <li>
      <span>${b.nama} - ${b.kategori} - ${b.stok} pcs - Rp${b.harga.toLocaleString()}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editSparepart(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusSparepart(${i})">🗑️</button>
      </div>
    </li>`).join("");
}

// ==== Edit & Hapus Sparepart ====
function editSparepart(i) {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const s = data[i];
  const nama = prompt("Edit Nama:", s.nama);
  const kategori = prompt("Edit Kategori:", s.kategori);
  const harga = parseInt(prompt("Edit Harga:", s.harga));
  // Jumlah stok tidak bisa diedit (sesuai permintaan broo)

  if (nama && kategori && harga) {
    data[i] = { ...s, nama, kategori, harga };
    localStorage.setItem("sparepart", JSON.stringify(data));
    tampilSparepart();
  }
}

function hapusSparepart(i) {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  if (confirm("Hapus sparepart ini?")) {
    data.splice(i, 1);
    localStorage.setItem("sparepart", JSON.stringify(data));
    tampilSparepart();
  }
}

// ==== Load Awal ====
tampilSupir();
tampilTruk();
tampilSparepart();
