'use client'

import React from 'react'
import Link from 'next/link'
import { Home, Building2, Warehouse, Leaf, TrendingUp } from 'lucide-react'

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  description: string
  count: number
  href: string
  bgColor: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, count, href, bgColor }) => (
  <Link href={href}>
    <div className={`${bgColor} rounded-lg p-6 h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white rounded-lg">
          {icon}
        </div>
        <span className="text-2xl font-bold text-white/80">{count}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-4">{description}</p>
      <button className="inline-block px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
        Lihat →
      </button>
    </div>
  </Link>
)

const PropertyCategories: React.FC = () => {
  const categories = [
    {
      icon: <Home className="text-blue-600" size={32} />,
      title: 'Rumah Subsidi',
      description: 'Perumahan dengan cicilan KPR terjangkau',
      count: 1240,
      href: '/properties?type=subsidy',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      icon: <Building2 className="text-green-600" size={32} />,
      title: 'Komersial',
      description: 'Ruang usaha dan properti bisnis premium',
      count: 580,
      href: '/properties?type=commercial',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-700',
    },
    {
      icon: <Warehouse className="text-purple-600" size={32} />,
      title: 'Take Over',
      description: 'Properti dengan skema pengambilalihan',
      count: 320,
      href: '/properties?type=takeover',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      icon: <Leaf className="text-amber-600" size={32} />,
      title: 'Tanah',
      description: 'Lahan investasi di lokasi strategis',
      count: 890,
      href: '/properties?type=land',
      bgColor: 'bg-gradient-to-br from-amber-500 to-amber-700',
    },
    {
      icon: <TrendingUp className="text-red-600" size={32} />,
      title: 'Kavling',
      description: 'Kavling siap bangun dengan harga kompetitif',
      count: 450,
      href: '/properties?type=plot',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-700',
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Jelajahi Kategori Properti
          </h2>
          <p className="text-gray-600 text-lg">
            Pilih kategori properti yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              count={category.count}
              href={category.href}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertyCategories
