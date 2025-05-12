// pages/Trades.jsx
import { useState, useEffect } from "react";
import api from "../api/api";

const TradeList = ({ trades, loading, title }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trades.length > 0 ? (
        trades.map((trade) => (
          <div
  key={trade.id}
  className="bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-2xl p-5 flex flex-col gap-3"
>
  <div className="flex items-center justify-between">
    <div className="flex flex-col items-center">
      <img
        src={trade.offered_product?.image ? `http://localhost:3000${trade.offered_product.image}` : "http://localhost:3000"+trade.offered_product.image}
        alt={trade.offered_product?.name || "Ürün"}
        className="w-20 h-20 object-cover rounded-xl border"
      />
      <span className="mt-2 text-sm font-medium text-gray-700 text-center">{trade.offered_product.name}</span>
    </div>

    <div className="text-3xl text-gray-500">➡️</div>

    <div className="flex flex-col items-center">
      <img
        src={trade.requested_product?.image ? `http://localhost:3000${trade.requested_product.image}` : "http://localhost:3000/uploads/PlaceHolder.jpg"}
        alt={trade.requested_product?.name || "Ürün"}
        className="w-20 h-20 object-cover rounded-xl border"
      />
      <span className="mt-2 text-sm font-medium text-gray-700 text-center">{trade.requested_product.name}</span>
    </div>
  </div>

  <div className="mt-4">
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
        trade.status === "onaylandı"
          ? "bg-green-100 text-green-700"
          : trade.status === "bekliyor"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      Durum: {trade.status}
    </span>
  </div>
</div>))
      ) : loading ? (
        <p className="col-span-3 text-center text-gray-500">Yükleniyor...</p>
      ) : (
        <p className="col-span-3 text-center text-gray-400">
          Henüz teklif yok.
        </p>
      )}
    </div>
  </section>
);

const Trades = () => {
  const [incomingTrades, setIncomingTrades] = useState([]);
  const [outgoingTrades, setOutgoingTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getIncomingTrade = async () => {
      try {
        const res = await api.get("/offers/incoming", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then(res => {
          setIncomingTrades(res.data)
          setLoading(false)
        });
      } catch (err) {
        console.error("Takas teklifleri alınamadı:", err);
        setLoading(false);
      }
    };
    getIncomingTrade();
  }, []);
  useEffect(() => {
    const getOutgoingTrade = async () => {
      try {
        const res = await api.get("/offers/outgoing", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then(res => {
          setOutgoingTrades(res.data)
          setLoading(false)
        });
      } catch (err) {
        console.error("Takas teklifleri alınamadı:", err);
        setLoading(false);
      }
    };
    getOutgoingTrade();
  }, []);

  return (
    <>
    <TradeList trades={incomingTrades} loading={loading} title="Gelen Teklifler" /> 
    <TradeList trades={outgoingTrades} loading={loading} title="Giden Teklifler" /> 
    </>
    
  );
};

export default Trades;
