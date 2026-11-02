function Logo() {
  return (
    <div className="brand">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12.1V21" />
        </svg>
      </span>
      <span>
        <strong>Inventaris</strong>
        <small>Ruang Bersama</small>
      </span>
    </div>
  )
}

function TombolTema({ temaGelap, onToggleTema, className = '' }) {
  return (
    <button
      className={`theme-toggle ${className}`}
      type="button"
      aria-label={temaGelap ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={temaGelap ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      onClick={onToggleTema}
    >
      <span aria-hidden="true">{temaGelap ? '☀' : '☾'}</span>
      <span className="theme-toggle-label">{temaGelap ? 'Mode terang' : 'Mode gelap'}</span>
    </button>
  )
}

function Header({
  judul,
  subjudul,
  onTambah,
  onToggleMenu,
  temaGelap,
  onToggleTema,
}) {
  return (
    <>
      <div className="mobile-header">
        <button
          className="icon-button"
          type="button"
          aria-label="Buka menu"
          onClick={onToggleMenu}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <Logo />
        <div className="mobile-header-actions">
          <TombolTema
            temaGelap={temaGelap}
            onToggleTema={onToggleTema}
            className="mobile-theme-toggle"
          />
          <button
            className="mobile-add"
            type="button"
            aria-label="Tambah barang"
            onClick={onTambah}
          >
            +
          </button>
        </div>
      </div>

      <header className="page-header">
        <div>
          <p className="breadcrumb">Ruang kerja / Inventaris</p>
          <h1>{judul}</h1>
          <p className="page-description">{subjudul}</p>
        </div>
        <div className="header-actions">
          <TombolTema temaGelap={temaGelap} onToggleTema={onToggleTema} />
          <button className="primary-button header-action" type="button" onClick={onTambah}>
            <span aria-hidden="true">+</span>
            Tambah Barang
          </button>
        </div>
      </header>
    </>
  )
}

export { Logo }
export default Header
