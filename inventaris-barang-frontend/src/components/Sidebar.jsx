import { Logo } from './Header.jsx'

function Sidebar({
  kategoriBarang,
  filterKategori,
  onPilihKategori,
  terbuka,
  onTutup,
}) {
  function pilihKategori(kategori) {
    onPilihKategori(kategori)
    onTutup()
  }

  return (
    <>
      <button
        className={`nav-backdrop ${terbuka ? 'is-open' : ''}`}
        type="button"
        aria-label="Tutup navigasi"
        onClick={onTutup}
      />
      <aside className={`sidebar ${terbuka ? 'is-open' : ''}`}>
        <div className="sidebar-top">
          <Logo />
          <button
            className="icon-button sidebar-close"
            type="button"
            aria-label="Tutup menu"
            onClick={onTutup}
          >
            ×
          </button>
        </div>

        <nav aria-label="Navigasi inventaris">
          <p className="nav-label">Ruang kerja</p>
          <button
            className={`nav-item ${filterKategori === '' ? 'active' : ''}`}
            type="button"
            onClick={() => pilihKategori('')}
          >
            <span className="nav-icon" aria-hidden="true">▤</span>
            Inventaris
          </button>

          <p className="nav-label nav-label-secondary">Kategori</p>
          {kategoriBarang.map((kategori) => (
            <button
              className={`nav-item ${filterKategori === kategori ? 'active' : ''}`}
              key={kategori}
              type="button"
              onClick={() => pilihKategori(kategori)}
            >
              <span className="nav-icon" aria-hidden="true">◇</span>
              <span className="nav-item-label">{kategori}</span>
            </button>
          ))}
        </nav>

        <div className="profile">
          <span className="avatar" aria-hidden="true">A</span>
          <span className="profile-copy">
            <strong>Admin Inventaris</strong>
            <small>Pengelola barang</small>
          </span>
          <span className="profile-more" aria-hidden="true">···</span>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
