// Navigasi antar halaman
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ========== 🚚 TRUK ==========
let trukList = JSON.parse(localStorage.getItem("trukList")) || [];

function simpanTruk() {
  localStorage.setItem("trukList", JSON.stringify(trukList));
}

function tambahTruk() {
  const plat = document.getElementById("platTruk").value;
  const tipe = document.getElementById("tipeTruk").value;
  const tahun = document.getElementById("tahunTruk").value;
  const status = document.getElementById("statusTruk").value;

  if (!plat || !tipe || !tahun) return alert("Lengkapi data truk!");

  trukList.push({ plat, tipe, tahun, status });
  simpanTruk();
  tampilkanTruk();

  // Reset input
  document.getElementById("platTruk").value = "";
  document.getElementById("tipeTruk").value = "";
  document.getElementById("tahunTruk").value = "";
}

function tampilkanTruk() {
  const out = document.getElementById("dataTruk");
  out.innerHTML = "<ul>" + trukList.map(t =>
    `<li>${t.plat} - ${t.tipe} (${t.tahun}) [${t.status}]</li>`
  ).join("") + "</ul>";
}

// ========== 🧍‍♂️ SUPIR ==========
let supirList = JSON.parse(localStorage.getItem("supirList")) || [];

function simpanSupir() {
  localStorage.setItem("supirList", JSON.stringify(supirList));
}

function tambahSupir() {
  const nama = document.getElementById("namaSupir").value;
  const hp = document.getElementById("hpSupir").value;
  const truk = document.getElementById("trukSupir").value;
  const status = document.getElementById("statusSupir").value;

  if (!nama || !hp || !truk) return alert("Lengkapi data supir!");

  supirList.push({ nama, hp, truk, status });
  simpanSupir();
  tampilkanSupir();

  document.getElementById("namaSupir").value = "";
  document.getElementById("hpSupir").value = "";
  document.getElementById("trukSupir").value = "";
}

function tampilkanSupir() {
  const out = document.getElementById("dataSupir");
  out.innerHTML = "<ul>" + supirList.map(s =>
    `<li>${s.nama} (${s.hp}) - Truk: ${s.truk} [${s.status}]</li>`
  ).join("") + "</ul>";
}

// ========== 💸 PENGELUARAN ==========
let pengeluaranList = JSON.parse(localStorage.getItem("pengeluaranList")) || [];

function simpanPengeluaran() {
  localStorage.setItem("pengeluaranList", JSON.stringify(pengeluaranList));
}

function tambahPengeluaran() {
  const tgl = document.getElementById("tglPengeluaran").value;
  const jenis = document.getElementById("jenisPengeluaran").value;
  const jumlah = parseInt(document.getElementById("jumlahPengeluaran").value);
  const truk = document.getElementById("trukPengeluaran").value;

  if (!tgl || !jenis || isNaN(jumlah) || !truk) return alert("Lengkapi data pengeluaran!");

  pengeluaranList.push({ tgl, jenis, jumlah, truk });
  simpanPengeluaran();
  tampilkanPengeluaran();

  document.getElementById("tglPengeluaran").value = "";
  document.getElementById("jenisPengeluaran").value = "";
  document.getElementById("jumlahPengeluaran").value = "";
  document.getElementById("trukPengeluaran").value = "";
}

function tampilkanPengeluaran() {
  const out = document.getElementById("dataPengeluaran");
  out.innerHTML = "<ul>" + pengeluaranList.map(p =>
    `<li>${p.tgl} - ${p.truk} - ${p.jenis} = Rp ${p.jumlah.toLocaleString()}</li>`
  ).join("") + "</ul>";
}

// ========== 🛠️ SERVIS ==========
let servisList = JSON.parse(localStorage.getItem("servisList")) || [];

function simpanServis() {
  localStorage.setItem("servisList", JSON.stringify(servisList));
}

function tambahServis() {
  const tgl = document.getElementById("tglServis").value;
  const plat = document.getElementById("platServis").value;
  const deskripsi = document.getElementById("deskripsiServis").value;

  if (!tgl || !plat || !deskripsi) return alert("Lengkapi data servis!");

  servisList.push({ tgl, plat, deskripsi });
  simpanServis();
  tampilkanServis();

  document.getElementById("tglServis").value = "";
  document.getElementById("platServis").value = "";
  document.getElementById("deskripsiServis").value = "";
}

function tampilkanServis() {
  const out = document.getElementById("dataServis");
  out.innerHTML = "<ul>" + servisList.map(s =>
    `<li>${s.tgl} - ${s.plat}: ${s.deskripsi}</li>`
  ).join("") + "</ul>";
}

// ========== 🔩 SPAREPART ==========
let spareparts = JSON.parse(localStorage.getItem("spareparts")) || [];

function simpanSparepart() {
  localStorage.setItem("spareparts", JSON.stringify(spareparts));
}

function tambahSparepart() {
  const nama = document.getElementById("namaSparepart").value;
  const harga = parseInt(document.getElementById("hargaSparepart").value);

  if (!nama || isNaN(harga)) return alert("Isi nama dan harga sparepart!");

  spareparts.push({ nama, harga });
  simpanSparepart();
  tampilkanSparepart();

  document.getElementById("namaSparepart").value = "";
  document.getElementById("hargaSparepart").value = "";
}

function tampilkanSparepart() {
  const list = document.getElementById("listSparepart");
  list.innerHTML = "<ul>" + spareparts.map(s => 
    `<li>${s.nama} - Rp ${s.harga.toLocaleString()}</li>`
  ).join("") + "</ul>";
}

// ========== JALANKAN SAAT LOAD ==========
window.onload = () => {
  tampilkanTruk();
  tampilkanSupir();
  tampilkanPengeluaran();
  tampilkanServis();
  tampilkanSparepart();
};

function logout() {
  alert("Logout berhasil! (Fitur redirect bisa ditambah)");
}
