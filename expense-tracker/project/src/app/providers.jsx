import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../api/index.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('et_user') || 'null') } catch { return null }
  })

  useEffect(() => {
    const handleLogout = () => { setUser(null); localStorage.removeItem('et_user') }
    window.addEventListener('et:logout', handleLogout)
    return () => window.removeEventListener('et:logout', handleLogout)
  }, [])

  const value = useMemo(() => ({
    user,
    async login(credentials) {
      const response = await loginRequest(credentials)
      localStorage.setItem('et_token', response.token)
      localStorage.setItem('et_user', JSON.stringify(response.user))
      setUser(response.user)
      return response
    },
    async register(details) {
      const response = await registerRequest(details)
      const loginResponse = await loginRequest({ email: details.email, password: details.password })
      localStorage.setItem('et_token', loginResponse.token)
      localStorage.setItem('et_user', JSON.stringify(response.user || loginResponse.user))
      setUser(response.user || loginResponse.user)
      return response
    },
    logout() {
      localStorage.removeItem('et_token')
      localStorage.removeItem('et_user')
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
