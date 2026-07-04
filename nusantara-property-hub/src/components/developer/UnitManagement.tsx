'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

interface Unit {
  id: string
  name: string
  type: 'house' | 'plot'
  price: number
  status: 'available' | 'booking' | 'sold'
  bedrooms?: number
  bathrooms?: number
  squareMeters: number
  images: number
  videos: number
  brochures: number
}

const UnitManagement: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([
    {
      id: '1',
      name: 'Rumah Tipe A - Blok A1',
      type: 'house',
      price: 350000000,
      status: 'available',
      bedrooms: 2,
      bathrooms: 1,
      squareMeters: 50,
      images: 8,
      videos: 2,
      brochures: 1,
    },
    {
      id: '2',
      name: 'Kavling Premium - Blok B5',
      type: 'plot',
      price: 250000000,
      status: 'booking',
      squareMeters: 120,
      images: 5,
      videos: 1,
      brochures: 1,
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [formType, setFormType] = useState<'house' | 'plot' | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'booking':
        return 'bg-yellow-100 text-yellow-800'
      case 'sold':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: 'Tersedia',
      booking: 'Booking',
      sold: 'Terjual',
    }
    return labels[status] || status
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Unit</h1>
          <p className="text-gray-600 mt-1">Kelola perumahan dan kavling Anda</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              setFormType('house')
              setShowAddModal(true)
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Tambah Perumahan</span>
          </button>
          <button
            onClick={() => {
              setFormType('plot')
              setShowAddModal(true)
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Tambah Kavling</span>
          </button>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <img
                src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(unit.name)}`}
                alt={unit.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{unit.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(unit.status)}`}>
                  {getStatusLabel(unit.status)}
                </span>
              </div>

              <p className="text-blue-600 font-bold text-lg mb-3">{formatCurrency(unit.price)}</p>

              {/* Unit Details */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Luas Bangunan:</span>
                  <span className="font-semibold text-gray-900">{unit.squareMeters} m²</span>
                </div>
                {unit.bedrooms && (
                  <div className="flex justify-between">
                    <span>Kamar Tidur:</span>
                    <span className="font-semibold text-gray-900">{unit.bedrooms}</span>
                  </div>
                )}
                {unit.bathrooms && (
                  <div className="flex justify-between">
                    <span>Kamar Mandi:</span>
                    <span className="font-semibold text-gray-900">{unit.bathrooms}</span>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="border-t border-gray-200 pt-3 mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Media</p>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span>{unit.images} Foto</span>
                  <span>{unit.videos} Video</span>
                  <span>{unit.brochures} Brosur</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold rounded-lg transition-colors text-sm">
                  <Eye size={16} />
                  Lihat
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-600 font-semibold rounded-lg transition-colors text-sm">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors text-sm">
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Tambah {formType === 'house' ? 'Perumahan' : 'Kavling'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Unit</label>
                <input
                  type="text"
                  placeholder={`e.g., ${formType === 'house' ? 'Rumah Tipe A - Blok A1' : 'Kavling Premium - Blok B5'}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="e.g., 350000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {formType === 'house' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kamar Tidur</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kamar Mandi</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Luas Bangunan (m²)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Foto/Video</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Drag & drop atau klik untuk upload</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4 (Max 50MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Brosur PDF</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Drag & drop atau klik untuk upload</p>
                  <p className="text-xs text-gray-500 mt-1">PDF (Max 10MB)</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Simpan Unit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnitManagement
