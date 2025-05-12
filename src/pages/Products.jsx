import { useEffect, useState } from 'react'
import api from '../api/api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)})
      .catch(err => {console.error('Ürünler alınamadı:', err)
        setLoading(false)
      })
  }, [])

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {loading && <p>Yükleniyor...</p>}
        {!loading && !products.length && <p>Hiç ürün yok.</p>}
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
    </>
    
  )
}
