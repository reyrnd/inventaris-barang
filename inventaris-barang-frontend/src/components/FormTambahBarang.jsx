import { useState } from 'react'

const formKosong = {
  nama: '',
  kategori: '',
  jumlah: '',
  kondisi: '',
  lokasi: '',
  foto: '',
}

function FormTambahBarang({ barang, onSimpan, onTutup }) {
  // State lokal menjaga semua input form tetap controlled.
  const [formData, setFormData] = useState(() => (
    barang
      ? {
          nama: barang.nama,
          kategori: barang.kategori,
          jumlah: String(barang.jumlah),
          kondisi: barang.kondisi,
          lokasi: barang.lokasi,
          foto: barang.foto,
        }
      : formKosong
  ))
  const [pesanError, setPesanError] = useState('')

  function ubahField(event) {
    const { name, value } = event.target
    setFormData((dataSaatIni) => ({ ...dataSaatIni, [name]: value }))
    setPesanError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nama = formData.nama.trim()
    const lokasi = formData.lokasi.trim()
    const jumlah = Number(formData.jumlah)

    if (!nama || !lokasi || !Number.isInteger(jumlah) || jumlah < 1) {
      setPesanError('Isi nama dan lokasi, serta masukkan jumlah minimal 1.')
      return
    }

    onSimpan({
      nama,
      kategori: formData.kategori,
      jumlah,
      kondisi: formData.kondisi,
      lokasi,
      foto: formData.foto.trim(),
    })
  }

  return (
    <>
      <button
        className="drawer-backdrop is-open"
        type="button"
        aria-label="Tutup formulir"
        onClick={onTutup}
      />
      <aside
        className="drawer is-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-header">
          <div>
            <p className="drawer-kicker">
              {barang ? 'Perbarui inventaris' : 'Inventaris baru'}
            </p>
            <h2 id="drawer-title">{barang ? 'Edit Barang' : 'Tambah Barang'}</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Tutup formulir"
            onClick={onTutup}
          >
            ×
          </button>
        </div>

        <form className="drawer-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label>
              <span>Nama Barang</span>
              <input
                autoFocus
                name="nama"
                required
                value={formData.nama}
                onChange={ubahField}
                placeholder="Contoh: Multimeter Digital"
              />
            </label>

            <label>
              <span>Kategori</span>
              <span className="select-wrap">
                <select
                  name="kategori"
                  required
                  value={formData.kategori}
                  onChange={ubahField}
                >
                  <option value="" disabled>Pilih kategori</option>
                  <option>Elektronik</option>
                  <option>Perkakas</option>
                  <option>Perlengkapan Kelas</option>
                  <option>Alat Tulis</option>
                </select>
                <span aria-hidden="true">⌄</span>
              </span>
            </label>

            <div className="split-fields">
              <label>
                <span>Jumlah</span>
                <input
                  name="jumlah"
                  required
                  min="1"
                  step="1"
                  type="number"
                  inputMode="numeric"
                  value={formData.jumlah}
                  onChange={ubahField}
                  placeholder="0"
                />
              </label>

              <label>
                <span>Kondisi</span>
                <span className="select-wrap">
                  <select
                    name="kondisi"
                    required
                    value={formData.kondisi}
                    onChange={ubahField}
                  >
                    <option value="" disabled>Pilih kondisi</option>
                    <option>Baik</option>
                    <option>Perlu Perbaikan</option>
                    <option>Rusak</option>
                  </select>
                  <span aria-hidden="true">⌄</span>
                </span>
              </label>
            </div>

            <label>
              <span>Lokasi</span>
              <input
                name="lokasi"
                required
                value={formData.lokasi}
                onChange={ubahField}
                placeholder="Contoh: Lemari Lab A"
              />
            </label>

            <label>
              <span>Foto <small>Opsional</small></span>
              <input
                name="foto"
                value={formData.foto}
                onChange={ubahField}
                placeholder="/img/barang.jpg atau URL gambar"
              />
              <small className="field-help">
                Path lokal seperti /img/solder.jpg atau tautan gambar dapat digunakan.
              </small>
            </label>

            {pesanError && <p className="form-error" role="alert">{pesanError}</p>}
          </div>

          <div className="drawer-actions">
            <button className="secondary-button" type="button" onClick={onTutup}>
              Batal
            </button>
            <button className="primary-button" type="submit">
              {barang ? 'Simpan Perubahan' : 'Simpan Barang'}
            </button>
          </div>
        </form>
      </aside>
    </>
  )
}

export default FormTambahBarang
