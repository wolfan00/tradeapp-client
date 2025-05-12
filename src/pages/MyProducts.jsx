import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { useUser } from "../components/UserContext";

export default function MyProducts() {
    const { user: loggedInUser } = useUser();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleCreateProduct = () => {
        navigate("/products/create");
    };

    useEffect(() => {
        if (!loggedInUser?.id) return;
        api.get("/products?ownerId="+loggedInUser.id).then((res) => {
            console.log("Ürünler:", res.data);
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Ürünler alınamadı:", err);
            setLoading(false);
        })}, [loggedInUser]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                <div className="col-span-3">
                    <h1 className="text-2xl font-bold mb-4">Ürünlerim</h1>
                    </div>
                    <div className="col-span-1">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" onClick={handleCreateProduct}>
                        Ürün Ekle
                        </button>
                    </div>
                {loading && <p>Yükleniyor...</p>}
                {!loading && !products.length && <p>Hiç ürün yok.</p>}
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </>
    )
}