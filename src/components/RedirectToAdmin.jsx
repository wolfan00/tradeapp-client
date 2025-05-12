// components/RedirectToAdmin.jsx
import { useEffect } from 'react'

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = import.meta.env.VITE_SERVER+"/admin"
  }, [])

  return <p>Yönlendiriliyor...</p>
}

export default RedirectToAdmin
