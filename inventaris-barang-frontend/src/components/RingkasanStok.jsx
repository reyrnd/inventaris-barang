function RingkasanStok({ daftarBarang }) {
  const totalUnit = daftarBarang.reduce((total, barang) => total + barang.jumlah, 0)
  const perluPerhatian = daftarBarang.filter(
    (barang) => barang.kondisi !== 'Baik',
  ).length

  const ringkasan = [
    { label: 'Total Jenis Barang', jumlah: daftarBarang.length, ikon: '▦' },
    { label: 'Total Unit', jumlah: totalUnit, ikon: '▤' },
    { label: 'Perlu Perhatian', jumlah: perluPerhatian, ikon: '!' },
  ]

  return (
    <section className="overview" aria-label="Ringkasan inventaris">
      {ringkasan.map((data) => (
        <article className="metric" key={data.label}>
          <span className="metric-icon" aria-hidden="true">{data.ikon}</span>
          <span className="metric-copy">
            <span>{data.label}</span>
            <strong>{data.jumlah}</strong>
          </span>
        </article>
      ))}
    </section>
  )
}

export default RingkasanStok
