let stok = JSON.parse(localStorage.getItem("stok")) || [];
let log = JSON.parse(localStorage.getItem("log")) || [];

function simpanData() {
  localStorage.setItem("stok", JSON.stringify(stok));
  localStorage.setItem("log", JSON.stringify(log));
}

function renderStok() {
  const table = document.getElementById("tabelStok");
  const filterKategori = document.getElementById("filterKategori")?.value || "";
  const keyword = document.getElementById("cariNamaBarang")?.value?.toLowerCase() || "";

  const kategoriUnik = [...new Set(stok.map(s => s.kategori || "Lainnya"))];
  const select = document.getElementById("filterKategori");
  if (select) {
    select.innerHTML = `<option value="">📦 Semua Kategori</option>`;
    kategoriUnik.forEach(k => {
      select.innerHTML += `<option value="${k}">${k}</option>`;
    });
    select.value = filterKategori; // biar tetap sesuai pilihan sebelumnya
  }

  table.innerHTML = `<tr><th>Nama</th><th>Kategori</th><th>Jumlah</th><th>Harga</th><th>Total</th><th>Aksi</th></tr>`;

  stok.forEach((item, i) => {
    const cocokKategori = !filterKategori || item.kategori === filterKategori;
    const cocokNama = !keyword || item.nama.toLowerCase().includes(keyword);

    if (cocokKategori && cocokNama) {
      table.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.kategori || "-"}</td>
          <td>${item.jumlah}</td>
          <td>Rp ${item.harga.toLocaleString()}</td>
          <td>Rp ${(item.harga * item.jumlah).toLocaleString()}</td>
          <td>
            <button onclick="editStok(${i})">Edit</button>
            <button onclick="hapusStok(${i})">Hapus</button>
          </td>
        </tr>`;
    }
  });
}

function renderLog() {
  const table = document.getElementById("tabelLog");
  const totalDiv = document.getElementById("totalPengeluaran");

  const keyword = document.getElementById("filterBarang")?.value.toLowerCase() || "";
  const tanggalFilter = document.getElementById("filterTanggal")?.value;

function isiSelectTahun() {
  const tahunSelect = document.getElementById("filterTahun");
  const tahunSet = new Set(log.map(item => item.tanggal?.slice(0, 4)));
  tahunSelect.innerHTML = `<option value="">Semua</option>`;
  tahunSet.forEach(t => {
    if (t) tahunSelect.innerHTML += `<option value="${t}">${t}</option>`;
  });
}

  let total = 0;
  table.innerHTML = `<tr><th>Nama Barang</th><th>Jumlah</th><th>Harga</th><th>Supir</th><th>Tanggal</th></tr>`;

  log.forEach(item => {
    const cocokNama = item.nama.toLowerCase().includes(keyword);
    const cocokTanggal = !tanggalFilter || item.tanggal === tanggalFilter;

    if (cocokNama && cocokTanggal) {
      table.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.jumlah}</td>
          <td>Rp ${item.total.toLocaleString()}</td>
	  <td>${item.supir || "-"}</td>
	 <td>${item.tanggal}</td>
        </tr>`;
      total += item.total;
    }
  });

  totalDiv.innerText = "Total: Rp " + total.toLocaleString();
}


function urutkanStokAZ() {
  stok.sort((a, b) => a.nama.localeCompare(b.nama));
  simpanData();
  renderStok();
}

function tambahStok() {
  const nama = document.getElementById("namaBarang").value;
  const kondisi = document.getElementById("kondisiBarang").value;
  const harga = parseInt(document.getElementById("hargaBarang").value);
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);
  const kategori = document.getElementById("kategoriBarang").value;

  if (!nama || isNaN(harga) || isNaN(jumlah) || isNaN(kategori)) return alert("Lengkapi semua data!");

  stok.push({ nama, kondisi, harga, jumlah, kategori });
  simpanData();
  renderStok();
  renderSelectBarang();

  document.getElementById("namaBarang").value = "";
  document.getElementById("hargaBarang").value = "";
  document.getElementById("jumlahBarang").value = "";
  document.getElementHyId("kategoriBarang").value = "";
}

function hapusStok(index) {
  const konfirmasi = confirm("Yakin ingin hapus barang ini dari stok?");
  if (!konfirmasi) return;

  stok.splice(index, 1); // Hapus item dari array
  simpanData();
  renderStok();
}

let indexEdit = null;

function editStok(index) {
  indexEdit = index;
  const item = stok[index];

  document.getElementById("editNama").value = item.nama;
  document.getElementById("editKondisi").value = item.kondisi;
  document.getElementById("editHarga").value = item.harga;
  document.getElementById("editJumlah").value = item.jumlah;
  document.getElementHyId("editKategori").value = item.kategori
  document.getElementById("formEdit").style.display = "block";
}

function simpanEdit() {
  const nama = document.getElementById("editNama").value;
  const kondisi = document.getElementById("editKondisi").value;
  const harga = parseInt(document.getElementById("editHarga").value);
  const jumlah = parseInt(document.getElementById("editJumlah").value);

  if (!nama || isNaN(harga) || isNaN(jumlah)) {
    alert("Lengkapi semua data!");
    return;
  }

  stok[indexEdit] = { nama, kondisi, harga, jumlah };

  simpanData();
  renderStok();

  document.getElementById("formEdit").style.display = "none";
  indexEdit = null;
}

function ambilBarang() {
  const namaSupir = document.getElementById("inputSupir").value;
  const index = document.getElementById("pilihBarang").value;
  const jumlahAmbil = parseInt(document.getElementById("jumlahAmbil").value);

  if (stok[index].jumlah < jumlahAmbil) return alert("Stok tidak cukup!");

  stok[index].jumlah -= jumlahAmbil;

  const tanggal = new Date().toISOString().split("T")[0];
  const total = stok[index].harga * jumlahAmbil;

  log.push({
    supir: namaSupir,
    nama: stok[index].nama + " (" + stok[index].kondisi + ")",
    jumlah: jumlahAmbil,
    total,
    tanggal
  });

  simpanData();
  renderStok();
  renderLog();
  renderSelectBarabg();
  renderSelectSupir();

  document.getElementById("jumlahAmbil").value = "";
}

renderStok();
renderLog();
renderSelectBarang();
renderSelectSupir();

function exportExcel() {
  const keyword = document.getElementById("filterBarang")?.value.toLowerCase() || "";
  const tanggalFilter = document.getElementById("filterTanggal")?.value;

  const dataExport = log.filter(item => {
    const cocokNama = item.nama.toLowerCase().includes(keyword);
    const cocokTanggal = !tanggalFilter || item.tanggal === tanggalFilter;
    return cocokNama && cocokTanggal;
  });

  if (dataExport.length === 0) return alert("Tidak ada data untuk diekspor!");

  const worksheet = XLSX.utils.json_to_sheet(dataExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pengeluaran");

  XLSX.writeFile(workbook, "pengeluaran-truk.xlsx");
}

firebase.auth().onAuthStateChanged(user => {
  const appSections = document.querySelectorAll("section");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginForm = document.getElementById("loginForm");

  if (user) {
    appSections.forEach(sec => sec.style.display = "block");
    logoutBtn.style.display = "block";
    loginForm.style.display = "none";
  } else {
    appSections.forEach(sec => sec.style.display = "none");
    logoutBtn.style.display = "none";
    loginForm.style.display = "block";
  }
});

function loginAdmin() {
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("passwordLogin").value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => alert("Login berhasil!"))
    .catch(err => alert("Login gagal: " + err.message));
}

function logoutAdmin() {
  firebase.auth().signOut();
}

let supir = JSON.parse(localStorage.getItem("supir")) || [];

function simpanData() {
  localStorage.setItem("stok", JSON.stringify(stok));
  localStorage.setItem("log", JSON.stringify(log));
  localStorage.setItem("supir", JSON.stringify(supir)); // tambahkan ini
}

function renderSupir() {
  const table = document.getElementById("tabelSupir");
  table.innerHTML = `<tr><th>Nama</th><th>No HP</th><th>Kendaraan</th></tr>`;

  supir.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.nama}</td>
        <td>${s.nohp}</td>
        <td>${s.kendaraan}</td>
      </tr>`;
  });
}

function tambahSupir() {
  const nama = document.getElementById("namaSupir").value;
  const nohp = document.getElementById("nohpSupir").value;
  const kendaraan = document.getElementById("kendaraanSupir").value;

  if (!nama || !nohp || !kendaraan) return alert("Isi semua data!");

  supir.push({ nama, nohp, kendaraan });
  simpanData();
  renderSupir();

  document.getElementById("namaSupir").value = "";
  document.getElementById("nohpSupir").value = "";
  document.getElementById("kendaraanSupir").value = "";
}

renderSupir();
function renderSupir() {
  const table = document.getElementById("tabelSupir");
  table.innerHTML = `
    <tr>
      <th>Nama</th>
      <th>No HP</th>
      <th>Kendaraan</th>
      <th>Aksi</th>
    </tr>`;

  supir.forEach((s, i) => {
    table.innerHTML += `
      <tr>
        <td>${s.nama}</td>
        <td>${s.nohp}</td>
        <td>${s.kendaraan}</td>
        <td>
          <button onclick="editSupir(${i})" style="background:#3498db;color:#fff;border:none;border-radius:5px;padding:5px;">Edit</button>
          <button onclick="hapusSupir(${i})" style="background:#e74c3c;color:#fff;border:none;border-radius:5px;padding:5px;">Hapus</button>
        </td>
      </tr>`;
  });
}

let indexEditSupir = null;

function editSupir(i) {
  indexEditSupir = i;
  const s = supir[i];
  document.getElementById("namaSupir").value = s.nama;
  document.getElementById("nohpSupir").value = s.nohp;
  document.getElementById("kendaraanSupir").value = s.kendaraan;

  document.querySelector("button[onclick='tambahSupir()']").style.display = "none";
  if (!document.getElementById("btnSimpanSupir")) {
    const btn = document.createElement("button");
    btn.innerText = "💾 Simpan Edit";
    btn.id = "btnSimpanSupir";
    btn.onclick = simpanEditSupir;
    document.querySelector("#namaSupir").parentElement.appendChild(btn);
  }
}

function simpanEditSupir() {
  const nama = document.getElementById("namaSupir").value;
  const nohp = document.getElementById("nohpSupir").value;
  const kendaraan = document.getElementById("kendaraanSupir").value;

  if (!nama || !nohp || !kendaraan) return alert("Lengkapi semua data!");

  supir[indexEditSupir] = { nama, nohp, kendaraan };
  simpanData();
  renderSupir();

  document.getElementById("namaSupir").value = "";
  document.getElementById("nohpSupir").value = "";
  document.getElementById("kendaraanSupir").value = "";
  indexEditSupir = null;

  document.getElementById("btnSimpanSupir").remove();
  document.querySelector("button[onclick='tambahSupir()']").style.display = "inline-block";
}

function hapusSupir(i) {
  const yakin = confirm("Yakin ingin hapus data supir ini?");
  if (!yakin) return;

  supir.splice(i, 1);
  simpanData();
  renderSupir();
}

function rekapPengeluaran() {
  const rekap = {};

  log.forEach(item => {
    const supirNama = item.supir || "Tidak Diketahui";
    if (!rekap[supirNama]) {
      rekap[supirNama] = 0;
    }
    rekap[supirNama] += item.total;
  });

  const table = document.getElementById("tabelRekap");
  table.innerHTML = `<tr><th>Nama Supir</th><th>Total Pengeluaran</th></tr>`;

  for (const nama in rekap) {
    table.innerHTML += `
      <tr>
        <td>${nama}</td>
        <td>Rp ${rekap[nama].toLocaleString()}</td>
      </tr>`;
  }
}

function exportRekap() {
  const rekap = {};

  log.forEach(item => {
    const supirNama = item.supir || "Tidak Diketahui";
    if (!rekap[supirNama]) {
      rekap[supirNama] = 0;
    }
    rekap[supirNama] += item.total;
  });

  // Konversi ke format array objek
  const dataExport = Object.keys(rekap).map(nama => ({
    Supir: nama,
    TotalPengeluaran: rekap[nama]
  }));

  // Buat file Excel
  const worksheet = XLSX.utils.json_to_sheet(dataExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RekapPengeluaran");

  XLSX.writeFile(workbook, "rekap_pengeluaran_per_supir.xlsx");
}

function renderSelectSupir() {
  const supirSelect = document.getElementById("inputSupir");
  if (!supirSelect) return;
  supirSelect.innerHTML = `<option value="">-- Pilih Supir --</option>`;
  supir.forEach(s => {
    supirSelect.innerHTML += `<option value="${s.nama}">${s.nama} (${s.kendaraan})</option>`;
  });
}

const namaSupir = document.getElementById("inputSupir").value;
// ...
log.push({ nama, jumlah, total, tanggal, supir: namaSupir });
renderSupir();
renderSelectSupir(); // tambahkan ini juga

let chart; // global supaya bisa di-destroy saat refresh

function tampilkanGrafik() {
  const dataRekap = {};

  log.forEach(item => {
    const nama = item.supir || "Tidak Diketahui";
    if (!dataRekap[nama]) dataRekap[nama] = 0;
    dataRekap[nama] += item.total;
  });

  const labels = Object.keys(dataRekap);
  const data = Object.values(dataRekap);

  const ctx = document.getElementById("grafikSupir").getContext("2d");

  // Hapus chart lama (jika ada)
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Total Pengeluaran (Rp)",
        data: data,
        backgroundColor: "#3498db",
        borderColor: "#2c3e50",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => "Rp " + ctx.raw.toLocaleString()
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => "Rp " + value.toLocaleString()
          }
        }
      }
    }
  });
}

function filterStokMenipis() {
  const table = document.getElementById("tabelStok");
  const MINIMAL = 3; // batas stok minimum

  table.innerHTML = `<tr><th>Nama</th><th>Kategori</th><th>Jumlah</th><th>Harga</th><th>Total</th><th>Aksi</th></tr>`;

  stok.forEach((item, i) => {
    if (item.jumlah <= MINIMAL) {
      table.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.kategori || "-"}</td>
          <td style="color:red;"><strong>${item.jumlah}</strong></td>
          <td>Rp ${item.harga.toLocaleString()}</td>
          <td>Rp ${(item.harga * item.jumlah).toLocaleString()}</td>
          <td>
            <button onclick="editStok(${i})">✏️</button>
            <button onclick="hapusStok(${i})">🗑️</button>
          </td>
        </tr>`;
    }
  });
}
