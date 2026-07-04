'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Tag } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

interface Promotion {
  id: string
  name: string
  description: string
  type: 'discount' | 'cashback' | 'subsidy'
  value: number
  units: string[]
  startDate: string
  endDate: string
  status: 'active' | 'upcoming' | 'expired'
}

const MarketingInternal: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      name: 'Promo Akhir Tahun',
      description: 'Diskon khusus untuk pembelian akhir tahun',
      type: 'discount',
      value: 50000000,
      units: ['Rumah Tipe A', 'Rumah Tipe B'],
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      status: 'active',
    },
    {
      id: '2',
      name: 'Cashback Booking',
      description: 'Cashback Rp 10 juta untuk setiap booking',
      type: 'cashback',
      value: 10000000,
      units: ['Kavling Premium'],
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      discount: 'Diskon',
      cashback: 'Cashback',
      subsidy: 'Subsidi KPR',
    }
    return labels[type] || type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Aktif',
      upcoming: 'Akan Datang',
      expired: 'Berakhir',
    }
    return labels[status] || status
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Internal</h1>
          <p className="text-gray-600 mt-1">Atur promosi khusus untuk unit tertentu</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          Buat Promosi
        </button>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header with status */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Tag size={20} />
                  <h3 className="text-lg font-bold">{promo.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(promo.status)}`}>
                  {getStatusLabel(promo.status)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jenis Promosi</p>
                <p className="text-lg font-bold text-gray-900">{getTypeLabel(promo.type)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Nilai Promosi</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(promo.value)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Berlaku untuk Unit</p>
                <div className="flex flex-wrap gap-2">
                  {promo.units.map((unit, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {unit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Periode</p>
                <p className="text-sm text-gray-700">
                  {new Date(promo.startDate).toLocaleDateString('id-ID')} - {new Date(promo.endDate).toLocaleDateString('id-ID')}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-2">Deskripsi</p>
                <p className="text-sm text-gray-700 line-clamp-2">{promo.description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold rounded-lg transition-colors text-sm">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors text-sm">
                <Trash2 size={16} />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Promotion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Buat Promosi Baru</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Promosi</label>
                <input
                  type="text"
                  placeholder="e.g., Promo Akhir Tahun"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Promosi</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                  <option>-- Pilih Jenis --</option>
                  <option value="discount">Diskon Harga</option>
                  <option value="cashback">Cashback</option>
                  <option value="subsidy">Subsidi KPR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nilai Promosi (Rp)</label>
                <input
                  type="number"
                  placeholder="e.g., 50000000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Unit</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {['Rumah Tipe A', 'Rumah Tipe B', 'Kavling Premium', 'Semua Unit'].map((unit) => (
                    <label key={unit} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      <span className="text-sm text-gray-700">{unit}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Berakhir</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Promosi</label>
                <textarea
                  placeholder="Jelaskan detail promosi..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
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
                Buat Promosi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketingInternal
