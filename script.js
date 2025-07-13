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

function tambahSparepart() {
  const nama = prompt("Nama Sparepart:");
  const harga = prompt("Harga (Rp):");
  const stok = prompt("Jumlah Stok:");

  if (nama && harga && stok) {
    const item = {
      nama,
      harga: parseInt(harga),
      stok: parseInt(stok)
    };

    const spareparts = JSON.parse(localStorage.getItem("spareparts") || "[]");
    spareparts.push(item);
    localStorage.setItem("spareparts", JSON.stringify(spareparts));
    tampilkanSparepart();
  }
}

function tampilkanSparepart() {
  const data = JSON.parse(localStorage.getItem("spareparts") || "[]");
  const container = document.getElementById("dataSparepart");
  container.innerHTML = "";

  data.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.nama}</strong><br>
      Harga: Rp${item.harga}<br>
      Stok: ${item.stok}<br>
      <button onclick="hapusSparepart(${i})">🗑️ Hapus</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

function hapusSparepart(index) {
  const spareparts = JSON.parse(localStorage.getItem("spareparts") || "[]");
  spareparts.splice(index, 1);
  localStorage.setItem("spareparts", JSON.stringify(spareparts));
  tampilkanSparepart();
}

// Panggil saat awal buka
tampilkanSparepart();

function tambahPengeluaran() {
  alert("Tambah data pengeluaran (fitur segera dibuat)");
}

function tambahServis() {
  alert("Tambah jadwal servis (fitur segera dibuat)");
}
