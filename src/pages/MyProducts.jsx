import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { useUser } from "../components/UserContext";
import Button from "../components/Button";

export default function MyProducts() {
    const { user: loggedInUser } = useUser();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleCreateProduct = () => {
        navigate("/products/create");
    };
    const handleDeleteProduct= () => {

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
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4 mx-20">Ürünlerim</h1>
                    <div className="relative">
                    <Button text="Ürün Ekle" onClick={handleCreateProduct}  className="mr-20"/>
                    <Button text="Sil" onClick={handleDeleteProduct} className="mr-20 bg-red-600 hover:bg-red-700 "/>
                    </div>
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                
                {loading && <p>Yükleniyor...</p>}
                {!loading && !products.length && <p>Hiç ürün yok.</p>}
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </>
    )
}