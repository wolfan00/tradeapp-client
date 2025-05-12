import { useState, useEffect } from "react";
import api from "../api/api";
import { useUser } from "../components/UserContext";

export default function CreateProduct() {
  const [previewUrl, setPreviewUrl] = useState("/PlaceHolder.jpg");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fakeCondition,setFakeCondition] = useState("")
  const [categories, setCategories] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori verileri alınamadı:", err);
      }
    };

    fetchCategories();
  }, []);
 const handleCreateImage = async () => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const res = await api.post(`/uploads`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res; 
  } catch (err) {
    console.error("Upload hatası:", err);
    return null; 
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const uploadRes = await handleCreateImage(); 
    let uploadedImageUrl = uploadRes?.data?.imageUrl || "/uploads/PlaceHolder";
    const productData = {
      name: productName,
      description,
      price,
      category_id: category,
      condition,
      owner_id: user.id,
      image: uploadedImageUrl,
    };

    const res = await api.post("/products", productData);
    console.log("Gönderildi:", res.data);

  } catch (err) {
    console.error("Hata:", err);
  }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSetCondition = (value) => {
    if (value === "Yeni") {
      setCondition("New");
    } else if (value === "İkinci El") {
      setCondition("Used");
    }
  };

  if (!user || !user.id) {
    console.error("Kullanıcı oturumda değil.");
    window.location.href = "/";
    return;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Ürün Oluştur</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4"
      >
        <div className="relative w-64 h-64 mb-4 group row-span-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded absolute top-0 left-0 z-0"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center text-white font-bold text-sm bg-black/30 opacity-0 group-hover:opacity-100 transition">
            Resim Yükle
          </div>
          <input
            type="file"
            id="image"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-20"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Ürün Adı
          </label>
          <input
            type="text"
            id="name"
            placeholder="Ürün adı"
            onChange={(e) => setProductName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Fiyat
          </label>
          <input
            type="number"
            id="price"
            placeholder="Fiyat (TL)"
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seçiniz</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="condition"
          >
            Durum
          </label>
          <select
            id="fakeCondition"
            value={fakeCondition}
            onChange={(e) => {
              handleSetCondition(e.target.value)
              setFakeCondition(e.target.value.toString())
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seçiniz</option>
            <option value="Yeni">Yeni</option>
            <option value="İkinci El">İkinci El</option>
          </select>
        </div>

        <div className="mb-4 col-span-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Açıklama
          </label>
          <textarea
            id="description"
            placeholder="Ürün açıklaması"
            onChange={(e) => setDescription(e.target.value)}
            className="h-36 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer col-start-2"
        >
          Oluştur
        </button>
      </form>
    </div>
  );
}
