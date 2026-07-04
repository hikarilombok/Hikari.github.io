'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Home, Trash2, Eye } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

interface WishlistProperty {
  id: string
  name: string
  price: number
  location: string
  type: string
  bedrooms: number
  bathrooms: number
  squareMeters: number
  image: string
  addedDate: string
  status: 'available' | 'booking' | 'sold'
}

const BuyerWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistProperty[]>([
    {
      id: '1',
      name: 'Rumah Modern Jakarta Selatan',
      price: 500000000,
      location: 'Jakarta Selatan',
      type: 'Rumah',
      bedrooms: 3,
      bathrooms: 2,
      squareMeters: 80,
      image: 'https://via.placeholder.com/300x200',
      addedDate: '2024-06-28',
      status: 'available',
    },
    {
      id: '2',
      name: 'Apartemen Mewah Sudirman',
      price: 1200000000,
      location: 'Jakarta Pusat',
      type: 'Apartemen',
      bedrooms: 2,
      bathrooms: 1,
      squareMeters: 65,
      image: 'https://via.placeholder.com/300x200',
      addedDate: '2024-06-20',
      status: 'booking',
    },
  ])

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Tersedia' },
      booking: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Booking' },
      sold: { bg: 'bg-red-100', text: 'text-red-800', label: 'Terjual' },
    }
    const badge = badges[status] || badges.available
    return { ...badge }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properti Favorit</h1>
          <p className="text-gray-600 mt-1">Koleksi properti yang Anda incar</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('grid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              viewType === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              viewType === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Wishlist Count */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 font-semibold">
          Total {wishlist.length} properti di wishlist Anda
        </p>
      </div>

      {/* Wishlist Items */}
      {wishlist.length > 0 ? (
        <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {wishlist.map((property) => {
            const statusBadge = getStatusBadge(property.status)
            return (
              <div
                key={property.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  viewType === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={viewType === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}>
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{property.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.bg} ${statusBadge.text} flex-shrink-0 ml-2`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin size={16} className="mr-1" />
                    {property.location}
                  </div>

                  <p className="text-blue-600 font-bold text-xl mb-4">
                    {formatCurrency(property.price)}
                  </p>

                  {/* Details */}
                  <div className="text-sm text-gray-600 space-y-1 mb-4 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Tipe:</span>
                      <span className="font-semibold text-gray-900">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kamar Tidur:</span>
                      <span className="font-semibold text-gray-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kamar Mandi:</span>
                      <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luas:</span>
                      <span className="font-semibold text-gray-900">{property.squareMeters} m²</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/properties/${property.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold rounded-lg transition-colors text-sm"
                    >
                      <Eye size={16} />
                      Lihat Detail
                    </Link>
                    <button
                      onClick={() => handleRemove(property.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Ditambahkan: {new Date(property.addedDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Wishlist Anda masih kosong</p>
          <Link
            href="/properties"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Cari Properti Sekarang
          </Link>
        </div>
      )}
    </div>
  )
}

export default BuyerWishlist
