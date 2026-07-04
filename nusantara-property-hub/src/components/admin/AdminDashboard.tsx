'use client'

import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, Home, TrendingUp, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/utils/format'

interface DashboardStatItem {
  label: string
  value: string | number
  icon: React.ReactNode
  bgColor: string
  textColor: string
  change?: string
  changeColor?: string
}

const AdminDashboard: React.FC = () => {
  // Sample data
  const stats: DashboardStatItem[] = [
    {
      label: 'Total Users',
      value: '2,543',
      icon: <Users size={24} />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
      changeColor: 'text-green-600',
    },
    {
      label: 'Total Properti',
      value: '1,847',
      icon: <Home size={24} />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+8%',
      changeColor: 'text-green-600',
    },
    {
      label: 'Transaksi Bulan Ini',
      value: '342',
      icon: <TrendingUp size={24} />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+15%',
      changeColor: 'text-green-600',
    },
    {
      label: 'Total Komisi',
      value: formatCurrency(125000000),
      icon: <DollarSign size={24} />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      change: '+5%',
      changeColor: 'text-green-600',
    },
  ]

  const transactionData = [
    { name: 'Jan', value: 280 },
    { name: 'Feb', value: 320 },
    { name: 'Mar', value: 290 },
    { name: 'Apr', value: 380 },
    { name: 'May', value: 420 },
    { name: 'Jun', value: 480 },
  ]

  const revenueData = [
    { name: 'Week 1', value: 8400 },
    { name: 'Week 2', value: 9200 },
    { name: 'Week 3', value: 7800 },
    { name: 'Week 4', value: 10200 },
  ]

  const propertyTypeData = [
    { name: 'Rumah Subsidi', value: 45 },
    { name: 'Komersial', value: 25 },
    { name: 'Take Over', value: 15 },
    { name: 'Tanah', value: 10 },
    { name: 'Kavling', value: 5 },
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan data sistem Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
              {stat.change && (
                <span className={`text-sm font-semibold ${stat.changeColor}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Transactions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transaksi per Bulan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Transaksi"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pendapatan Mingguan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" name="Pendapatan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Distribusi Tipe Properti</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="text-blue-600" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">Properti Baru Didaftarkan</p>
                <p className="text-gray-600 text-xs mt-1">Rumah di Kemang, Jakarta Selatan</p>
                <p className="text-gray-500 text-xs mt-1">5 menit yang lalu</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-green-600" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">Transaksi Selesai</p>
                <p className="text-gray-600 text-xs mt-1">Penjualan Apartemen Sudirman</p>
                <p className="text-gray-500 text-xs mt-1">1 jam yang lalu</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="text-purple-600" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">Developer Baru Mendaftar</p>
                <p className="text-gray-600 text-xs mt-1">PT. Jaya Properti Indonesia</p>
                <p className="text-gray-500 text-xs mt-1">2 jam yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
