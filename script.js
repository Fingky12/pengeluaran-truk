function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function logout() {
  alert("Logout berhasil!");
  // nanti redirect login admin
}

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
