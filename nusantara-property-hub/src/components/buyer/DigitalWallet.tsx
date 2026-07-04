'use client'

import React, { useState } from 'react'
import { CreditCard, Download, Eye, FileText } from 'lucide-react'
import { formatCurrency, formatDate } from '@/utils/format'

interface PaymentRecord {
  id: string
  type: 'booking' | 'installment' | 'final'
  amount: number
  propertyName: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  invoiceNumber: string
  notes?: string
}

const DigitalWallet: React.FC = () => {
  const [payments] = useState<PaymentRecord[]>([
    {
      id: '1',
      type: 'booking',
      amount: 50000000,
      propertyName: 'Rumah Modern Jakarta Selatan',
      date: '2024-06-15',
      status: 'completed',
      invoiceNumber: 'INV-2024-001',
    },
    {
      id: '2',
      type: 'installment',
      amount: 100000000,
      propertyName: 'Rumah Modern Jakarta Selatan',
      date: '2024-07-01',
      status: 'completed',
      invoiceNumber: 'INV-2024-002',
    },
    {
      id: '3',
      type: 'installment',
      amount: 100000000,
      propertyName: 'Rumah Modern Jakarta Selatan',
      date: '2024-08-01',
      status: 'pending',
      invoiceNumber: 'INV-2024-003',
    },
  ])

  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const getPaymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      booking: 'Booking Fee',
      installment: 'Cicilan',
      final: 'Pembayaran Final',
    }
    return labels[type] || type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Selesai',
      pending: 'Menunggu',
      failed: 'Gagal',
    }
    return labels[status] || status
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Digital Wallet</h1>
        <p className="text-gray-600 mt-1">Riwayat pembayaran dan invoice Anda</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-semibold text-sm">Total Pembayaran</h3>
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
          <p className="text-xs text-gray-500 mt-2">{payments.filter(p => p.status === 'completed').length} transaksi selesai</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-semibold text-sm">Pembayaran Menunggu</h3>
            <div className="p-3 bg-yellow-100 rounded-lg">
                <CreditCard className="text-yellow-600" size={24} />
              </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalPending)}</p>
          <p className="text-xs text-gray-500 mt-2">{payments.filter(p => p.status === 'pending').length} pembayaran tertunda</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-semibold text-sm">Saldo Total</h3>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalPaid + totalPending)}</p>
          <p className="text-xs text-gray-500 mt-2">Proyeksi total pembayaran</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Riwayat Pembayaran</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Jenis
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Properti
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getPaymentTypeLabel(payment.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.propertyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {getStatusLabel(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPayment(payment)
                        setShowInvoiceModal(true)
                      }}
                      className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                    >
                      <Eye size={16} />
                      Lihat
                    </button>
                    <button className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center gap-1">
                      <Download size={16} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              {/* Invoice Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">Nusantara Property Hub</div>
                    <p className="text-gray-600">Jakarta, Indonesia</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">INVOICE</p>
                    <p className="text-gray-600">{selectedPayment.invoiceNumber}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mb-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Tanggal Invoice</p>
                  <p className="font-semibold text-gray-900">{formatDate(selectedPayment.date)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Jenis Pembayaran</p>
                  <p className="font-semibold text-gray-900">{getPaymentTypeLabel(selectedPayment.type)}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 grid grid-cols-3 gap-4 border-b border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 uppercase">Deskripsi</div>
                  <div className="text-xs font-semibold text-gray-700 uppercase text-right">Jumlah</div>
                  <div className="text-xs font-semibold text-gray-700 uppercase text-right">Total</div>
                </div>
                <div className="px-4 py-3 grid grid-cols-3 gap-4">
                  <div className="text-gray-900 font-medium">{selectedPayment.propertyName}</div>
                  <div className="text-gray-900 text-right">1x</div>
                  <div className="text-gray-900 text-right font-semibold">{formatCurrency(selectedPayment.amount)}</div>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-2 border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-semibold">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
                <p>Terima kasih atas pembayaran Anda</p>
                <p>Jika ada pertanyaan, hubungi kami di support@nusantarapropertyhub.com</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DigitalWallet
