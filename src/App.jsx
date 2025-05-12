import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Products from "./pages/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RedirectToAdmin from "./components/RedirectToAdmin";
import Trades from "./pages/Trades";
import ProductDetail from "./pages/ProductDetail";
import MyProducts from "./pages/MyProducts";
import CreateProduct from "./pages/CreateProduct";
import UserInfo from "./pages/userInfo";

const App = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<RedirectToAdmin />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/profile" element={<UserInfo />} />
          <Route path="/products/create" element={<CreateProduct />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
