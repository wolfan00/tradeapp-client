import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: loggedInUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!loggedInUser?.id) return;
      try {
        console.log("Logged in user:", loggedInUser);
        const res = await api.get(`/users/${loggedInUser.id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Kullanıcı bilgileri alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [loggedInUser]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Kullanıcı bilgileri bulunamadı.</p>;
  if (user.id !== loggedInUser.id) {
    return (
      <div>
        <p>Bu sayfayı görüntüleme izniniz yok.</p>
        <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
      </div>
    );
  }
  if (!loggedInUser?.id) {
    return (
      <div>
        <p>Bu sayfayı görüntüleme izniniz yok.</p>
        <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  return (
    <section>
      <h2>Kullanıcı Bilgileri</h2>
      {user ? (
        <div>
          <p><strong>Ad:</strong> {user.first_name + " " + user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telefon:</strong> {user.phone}</p>
          <p><strong>Adres:</strong> {user.address}</p>
          <p><strong>Yaş:</strong> {user.age}</p>
          <p><strong>Cinsiyet:</strong> {user.gender}</p>
        </div>
      ) : (
        <p>Kullanıcı bilgileri bulunamadı.</p>
      )}
    </section>
  );
}
