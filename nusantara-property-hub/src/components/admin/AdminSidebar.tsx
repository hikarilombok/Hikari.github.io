'use client'

import React, { useState } from 'react'
import { Menu, LogOut, Home, Users, CheckCircle, TrendingUp, DollarSign, FileText } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  submenu?: SidebarItem[]
}

const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const menuItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: <Home size={20} />,
      href: '/admin/dashboard',
    },
    {
      label: 'Manajemen User',
      icon: <Users size={20} />,
      href: '#',
      submenu: [
        { label: 'Developer', icon: <Users size={16} />, href: '/admin/users/developers' },
        { label: 'Marketing', icon: <Users size={16} />, href: '/admin/users/marketing' },
        { label: 'Notaris', icon: <Users size={16} />, href: '/admin/users/notary' },
        { label: 'Asosiasi', icon: <Users size={16} />, href: '/admin/users/association' },
      ],
    },
    {
      label: 'Approval System',
      icon: <CheckCircle size={20} />,
      href: '#',
      badge: 12,
      submenu: [
        {
          label: 'Verifikasi Properti',
          icon: <CheckCircle size={16} />,
          href: '/admin/approvals/properties',
        },
        {
          label: 'Developer Baru',
          icon: <CheckCircle size={16} />,
          href: '/admin/approvals/developers',
        },
      ],
    },
    {
      label: 'Transaksi',
      icon: <TrendingUp size={20} />,
      href: '/admin/transactions',
      badge: 8,
    },
    {
      label: 'Keuangan',
      icon: <DollarSign size={20} />,
      href: '#',
      submenu: [
        { label: 'Komisi Referral', icon: <DollarSign size={16} />, href: '/admin/finance/commission' },
        { label: 'Approval Withdraw', icon: <DollarSign size={16} />, href: '/admin/finance/withdraw' },
        { label: 'Laporan Keuangan', icon: <DollarSign size={16} />, href: '/admin/finance/reports' },
      ],
    },
    {
      label: 'Konten',
      icon: <FileText size={20} />,
      href: '#',
      submenu: [
        { label: 'Banner', icon: <FileText size={16} />, href: '/admin/content/banners' },
        { label: 'Artikel', icon: <FileText size={16} />, href: '/admin/content/articles' },
        { label: 'Master Data Wilayah', icon: <FileText size={16} />, href: '/admin/content/regions' },
      ],
    },
  ]

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 min-h-screen fixed left-0 top-0 z-40 shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NPH</span>
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors relative"
                  >
                    <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  {sidebarOpen && expandedMenu === item.label && (
                    <div className="bg-gray-800 border-l-2 border-blue-400">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="flex items-center space-x-3 px-4 py-2 ml-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-l transition-colors text-sm"
                        >
                          <span className="text-gray-400">{subitem.icon}</span>
                          <span>{subitem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4 bg-gray-800">
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Logged in as</p>
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium text-sm"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area Placeholder */}
      <div
        className={`${
          sidebarOpen ? 'ml-64' : 'ml-20'
        } w-full transition-all duration-300 bg-gray-50 min-h-screen`}
      />
    </div>
  )
}

export default AdminSidebar
