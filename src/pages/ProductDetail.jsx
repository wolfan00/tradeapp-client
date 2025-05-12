import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products/"+productId)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ürün detayları alınamadı:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src={product.image ? "http://localhost:3000"+product.image : "http://localhost:3000/uploads/PlaceHolder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <div className="text-2xl font-semibold text-blue-600 mt-4">
            {product.price} TL
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition">
            Takas Teklifi Yap
          </button>

          <div className="mt-8">
            <h2 className="text-md font-semibold text-gray-700 mb-2">Ürün Özellikleri</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>ID: {product.id}</li>
              <li>Kategori: {product.category || 'Bilinmiyor'}</li>
              <li>Durum: {product.condition || 'Belirtilmemiş'}</li>
              <li>Eklenme Tarihi: {product.created_at?.slice(0, 10) || 'N/A'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
