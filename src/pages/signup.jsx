import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('accessToken', res.data.accessToken)
      navigate('/')
    } catch (err) {
      alert('Giriş başarısız')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white shadow rounded">
      <input className="border w-full p-2 mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border w-full p-2 mb-3" placeholder="Şifre" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded">Giriş Yap</button>
    </div>
  )
}
