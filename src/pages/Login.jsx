import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../components/UserContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login} = useUser()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }  
  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password })
      login(res.data.accessToken)
      navigate('/')
    } catch (err) {
      alert('Giriş başarısız')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white shadow rounded">
      <input className="border w-full p-2 mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyPress} />
      <input className="border w-full p-2 mb-3" placeholder="Şifre" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyPress} />
      <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700">Giriş Yap</button>
    </div>
  )
}
