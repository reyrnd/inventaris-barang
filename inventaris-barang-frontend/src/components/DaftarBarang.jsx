import KartuBarang from './KartuBarang.jsx'

function DaftarBarang({
  daftarBarang,
  totalBarang,
  pencarian,
  filterKategori,
  filterKondisi,
  kategoriBarang,
  adaFilterAktif,
  onPencarian,
  onFilterKategori,
  onFilterKondisi,
  onHapusFilter,
  onTambah,
  menuTerbukaId,
  onToggleMenu,
  onEdit,
  onHapus,
}) {
  return (
    <section className="inventory-section" aria-labelledby="inventory-title">
      <div className="section-title-row">
        <div>
          <h2 id="inventory-title">Daftar Barang</h2>
          <p>{daftarBarang.length} dari {totalBarang} barang ditampilkan</p>
        </div>
        <span className="view-indicator" aria-label="Tampilan grid aktif">▦</span>
      </div>

      <div className="toolbar">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={pencarian}
            onChange={(event) => onPencarian(event.target.value)}
            placeholder="Cari nama barang..."
            aria-label="Cari nama barang"
          />
          {pencarian && (
            <button
              type="button"
              aria-label="Hapus pencarian"
              onClick={() => onPencarian('')}
            >
              ×
            </button>
          )}
        </label>

        <div className="filters">
          <span className="filter-label"><span aria-hidden="true">☷</span> Filter</span>
          <label className="filter-select">
            <span className="sr-only">Filter kategori</span>
            <select
              value={filterKategori}
              onChange={(event) => onFilterKategori(event.target.value)}
            >
              <option value="">Semua kategori</option>
              {kategoriBarang.map((kategori) => (
                <option key={kategori} value={kategori}>{kategori}</option>
              ))}
            </select>
            <span aria-hidden="true">⌄</span>
          </label>
          <label className="filter-select">
            <span className="sr-only">Filter kondisi</span>
            <select
              value={filterKondisi}
              onChange={(event) => onFilterKondisi(event.target.value)}
            >
              <option value="">Semua kondisi</option>
              <option>Baik</option>
              <option>Perlu Perbaikan</option>
              <option>Rusak</option>
            </select>
            <span aria-hidden="true">⌄</span>
          </label>
        </div>
      </div>

      {/* Conditional rendering membedakan daftar berisi dan keadaan kosong. */}
      {daftarBarang.length > 0 ? (
        <div className="items-grid">
          {daftarBarang.map((barang) => (
            <KartuBarang
              key={barang.id}
              {...barang}
              menuTerbuka={menuTerbukaId === barang.id}
              onToggleMenu={() => onToggleMenu(barang.id)}
              onEdit={() => onEdit(barang)}
              onHapus={() => onHapus(barang.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-illustration" aria-hidden="true">
            {adaFilterAktif ? '⌕' : '▦'}
          </span>
          <h3>{adaFilterAktif ? 'Barang tidak ditemukan' : 'Belum ada data barang'}</h3>
          <p>
            {adaFilterAktif
              ? 'Coba ubah kata kunci atau filter untuk menemukan barang.'
              : 'Mulai catat inventaris agar semua barang mudah dipantau.'}
          </p>
          <button
            className={adaFilterAktif ? 'secondary-button' : 'primary-button'}
            type="button"
            onClick={adaFilterAktif ? onHapusFilter : onTambah}
          >
            {adaFilterAktif ? 'Hapus Filter' : '+ Tambah Barang Pertama'}
          </button>
        </div>
      )}
    </section>
  )
}

export default DaftarBarang
