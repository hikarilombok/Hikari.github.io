import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUser, UserRole, Permission } from '@/types'
import { ROLE_PERMISSIONS } from '@/constants/permissions'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null

  // Actions
  setUser: (user: AuthUser | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  login: (user: AuthUser, token: string) => void
  updateUser: (updates: Partial<AuthUser>) => void
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: UserRole) => boolean
}

export const useAuthStore = create<AuthState>()
(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      logout: () =>
        set({
          user: null,
          token: null,
          error: null,
        }),

      login: (user, token) =>
        set({
          user: {
            ...user,
            permissions: ROLE_PERMISSIONS[user.role],
          },
          token,
          error: null,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...updates,
                permissions: updates.role
                  ? ROLE_PERMISSIONS[updates.role]
                  : state.user.permissions,
              }
            : null,
        })),

      hasPermission: (permission) => {
        const state = get()
        return state.user?.permissions.includes(permission) ?? false
      },

      hasRole: (role) => {
        const state = get()
        return state.user?.role === role
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)
