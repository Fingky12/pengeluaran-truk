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
      ${s.nama} - ${s.noHP} - ${s.truk}
      <button onclick="editSupir(${i})">Edit</button>
    </li>`).join("");
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
      ${t.plat} - ${t.tipe} - ${t.tahun} - ${t.status}
      <button onclick="editTruk(${i})">Edit</button>
    </li>`).join("");
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
  this.reset();
};

function tampilSparepart() {
  const data = JSON.parse(localStorage.getItem("sparepart") || "[]");
  listSparepart.innerHTML = data.map((b, i) => `
    <li>
      ${b.nama} - ${b.kategori} - ${b.stok} pcs - Rp${b.harga.toLocaleString()}
      <button onclick="editSparepart(${i})">Edit</button>
    </li>`).join("");
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
