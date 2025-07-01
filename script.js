let stok = JSON.parse(localStorage.getItem("stok")) || [];
let log = JSON.parse(localStorage.getItem("log")) || [];

function simpanData() {
  localStorage.setItem("stok", JSON.stringify(stok));
  localStorage.setItem("log", JSON.stringify(log));
}

function renderStok() {
  const table = document.getElementById("tabelStok");
  const select = document.getElementById("pilihBarang");

  table.innerHTML = `<tr>
    <th>Nama</th><th>Kondisi</th><th>Harga</th><th>Stok</th><th>Aksi</th>
  </tr>`;
  select.innerHTML = "";

  stok.forEach((item, i) => {
    table.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.kondisi}</td>
        <td>Rp ${item.harga.toLocaleString()}</td>
        <td>${item.jumlah}</td>
	<td>
	  <button onclick="editStok(${i})" style="background:#3498db;color:white;border:none;border-radius:5px;padding:5px;">Edit</button>
	  <button onclick="hapusStok(${i})" style="background:red;color:white;border:none;border-radius:5px;padding:5px;">Hapus</button>
	</td>
      </tr>`;
    
    select.innerHTML += `<option value="${i}">${item.nama} (${item.kondisi})</option>`;
  });
}

function renderLog() {
  const table = document.getElementById("tabelLog");
  const totalDiv = document.getElementById("totalPengeluaran");

  const keyword = document.getElementById("filterBarang")?.value.toLowerCase() || "";
  const tanggalFilter = document.getElementById("filterTanggal")?.value;

  let total = 0;
  table.innerHTML = `<tr><th>Nama Barang</th><th>Jumlah</th><th>Harga Total</th><th>Tanggal</th></tr>`;

  log.forEach(item => {
    const cocokNama = item.nama.toLowerCase().includes(keyword);
    const cocokTanggal = !tanggalFilter || item.tanggal === tanggalFilter;

    if (cocokNama && cocokTanggal) {
      table.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.jumlah}</td>
          <td>Rp ${item.total.toLocaleString()}</td>
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

  if (!nama || isNaN(harga) || isNaN(jumlah)) return alert("Lengkapi semua data!");

  stok.push({ nama, kondisi, harga, jumlah });
  simpanData();
  renderStok();

  document.getElementById("namaBarang").value = "";
  document.getElementById("hargaBarang").value = "";
  document.getElementById("jumlahBarang").value = "";
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
  const index = document.getElementById("pilihBarang").value;
  const jumlahAmbil = parseInt(document.getElementById("jumlahAmbil").value);

  if (stok[index].jumlah < jumlahAmbil) return alert("Stok tidak cukup!");

  stok[index].jumlah -= jumlahAmbil;

  const tanggal = new Date().toISOString().split("T")[0];
  const total = stok[index].harga * jumlahAmbil;

  log.push({
    nama: stok[index].nama + " (" + stok[index].kondisi + ")",
    jumlah: jumlahAmbil,
    total,
    tanggal
  });

  simpanData();
  renderStok();
  renderLog();

  document.getElementById("jumlahAmbil").value = "";
}

renderStok();
renderLog();

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
