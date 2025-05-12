// components/RedirectToAdmin.jsx
import { useEffect } from 'react'

const RedirectToAdmin = () => {
  useEffect(() => {
    window.location.href = process.env.Server+"/admin"
  }, [])

  return <p>Yönlendiriliyor...</p>
}

export default RedirectToAdmin
