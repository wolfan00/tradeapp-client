import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({ product }) {
  const navigate = useNavigate();
    
  return (
    
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 min-h-100 cursor-pointer" onClick={()=> navigate(`/products/`+product.id)}>
      <img src={"http://localhost:3000"+product.image} alt={product.name}
           className="w-full h-48 object-cover" />
      <div className="py-4 ">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 text-xl font-bold text-primary">{product.price}₺</div>
        <button className="mt-3 w-full cursor-pointer bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700" onClick={()=> navigate(`/products/`+product.id)}>
          Ürün Detayları
        </button>
      </div>
    </div>
  )
}
