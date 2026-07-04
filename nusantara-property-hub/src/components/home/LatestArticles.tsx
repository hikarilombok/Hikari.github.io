'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { formatDate } from '@/utils/format'

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
  slug: string
}

const LatestArticles: React.FC = () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Tips Memilih Rumah Subsidi yang Tepat untuk Keluarga Anda',
      excerpt: 'Panduan lengkap memilih rumah subsidi dengan harga terjangkau dan lokasi strategis...',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
      author: 'Budi Santoso',
      date: new Date().toISOString(),
      category: 'Tips & Trik',
      slug: 'tips-memilih-rumah-subsidi',
    },
    {
      id: '2',
      title: 'Proses KPR Dijelaskan: Dari Permohonan hingga Pencairan Dana',
      excerpt: 'Memahami setiap tahapan proses kredit kepemilikan rumah (KPR) dengan mudah dan cepat...',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      author: 'Dewi Lestari',
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'Edukasi',
      slug: 'proses-kpr-dijelaskan',
    },
    {
      id: '3',
      title: 'Investasi Properti di Jakarta: Peluang dan Strategi Terbaik',
      excerpt: 'Analisis mendalam tentang peluang investasi properti di Jakarta dan strategi menguntungkan...',
      image: 'https://images.unsplash.com/photo-1448932223592-d19b92ba2e38?w=500&h=300&fit=crop',
      author: 'Ahmad Ridho',
      date: new Date(Date.now() - 172800000).toISOString(),
      category: 'Investasi',
      slug: 'investasi-properti-jakarta',
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Artikel Terbaru
            </h2>
            <p className="text-gray-600 text-lg">
              Tips, trik, dan berita terkini tentang dunia properti
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  Baca Selengkapnya
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button Mobile */}
        <div className="sm:hidden">
          <Link
            href="/articles"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestArticles
