function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
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

let formMode = '';
let formType = '';

function tambahTruk() {
  formMode = 'tambah';
  formType = 'truk';
  tampilkanForm(['Nomor Polisi', 'Tipe', 'Tahun', 'Status']);
}

function tambahSupir() {
  formMode = 'tambah';
  formType = 'supir';
  tampilkanForm(['Nama Supir', 'No HP', 'Truk Digunakan', 'Status']);
}

function tambahSparepart() {
  formMode = 'tambah';
  formType = 'sparepart';
  tampilkanForm(['Nama Sparepart', 'Harga (Rp)', 'Stok']);
}

function tampilkanForm(fieldList) {
  const form = document.getElementById('formPopup');
  const fields = document.getElementById('formFields');
  const title = document.getElementById('formTitle');
  fields.innerHTML = '';
  title.innerText = `Tambah Data ${formType.charAt(0).toUpperCase() + formType.slice(1)}`;

  fieldList.forEach(field => {
    const input = document.createElement('input');
    input.placeholder = field;
    input.setAttribute('data-label', field);
    fields.appendChild(input);
  });

  form.classList.remove('hidden');
}

function tutupForm() {
  document.getElementById('formPopup').classList.add('hidden');
}

function simpanForm() {
  const inputs = document.querySelectorAll('#formFields input');
  const data = {};
  inputs.forEach(input => {
    const key = input.getAttribute('data-label');
    data[key] = input.value;
  });

  const key = formType === 'truk' ? 'trukList'
            : formType === 'supir' ? 'supirList'
            : 'spareparts';

  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));

  tutupForm();
  renderSemuaData();
}

function renderSemuaData() {
  tampilkanTruk();
  tampilkanSupir();
  tampilkanSparepart();
}

function tampilkanTruk() {
  const data = JSON.parse(localStorage.getItem('trukList') || '[]');
  const el = document.getElementById('dataTruk');
  el.innerHTML = data.map(truk => `
    <div><strong>${truk['Nomor Polisi']}</strong> - ${truk.Tipe}, ${truk.Tahun} (${truk.Status})</div>
  `).join('');
}

function tampilkanSupir() {
  const data = JSON.parse(localStorage.getItem('supirList') || '[]');
  const el = document.getElementById('dataSupir');
  el.innerHTML = data.map(supir => `
    <div><strong>${supir['Nama Supir']}</strong> - ${supir['No HP']} | Truk: ${supir['Truk Digunakan']} (${supir.Status})</div>
  `).join('');
}

function tampilkanSparepart() {
  const data = JSON.parse(localStorage.getItem('spareparts') || '[]');
  const el = document.getElementById('dataSparepart');
  el.innerHTML = data.map(item => `
    <div><strong>${item['Nama Sparepart']}</strong><br>
      Harga: Rp${item['Harga (Rp)']}<br>
      Stok: ${item['Stok']}
    </div>
  `).join('');
}

// Jalankan semua saat awal
renderSemuaData();
