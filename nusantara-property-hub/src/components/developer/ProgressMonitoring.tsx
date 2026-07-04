'use client'

import React, { useState } from 'react'
import { TrendingUp, Plus, Edit, Trash2 } from 'lucide-react'

interface ProgressEntry {
  id: string
  unitId: string
  unitName: string
  date: string
  percentage: number
  description: string
  photos: number
}

const ProgressMonitoring: React.FC = () => {
  const [progress, setProgress] = useState<ProgressEntry[]>([
    {
      id: '1',
      unitId: '1',
      unitName: 'Rumah Tipe A - Blok A1',
      date: '2024-07-01',
      percentage: 65,
      description: 'Struktur bangunan selesai, sedang proses finishing interior',
      photos: 12,
    },
    {
      id: '2',
      unitId: '2',
      unitName: 'Kavling Premium - Blok B5',
      date: '2024-06-28',
      percentage: 30,
      description: 'Persiapan lahan dan pengurusan izin infrastruktur',
      photos: 8,
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 50) return 'bg-blue-500'
    if (percentage >= 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring Progres Pembangunan</h1>
          <p className="text-gray-600 mt-1">Update perkembangan konstruksi unit Anda</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={20} />
          Input Progres Baru
        </button>
      </div>

      {/* Progress List */}
      <div className="space-y-6">
        {progress.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.unitName}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Update: {new Date(item.date).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold rounded-lg transition-colors text-sm">
                  <Edit size={16} />
                </button>
                <button className="flex-1 sm:flex-none px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors text-sm">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Progres Pembangunan</span>
                <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${getProgressColor(item.percentage)} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>

            {/* Description & Photos */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Keterangan</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Dokumentasi Foto</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  Lihat {item.photos} Foto →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Progress Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Input Progres Pembangunan</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Unit</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                  <option>-- Pilih Unit --</option>
                  <option>Rumah Tipe A - Blok A1</option>
                  <option>Kavling Premium - Blok B5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Progres Pembangunan (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keterangan</label>
                <textarea
                  placeholder="Jelaskan perkembangan pembangunan..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Foto Progres</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <TrendingUp className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">Drag & drop atau klik untuk upload</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 50MB)</p>
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
                Simpan Progres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressMonitoring
