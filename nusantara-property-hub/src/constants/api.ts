/**
 * API Endpoints Configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    ME: `${API_BASE_URL}/auth/me`,
  },

  // Users endpoints
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    GET: (id: string) => `${API_BASE_URL}/users/${id}`,
    CREATE: `${API_BASE_URL}/users`,
    UPDATE: (id: string) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/users/${id}`,
  },

  // Properties endpoints
  PROPERTIES: {
    LIST: `${API_BASE_URL}/properties`,
    GET: (id: string) => `${API_BASE_URL}/properties/${id}`,
    CREATE: `${API_BASE_URL}/properties`,
    UPDATE: (id: string) => `${API_BASE_URL}/properties/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/properties/${id}`,
    SEARCH: `${API_BASE_URL}/properties/search`,
  },

  // Offers endpoints
  OFFERS: {
    LIST: `${API_BASE_URL}/offers`,
    GET: (id: string) => `${API_BASE_URL}/offers/${id}`,
    CREATE: `${API_BASE_URL}/offers`,
    UPDATE: (id: string) => `${API_BASE_URL}/offers/${id}`,
    ACCEPT: (id: string) => `${API_BASE_URL}/offers/${id}/accept`,
    REJECT: (id: string) => `${API_BASE_URL}/offers/${id}/reject`,
  },

  // Transactions endpoints
  TRANSACTIONS: {
    LIST: `${API_BASE_URL}/transactions`,
    GET: (id: string) => `${API_BASE_URL}/transactions/${id}`,
    CREATE: `${API_BASE_URL}/transactions`,
    UPDATE: (id: string) => `${API_BASE_URL}/transactions/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/transactions/${id}/approve`,
  },

  // Campaigns endpoints
  CAMPAIGNS: {
    LIST: `${API_BASE_URL}/campaigns`,
    GET: (id: string) => `${API_BASE_URL}/campaigns/${id}`,
    CREATE: `${API_BASE_URL}/campaigns`,
    UPDATE: (id: string) => `${API_BASE_URL}/campaigns/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/campaigns/${id}`,
  },
}

export const API_TIMEOUT = 30000 // 30 seconds
