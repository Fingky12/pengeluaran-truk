function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function logout() {
  alert("Logout berhasil!");
  // nanti redirect login admin
}

let spareparts = JSON.parse(localStorage.getItem("spareparts")) || [];
function simpanSparepart() {
  localStorage.setItem("spareparts", JSON.stringify(spareparts));
}
function tambahSparepart() {
  const nama = document.getElementById("namaSparepart").value;
  const harga = parseInt(document.getElementById("hargaSparepart").value);
  if (!nama || isNaN(harga)) {
    alert("Isi nama dan harga sparepart!");
    return;
  }
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
// Jalankan saat halaman dibuka
tampilkanSparepart();


function tambahTruk() {
  alert("Tambah data truk (fitur segera dibuat)");
}

function tambahSupir() {
  alert("Tambah data supir (fitur segera dibuat)");
}

function tambahPengeluaran() {
  alert("Tambah data pengeluaran (fitur segera dibuat)");
}

function tambahServis() {
  alert("Tambah jadwal servis (fitur segera dibuat)");
}
