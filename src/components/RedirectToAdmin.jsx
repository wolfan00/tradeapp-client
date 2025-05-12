// components/RedirectToAdmin.jsx
import { useEffect } from 'react'

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/admin'
  }, [])

  return <p>Yönlendiriliyor...</p>
}

export default RedirectToAdmin
