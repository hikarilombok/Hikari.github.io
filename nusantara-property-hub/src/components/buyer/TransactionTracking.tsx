'use client'

import React, { useState } from 'react'
import { FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { formatDate } from '@/utils/format'

interface Document {
  id: string
  name: string
  type: string
  status: 'completed' | 'pending' | 'rejected'
  uploadedAt: string
  completedAt?: string
  notes?: string
}

interface Transaction {
  id: string
  propertyName: string
  seller: string
  price: number
  startDate: string
  estimatedDate: string
  status: 'pending' | 'in_progress' | 'completed'
  documents: Document[]
  progress: number
}

const TransactionTracking: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      propertyName: 'Rumah Modern Jakarta Selatan',
      seller: 'PT. Jaya Properti',
      price: 500000000,
      startDate: '2024-06-15',
      estimatedDate: '2024-08-15',
      status: 'in_progress',
      progress: 60,
      documents: [
        {
          id: 'd1',
          name: 'SHM (Sertifikat Hak Milik)',
          type: 'SHM',
          status: 'completed',
          uploadedAt: '2024-06-20',
          completedAt: '2024-07-01',
        },
        {
          id: 'd2',
          name: 'AJB (Akta Jual Beli)',
          type: 'AJB',
          status: 'in_progress',
          uploadedAt: '2024-07-02',
        },
        {
          id: 'd3',
          name: 'IMB (Izin Mendirikan Bangunan)',
          type: 'IMB',
          status: 'pending',
          uploadedAt: '2024-07-03',
        },
      ],
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={20} />
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />
      default:
        return <AlertCircle className="text-gray-600" size={20} />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Selesai',
      pending: 'Menunggu',
      in_progress: 'Diproses',
      rejected: 'Ditolak',
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tracking Transaksi</h1>
        <p className="text-gray-600 mt-1">Pantau proses dokumen yang sedang diproses notaris</p>
      </div>

      {/* Transactions */}
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{transaction.propertyName}</h3>
                  <p className="text-blue-100">Penjual: {transaction.seller}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">Rp {(transaction.price / 1000000).toFixed(0)} Juta</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    transaction.status === 'completed' ? 'bg-green-200 text-green-800' :
                    transaction.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="p-6 border-b border-gray-200">
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">Progres Keseluruhan</span>
                  <span className="font-bold text-blue-600">{transaction.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${transaction.progress}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Dimulai: {formatDate(transaction.startDate)}</p>
                <p>Target Selesai: {formatDate(transaction.estimatedDate)}</p>
              </div>
            </div>

            {/* Documents */}
            <div className="p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} />
                Dokumen yang Diproses
              </h4>
              <div className="space-y-3">
                {transaction.documents.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getStatusIcon(doc.status)}</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{doc.name}</h5>
                          <p className="text-sm text-gray-600 mt-1">
                            Upload: {formatDate(doc.uploadedAt)}
                          </p>
                          {doc.completedAt && (
                            <p className="text-sm text-green-600">
                              Selesai: {formatDate(doc.completedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                        {getStatusLabel(doc.status)}
                      </span>
                    </div>
                    {doc.notes && (
                      <div className="bg-white p-3 rounded border-l-2 border-yellow-400">
                        <p className="text-sm text-gray-600"><strong>Catatan:</strong> {doc.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                <FileText size={18} />
                Download Dokumen
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                Chat dengan Notaris
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionTracking
