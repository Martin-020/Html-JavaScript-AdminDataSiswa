let siswaList = [];
let editIndex = -1;

const form = document.getElementById("formSiswa");
const tabelBody = document.getElementById("tabelSiswa");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const nilai = parseInt(document.getElementById("nilai").value);

  if (!nama || !kelas || isNaN(nilai)) return;

  const data = { nama, kelas, nilai };

  if (editIndex === -1) {
    siswaList.push(data);
  } else {
    siswaList[editIndex] = data;
    editIndex = -1;
  }

  form.reset();
  renderTabel();
});

function renderTabel() {
  tabelBody.innerHTML = "";
  siswaList.forEach((siswa, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${siswa.nama}</td>
      <td>${siswa.kelas}</td>
      <td>${siswa.nilai}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editSiswa(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="hapusSiswa(${index})">Hapus</button>
      </td>
    `;
    tabelBody.appendChild(tr);
  });
}

function editSiswa(index) {
  const s = siswaList[index];
  document.getElementById("nama").value = s.nama;
  document.getElementById("kelas").value = s.kelas;
  document.getElementById("nilai").value = s.nilai;
  editIndex = index;
}

function hapusSiswa(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    siswaList.splice(index, 1);
    renderTabel();
  }
}
