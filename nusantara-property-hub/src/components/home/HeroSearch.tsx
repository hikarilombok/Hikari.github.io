'use client'

import React, { useState } from 'react'
import { Search, MapPin, DollarSign, Home } from 'lucide-react'

interface HeroSearchProps {
  onSearch?: (filters: SearchFilters) => void
}

export interface SearchFilters {
  location: string
  priceMin: string
  priceMax: string
  propertyType: string
  squareFeetMin: string
  squareFeetMax: string
}

const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    priceMin: '',
    priceMax: '',
    propertyType: '',
    squareFeetMin: '',
    squareFeetMax: '',
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(filters)
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Cari Properti Impian Anda</h1>
          <p className="text-blue-100 text-lg">Temukan rumah, apartemen, atau properti komersial dengan mudah</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="location"
                  placeholder="Kota atau Alamat"
                  value={filters.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga (Juta)
              </label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="priceMin"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Properti
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Pilih Tipe</option>
                  <option value="house">Rumah</option>
                  <option value="apartment">Apartemen</option>
                  <option value="commercial">Komersial</option>
                  <option value="land">Tanah</option>
                  <option value="office">Kantor</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Search size={20} />
                <span>Cari</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {showAdvanced ? '− Tutup Filter Lanjutan' : '+ Filter Lanjutan'}
          </button>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Square Feet Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Luas Bangunan (m²)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="squareFeetMin"
                      placeholder="Min"
                      value={filters.squareFeetMin}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      name="squareFeetMax"
                      placeholder="Max"
                      value={filters.squareFeetMax}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Subsidy Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Subsidi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                    <option value="">Semua Tipe</option>
                    <option value="subsidy">Subsidi (KPR)</option>
                    <option value="komersial">Komersial</option>
                    <option value="takeover">Take Over</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Kamar
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                    <option value="">Semua</option>
                    <option value="1">1 Kamar</option>
                    <option value="2">2 Kamar</option>
                    <option value="3">3 Kamar</option>
                    <option value="4">4+ Kamar</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default HeroSearch
