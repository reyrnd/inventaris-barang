import { useState } from 'react'
import DaftarBarang from './components/DaftarBarang.jsx'
import FormTambahBarang from './components/FormTambahBarang.jsx'
import Header from './components/Header.jsx'
import RingkasanStok from './components/RingkasanStok.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

const dataAwal = [
  {
    id: 1,
    nama: 'Sensor Ultrasonik HC-SR04',
    kategori: 'Elektronik',
    jumlah: 12,
    kondisi: 'Baik',
    lokasi: 'Lemari Robot A',
    foto: '',
  },
  {
    id: 2,
    nama: 'Baterai LiPo 4S 5000mAh',
    kategori: 'Elektronik',
    jumlah: 4,
    kondisi: 'Perlu Perbaikan',
    lokasi: 'Kotak Penyimpanan Baterai',
    foto: '',
  },
  {
    id: 3,
    nama: 'Solder Listrik 60W',
    kategori: 'Perkakas',
    jumlah: 3,
    kondisi: 'Perlu Perbaikan',
    lokasi: 'Meja Workshop',
    foto: '',
  },
  {
    id: 4,
    nama: 'Proyektor Epson EB-X06',
    kategori: 'Perlengkapan Kelas',
    jumlah: 1,
    kondisi: 'Baik',
    lokasi: 'Ruang Sekretariat',
    foto: '',
  },
  {
    id: 5,
    nama: 'Spidol Whiteboard Hitam',
    kategori: 'Alat Tulis',
    jumlah: 18,
    kondisi: 'Baik',
    lokasi: 'Rak Alat Tulis',
    foto: '',
  },
  {
    id: 6,
    nama: 'Multimeter Digital',
    kategori: 'Elektronik',
    jumlah: 5,
    kondisi: 'Rusak',
    lokasi: 'Lemari Komponen A2',
    foto: '',
  },
  {
    id: 7,
    nama: 'Kunci Pas Set 8-19 mm',
    kategori: 'Perkakas',
    jumlah: 2,
    kondisi: 'Baik',
    lokasi: 'Panel Perkakas',
    foto: '',
  },
]

const kategoriBarang = [
  'Elektronik',
  'Perkakas',
  'Perlengkapan Kelas',
  'Alat Tulis',
]

function App() {
  // State utama menyimpan data barang; state lain mengatur pencarian dan formulir.
  const [daftarBarang, setDaftarBarang] = useState(dataAwal)
  const [pencarian, setPencarian] = useState('')
  const [filterKategori, setFilterKategori] = useState('')
  const [filterKondisi, setFilterKondisi] = useState('')
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false)
  const [temaGelap, setTemaGelap] = useState(false)
  const [formTerbuka, setFormTerbuka] = useState(false)
  const [barangDiedit, setBarangDiedit] = useState(null)
  const [menuTerbukaId, setMenuTerbukaId] = useState(null)

  const kataKunci = pencarian.trim().toLowerCase()
  const daftarTerfilter = daftarBarang.filter((barang) => (
    barang.nama.toLowerCase().includes(kataKunci)
    && (!filterKategori || barang.kategori === filterKategori)
    && (!filterKondisi || barang.kondisi === filterKondisi)
  ))

  const adaFilterAktif = Boolean(pencarian || filterKategori || filterKondisi)

  function bukaFormTambah() {
    setBarangDiedit(null)
    setFormTerbuka(true)
    setMenuTerbukaId(null)
  }

  function bukaFormEdit(barang) {
    setBarangDiedit(barang)
    setFormTerbuka(true)
    setMenuTerbukaId(null)
  }

  function tutupForm() {
    setFormTerbuka(false)
    setBarangDiedit(null)
  }

  function simpanBarang(nilaiBarang) {
    if (barangDiedit) {
      setDaftarBarang((daftarSaatIni) => daftarSaatIni.map((barang) => (
        barang.id === barangDiedit.id
          ? { ...barang, ...nilaiBarang }
          : barang
      )))
    } else {
      setDaftarBarang((daftarSaatIni) => {
        const idBaru = Math.max(
          Date.now(),
          ...daftarSaatIni.map((barang) => barang.id + 1),
        )
        return [...daftarSaatIni, { ...nilaiBarang, id: idBaru }]
      })
    }

    tutupForm()
  }

  function hapusBarang(id) {
    setDaftarBarang((daftarSaatIni) => daftarSaatIni.filter((barang) => barang.id !== id))
    setMenuTerbukaId(null)
  }

  function hapusFilter() {
    setPencarian('')
    setFilterKategori('')
    setFilterKondisi('')
  }

  return (
    <div className="app-layout" data-theme={temaGelap ? 'dark' : 'light'}>
      <Sidebar
        kategoriBarang={kategoriBarang}
        filterKategori={filterKategori}
        onPilihKategori={setFilterKategori}
        terbuka={sidebarTerbuka}
        onTutup={() => setSidebarTerbuka(false)}
      />

      <main id="inventaris" className="content">
        <Header
          judul="Inventaris Barang"
          subjudul="Kelola, pantau, dan organisasikan seluruh inventaris dalam satu tempat."
          onTambah={bukaFormTambah}
          onToggleMenu={() => setSidebarTerbuka(true)}
          temaGelap={temaGelap}
          onToggleTema={() => setTemaGelap((temaSaatIni) => !temaSaatIni)}
        />

        <RingkasanStok daftarBarang={daftarBarang} />

        <DaftarBarang
          daftarBarang={daftarTerfilter}
          totalBarang={daftarBarang.length}
          pencarian={pencarian}
          filterKategori={filterKategori}
          filterKondisi={filterKondisi}
          kategoriBarang={kategoriBarang}
          adaFilterAktif={adaFilterAktif}
          onPencarian={setPencarian}
          onFilterKategori={setFilterKategori}
          onFilterKondisi={setFilterKondisi}
          onHapusFilter={hapusFilter}
          onTambah={bukaFormTambah}
          menuTerbukaId={menuTerbukaId}
          onToggleMenu={(id) => setMenuTerbukaId((idSaatIni) => (
            idSaatIni === id ? null : id
          ))}
          onEdit={bukaFormEdit}
          onHapus={hapusBarang}
        />

        {formTerbuka && (
          <FormTambahBarang
            key={barangDiedit ? barangDiedit.id : 'barang-baru'}
            barang={barangDiedit}
            onSimpan={simpanBarang}
            onTutup={tutupForm}
          />
        )}
      </main>
    </div>
  )
}

export default App
