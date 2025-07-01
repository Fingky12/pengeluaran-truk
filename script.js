let stok = JSON.parse(localStorage.getItem("stok")) || [];
let log = JSON.parse(localStorage.getItem("log")) || [];

function simpanData() {
  localStorage.setItem("stok", JSON.stringify(stok));
  localStorage.setItem("log", JSON.stringify(log));
}

function renderStok() {
  const table = document.getElementById("tabelStok");
  const select = document.getElementById("pilihBarang");

  table.innerHTML = `<tr><th>Nama</th><th>Kondisi</th><th>Harga</th><th>Stok</th></tr>`;
  select.innerHTML = "";

  stok.forEach((item, i) => {
    table.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.kondisi}</td>
        <td>Rp ${item.harga.toLocaleString()}</td>
        <td>${item.jumlah}</td>
      </tr>`;
    select.innerHTML += `<option value="${i}">${item.nama} (${item.kondisi})</option>`;
  });
}

function renderLog() {
  const table = document.getElementById("tabelLog");
  const totalDiv = document.getElementById("totalPengeluaran");

  let total = 0;
  table.innerHTML = `<tr><th>Nama Barang</th><th>Jumlah</th><th>Harga Total</th><th>Tanggal</th></tr>`;

  log.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.jumlah}</td>
        <td>Rp ${item.total.toLocaleString()}</td>
        <td>${item.tanggal}</td>
      </tr>`;
    total += item.total;
  });

  totalDiv.innerText = "Total: Rp " + total.toLocaleString();
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
