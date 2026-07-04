'use client'

import React from 'react'
import Link from 'next/link'
import { Calculator, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

const KPRCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = React.useState(500000000)
  const [loanTerm, setLoanTerm] = React.useState(20)
  const [interestRate, setInterestRate] = React.useState(4.5)
  const [downPayment, setDownPayment] = React.useState(100000000)

  // Simple KPR calculation
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12
  const monthlyPayment = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount
  const propertyPrice = loanAmount + downPayment

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simulasi Kredit KPR
          </h2>
          <p className="text-gray-600 text-lg">
            Hitung estimasi cicilan bulanan Anda dengan mudah
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Calculator Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga Properti: {formatCurrency(propertyPrice)}
                </label>
                <input
                  type="range"
                  min="50000000"
                  max="2000000000"
                  step="50000000"
                  value={propertyPrice}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value) - downPayment)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Rp 50 Juta</span>
                  <span>Rp 2 Miliar</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DP (Down Payment): {formatCurrency(downPayment)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={propertyPrice * 0.5}
                  step="10000000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {((downPayment / propertyPrice) * 100).toFixed(1)}% dari harga properti
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tenor Cicilan: {loanTerm} Tahun
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5 Tahun</span>
                  <span>30 Tahun</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Suku Bunga (Per Tahun): {interestRate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="2.5"
                  max="8"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>2.5%</span>
                  <span>8%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calculator className="text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Estimasi Cicilan</h3>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-gray-600 text-sm mb-1">Cicilan Bulanan</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatCurrency(isNaN(monthlyPayment) ? 0 : monthlyPayment)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Pinjaman</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(loanAmount)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Total Bunga</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatCurrency(isNaN(totalInterest) ? 0 : totalInterest)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Total Pembayaran</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(isNaN(totalPayment) ? 0 : totalPayment)}
                </p>
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <TrendingUp size={20} />
                <span>Konsultasi dengan Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KPRCalculator
