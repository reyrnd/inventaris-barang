import { useState } from 'react'

function FotoBarang({ nama, foto }) {
  const [gagalDimuat, setGagalDimuat] = useState(false)

  if (!foto || gagalDimuat) {
    return (
      <div className="image-placeholder">
        <span className="placeholder-icon" aria-hidden="true">▧</span>
        <span>Belum ada foto</span>
      </div>
    )
  }

  return (
    <img
      className="item-image"
      src={foto}
      alt={nama}
      onError={() => setGagalDimuat(true)}
    />
  )
}

function KartuBarang({
  nama,
  kategori,
  jumlah,
  kondisi,
  lokasi,
  foto,
  menuTerbuka,
  onToggleMenu,
  onEdit,
  onHapus,
}) {
  const kelasKondisi = {
    Baik: 'condition-baik',
    'Perlu Perbaikan': 'condition-perlu-perbaikan',
    Rusak: 'condition-rusak',
  }[kondisi]

  return (
    <article className="item-card">
      <div className="image-wrap">
        <FotoBarang key={foto} nama={nama} foto={foto} />
        <span className={`condition-badge ${kelasKondisi}`}>{kondisi}</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <div>
            <p className="category">{kategori}</p>
            <h3>{nama}</h3>
          </div>
          <div className="action-wrap">
            <button
              className="more-button"
              type="button"
              aria-label={`Tindakan untuk ${nama}`}
              aria-expanded={menuTerbuka}
              onClick={onToggleMenu}
            >
              ···
            </button>
            {menuTerbuka && (
              <div className="action-menu">
                <button type="button" onClick={onEdit}>
                  <span aria-hidden="true">✎</span>
                  Edit barang
                </button>
                <button className="danger-action" type="button" onClick={onHapus}>
                  <span aria-hidden="true">⌫</span>
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="card-meta">
          <span><span aria-hidden="true">▤</span><strong>{jumlah}</strong> unit</span>
          <span title={lokasi}><span aria-hidden="true">⌖</span>{lokasi}</span>
        </div>
      </div>
    </article>
  )
}

export default KartuBarang
