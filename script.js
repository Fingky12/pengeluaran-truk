// ====================== Supir ======================
document.getElementById("formSupir").onsubmit = function (e) {
  e.preventDefault();
  const nama = namaSupir.value;
  const noHP = noHP.value;
  const truk = trukSupir.value;

  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  data.push({ nama, noHP, truk });
  localStorage.setItem("supir", JSON.stringify(data));
  tampilSupir();
  this.reset();
};

function tampilSupir() {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  listSupir.innerHTML = data.map((s, i) => `
    <li>
      <span>${s.nama} - ${s.noHP} - ${s.truk}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editSupir(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusSupir(${i})">🗑️</button>
      </div>
    </li>
  `).join("");
}

function hapusSupir(index) {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  if (confirm("Yakin hapus supir ini?")) {
    data.splice(index, 1);
    localStorage.setItem("supir", JSON.stringify(data));
    tampilSupir();
  }
}

function editSupir(index) {
  const data = JSON.parse(localStorage.getItem("supir") || "[]");
  const s = data[index];

  const nama = prompt("Edit Nama Supir:", s.nama);
  const noHP = prompt("Edit No HP:", s.noHP);
  const truk = prompt("Edit Truk:", s.truk);

  if (nama && noHP) {
    data[index] = { nama, noHP, truk };
    localStorage.setItem("supir", JSON.stringify(data));
    tampilSupir();
  }
}


// ====================== Truk ======================
document.getElementById("formTruk").onsubmit = function (e) {
  e.preventDefault();
  const plat = platTruk.value;
  const tipe = tipeTruk.value;
  const tahun = parseInt(tahunTruk.value);
  const status = statusTruk.value;

  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  data.push({ plat, tipe, tahun, status });
  localStorage.setItem("truk", JSON.stringify(data));
  tampilTruk();
  this.reset();
};

function tampilTruk() {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  listTruk.innerHTML = data.map((t, i) => `
    <li>
      <span>${t.plat} - ${t.tipe} - ${t.tahun} - ${t.status}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editTruk(${i})">✏️</button>
        <button class="hapus-btn" onclick="hapusTruk(${i})">🗑️</button>
      </div>
    </li>
  `).join("");
}

function hapusTruk(index) {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  if (confirm("Yakin hapus truk ini?")) {
    data.splice(index, 1);
    localStorage.setItem("truk", JSON.stringify(data));
    tampilTruk();
  }
}

function editTruk(index) {
  const data = JSON.parse(localStorage.getItem("truk") || "[]");
  const t = data[index];

  const plat = prompt("Edit Plat Nomor:", t.plat);
  const tipe = prompt("Edit Tipe Truk:", t.tipe);
  const tahun = parseInt(prompt("Edit Tahun:", t.tahun));
  const status = prompt("Edit Status (Aktif/Nonaktif):", t.status);

  if (plat && status) {
    data[index] = { plat, tipe, tahun, status };
    localStorage.setItem("truk", JSON.stringify(data));
    tampilTruk();
  }
}

// ====================== Barang Masuk ======================
document.getElementById("formMasuk").onsubmit = function (e) {
  e.preventDefault();
  const nama = namaBarangMasuk.value;
  const stok = parseInt(stokMasuk.value);
  const kategori = kategoriMasuk.value;
  const harga = parseInt(hargaMasuk.value);

  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const existing = data.find(b => b.nama === nama);

  if (existing) {
    existing.stok += stok;
    existing.harga = harga; // update harga jika perlu
  } else {
    data.push({ nama, stok, kategori, harga });
  }

  localStorage.setItem("sparepart", JSON.stringify(data));
  tampilSparepart();
  loadBarangKeluar(); // update dropdown

  const logMasuk = JSON.parse(localStorage.getItem("logMasuk") || "[]");

  logMasuk.push({
    waktu: new Date().toLocaleString(),
    nama,
    stok,
    kategori,
    harga
});

  localStorage.setItem("logMasuk", JSON.stringify(logMasuk));
  tampilLogMasuk();
  this.reset();
};

// ====================== Barang Keluar ======================
document.getElementById("formKeluar").onsubmit = function (e) {
  e.preventDefault();
  const nama = pilihBarangKeluar.value;
  const stok = parseInt(stokKeluar.value);

  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  const barang = data.find(b => b.nama === nama);

  if (!barang || barang.stok < stok) {
    alert("Stok tidak cukup!");
    return;
  }

  barang.stok -= stok;
  localStorage.setItem("sparepart", JSON.stringify(data));
  tampilSparepart();

  const logKeluar = JSON.parse(localStorage.getItem("logKeluar") || "[]");

  logKeluar.push({
    waktu: new Date().toLocaleString(),
    nama,
    stok
});

  localStorage.setItem("logKeluar", JSON.stringify(logKeluar));
  tampilLogKeluar();
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
