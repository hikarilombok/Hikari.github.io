import { create } from 'zustand'
import { Property, PropertyFilter, PropertyStatus } from '@/types'

interface PropertyState {
  properties: Property[]
  filteredProperties: Property[]
  selectedProperty: Property | null
  isLoading: boolean
  error: string | null
  filters: PropertyFilter

  // Actions
  setProperties: (properties: Property[]) => void
  setSelectedProperty: (property: Property | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: PropertyFilter) => void
  applyFilters: () => void
  addProperty: (property: Property) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  filterByStatus: (status: PropertyStatus) => Property[]
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  selectedProperty: null,
  isLoading: false,
  error: null,
  filters: {},

  setProperties: (properties) => set({ properties, filteredProperties: properties }),

  setSelectedProperty: (property) => set({ selectedProperty: property }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setFilters: (filters) => set({ filters }),

  applyFilters: () => {
    const { properties, filters } = get()
    let filtered = [...properties]

    if (filters.status?.length) {
      filtered = filtered.filter((p) => filters.status!.includes(p.status))
    }

    if (filters.priceMin !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.priceMin!)
    }

    if (filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.priceMax!)
    }

    if (filters.city) {
      filtered = filtered.filter((p) => p.location.city === filters.city)
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.location.address.toLowerCase().includes(term)
      )
    }

    set({ filteredProperties: filtered })
  },

  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
      filteredProperties: [...state.filteredProperties, property],
    })),

  updateProperty: (id, updates) =>
    set((state) => ({
      properties: state.properties.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      filteredProperties: state.filteredProperties.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
      filteredProperties: state.filteredProperties.filter((p) => p.id !== id),
    })),

  filterByStatus: (status) => {
    const { properties } = get()
    return properties.filter((p) => p.status === status)
  },
}))
